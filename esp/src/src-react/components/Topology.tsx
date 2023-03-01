import * as React from "react";
import { CommandBar, ContextualMenuItemType, ICommandBarItemProps, Link } from "@fluentui/react";
import nlsHPCC from "src/nlsHPCC";
import { QuerySortItem } from "src/store/Store";
import { useFluentGrid } from "../hooks/grid";
import { useMachines } from "../hooks/platform";
import { HolyGrail } from "../layouts/HolyGrail";
import { pushParams } from "../util/history";
import { Fields } from "./forms/Fields";
import { Filter } from "./forms/Filter";
import { ShortVerticalDivider } from "./Common";
import { SizeMe } from "react-sizeme";

const FilterFields: Fields = {
    "Name": { type: "string", label: nlsHPCC.Name },
    "NetAddress": { type: "string", label: nlsHPCC.Priority },
    "QueryName": { type: "string", label: nlsHPCC.NetworkAddress },
    "Service": { type: "string", label: nlsHPCC.ServiceName }
};

const defaultUIState = {
    hasSelection: false,
    isSuspended: false,
    isNotSuspended: false,
    isActive: false,
    isNotActive: false,
};

interface TopologyProps {
    filter?: object;
    sort?: QuerySortItem;
}

const emptyFilter = {};
const defaultSort = { attribute: undefined, descending: false };

export const Topology: React.FunctionComponent<TopologyProps> = ({
    filter = emptyFilter,
    sort = defaultSort
}) => {

    const { machines } = useMachines();

    const [showFilter, setShowFilter] = React.useState(false);
    const [uiState, setUIState] = React.useState({ ...defaultUIState });
    const [data, setData] = React.useState<any[]>([]);

    const hasFilter = React.useMemo(() => Object.keys(filter).length > 0, [filter]);

    React.useEffect(() => {
        if (!machines || machines.length === 0) return;
        const _machines = machines.map(machine => {
            const services = machine?.Services.map(service => service.Name);
            return { Name: machine.Name, NetAddress: machine.NetAddress, Services: services };
        });
        setData(_machines);
        console.log("machines: ", _machines);
    }, [machines]);

    //  Grid ---
    const { Grid, selection, refreshTable, copyButtons } = useFluentGrid({
        data,
        primaryID: "NetAddress",
        filename: "topology",
        columns: {
            col1: {
                width: 16,
                selectorType: "checkbox"
            },
            Name: {
                label: nlsHPCC.Name,
                width: 100
            },
            NetAddress: {
                label: nlsHPCC.NetworkAddress,
                width: 120,
            },
            Services: {
                label: nlsHPCC.Services,
                formatter: React.useCallback(function (services, row) {
                    return services.map((service, idx) => <Link key={`${service}_${idx}`} href={`#/operations/${row.NetAddress}/${service}`} style={{ padding: "0 5px" }}>{service}</Link>);
                }, [])
            }
        }
    });

    //  Command Bar  ---
    const buttons = React.useMemo((): ICommandBarItemProps[] => [
        {
            key: "refresh", text: nlsHPCC.Refresh, iconProps: { iconName: "Refresh" },
            onClick: () => refreshTable()
        },
        { key: "divider_1", itemType: ContextualMenuItemType.Divider, onRender: () => <ShortVerticalDivider /> },
        {
            key: "filter", text: nlsHPCC.Filter, disabled: data === undefined, iconProps: { iconName: hasFilter ? "FilterSolid" : "Filter" },
            onClick: () => setShowFilter(true)
        },
    ], [data, hasFilter, refreshTable, selection, uiState.hasSelection]);

    //  Filter  ---
    const filterFields: Fields = {};
    for (const field in FilterFields) {
        filterFields[field] = { ...FilterFields[field], value: filter[field] };
    }

    //  Selection  ---
    React.useEffect(() => {
        const state = { ...defaultUIState };

        for (let i = 0; i < selection.length; ++i) {
            state.hasSelection = true;
            if (selection[i].Suspended !== true) {
                state.isSuspended = true;
            } else {
                state.isNotSuspended = true;
            }
            if (selection[i].Activated !== true) {
                state.isActive = true;
            } else {
                state.isNotActive = true;
            }
        }

        setUIState(state);
    }, [selection]);

    return <HolyGrail
        header={<CommandBar items={buttons} farItems={copyButtons} />}
        main={
            <>
                <SizeMe monitorHeight>{({ size }) =>
                    <div style={{ position: "relative", width: "100%", height: "100%" }}>
                        <div style={{ position: "absolute", width: "100%", height: `${size.height}px` }}>
                            <Grid height={`${size.height}px`} />
                        </div>
                    </div>
                }</SizeMe>
                <Filter showFilter={showFilter} setShowFilter={setShowFilter} filterFields={filterFields} onApply={pushParams} />
            </>
        }
    />;
};
