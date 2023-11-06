import {useContext} from "react";
import {Notification} from "@hilla/react-components/Notification";
import {OfflineContext, OfflineState} from "Frontend/util/OfflineContext";

/**
 * This component will show a notification whenever the application loses its connection to the server (i.e. goes offline).
 * @constructor
 */
export default function OfflineIndicator() {
    const offline = useContext(OfflineContext);
    return (
        <>
            <Notification opened={offline === OfflineState.OFFLINE}
                          position={"bottom-start"}
                          theme={"warning"}
                          duration={0}>
                You are offline. Some features may not work properly.
            </Notification>
        </>
    );
}