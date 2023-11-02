import WorkLogEntryForm from "Frontend/views/worklog/WorkLogEntryForm";
import {Button} from "@hilla/react-components/Button.js";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";
import {useForm} from "@hilla/react-form";
import {useErrorHandler} from "Frontend/util/ErrorHandler";
import {useEffect, useState} from "react";
import WorkLogEntryFormDTO
    from "Frontend/generated/org/vaadin/referenceapp/workhours/adapter/hilla/worklog/WorkLogEntryFormDTO";
import WorkLogEntryFormDTOModel
    from "Frontend/generated/org/vaadin/referenceapp/workhours/adapter/hilla/worklog/WorkLogEntryFormDTOModel";
import {WorkLog} from "Frontend/generated/endpoints";

interface WorkLogDrawerProps {
    className?: string;
    workLogEntryId?: number;
    onCancel?: () => void;
    onSave?: (form: WorkLogEntryFormDTO) => void;
}

export default function WorkLogEntryDrawer({className, workLogEntryId, onCancel, onSave}: WorkLogDrawerProps) {
    const errorHandler = useErrorHandler();
    const [isNew, setNew] = useState(true);

    const form = useForm(WorkLogEntryFormDTOModel, {
        onSubmit: async (value: WorkLogEntryFormDTO) => {
            try {
                const saved = await WorkLog.saveForm(value);
                if (onSave) {
                    onSave(saved);
                }
            } catch (error) {
                errorHandler.handleTechnicalErrorWithRetry(error, "Error saving work log entry", () => form.submit());
            }
        }
    });

    useEffect(() => {
        if (workLogEntryId == null || workLogEntryId < 0) { // TODO This works, but is a hack. Replace with a hook?
            form.clear();
            setNew(true);
        } else {
            WorkLog.loadForm(workLogEntryId)
                .then((value) => {
                    form.read(value);
                    setNew(false);
                })
                .catch((error) => errorHandler.handleTechnicalError(error, "Error loading work log entry"));
        }
    }, [workLogEntryId]);

    // TODO I18N
    // TODO Prefill today's date and the current time
    // TODO Read-only support
    // TODO Prompt on unsaved changes

    return (
        <VerticalLayout className={className} theme={"padding spacing"}>
            <h1 className={"text-xl text-header"}>{isNew ? "Add Work" : "Edit Work"}</h1>
            <WorkLogEntryForm form={form}></WorkLogEntryForm>
            <HorizontalLayout theme={"spacing"}>
                <Button theme={"primary"} style={{flexGrow: 1}} onClick={form.submit}
                        disabled={form.invalid}>{isNew ? "Add Work" : "Update Work"}</Button>
                <Button style={{flexGrow: 1}} onClick={onCancel}>Cancel</Button>
            </HorizontalLayout>
        </VerticalLayout>
    );
}