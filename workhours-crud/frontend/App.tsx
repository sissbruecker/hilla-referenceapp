import router from 'Frontend/routes.js';
import {RouterProvider} from 'react-router-dom';
import {ErrorHandlerProvider} from "Frontend/util/ErrorHandler";

export default function App() {
    return (
        <ErrorHandlerProvider>
            <RouterProvider router={router}/>
        </ErrorHandlerProvider>
    );
}
