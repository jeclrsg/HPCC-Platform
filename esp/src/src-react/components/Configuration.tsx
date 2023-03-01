import * as React from "react";
import { XMLSourceEditor } from "./SourceEditor";
import { Service, useMachines } from "../hooks/platform";
import * as ESPRequest from "../../src/ESPRequest";

interface ConfigurationProps {
    compName?: string;
    netAddress?: string;
}

export const Configuration: React.FunctionComponent<ConfigurationProps> = ({
    compName, netAddress
}) => {

    const { machines } = useMachines();

    const [service, setService] = React.useState<Service>();

    React.useEffect(() => {
        if (!compName || !netAddress || !machines || machines.length === 0) return;
        machines.filter(machine => machine.NetAddress === netAddress).forEach(machine => {
            const service = machine?.Services.filter(service => service.Name === compName);
            setService(service.length === 1 ? service[0] : null);
        });
    }, [compName, machines, netAddress]);

    const [configXml, setConfigXml] = React.useState("");

    React.useEffect(() => {
        if (!compName) {
            ESPRequest.send("main", "", {
                request: {
                    config_: "",
                    PlainText: "yes"
                },
                handleAs: "text"
            }).then(response => setConfigXml(response));
        } else {
            if (service) {
                ESPRequest.send("WsTopology", "TpGetComponentFile", {
                    request: {
                        CompType: service.ServiceType,
                        CompName: service.Name,
                        NetAddress: service.NetAddress,
                        Directory: service.Directory,
                        FileType: "cfg",
                        OsType: service.OS,
                    },
                    handleAs: "text"
                }).then(response => setConfigXml(response));
            }
        }
    }, [compName, service]);

    return <XMLSourceEditor text={configXml} readonly={true} />;

};
