import * as cookie from "dojo/cookie";
import * as xhr from "dojo/request/xhr";
import * as topic from "dojo/topic";
import { format as d3Format } from "@hpcc-js/common";
import { SMCService } from "@hpcc-js/comms";
import { scopedLogger } from "@hpcc-js/util";
import { cookieKeyValStore } from "src/KeyValStore";
import { singletonDebounce } from "../src-react/util/throttle";
import * as ESPUtil from "./ESPUtil";

const logger = scopedLogger("src/Session.ts");

const espTimeoutSeconds = cookie("ESPSessionTimeoutSeconds") || 600; // 10 minuntes?
const IDLE_TIMEOUT = espTimeoutSeconds * 1000;
const SESSION_RESET_FREQ = 30 * 1000;
const idleWatcher = new ESPUtil.IdleWatcher(IDLE_TIMEOUT);
const sessionIsActive = espTimeoutSeconds;

let _prevReset = Date.now();

declare const dojoConfig;

const userStore = cookieKeyValStore();

const smc = new SMCService({ baseUrl: "" });

export type BuildInfo = { [key: string]: string };

export async function getBuildInfo(): Promise<BuildInfo> {
    const getBuildInfo = singletonDebounce(smc, "GetBuildInfo", 60);
    return getBuildInfo({}).then(response => {
        const buildInfo = {};
        response?.BuildInfo?.NamedValue?.forEach(row => {
            buildInfo[row.Name] = row.Value;
        });
        return buildInfo;
    }).catch(e => {
        logger.error(e);
        return {};
    });
}

dojoConfig.isContainer = false;
dojoConfig.currencyCode = "";
getBuildInfo().then(info => {
    dojoConfig.isContainer = info["CONTAINERIZED"] === "ON";
    dojoConfig.currencyCode = info["currencyCode"] ?? "";
});

const format = d3Format(",.2f");
export function formatCost(value): string {
    if (isNaN(value)) {
        logger.debug(`formatCost called for a nullish value: ${value}`);
        return "";
    }
    const _number = typeof value === "string" ? Number(value) : value;
    return `${format(_number)} (${dojoConfig?.currencyCode || "USD"})`;
}

export function initSession() {
    if (sessionIsActive > -1) {

        idleWatcher.on("active", function () {
            resetESPTime();
        });
        idleWatcher.on("idle", function (idleCreator) {
            idleWatcher.stop();
            topic.publish("hpcc/session_management_status", {
                status: "Idle",
                idleCreator
            });
        });

        idleWatcher.start();
        if (cookie("ESPSessionState")) {
            cookie("Status", "Unlocked");
        }
    } else if (cookie("ECLWatchUser")) {
        window.location.replace(dojoConfig.urlInfo.basePath + "/Login.html");
    }
}

export function lock() {
    cookie("Status", "Locked");
    idleWatcher.stop();
}

export function unlock() {
    cookie("Status", "Unlocked");
    idleWatcher.start();
}

export function fireIdle() {
    idleWatcher.fireIdle();
}

async function resetESPTime() {
    const userSession = userStore.getAll();
    if (!userSession || !userSession["ECLWatchUser"] || !userSession["Status"] || userSession["Status"] === "Locked") return;
    if (Date.now() - _prevReset > SESSION_RESET_FREQ) {
        _prevReset = Date.now();
        xhr("esp/reset_session_timeout", {
            method: "post"
        }).then(function (data) {
        });
    }
}
