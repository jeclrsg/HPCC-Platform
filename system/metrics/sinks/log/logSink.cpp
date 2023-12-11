/*##############################################################################
    HPCC SYSTEMS software Copyright (C) 2021 HPCC Systems®.
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
############################################################################## */

#include "logSink.hpp"
#include "jlog.hpp"

#include <map>
#include <vector>
#include <string>

using namespace hpccMetrics;

extern "C" MetricSink* getSinkInstance(const char *name, const IPropertyTree *pSettingsTree)
{
    MetricSink *pSink = new LogMetricSink(name, pSettingsTree);
    return pSink;
}


LogMetricSink::LogMetricSink(const char *name, const IPropertyTree *pSettingsTree) :
    PeriodicMetricSink(name, "log", pSettingsTree),
    ignoreZeroMetrics(false)
{
    ignoreZeroMetrics = pSettingsTree->getPropBool("@ignoreZeroMetrics", true);
}


void LogMetricSink::doCollection()
{
    auto reportMetrics = pManager->queryMetricsForReport(name);
    for (auto &pMetric: reportMetrics)
    {
        writeLogEntry(pMetric);
    }
}


void LogMetricSink::writeLogEntry(const std::shared_ptr<IMetric> &pMetric)
{
    std::string name = pMetric->queryName();
    const auto & metaData = pMetric->queryMetaData();
    for (auto &metaDataIt: metaData)
    {
        name.append(".").append(metaDataIt.value);
    }

    const char *unitsStr = pManager->queryUnitsString(pMetric->queryUnits());

    if (pMetric->queryMetricType() != METRICS_HISTOGRAM)
    {
        __uint64 metricValue = pMetric->queryValue();
        if (!ignoreZeroMetrics || metricValue)
        {
            if (!isEmptyString(unitsStr))
            {
                name.append(".").append(unitsStr);
            }
            LOG(MCmonitorMetric, "name=%s,value=%" I64F "d", name.c_str(), metricValue);
        }
    }
    else
    {
        std::vector<__uint64> values = pMetric->queryHistogramValues();
        std::vector<__uint64> limits = pMetric->queryHistogramBucketLimits();
        size_t countBucketValues = values.size();

        // If not ignoring or measurements exist, output the log entries
        __uint64 sum = pMetric->queryValue();
        if (!ignoreZeroMetrics || sum)
        {
            __uint64 cumulative = 0;
            for (size_t i=0; i < countBucketValues - 1; ++i)
            {
                cumulative += values[i];
                if (!ignoreZeroMetrics || values[i])
                {
                    LOG(MCmonitorMetric, "name=%s, bucket le %" I64F "d=%" I64F "d", name.c_str(), limits[i], cumulative);
                }
            }

            // The inf bucket count is the last element in the array of values returned.
            // Add it to the cumulative count and print the value
            cumulative += values[countBucketValues - 1];
            LOG(MCmonitorMetric, "name=%s, bucket inf=%" I64F "d", name.c_str(), cumulative);

            // sum - total of all observations
            LOG(MCmonitorMetric, "name=%s, sum=%" I64F "d", name.c_str(), sum);

            // count - total of all bucket counts (same as inf)
            LOG(MCmonitorMetric, "name=%s, count=%" I64F "d", name.c_str(), cumulative);
        }
    }
}
