import {AppLayout} from '@hilla/react-components/AppLayout.js';
import {DrawerToggle} from '@hilla/react-components/DrawerToggle.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import {useRouteMetadata} from 'Frontend/util/routing.js';
import {Suspense} from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import {Avatar} from "@hilla/react-components/Avatar";
import {useSsoContext} from "@hilla/sso-kit-client-react";
import {createRoot} from "react-dom/client";
import {MenuBar, MenuBarItem} from "@hilla/react-components/MenuBar";

const navLinkClasses = ({isActive}: any) => {
    return `block rounded-m p-s ${isActive ? 'bg-primary-10 text-primary' : 'text-body'}`;
};

export default function MainLayout() {
    const currentTitle = useRouteMetadata()?.title ?? 'My App';
    const ssoContext = useSsoContext();

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
                    text: 'Profile'
                },
                {
                    text: 'Sign out'
                }
            ]
        }
    ];

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

            <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
            <h2 slot="navbar" className="text-l m-0">
                {currentTitle}
            </h2>
            <MenuBar slot={"navbar"} items={menuBarItems} theme={"tertiary-inline"}/>

            <Suspense fallback={<Placeholder/>}>
                <Outlet/>
            </Suspense>
        </AppLayout>
    );
}
