import * as React from "react";
import { CommandBar, ContextualMenuItemType, ICommandBarItemProps } from "@fluentui/react";
import { useConst } from "@fluentui/react-hooks";
import { scopedLogger } from "@hpcc-js/util";
import * as Observable from "dojo/store/Observable";
import { Memory } from "src/Memory";
import nlsHPCC from "src/nlsHPCC";
import * as WsESDLConfig from "src/WsESDLConfig";
import { ShortVerticalDivider } from "./Common";
import { DojoGrid, selector } from "./DojoGrid";
import { XMLSourceEditor } from "./SourceEditor";
import { HolyGrail } from "../layouts/HolyGrail";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "../layouts/react-reflex";
import { AddBindingForm } from "./forms/AddBinding";

const logger = scopedLogger("src-react/components/DynamicESDL.tsx");

const defaultUIState = {
    hasSelection: false,
};

interface ESDLDefinitonsProps {
}

export const ESDLDefinitions: React.FunctionComponent<ESDLDefinitonsProps> = ({
}) => {

    const [grid, setGrid] = React.useState<any>(undefined);
    const [definition, setDefinition] = React.useState("");
    const [selection, setSelection] = React.useState([]);
    const [showAddBinding, setShowAddBinding] = React.useState(false);
    const [uiState, setUIState] = React.useState({ ...defaultUIState });

    //  Grid ---
    const gridStore = useConst(new Observable(new Memory("_hpcc_id")));
    const gridQuery = useConst({});
    const gridColumns = useConst({
        col1: selector({ width: 30, selectorType: "radio" }),
        Name: { label: nlsHPCC.Process },
        PublishBy: { label: nlsHPCC.PublishedBy, width: 140 },
        CreatedTime: { label: nlsHPCC.CreatedTime, width: 140 },
        LastEditBy: { label: nlsHPCC.LastEditedBy, width: 140 },
        LastEditTime: { label: nlsHPCC.LastEditTime, width: 140 }
    });

    const refreshTable = React.useCallback((clearSelection = false) => {
        grid?.set("query", gridQuery);
        if (clearSelection) {
            grid?.clearSelection();
        }
    }, [grid, gridQuery]);

    //  Command Bar  ---
    const buttons = React.useMemo((): ICommandBarItemProps[] => [
        {
            key: "refresh", text: nlsHPCC.Refresh, iconProps: { iconName: "Refresh" },
            onClick: () => refreshTable()
        },
        { key: "divider_1", itemType: ContextualMenuItemType.Divider, onRender: () => <ShortVerticalDivider /> },
        {
            key: "delete", text: nlsHPCC.Delete, disabled: !uiState.hasSelection,
            onClick: () => {

            }
        },
        {
            key: "add", text: nlsHPCC.AddBinding,
            onClick: () => setShowAddBinding(true)
        },
    ], [refreshTable, uiState]);

    //  Selection  ---
    React.useEffect(() => {
        const state = { ...defaultUIState };
        state.hasSelection = selection.length > 0;
        setUIState(state);
        if (selection[0]) {
            WsESDLConfig.GetESDLDefinition({
                request: { Id: selection[0].Name }
            })
                .then(({ GetESDLDefinitionResponse }) => {
                    setDefinition(GetESDLDefinitionResponse?.Definition?.Interface);
                })
                .catch(logger.error)
                ;
        }
    }, [selection]);

    React.useEffect(() => {
        WsESDLConfig.ListESDLDefinitions({})
            .then(({ ListESDLDefinitionsResponse }) => {
                const definitions = ListESDLDefinitionsResponse?.Definitions?.Definition;
                console.log(definitions);
                if (definitions) {
                    gridStore.setData(definitions.map((defn, idx) => {
                        return {
                            __hpcc_id: idx,
                            Name: defn.Id,
                            PublishBy: defn?.History.PublishBy,
                            CreatedTime: defn?.History.CreatedTime,
                            LastEditBy: defn?.History.LastEditBy,
                            LastEditTime: defn?.History.LastEditTime
                        };
                    }));
                    refreshTable();
                }
            })
            .catch(logger.error)
            ;
    }, [grid, gridStore, refreshTable]);

    return <>
        <HolyGrail
            header={<CommandBar items={buttons} overflowButtonProps={{}} />}
            main={
                <ReflexContainer orientation="vertical">
                    <ReflexElement>
                        <DojoGrid
                            store={gridStore} query={gridQuery} columns={gridColumns}
                            setGrid={setGrid} setSelection={setSelection} selectionMode="single"
                        />
                    </ReflexElement>
                    <ReflexSplitter />
                    <ReflexElement>
                        <XMLSourceEditor text={definition} readonly={true} />
                    </ReflexElement>
                </ReflexContainer>
            }
        />
        <AddBindingForm showForm={showAddBinding} setShowForm={setShowAddBinding} formMinWidth={420} />
    </>;

};