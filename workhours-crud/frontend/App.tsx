import router from 'Frontend/routes.js';
import {RouterProvider} from 'react-router-dom';
import {ErrorHandlerProvider} from "Frontend/util/ErrorHandler";
import {SsoProvider} from "@hilla/sso-kit-client-react";
import OfflineIndicator from "Frontend/components/OfflineIndicator";

export default function App() {
    return (
        <ErrorHandlerProvider>
            <SsoProvider>
                <RouterProvider router={router}/>
            </SsoProvider>
            <OfflineIndicator/>
        </ErrorHandlerProvider>
    );
}
