import {useContext} from "react";
import {Notification} from "@hilla/react-components/Notification";
import {OfflineContext, OfflineState} from "Frontend/util/OfflineContext";

export default function OfflineIndicator() {
    const offline = useContext(OfflineContext);
    return (
        <>
            <Notification opened={offline === OfflineState.OFFLINE}
                          position={"bottom-end"}
                          theme={"warning"}
                          duration={0}>
                You are offline. Some features may not work properly.
            </Notification>
        </>
    );
}