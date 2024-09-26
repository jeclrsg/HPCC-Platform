import * as React from "react";
import { IconButton, IContextualMenuItem, INavLink, INavLinkGroup, Link, mergeStyleSets, Nav, Stack } from "@fluentui/react";
import { Tooltip } from "@fluentui/react-components";
import { Connected20Filled, Connected20Regular, DocumentDatabase20Filled, DocumentDatabase20Regular, Globe20Filled, Globe20Regular, Home20Filled, Home20Regular, ShieldBadge20Filled, ShieldBadge20Regular, TextColumnOneWideLightning20Filled, TextColumnOneWideLightning20Regular, bundleIcon } from "@fluentui/react-icons";
import { Hamburger, NavCategory, NavCategoryItem, NavDrawer, NavDrawerBody, NavDrawerHeader, NavItem, NavSubItemGroup, NavSubItem } from "@fluentui/react-nav-preview";
import { useConst } from "@fluentui/react-hooks";
import nlsHPCC from "src/nlsHPCC";
import { hasLogAccess } from "src/ESPLog";
import { containerized, bare_metal } from "src/BuildInfo";
import { navCategory } from "../util/history";
import { MainNav, routes } from "../routes";
import { useFavorite, useFavorites, useHistory } from "../hooks/favorite";
import { useSessionStore } from "../hooks/store";
import { useUserTheme } from "../hooks/theme";
import { useMyAccount } from "../hooks/user";
import { Breadcrumbs } from "./Breadcrumbs";

const ActivitiesIcon = bundleIcon(Home20Filled, Home20Regular);
const WorkunitsIcon = bundleIcon(TextColumnOneWideLightning20Filled, TextColumnOneWideLightning20Regular);
const FilesIcon = bundleIcon(DocumentDatabase20Filled, DocumentDatabase20Regular);
const QueriesIcon = bundleIcon(Globe20Filled, Globe20Regular);
const TopologyIcon = bundleIcon(Connected20Filled, Connected20Regular);
const OperationsIcon = bundleIcon(ShieldBadge20Filled, ShieldBadge20Regular);

export interface NextPrevious {
    next: () => void;
    previous: () => void;
}
export type NextPreviousT = NextPrevious | undefined;

export function useNextPrev(val?: NextPrevious): [NextPreviousT, (val: NextPrevious) => void] {
    const [nextPrev, setNextPrev] = useSessionStore<NextPreviousT>("NEXT_PREV_KEY", val, true);
    return [nextPrev, setNextPrev];
}

//  Top Level Nav  ---
function navLinkGroups(): INavLinkGroup[] {
    let links: INavLink[] = [
        {
            name: nlsHPCC.Activities,
            url: "#/activities",
            icon: "Home",
            key: "activities"
        },
        {
            name: nlsHPCC.ECL,
            url: "#/workunits",
            icon: "SetAction",
            key: "workunits"
        },
        {
            name: nlsHPCC.Files,
            url: "#/files",
            icon: "PageData",
            key: "files"
        },
        {
            name: nlsHPCC.PublishedQueries,
            url: "#/queries",
            icon: "Globe",
            key: "queries"
        },
        {
            name: nlsHPCC.Topology,
            url: "#/topology",
            icon: "Org",
            key: "topology"
        },
        {
            name: nlsHPCC.Operations,
            url: "#/operations",
            icon: "Admin",
            key: "operations"
        }
    ];
    if (!containerized) {
        links = links.filter(l => l.key !== "topology");
    }
    if (!bare_metal) {
        links = links.filter(l => l.key !== "operations");
    }
    return [{ links }];
}

const _navIdx: { [id: string]: MainNav[] } = {};

function navIdx(id) {
    id = id.split("!")[0];
    if (!_navIdx[id]) {
        _navIdx[id] = [];
    }
    return _navIdx[id];
}

function append(route, path) {
    route.mainNav?.forEach(item => {
        navIdx(path).push(item);
    });
}

routes.forEach((route: any) => {
    if (Array.isArray(route.path)) {
        route.path.forEach(path => {
            append(route, path);
        });
    } else {
        append(route, route.path);
    }
});

function navSelectedKey(hashPath) {
    const rootPath = navIdx(`/${navCategory(hashPath)?.split("/")[1]}`);
    if (rootPath?.length) {
        return rootPath[0];
    }
    return null;
}

const FIXED_WIDTH = 38;

interface MainNavigationProps {
    hashPath: string;
}

export const MainNavigation: React.FunctionComponent<MainNavigationProps> = ({
    hashPath
}) => {

    const menu = useConst(() => [...navLinkGroups()]);
    const { theme, setTheme, isDark } = useUserTheme();

    const selKey = React.useMemo(() => {
        return navSelectedKey(hashPath);
    }, [hashPath]);

    return <Stack verticalAlign="space-between" styles={{ root: { width: `${FIXED_WIDTH}px`, height: "100%", position: "relative", backgroundColor: theme.palette.themeLighterAlt } }}>
        <Stack.Item>
            <Nav selectedKey={selKey} groups={menu} />
        </Stack.Item>
        <Stack.Item>
            <IconButton
                iconProps={{ iconName: isDark ? "Sunny" : "ClearNight" }}
                onClick={() => {
                    setTheme(isDark ? "light" : "dark");
                    const themeChangeEvent = new CustomEvent("eclwatch-theme-toggle", {
                        detail: { dark: !isDark }
                    });
                    document.dispatchEvent(themeChangeEvent);
                }}
            />
            {/* Disable Theme editor button for launch of 9.0 */}
            {/* <IconButton iconProps={{ iconName: "Equalizer" }} onClick={() => { }} /> */}
        </Stack.Item>
    </Stack>;
};

const navDrawerItems = [
    { value: "1", hash: "/activities" },
    { value: "3", hash: "/workunits" },
    { value: "4", hash: "/play" },
    { value: "6", hash: "/files" },
    { value: "7", hash: "/landingzone" },
    { value: "8", hash: "/dfuworkunits" },
    { value: "9", hash: "/xref" },
    { value: "11", hash: "/queries" },
    { value: "12", hash: "/packagemaps" },
    { value: "14", hash: "/topology/configuration" },
    { value: "15", hash: "/topology/pods" },
    { value: "16", hash: "/topology/services" },
    { value: "17", hash: "/topology/logs" },
    { value: "18", hash: "/topology/security" },
    { value: "19", hash: "/topology/desdl" },
    { value: "20", hash: "/topology/daliadmin" },
    // { value: "21", hash: "/topology/sasha" },
    { value: "23", hash: "/operations/topology" },
    { value: "24", hash: "/operations/diskusage" },
    { value: "25", hash: "/operations/clusters" },
    { value: "26", hash: "/operations/processes" },
    { value: "27", hash: "/operations/servers" },
    { value: "28", hash: "/operations/security" },
    { value: "29", hash: "/operations/desdl" },
];

export const NavigationDrawer: React.FunctionComponent<MainNavigationProps> = ({
    hashPath
}) => {

    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState("");

    React.useEffect(() => {
        setSelectedItem(navDrawerItems?.find(i => hashPath.indexOf(i.hash) > -1)?.value ?? "");
    }, [hashPath]);

    // bit of a hack, but this <NavDrawer> component doesn't provide for closing it
    // when clicking outside, which seems like something people are going to do
    React.useEffect(() => {
        const handleOverlayClick = () => setIsOpen(false);
        const addListener = () => {
            const drawerOverlay = document.querySelector(".fui-OverlayDrawer__backdrop");
            drawerOverlay?.addEventListener("click", handleOverlayClick);
        };

        const mutationObserver = new MutationObserver(() => { addListener(); });
        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            const drawerOverlay = document.querySelector(".fui-OverlayDrawer__backdrop");
            drawerOverlay.removeEventListener("click", handleOverlayClick);
            mutationObserver.disconnect();
        }
    }, []);

    const renderHamburgerWithToolTip = () => {
        return (
            <Tooltip content="Navigation" relationship="label">
                <Hamburger onClick={() => setIsOpen(!isOpen)} />
            </Tooltip>
        );
    };

    return <div>
        {!isOpen && renderHamburgerWithToolTip()}
        <NavDrawer open={isOpen} multiple={true} selectedValue={selectedItem} onNavItemSelect={() => setIsOpen(false)}>
            <NavDrawerHeader>
                <Hamburger onClick={() => setIsOpen(!isOpen)} />
            </NavDrawerHeader>
            <NavDrawerBody>
                <NavItem href={"#/activities"} icon={<ActivitiesIcon />} value="1">{nlsHPCC.Activities}</NavItem>
                <NavCategory value="2">
                    <NavCategoryItem icon={<WorkunitsIcon />}>{nlsHPCC.ECL}</NavCategoryItem>
                    <NavSubItemGroup>
                        <NavSubItem href={"#/workunits"} value="3">{nlsHPCC.Workunits}</NavSubItem>
                        <NavSubItem href={"#/play"} value="4">{nlsHPCC.Playground}</NavSubItem>
                    </NavSubItemGroup>
                </NavCategory>
                <NavCategory value="5">
                    <NavCategoryItem icon={<FilesIcon />}>{nlsHPCC.Files}</NavCategoryItem>
                    <NavSubItemGroup>
                        <NavSubItem href={"#/files"} value="6">{nlsHPCC.LogicalFiles}</NavSubItem>
                        <NavSubItem href={"#/landingzone"} value="7">{nlsHPCC.LandingZones}</NavSubItem>
                        <NavSubItem href={"#/dfuworkunits"} value="8">{nlsHPCC.title_GetDFUWorkunits}</NavSubItem>
                        <NavSubItem href={"#/xref"} value="9">{`${nlsHPCC.XRef} (L)`}</NavSubItem>
                    </NavSubItemGroup>
                </NavCategory>
                <NavCategory value="10">
                    <NavCategoryItem icon={<QueriesIcon />}>{nlsHPCC.PublishedQueries}</NavCategoryItem>
                    <NavSubItemGroup>
                        <NavSubItem href={"#/queries"} value="11">{nlsHPCC.Queries}</NavSubItem>
                        <NavSubItem href={"#/packagemaps"} value="12">{nlsHPCC.PackageMaps}</NavSubItem>
                    </NavSubItemGroup>
                </NavCategory>
                {containerized &&
                    <NavCategory value="13">
                        <NavCategoryItem icon={<TopologyIcon />}>{nlsHPCC.Topology}</NavCategoryItem>
                        <NavSubItemGroup>
                            <NavSubItem href={"#/topology/configuration"} value="14">{nlsHPCC.Configuration}</NavSubItem>
                            <NavSubItem href={"#/topology/pods"} value="15">{nlsHPCC.Pods}</NavSubItem>
                            <NavSubItem href={"#/topology/services"} value="16">{nlsHPCC.Services}</NavSubItem>
                            <NavSubItem href={"#/topology/logs"} value="17">{nlsHPCC.Logs}</NavSubItem>
                            <NavSubItem href={"#/topology/security"} value="18">{`${nlsHPCC.Security} (L)`}</NavSubItem>
                            <NavSubItem href={"#/topology/desdl"} value="19">{`${nlsHPCC.DESDL} (L)`}</NavSubItem>
                            <NavSubItem href={"#/topology/daliadmin"} value="20">{nlsHPCC.DaliAdmin}</NavSubItem>
                            {/* <NavSubItem href={"#/topology/sasha"} value="21">{nlsHPCC.Sasha}</NavSubItem> */}
                        </NavSubItemGroup>
                    </NavCategory>
                }
                {bare_metal &&
                    <NavCategory value="22">
                        <NavCategoryItem icon={<OperationsIcon />}>{nlsHPCC.Operations}</NavCategoryItem>
                        <NavSubItemGroup>
                            <NavSubItem href={"#/operations/topology"} value="23">{`${nlsHPCC.Topology} (L)`}</NavSubItem>
                            <NavSubItem href={"#/operations/diskusage"} value="24">{`${nlsHPCC.DiskUsage} (L)`}</NavSubItem>
                            <NavSubItem href={"#/operations/clusters"} value="25">{`${nlsHPCC.title_Clusters} (L)`}</NavSubItem>
                            <NavSubItem href={"#/operations/processes"} value="26">{`${nlsHPCC.Processes} (L)`}</NavSubItem>
                            <NavSubItem href={"#/operations/servers"} value="27">{`${nlsHPCC.title_SystemServers} (L)`}</NavSubItem>
                            <NavSubItem href={"#/operations/security"} value="28">{`${nlsHPCC.Security} (L)`}</NavSubItem>
                            <NavSubItem href={"#/operations/desdl"} value="29">{`${nlsHPCC.DESDL} (L)`}</NavSubItem>
                        </NavSubItemGroup>
                    </NavCategory>
                }
            </NavDrawerBody>
        </NavDrawer>
    </div>;
};

//  Second Level Nav  ---
interface SubMenu {
    headerText: string;
    itemKey: string;
}

type SubMenuItems = { [nav: string]: SubMenu[] };

const subMenuItems: SubMenuItems = {
    "activities": [
        { headerText: nlsHPCC.Activities, itemKey: "/activities" },
        { headerText: nlsHPCC.EventScheduler, itemKey: "/events" }
    ],
    "workunits": [
        { headerText: nlsHPCC.Workunits, itemKey: "/workunits" },
        // TODO: Post Tech Preview { headerText: nlsHPCC.Dashboard, itemKey: "/workunits/dashboard" },
        { headerText: nlsHPCC.Playground, itemKey: "/play" },
    ],
    "files": [
        { headerText: nlsHPCC.LogicalFiles, itemKey: "/files" },
        { headerText: nlsHPCC.LandingZones, itemKey: "/landingzone" },
        { headerText: nlsHPCC.title_GetDFUWorkunits, itemKey: "/dfuworkunits" },
        { headerText: nlsHPCC.XRef + " (L)", itemKey: "/xref" },
    ],
    "queries": [
        { headerText: nlsHPCC.Queries, itemKey: "/queries" },
        { headerText: nlsHPCC.PackageMaps, itemKey: "/packagemaps" }
    ],
    "topology": [
        { headerText: nlsHPCC.Configuration, itemKey: "/topology/configuration" },
        { headerText: nlsHPCC.Pods, itemKey: "/topology/pods" },
        { headerText: nlsHPCC.Services, itemKey: "/topology/services" },
        { headerText: nlsHPCC.Logs, itemKey: "/topology/logs" },
        { headerText: nlsHPCC.Security + " (L)", itemKey: "/topology/security" },
        { headerText: nlsHPCC.DESDL + " (L)", itemKey: "/topology/desdl" },
        { headerText: nlsHPCC.DaliAdmin, itemKey: "/topology/daliadmin" },
    ],
    "operations": [
        { headerText: nlsHPCC.Topology + " (L)", itemKey: "/operations" },
        { headerText: nlsHPCC.DiskUsage + " (L)", itemKey: "/operations/diskusage" },
        { headerText: nlsHPCC.TargetClusters + " (L)", itemKey: "/operations/clusters" },
        { headerText: nlsHPCC.ClusterProcesses + " (L)", itemKey: "/operations/processes" },
        { headerText: nlsHPCC.SystemServers + " (L)", itemKey: "/operations/servers" },
        { headerText: nlsHPCC.Security + " (L)", itemKey: "/operations/security" },
        { headerText: nlsHPCC.DESDL + " (L)", itemKey: "/operations/desdl" },
    ],
};

const _subNavIdx: { [id: string]: string[] } = {};

function subNavIdx(id) {
    const indexOfExclamation = id.indexOf("!");
    const indexOfSlash = id.indexOf("/", indexOfExclamation);
    if (indexOfExclamation !== -1 && indexOfSlash !== -1) {
        id = id.substring(0, indexOfExclamation) + id.substring(indexOfSlash);
    }

    if (!_subNavIdx[id]) {
        _subNavIdx[id] = [];
    }
    return _subNavIdx[id];
}

for (const key in subMenuItems) {
    const subNav = subMenuItems[key];
    subNav.forEach(item => {
        subNavIdx(item.itemKey).push(key);
    });
}

function subNavSelectedKey(hashPath) {
    const category = navCategory(hashPath);
    return subNavIdx(category).length ? category : null;
}

interface SubNavigationProps {
    hashPath: string;
}

export const SubNavigation: React.FunctionComponent<SubNavigationProps> = ({
    hashPath
}) => {

    const { theme, themeV9 } = useUserTheme();
    const { isAdmin } = useMyAccount();

    const [favorites] = useFavorites();
    const [favoriteCount, setFavoriteCount] = React.useState(0);
    const [isFavorite, addFavorite, removeFavorite] = useFavorite(window.location.hash);
    const [history] = useHistory();

    const [nextPrev] = useNextPrev();

    React.useEffect(() => {
        setFavoriteCount(Object.keys(favorites).length);
    }, [favorites]);

    const mainNav = React.useMemo(() => {
        return navSelectedKey(hashPath);
    }, [hashPath]);

    const subNav = React.useMemo(() => {
        return subNavSelectedKey(hashPath);
    }, [hashPath]);

    const navStyles = React.useMemo(() => mergeStyleSets({
        wrapper: {
            marginLeft: 4,
        },
        link: {
            background: theme.semanticColors.buttonBackground,
            color: theme.semanticColors.buttonText,
            display: "inline-block",
            margin: 2,
            padding: "0 10px",
            fontSize: 14,
            textDecoration: "none",
            selectors: {
                ":hover": {
                    background: theme.palette.themePrimary,
                    color: theme.palette.white,
                    textDecoration: "none",
                },
                ":focus": {
                    color: theme.semanticColors.buttonText
                },
                ":active": {
                    color: theme.semanticColors.buttonText,
                    textDecoration: "none"
                },
                ":focus:hover": {
                    color: theme.palette.white,
                },
                ":active:hover": {
                    color: theme.palette.white,
                    textDecoration: "none"
                }
            }
        },
        active: {
            background: theme.palette.themePrimary,
            color: theme.palette.white,
            selectors: {
                ":focus": {
                    color: theme.palette.white
                }
            }
        }
    }), [theme]);

    const [logsDisabled, setLogsDisabled] = React.useState(true);
    React.useEffect(() => {
        hasLogAccess().then(response => {
            setLogsDisabled(!response);
        }).catch(() => {
            setLogsDisabled(true);
        });
    }, []);
    const linkStyle = React.useCallback((disabled) => {
        return disabled ? {
            background: themeV9.colorNeutralBackgroundDisabled,
            color: themeV9.colorNeutralForegroundDisabled
        } : {};
    }, [themeV9]);

    const favoriteMenu: IContextualMenuItem[] = React.useMemo(() => {
        const retVal: IContextualMenuItem[] = [];
        for (const key in favorites) {
            retVal.push({
                name: decodeURI(key),
                href: key,
                key,
            });
        }
        return retVal;
    }, [favorites]);

    return <div style={{ backgroundColor: theme.palette.themeLighter }}>
        <Stack horizontal horizontalAlign="space-between">
            <Stack.Item align="center" grow={1}>
                <Stack horizontal>
                    <Stack.Item grow={0} className={navStyles.wrapper}>
                        {subMenuItems[mainNav]?.map((row, idx) => {
                            const linkDisabled = (row.itemKey === "/topology/logs" && logsDisabled) || (row.itemKey.indexOf("security") > -1 && !isAdmin);
                            return <Link
                                disabled={linkDisabled}
                                key={`MenuLink_${idx}`}
                                href={`#${row.itemKey}`}
                                className={[
                                    navStyles.link,
                                    row.itemKey === subNav ? navStyles.active : "",
                                    !subNav && row.itemKey === "/topology/configuration" ? navStyles.active : ""
                                ].join(" ")}
                                style={linkStyle(linkDisabled)}
                            >
                                {row.headerText}
                            </Link>;
                        })}
                    </Stack.Item>
                    {!subNav &&
                        <Stack.Item grow={1} style={{ lineHeight: "24px" }}>
                            {hashPath.includes("/files/")
                                ? <Breadcrumbs hashPath={hashPath} ignoreN={2} />
                                : <Breadcrumbs hashPath={hashPath} ignoreN={1} />
                            }
                        </Stack.Item>
                    }
                </Stack>
            </Stack.Item>
            <Stack.Item align="center" grow={0}>
                {nextPrev?.next && <IconButton title={nlsHPCC.NextWorkunit} iconProps={{ iconName: "Movers" }} onClick={() => nextPrev.next()} />}
                {nextPrev?.previous && <IconButton title={nlsHPCC.PreviousWorkunit} iconProps={{ iconName: "Sell" }} onClick={() => nextPrev.previous()} />}
                <IconButton title={nlsHPCC.History} iconProps={{ iconName: "History" }} menuProps={{ items: history }} />
                <IconButton
                    title={isFavorite ? nlsHPCC.RemoveFromFavorites : nlsHPCC.AddToFavorites}
                    iconProps={{ iconName: isFavorite ? "FavoriteStarFill" : "FavoriteStar" }}
                    menuProps={favoriteCount ? { items: favoriteMenu } : null}
                    split={favoriteCount > 0}
                    splitButtonAriaLabel={nlsHPCC.Favorites}
                    onClick={() => {
                        if (isFavorite) {
                            removeFavorite();
                        } else {
                            addFavorite();
                        }
                    }}
                    styles={{ splitButtonMenuButton: { backgroundColor: theme.palette.themeLighter, border: "none" } }}
                />
            </Stack.Item>
        </Stack>
    </div>;
};