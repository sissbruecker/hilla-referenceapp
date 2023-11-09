import {useEffect, useState} from "react";
import {ConnectionState, ConnectionStateStore} from "@vaadin/common-frontend";

export interface ConnectionStatus {
    offline: boolean;
    online: boolean;
}

export function useConnectionStatus(): ConnectionStatus {
    const [offline, setOffline] = useState(false);
    const [online, setOnline] = useState(true);

    useEffect(() => {
        const connectionStateStore = ((window.Vaadin) as any).connectionState as ConnectionStateStore;
        const connectionStateListener = (previous: ConnectionState, current: ConnectionState) => {
            setOnline(connectionStateStore.online);
            setOffline(connectionStateStore.offline);
        };
        connectionStateStore.addStateChangeListener(connectionStateListener);

        setOnline(connectionStateStore.online);
        setOffline(connectionStateStore.offline);

        return () => {
            connectionStateStore.removeStateChangeListener(connectionStateListener);
        };
    }, []);

    return {
        offline: offline,
        online: online
    };
}