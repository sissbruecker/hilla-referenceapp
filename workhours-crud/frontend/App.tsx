import router from 'Frontend/routes.js';
import {RouterProvider} from 'react-router-dom';
import {ErrorHandlerProvider} from "Frontend/util/ErrorHandler";
import {SsoProvider} from "@hilla/sso-kit-client-react";
import OfflineIndicator from "Frontend/components/OfflineIndicator";
import {OfflineContextProvider} from "Frontend/util/OfflineContext";

export default function App() {
    return (
        <OfflineContextProvider>
            <ErrorHandlerProvider>
                <SsoProvider>
                    <RouterProvider router={router}/>
                </SsoProvider>
                <OfflineIndicator/>
            </ErrorHandlerProvider>
        </OfflineContextProvider>
    );
}
