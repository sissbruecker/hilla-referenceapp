import {FormLayout} from "@hilla/react-components/FormLayout";
import {ComboBox} from "@hilla/react-components/ComboBox";
import {TextArea} from "@hilla/react-components/TextArea";
import {DatePicker} from "@hilla/react-components/DatePicker";
import {TimePicker} from "@hilla/react-components/TimePicker";
import {useFormPart, UseFormResult} from "@hilla/react-form";
import {useEffect, useState} from "react";
import {useErrorHandler} from "Frontend/util/ErrorHandler";
import {NotBlank, NotNull} from "@hilla/form";
import {LocalTime} from "Frontend/types/LocalTime";
import {Duration} from "Frontend/types/Duration";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";
import {formatDuration} from "Frontend/i18n/DurationFormatter";
import WorkLogEntryFormDTOModel
    from "Frontend/generated/org/vaadin/referenceapp/workhours/adapter/hilla/worklog/WorkLogEntryFormDTOModel";
import ProjectReference
    from "Frontend/generated/org/vaadin/referenceapp/workhours/adapter/hilla/worklog/ProjectReference";
import ContractReference
    from "Frontend/generated/org/vaadin/referenceapp/workhours/adapter/hilla/worklog/ContractReference";
import HourCategoryReference
    from "Frontend/generated/org/vaadin/referenceapp/workhours/adapter/hilla/worklog/HourCategoryReference";
import {WorkLog} from "Frontend/generated/endpoints";

interface TimeEntryFormProps {
    form: UseFormResult<WorkLogEntryFormDTOModel>;
}

export default function WorkLogEntryForm({form}: TimeEntryFormProps) {
    const errorHandler = useErrorHandler();
    const [projects, setProjects] = useState<ProjectReference[]>([]);
    const [contracts, setContracts] = useState<ContractReference[]>([]);
    const [categories, setCategories] = useState<HourCategoryReference[]>([]);
    const [contractHelper, setContractHelper] = useState("");
    const [categoryHelper, setCategoryHelper] = useState("");
    const [endTimeHelper, setEndTimeHelper] = useState("");
    const [durationHelper, setDurationHelper] = useState("");

    const {model, value, field} = form;

    const responsiveSteps = [
        {minWidth: '0', columns: 1},
        {minWidth: '320px', columns: 2},
        {minWidth: '500px', columns: 4},
    ];

    const projectField = useFormPart(model.project);
    const contractField = useFormPart(model.contract);
    const dateField = useFormPart(model.date);
    const startTimeField = useFormPart(model.startTime);
    const endTimeField = useFormPart(model.endTime);
    const hourCategoryField = useFormPart(model.hourCategory);

    useEffect(() => {
        projectField.addValidator(new NotNull({message: "Please select a project."}));
        contractField.addValidator(new NotNull({message: "Please add a contract."}));
        dateField.addValidator(new NotBlank({message: "Please select a date."}));
        startTimeField.addValidator(new NotBlank({message: "Please enter a start time."}));
        endTimeField.addValidator(new NotBlank({message: "Please enter an end time."}));
        hourCategoryField.addValidator(new NotNull({message: "Please select an hour category."}));

        WorkLog.findProjects()
            .then((data) => setProjects(data))
            .catch((error) => errorHandler.handleTechnicalError(error, "An error occurred while retrieving projects."));
    }, []);

    // Populate the contract combo box when selecting a project

    useEffect(() => {
        if (value.project != null) {
            WorkLog.findContractsByProject(value.project.id)
                .then((data) => setContracts(data))
                .catch((error) => errorHandler.handleTechnicalError(error, "An error occurred while retrieving contracts."));
            setContractHelper("");
        } else {
            setContracts([]);
            setContractHelper("You have to select a project before you can select a contract.");
        }
    }, [value.project?.id]);

    // Populate the hour category combo box when selecting a contract

    useEffect(() => {
        if (value.contract != null) {
            WorkLog.findHourCategoriesByContract(value.contract.id)
                .then((data) => setCategories(data))
                .catch((error) => errorHandler.handleTechnicalError(error, "An error occurred while retrieving hour categories."));
            setCategoryHelper("");
        } else {
            setCategories([]);
            setCategoryHelper("You have to select a contract before you can select an hour category.");
        }
    }, [value.contract?.id]);

    // Clear the combo boxes if their values are not among the items (this is something that IMO should be handled by the combo box automatically).

    useEffect(() => {
        if (value.project != null && !projects.find((p) => p.id === value.project?.id)) {
            projectField.setValue(undefined);
        }
    }, [projects]);

    useEffect(() => {
        if (value.contract != null && !contracts.find((c) => c.id === value.contract?.id)) {
            contractField.setValue(undefined);
        }
    }, [contracts]);

    useEffect(() => {
        if (value.hourCategory != null && !categories.find((c) => c.id === value.hourCategory?.id)) {
            hourCategoryField.setValue(undefined);
        }
    }, [categories]);

    // Update helper texts when selecting times
    useEffect(() => {
        if (value.date && value.startTime && value.endTime) {
            if (!LocalTime.parseString(value.startTime).isBefore(LocalTime.parseString(value.endTime))) {
                setEndTimeHelper("The end time is on the next day.");
            } else {
                setEndTimeHelper("");
            }
            // We're asking the server for the duration to be able to account for daylight savings time changes
            WorkLog.calculateDurationInSecondsBetween(value.date, value.startTime, value.endTime)
                .then((durationInSeconds) => {
                    const duration = Duration.ofSeconds(durationInSeconds);
                    setDurationHelper("This entry contains " + formatDuration(duration) + " of work.");
                })
                .catch((error) => errorHandler.handleTechnicalError(error, "An error occurred while calculating the work duration"));
        } else {
            setDurationHelper("");
            setEndTimeHelper("");
        }
    }, [value.date, value.startTime, value.endTime]);

    return (
        <FormLayout responsiveSteps={responsiveSteps}>
            <ComboBox
                {...{colspan: 2}}
                {...field(model.project)}
                label={"Project"}
                items={projects}
                itemLabelPath={"name"}
                itemIdPath={"id"}
                itemValuePath={"id"}/>
            <ComboBox
                {...{colspan: 2}}
                {...field(model.contract)}
                label={"Contract"}
                helperText={contractHelper}
                items={contracts}
                itemLabelPath={"name"}
                itemIdPath={"id"}
                itemValuePath={"id"}
            />
            <DatePicker
                {...{colspan: 2}}
                {...field(model.date)}
                label={"Date"}/>
            <TimePicker
                {...field(model.startTime)}
                label={"Start time"}/>
            <TimePicker
                {...field(model.endTime)}
                label={"End time"}
                helperText={endTimeHelper}/>
            <HorizontalLayout {...{colspan: 4}}>
                <span className={"text-xs text-secondary"}>{durationHelper}</span>
            </HorizontalLayout>
            <TextArea
                {...{colspan: 4}}
                {...field(model.description)}
                label={"Description"}/>
            <ComboBox
                {...{colspan: 4}}
                {...field(model.hourCategory)}
                label={"Category"}
                helperText={categoryHelper}
                items={categories}
                itemLabelPath={"name"}
                itemIdPath={"id"}
                itemValuePath={"id"}/>
        </FormLayout>
    )
}