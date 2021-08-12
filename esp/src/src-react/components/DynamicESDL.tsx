import * as React from "react";
import { CommandBar, ContextualMenuItemType, ICommandBarItemProps, Pivot, PivotItem, Sticky, StickyPositionType } from "@fluentui/react";
import { useConst } from "@fluentui/react-hooks";
import { SizeMe } from "react-sizeme";
import * as Observable from "dojo/store/Observable";
import { AlphaNumSortMemory } from "src/Memory";
import { scopedLogger } from "@hpcc-js/util";
import nlsHPCC from "src/nlsHPCC";
import * as Utility from "src/Utility";
import * as WsESDLConfig from "src/WsESDLConfig";
import { ShortVerticalDivider } from "./Common";
import { DojoGrid, selector, tree } from "./DojoGrid";
import { ESDLDefinitions } from "./ESDLDefinitions";
import { AddBindingForm } from "./forms/AddBinding";
import { pivotItemStyle } from "../layouts/pivot";
import { pushUrl } from "../util/history";

const logger = scopedLogger("src-react/components/DynamicESDL.tsx");

const defaultUIState = {
    hasSelection: false,
};

class TreeStore extends AlphaNumSortMemory {
    mayHaveChildren(item) {
        return item.children;
    }

    getChildren(parent, options) {
        return this.query({ __hpcc_parentName: parent.__hpcc_id }, options);
    }
}

interface ESDLBindingProps {
    tab?: string;
}

export const DynamicESDL: React.FunctionComponent<ESDLBindingProps> = ({
    tab = "bindings"
}) => {

    const [grid, setGrid] = React.useState<any>(undefined);
    const [selection, setSelection] = React.useState([]);
    const [showAddBinding, setShowAddBinding] = React.useState(false);
    const [uiState, setUIState] = React.useState({ ...defaultUIState });

    //  Grid ---
    const gridStore = useConst(new Observable(new TreeStore("__hpcc_id", { Name: true, Value: true })));
    const gridSort = useConst([{ attribute: "__hpcc_id", "descending": false }]);
    const gridQuery = useConst({ __hpcc_parentName: null });
    const gridColumns = useConst({
        col1: selector({
            width: 30,
            selectorType: "checkbox",
            disabled: function (item) {
                if (item.type === "binding") {
                    return false;
                }
                return true;
            },
            sortable: false,
            unhidable: true
        }),
        Name: tree({
            formatter: function (_name, row) {
                let img = "";
                let name = _name;
                if (row.type === "port") {
                    img = Utility.getImageHTML("machine.png") + nlsHPCC.Port + ":";
                } else if (row.type === "binding") {
                    img = Utility.getImageHTML("sync.png");
                    name = "<a href='#' onClick='return false;' class='dgrid-row-url'>" + _name + "</a>";
                }
                return img + "&nbsp;" + name;
            },
            collapseOnRefresh: false,
            label: nlsHPCC.Process,
            width: 240,
            sortable: false,
            unhidable: true
        }),
        PublishBy: {
            label: nlsHPCC.PublishedBy,
            sortable: false,
            width: 160
        },
        CreatedTime: {
            label: nlsHPCC.CreatedTime,
            sortable: false,
            width: 160
        },
        LastEditBy: {
            label: nlsHPCC.LastEditedBy,
            sortable: false,
            width: 160
        },
        LastEditTime: {
            label: nlsHPCC.LastEditTime,
            sortable: false,
            width: 160
        }
    });

    const refreshTable = React.useCallback((clearSelection = false) => {
        grid?.set("query", gridQuery);
        if (clearSelection) {
            grid?.clearSelection();
        }
    }, [grid, gridQuery]);

    const refreshGrid = React.useCallback(() => {
        console.log("griddddd");
        WsESDLConfig.ListESDLBindings({
            request: {
                ListESDLBindingsRequest: true
            }
        })
            .then(({ ListESDLBindingsResponse }) => {
                const rows = [];
                const processes = ListESDLBindingsResponse?.EspProcesses?.EspProcess;
                processes.forEach((row, idx) => {
                    row = {
                        ...row,
                        __hpcc_parentName: null,
                        __hpcc_id: row.Name + idx,
                        children: row.Ports ? true : false,
                        type: "service"
                    };
                    rows.push(row);
                    if (row?.Ports) {
                        row?.Ports?.Port.forEach((Port, portIdx) => {
                            rows.push({
                                __hpcc_parentName: row.Name + idx,
                                __hpcc_id: row.Name + Port.Value + portIdx,
                                Name: Port.Value,
                                children: Port ? true : false,
                                type: "port"
                            });
                            Port?.Bindings?.Binding.forEach((Binding, bindingIdx) => {
                                rows.push({
                                    ESPProcessName: row.Name,
                                    Port: Port.Value,
                                    __hpcc_parentName: row.Name + Port.Value + portIdx,
                                    __hpcc_id: Binding.Id + bindingIdx,
                                    Name: Binding.Id,
                                    PublishBy: Binding.History.PublishBy,
                                    CreatedTime: Binding.History.CreatedTime,
                                    LastEditBy: Binding.History.LastEditBy,
                                    LastEditTime: Binding.History.LastEditTime,
                                    children: false,
                                    type: "binding"
                                });
                            });
                        });
                    }
                });
                console.log(rows, rows.length);
                gridStore.setData(rows);
                refreshTable();
            })
            .catch(logger.error)
            ;
    }, [gridStore, refreshTable]);

    //  Command Bar  ---
    const buttons = React.useMemo((): ICommandBarItemProps[] => [
        {
            key: "refresh", text: nlsHPCC.Refresh, iconProps: { iconName: "Refresh" },
            onClick: () => refreshGrid()
        },
        { key: "divider_1", itemType: ContextualMenuItemType.Divider, onRender: () => <ShortVerticalDivider /> },
        {
            key: "open", text: nlsHPCC.Open, disabled: !uiState.hasSelection,
            onClick: () => {

            }
        },
        {
            key: "add", text: nlsHPCC.AddBinding,
            onClick: () => setShowAddBinding(true)
        },
        { key: "divider_2", itemType: ContextualMenuItemType.Divider, onRender: () => <ShortVerticalDivider /> },
        {
            key: "delete", text: nlsHPCC.DeleteBinding, disabled: !uiState.hasSelection,
            onClick: () => {
                const list = selection.map(binding => binding.Name).join("\n");
                if (confirm(nlsHPCC.YouAreAboutToDeleteBinding + "\n" + list)) {
                    const requests = [];
                    selection.forEach(binding => {
                        requests.push(
                            WsESDLConfig.DeleteESDLBinding({
                                request: {
                                    Id: binding.Name
                                }
                            })
                        );
                    });
                    Promise
                        .all(requests)
                        .then(() => {
                            refreshGrid();
                        })
                        .catch(logger.error)
                        ;
                }
            },
        }
    ], [refreshGrid, selection, uiState]);

    React.useEffect(() => {
        if (tab !== "bindings") return;
        refreshGrid();
    }, [gridStore, refreshGrid, tab]);

    //  Selection  ---
    React.useEffect(() => {
        const state = { ...defaultUIState };

        for (let i = 0; i < selection.length; ++i) {
            state.hasSelection = true;
        }

        setUIState(state);
    }, [selection]);

    return <>
        <SizeMe monitorHeight>{({ size }) =>
            <Pivot
                overflowBehavior="menu" style={{ height: "100%" }} selectedKey={tab}
                onLinkClick={evt => pushUrl(`/esdl/${evt.props.itemKey}`)}
            >
                <PivotItem headerText={nlsHPCC.title_DESDL} itemKey="bindings" style={pivotItemStyle(size)} >
                    <Sticky stickyPosition={StickyPositionType.Header}>
                        <CommandBar items={buttons} />
                    </Sticky>
                    <DojoGrid store={gridStore} query={gridQuery} sort={gridSort} columns={gridColumns} setGrid={setGrid} setSelection={setSelection} />
                </PivotItem>
                <PivotItem headerText={nlsHPCC.Definitions} itemKey="definitions" style={pivotItemStyle(size, 0)}>
                    <ESDLDefinitions />
                </PivotItem>
            </Pivot>
        }</SizeMe>
        <AddBindingForm showForm={showAddBinding} setShowForm={setShowAddBinding} refreshGrid={refreshGrid} formMinWidth={420} />
    </>;
};