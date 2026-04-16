import * as React from "react";
import { createPortal } from "react-dom";
import { useConst } from "@fluentui/react-hooks";
import { HTMLWidget, Widget, Utility } from "@hpcc-js/common";
import { DockPanel as HPCCDockPanel, IClosable, WidgetAdapter } from "@hpcc-js/phosphor";
import { compare2 } from "@hpcc-js/util";
import { AutosizeHpccJSComponent } from "./HpccJSAdapter";

export class ReactWidget extends HTMLWidget {

    protected _div;
    protected _onDomReady?: (node: HTMLElement) => void;

    constructor() {
        super();
    }

    onDomReady(_: (node: HTMLElement) => void): this {
        this._onDomReady = _;
        return this;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._div = element.append("div").style("font-size", "1.15em");
        this._onDomReady?.(this._div.node());
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._div
            .style("width", `${this.width()}px`)
            .style("height", `${this.height()}px`)
            ;
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    render(callback?: (w: Widget) => void): this {
        const retVal = super.render(callback);
        return retVal;
    }
}

export interface DockPanelLayout {
    main: object;
}

function validLayout(layout?: any) {
    return !!layout?.main;
}

function formatLayout(layout?: any): DockPanelLayout | undefined {
    if (validLayout(layout)) {
        return layout;
    }
    return undefined;
}

export class ResetableDockPanel extends HPCCDockPanel {

    protected _origLayout: DockPanelLayout | undefined;
    protected _lastLayout: DockPanelLayout | undefined;
    protected _visibility: { [id: string]: boolean };

    resetLayout() {
        if (this._origLayout) {
            this
                .layout(this._origLayout)
                .lazyRender()
                ;
        }
    }

    setLayout(layout: object) {
        if (this._origLayout === undefined) {
            this._origLayout = formatLayout(this.layout());
        }
        this.layout(layout);
        return this;
    }

    getLayout() {
        return formatLayout(this.layout()) ?? this._lastLayout ?? this._origLayout;
    }

    getVisibility() {
        return this._visibility;
    }

    render(callback?: (w: Widget) => void) {
        const retVal = this._visibility !== undefined ? super.render() : super.render(() => {
            if (this._visibility === undefined) {
                this._visibility = {};
                this.widgetAdapters().forEach(wa => {
                    this._visibility[wa.widget.id()] = wa.widget.visible();
                });
            }
        });
        if (this._origLayout === undefined) {
            this._origLayout = formatLayout(this.layout());
        }
        if (callback) {
            callback(this);
        }
        return retVal;
    }

    //  Events  ---
    childActivation(w: Widget, wa: WidgetAdapter) {
    }

    childVisibility(w: Widget, visible: boolean, wa: WidgetAdapter) {
        if (this._visibility && this._visibility[w.id()] !== visible) {
            this._visibility[w.id()] = visible;
            this._lazyVisibilityChanged();
        }
    }

    layoutChanged() {
        this._lastLayout = this.getLayout();
    }

    //  Exposed Events  ---
    private _lazyVisibilityChanged = Utility.debounce(async () => {
        this.visibilityChanged(this._visibility);
    }, 60);

    visibilityChanged(visibility: { [id: string]: boolean }) {
    }
}

interface DockPanelItemProps {
    key: string;
    title: string;
    location?: "split-top" | "split-left" | "split-right" | "split-bottom" | "tab-before" | "tab-after";
    relativeTo?: string;
    closable?: boolean | IClosable;
    padding?: number;
    children: React.JSX.Element;
}

export const DockPanelItem: React.FunctionComponent<DockPanelItemProps> = ({
    children
}) => {
    return <>{children}</>;
};

interface DockPanelProps {
    layout?: object;
    hideSingleTabs?: boolean;
    onCreate?: (dockpanel: ResetableDockPanel) => void;
    onVisibilityChanged?: (visibility: { [id: string]: boolean }) => void;
    children?: React.ReactElement<DockPanelItemProps> | React.ReactElement<DockPanelItemProps>[];
}

export const DockPanel: React.FunctionComponent<DockPanelProps> = ({
    layout,
    hideSingleTabs,
    onCreate: onDockPanelCreate,
    onVisibilityChanged: onDockPanelVisibilityChanged,
    children
}) => {
    const items = React.useMemo(() => {
        if (children === undefined) return [];
        return (Array.isArray(children) ? children : [children]).filter(item => !!item);
    }, [children]);
    const [prevItems, setPrevItems] = React.useState<React.ReactElement<DockPanelItemProps>[]>([]);
    const [domNodes, setDomNodes] = React.useState<Map<string, HTMLElement>>(new Map());
    const idx = useConst(() => new Map<string, ReactWidget>());

    const dockPanel = useConst(() => {
        const retVal = new ResetableDockPanel();
        if (onDockPanelCreate) {
            setTimeout(() => {
                onDockPanelCreate(retVal);
            }, 0);
        }
        if (onDockPanelVisibilityChanged) {
            retVal.on("visibilityChanged", visibility => onDockPanelVisibilityChanged(visibility), true);
        }
        return retVal;
    });

    React.useEffect(() => {
        dockPanel?.hideSingleTabs(hideSingleTabs);
    }, [dockPanel, hideSingleTabs]);

    React.useEffect(() => {
        const diffs = compare2(prevItems, items, item => item.key);
        diffs.exit.forEach(item => {
            idx.delete(item.key);
            dockPanel.removeWidget(idx.get(item.key));
            setDomNodes(prev => {
                const next = new Map(prev);
                next.delete(item.key);
                return next;
            });
        });
        diffs.enter.forEach(item => {
            const reactWidget = new ReactWidget()
                .id(item.key)
                .onDomReady((node) => {
                    setDomNodes(prev => new Map(prev).set(item.key, node));
                });
            dockPanel.addWidget(reactWidget, item.props.title, item.props.location, idx.get(item.props.relativeTo), item.props.closable, item.props.padding);
            idx.set(item.key, reactWidget);
        });
        dockPanel.render();
        setPrevItems(items);
    }, [prevItems, dockPanel, idx, items]);

    React.useEffect(() => {
        if (layout === undefined) {
            dockPanel?.resetLayout();
        } else {
            dockPanel?.setLayout(layout);
        }
    }, [dockPanel, layout]);

    return <>
        <AutosizeHpccJSComponent widget={dockPanel} padding={4} debounce={false} />
        {items.map(item => {
            const node = domNodes.get(item.key);
            if (!node) return null;
            return createPortal(item.props.children, node, item.key);
        })}
    </>;
};
