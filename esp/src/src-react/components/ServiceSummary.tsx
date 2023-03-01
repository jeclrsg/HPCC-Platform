import * as React from "react";
import { ScrollablePane, ScrollbarVisibility } from "@fluentui/react";
import { Fields } from "./forms/Fields";
import { TableGroup } from "./forms/Groups";
import { useMachines } from "../hooks/platform";

interface ServiceSummaryProps {
    compName?: string;
    netAddress?: string;
}

export const ServiceSummary: React.FunctionComponent<ServiceSummaryProps> = ({
    compName, netAddress
}) => {

    const { machines } = useMachines();

    const [fields, setFields] = React.useState<Fields>();

    React.useEffect(() => {
        if (!compName || !netAddress || !machines || machines.length === 0) return;
        machines.filter(machine => machine.NetAddress === netAddress).forEach(machine => {
            const service = machine?.Services.filter(service => service.Name === compName);
            if (service.length === 1) {
                const _fields: Fields = {};
                Object.keys(service[0]).forEach(key => {
                    _fields[key] = {
                        type: "string",
                        label: key,
                        value: service[0][key],
                        readonly: true
                    };
                });
                setFields(_fields);
            }
        });

    }, [compName, machines, netAddress]);

    return <>
        <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
            <TableGroup fields={fields} />
        </ScrollablePane>
    </>;
};
