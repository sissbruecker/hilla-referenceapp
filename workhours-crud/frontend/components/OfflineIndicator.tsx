import {Notification} from "@hilla/react-components/Notification";
import {useConnectionStatus} from "Frontend/util/ConnectionStatus";

/**
 * This component will show a notification whenever the application loses its connection to the server (i.e. goes offline).
 * @constructor
 */
export default function OfflineIndicator() {
    const {offline} = useConnectionStatus();
    return (
        <>
            <Notification opened={offline}
                          position={"bottom-start"}
                          theme={"warning"}
                          duration={0}>
                You are offline. Some features may not work properly.
            </Notification>
        </>
    );
}