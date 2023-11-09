import React, {PropsWithChildren} from "react";
import {useConnectionStatus} from "Frontend/util/ConnectionStatus";

export interface OnlineOnlyProps {
    /**
     * The fallback component to render when the application is offline. If missing, nothing will be rendered.
     */
    fallback?: React.ReactNode;
}

/**
 * This component will only render its children if the application is online. Otherwise, it will either render the fallback
 * component or nothing at all.
 * @param props
 * @constructor
 */
export default function OnlineOnly(props: PropsWithChildren<OnlineOnlyProps>) {
    const {fallback, children} = props;
    const {offline} = useConnectionStatus();

    if (offline) {
        if (fallback) {
            return <>{fallback}</>;
        } else {
            return null;
        }
    } else {
        return <>{children}</>;
    }
}