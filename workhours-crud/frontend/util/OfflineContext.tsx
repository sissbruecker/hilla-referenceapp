import {createContext, PropsWithChildren, useEffect, useState} from "react";
import {ConnectionState, ConnectionStateStore} from "@vaadin/common-frontend";

export enum OfflineState {
    OFFLINE = "offline",
    ONLINE = "online"
}

export const OfflineContext = createContext<OfflineState>(OfflineState.ONLINE);

export function OfflineContextProvider(props: PropsWithChildren) {
    const [state, setState] = useState(OfflineState.ONLINE);

    function isOk(connectionState: ConnectionState) {
        return connectionState === ConnectionState.CONNECTED || connectionState === ConnectionState.LOADING;
    }

    useEffect(() => {
        const connectionStateStore = ((window.Vaadin) as any).connectionState as ConnectionStateStore;
        const connectionStateListener = (previous: ConnectionState, current: ConnectionState) => {
            if (isOk(current)) {
                if (!isOk(previous)) {
                    console.info("Connection to server is back!");
                }
                setState(OfflineState.ONLINE);
            } else {
                console.warn("Connection to server is lost!");
                setState(OfflineState.OFFLINE);
            }
        };
        connectionStateStore.addStateChangeListener(connectionStateListener);

        return () => {
            connectionStateStore.removeStateChangeListener(connectionStateListener);
        };
    }, []);

    return (
        <OfflineContext.Provider value={state}>
            {props.children}
        </OfflineContext.Provider>
    )
}