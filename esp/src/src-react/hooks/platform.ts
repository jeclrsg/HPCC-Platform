import * as React from "react";
import { scopedLogger } from "@hpcc-js/util";
import { Topology, TargetCluster, TpLogicalClusterQuery, TpServiceQuery } from "@hpcc-js/comms";
import { getBuildInfo, BuildInfo } from "src/Session";

const logger = scopedLogger("src-react/hooks/platform.ts");

declare const dojoConfig;

export function useBuildInfo(): [BuildInfo, { isContainer: boolean, currencyCode: string }] {

    const [buildInfo, setBuildInfo] = React.useState<BuildInfo>({});
    const [isContainer, setIsContainer] = React.useState<boolean>(dojoConfig.isContainer);
    const [currencyCode, setCurrencyCode] = React.useState<string>(dojoConfig.currencyCode);

    React.useEffect(() => {
        getBuildInfo().then(info => {
            setIsContainer(info["CONTAINERIZED"] === "ON");
            setCurrencyCode(info["currencyCode"] ?? "");
            setBuildInfo(info);
        });
    }, []);

    return [buildInfo, { isContainer, currencyCode }];
}

export function useLogicalClusters(): [TpLogicalClusterQuery.TpLogicalCluster[] | undefined, TpLogicalClusterQuery.TpLogicalCluster | undefined] {
    const [targetClusters, setTargetClusters] = React.useState<TpLogicalClusterQuery.TpLogicalCluster[]>();
    const [defaultCluster, setDefaultCluster] = React.useState<TpLogicalClusterQuery.TpLogicalCluster>();

    React.useEffect(() => {
        const topology = Topology.attach({ baseUrl: "" });
        let active = true;
        topology.fetchLogicalClusters().then(response => {
            if (active) {
                setTargetClusters(response);
                let firstRow: TpLogicalClusterQuery.TpLogicalCluster;
                let firstHThor: TpLogicalClusterQuery.TpLogicalCluster;
                let firstThor: TpLogicalClusterQuery.TpLogicalCluster;
                response.forEach(row => {
                    if (firstRow === undefined) {
                        firstRow = row;
                    }
                    if (firstHThor === undefined && (row as any).type === "hthor") {
                        firstHThor = row;
                    }
                    if (firstThor === undefined && (row as any).type === "thor") {
                        firstThor = row;
                    }
                    return row;
                });
                setDefaultCluster(firstThor ?? firstHThor ?? firstRow);
            }
        }).catch(err => logger.error(err));
        return () => { active = false; };
    }, []);

    return [targetClusters, defaultCluster];
}

interface useTargetClustersResponse {
    clusters: TargetCluster[];
}

export function useTargetClusters(): useTargetClustersResponse {
    const [clusters, setClusters] = React.useState<TargetCluster[]>();

    React.useEffect(() => {
        const topology = Topology.attach({ baseUrl: "" });
        topology.fetchTargetClusters().then(response => {
            setClusters(response);
        }).catch(err => logger.error(err));
    }, []);

    return { clusters };
}

interface useServicesResponse {
    services: TpServiceQuery.ServiceList;
}

export function useServices(): useServicesResponse {
    const [services, setServices] = React.useState<TpServiceQuery.ServiceList>();

    React.useEffect(() => {
        const topology = Topology.attach({ baseUrl: "" });
        topology.fetchServices().then(serviceList => {
            setServices(serviceList);
        }).catch(err => logger.error(err));
    }, []);

    return { services };
}

export interface Service {
    Name: string;
    ServiceType: string;
    NetAddress: string;
    OS: number;
    Port: number;
    Directory: string;
    LogDirectory: string;
}

export interface Machine {
    Name: string;
    NetAddress: string;
    Services: Service[]
}

interface MachineDictionary {
    [NetAddress: string]: Machine
}

interface useMachinesResponse {
    machines: Machine[];
}

const updateMachines = (machines, service) => {
    // console.log(service);
    service.TpMachines.TpMachine.forEach(machine => {
        if (machines.hasOwnProperty(machine.Netaddress)) {
            if (machines[machine.Netaddress].Services.filter(_service => _service.Name === service.Name).length === 0) {
                machines[machine.Netaddress].Services.push({
                    Name: service.Name,
                    ServiceType: service.Type,
                    NetAddress: machine.Netaddress,
                    OS: machine.OS,
                    Port: machine.Port,
                    Directory: machine.Directory,
                    LogDirectory: service.LogDirectory
                });
            }
        } else {
            machines[machine.Netaddress] = {
                Name: machine.Name,
                NetAddress: machine.Netaddress,
                Services: [{
                    Name: service.Name,
                    ServiceType: service.Type,
                    NetAddress: machine.Netaddress,
                    OS: machine.OS,
                    Port: machine.Port,
                    Directory: machine.Directory,
                    LogDirectory: service.LogDirectory
                }]
            };
        }
    });
    return machines;
};

export function useMachines(): useMachinesResponse {
    const { services } = useServices();
    const { clusters } = useTargetClusters();
    const [machines, setMachines] = React.useState<Machine[]>();

    React.useEffect(() => {
        let _machines: MachineDictionary = {};

        if (!clusters || clusters.length === 0) return;

        services?.TpDalis?.TpDali.map(dali => {
            _machines = updateMachines(_machines, dali);
        });
        services?.TpDfuServers?.TpDfuServer.map(dfuserver => {
            _machines = updateMachines(_machines, dfuserver);
        });
        services?.TpDropZones?.TpDropZone.map(dropzone => {
            _machines = updateMachines(_machines, dropzone);
        });
        services?.TpEclAgents?.TpEclAgent.map(eclAgent => {
            _machines = updateMachines(_machines, eclAgent);
        });
        services?.TpEclCCServers?.TpEclServer.map(eclServer => {
            _machines = updateMachines(_machines, eclServer);
        });
        services?.TpEclSchedulers?.TpEclScheduler.map(eclScheduler => {
            _machines = updateMachines(_machines, eclScheduler);
        });
        services?.TpEspServers?.TpEspServer.map(espServer => {
            _machines = updateMachines(_machines, espServer);
        });
        services?.TpFTSlaves?.TpFTSlave.map(worker => {
            _machines = updateMachines(_machines, worker);
        });
        services?.TpLdapServers?.TpLdapServer.map(ldapServer => {
            _machines = updateMachines(_machines, ldapServer);
        });
        services?.TpSashaServers?.TpSashaServer.map(sashaServer => {
            _machines = updateMachines(_machines, sashaServer);
        });
        services?.TpSparkThors?.TpSparkThor.map(sparkThor => {
            _machines = updateMachines(_machines, sparkThor);
        });
        clusters.forEach(cluster => {
            cluster.TpClusters?.TpCluster.forEach(tpCluster => {
                _machines = updateMachines(_machines, tpCluster);
            });
            cluster.TpEclAgents?.TpEclAgent.forEach(eclAgent => {
                _machines = updateMachines(_machines, eclAgent);
            });
            cluster.TpEclCCServers?.TpEclServer.forEach(eclServer => {
                _machines = updateMachines(_machines, eclServer);
            });
            cluster.TpEclSchedulers?.TpEclScheduler.forEach(eclScheduler => {
                _machines = updateMachines(_machines, eclScheduler);
            });
        });

        setMachines(Object.values(_machines));
    }, [clusters, services]);

    return { machines };
}