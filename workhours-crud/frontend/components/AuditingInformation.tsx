import {Details} from "@hilla/react-components/Details";
import UserInformation from "Frontend/components/UserInformation";
import RelativeTime from "Frontend/components/RelativeTime";

export interface AuditingInformationProps {
    createdBy?: string;
    createdDate?: string | Date;
    lastModifiedBy?: string;
    lastModifiedDate?: string | Date;
}

function created(createdBy?: string, createdDate?: string | Date) {
    if (!createdBy && !createdDate) {
        return null;
    }
    return (
        <div className={"text-s"}>
            Created
            {createdBy ? <> by <UserInformation userId={createdBy}/></> : null}
            {createdDate ? <> <RelativeTime date={createdDate}/></> : null}.
        </div>
    );
}

function lastModified(lastModifiedBy?: string, lastModifiedDate?: string | Date) {
    if (!lastModifiedBy && !lastModifiedDate) {
        return null;
    }
    return (
        <div className={"text-s"}>
            Last modified
            {lastModifiedBy ? <> by <UserInformation userId={lastModifiedBy}/></> : null}
            {lastModifiedDate ? <> <RelativeTime date={lastModifiedDate}/></> : null}.
        </div>
    )
}

export default function AuditingInformation(props: AuditingInformationProps) {
    if (!props.createdBy && !props.createdDate && !props.lastModifiedBy && !props.lastModifiedDate) {
        return null;
    }
    return (
        <Details summary={"Auditing information"}>
            {created(props.createdBy, props.createdDate)}
            {lastModified(props.lastModifiedBy, props.lastModifiedDate)}
        </Details>
    );
}