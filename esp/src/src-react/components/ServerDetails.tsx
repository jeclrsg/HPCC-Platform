import * as React from "react";
import { Pivot, PivotItem } from "@fluentui/react";
import { SizeMe } from "react-sizeme";
import nlsHPCC from "src/nlsHPCC";
import { pivotItemStyle } from "../layouts/pivot";
import { pushUrl } from "../util/history";
import { Configuration } from "./Configuration";
import { ServiceSummary } from "./ServiceSummary";

interface ServerDetailsProps {
    netAddress: string;
    compName: string;
    tab?: string;
    state?: string;
    queryParams?: { [key: string]: string };
}

export const ServerDetails: React.FunctionComponent<ServerDetailsProps> = ({
    netAddress,
    compName,
    tab = "summary",
    state,
    queryParams = {}
}) => {

    return <SizeMe monitorHeight>{({ size }) =>
        <Pivot overflowBehavior="menu" style={{ height: "100%" }} selectedKey={tab} onLinkClick={evt => pushUrl(`/operations/${netAddress}/${compName}/${evt.props.itemKey}`)}>
            <PivotItem headerText={nlsHPCC.Summary} itemKey="summary" style={pivotItemStyle(size)} >
                <ServiceSummary compName={compName} netAddress={netAddress} />
            </PivotItem>
            <PivotItem headerText={nlsHPCC.Configuration} itemKey="configuration" style={pivotItemStyle(size, 0)}>
                <Configuration compName={compName} netAddress={netAddress} />
            </PivotItem>
            <PivotItem headerText={nlsHPCC.Logs} itemKey="logs" style={pivotItemStyle(size, 0)}>
                {/* <ServiceSummary compName={compName} netAddress={netAddress} /> */}
            </PivotItem>
            <PivotItem headerText={nlsHPCC.Preflight} itemKey="preflight" style={pivotItemStyle(size, 0)}>
                {/* <ServiceSummary compName={compName} netAddress={netAddress} /> */}
            </PivotItem>
            <PivotItem headerText={nlsHPCC.RoxieFileCopy} itemKey="roxie-copy-status" style={pivotItemStyle(size, 0)}>
                {/* <ServiceSummary compName={compName} netAddress={netAddress} /> */}
            </PivotItem>
        </Pivot>
    }</SizeMe>;
};
