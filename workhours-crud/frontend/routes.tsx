import MainLayout from 'Frontend/views/MainLayout.js';
import WorkLogEntryDrawer from "Frontend/views/worklog/WorkLogEntryDrawer";
import {lazy} from 'react';
import {createBrowserRouter, RouteObject} from 'react-router-dom';
import WorkLogView from "Frontend/views/worklog/WorkLogView";

const AboutView = lazy(async () => import('Frontend/views/about/AboutView.js'));

export const routes = [
    {
        element: <MainLayout/>,
        handle: {title: 'Main'},
        children: [
            {path: '/about', element: <AboutView/>, handle: {title: 'About'}},
            {path: '/entry', element: <WorkLogEntryDrawer/>, handle: {title: 'Time Entry'}},
            {path: '/workhours', element: <WorkLogView/>, handle: {title: "Workhours"}}
        ],
    },
] as RouteObject[];

export default createBrowserRouter(routes);
