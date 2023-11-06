import {AppLayout} from '@hilla/react-components/AppLayout.js';
import {DrawerToggle} from '@hilla/react-components/DrawerToggle.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import {useRouteMetadata} from 'Frontend/util/routing.js';
import {Suspense, useEffect, useState} from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import {Avatar} from "@hilla/react-components/Avatar";
import {useSsoContext} from "@hilla/sso-kit-client-react";
import {createRoot} from "react-dom/client";
import {MenuBar, MenuBarItem, MenuBarItemSelectedEvent} from "@hilla/react-components/MenuBar";
import {ConfirmDialog} from "@hilla/react-components/ConfirmDialog";

const navLinkClasses = ({isActive}: any) => {
    return `block rounded-m p-s ${isActive ? 'bg-primary-10 text-primary' : 'text-body'}`;
};

interface ClickableMenuBarItem extends MenuBarItem {
    onClick: () => void;
}

export default function MainLayout() {
    const currentTitle = useRouteMetadata()?.title ?? 'My App';
    const ssoContext = useSsoContext();

    const [loggedOut, setLoggedOut] = useState(false);

    useEffect(() => {
        ssoContext.onBackChannelLogout(() => {
            setLoggedOut(true);
        });
    }, []);

    // Workaround https://github.com/vaadin/react-components/issues/132 TODO This should be fixed
    function menuComponent(component: React.ReactNode) {
        const container = document.createElement('div');
        createRoot(container).render(component);
        return container;
    }

    const menuBarItems: MenuBarItem[] = [
        {
            component: menuComponent(
                <Avatar name={ssoContext.user?.fullName} img={ssoContext.user?.picture}></Avatar>
            ),
            children: [
                {
                    component: menuComponent(
                        <div className={"flex flex-col gap-m m-l items-center"}>
                            <div className={"text-s"}>Logged in
                                as: <strong>{ssoContext.user?.preferredUsername}</strong></div>
                            <Avatar name={ssoContext.user?.fullName} img={ssoContext.user?.picture}
                                    theme={"xlarge"}></Avatar>
                            <div className={"text-xl"}>Hi, {ssoContext.user?.givenName}!</div>
                        </div>
                    )
                },
                {
                    component: 'hr'
                },
                {
                    text: 'Logout',
                    onClick: () => ssoContext.logout()
                } as ClickableMenuBarItem
            ]
        }
    ];

    function handleMenuItemSelected(event: MenuBarItemSelectedEvent) {
        const item = event.detail.value;
        if ("onClick" in item) {
            (item as ClickableMenuBarItem).onClick();
        } else {
            console.warn("Don't know how to handle click on menu item", item);
        }
    }

    return (
        <AppLayout primarySection="drawer">
            <div slot="drawer" className="flex flex-col justify-between h-full p-m">
                <header className="flex flex-col gap-m">
                    <h1 className="text-l m-0">My App</h1>
                    <nav>
                        <NavLink className={navLinkClasses} to="/">
                            Hello World
                        </NavLink>
                        <NavLink className={navLinkClasses} to="/about">
                            About
                        </NavLink>
                    </nav>
                </header>
            </div>

            <div slot="navbar" className="flex flex-row items-center">
                <DrawerToggle aria-label="Menu toggle"></DrawerToggle>
                <h2 className="text-l m-0">
                    {currentTitle}
                </h2>
            </div>

            <MenuBar slot={"navbar"}
                     items={menuBarItems}
                     theme={"tertiary-inline"}
                     className={"mr-m"}
                     onItemSelected={handleMenuItemSelected}/>

            <ConfirmDialog header={"Logged out"} cancelButtonVisible={true} opened={loggedOut}
                           onConfirm={ssoContext.login} onCancel={ssoContext.logout}>
                <p>You have been logged out. Do you want to login again?</p>
            </ConfirmDialog>

            <Suspense fallback={<Placeholder/>}>
                <Outlet/>
            </Suspense>
        </AppLayout>
    );
}
