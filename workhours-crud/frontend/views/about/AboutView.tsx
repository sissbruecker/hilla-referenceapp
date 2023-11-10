import {useEffect, useState} from "react";
import {ComboBox} from "@hilla/react-components/ComboBox";
import {
    _getPropertyModel as _getPropertyModel_1,
    makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1,
    NumberModel as NumberModel_1,
    ObjectModel as ObjectModel_1
} from "@hilla/form";
import {useForm, useFormPart} from "@hilla/react-form";
import {Button} from "@hilla/react-components/Button.js";

interface Entity {
    projectId?: number;
    contractId?: number;
}

class EntityModel<T extends Entity> extends ObjectModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(EntityModel);

    get projectId(): NumberModel_1 {
        return this[_getPropertyModel_1]("projectId", (parent, key) => new NumberModel_1(parent, key, true, {meta: {javaType: "java.lang.Long"}}));
    }

    get contractId(): NumberModel_1 {
        return this[_getPropertyModel_1]("contractId", (parent, key) => new NumberModel_1(parent, key, true, {meta: {javaType: "java.lang.Long"}}));
    }
}

interface Project {
    id: number;
    name: string;
}

interface Contract {
    id: number;
    name: string;
}

export default function AboutView() {
    const [projects, setProjects] = useState<Project[]>([{id: 1, name: "Project 1"}, {id: 2, name: "Project 2"}]);
    const [contracts, setContracts] = useState<Contract[]>([]);
    const {model, value, field, clear, read} = useForm(EntityModel);
    const contractField = useFormPart(model.contractId);

    useEffect(() => {
        if (value.projectId != null) {
            setContracts([
                {id: value.projectId * 100 + 1, name: `Contract 1 for Project ${value.projectId}`},
                {id: value.projectId * 100 + 2, name: `Contract 2 for Project ${value.projectId}`}
            ]);
        } else {
            setContracts([]);
        }
    }, [value.projectId]);

    useEffect(() => {
        if (value.contractId != null && !contracts.find((c) => c.id === value.contractId)) {
            contractField.setValue(undefined);
        }
    }, [contracts]);

    function loadForm() {
        read({projectId: 2, contractId: 202});
    }

    return (
        <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
            <ComboBox items={projects}
                      label="Project"
                      itemLabelPath="name"
                      itemValuePath="id"
                      {...field(model.projectId)}/>
            <div>
                The contents of the Contracts combo box are updated when the Project is changed.
            </div>
            <ComboBox items={contracts}
                      label="Contract"
                      itemLabelPath="name"
                      itemValuePath="id"
                      {...field(model.contractId)}/>
            <div>Project ID: {value.projectId}</div>
            <div>Contract ID: {value.contractId}</div>
            <Button onClick={clear}>Clear Form</Button>
            <Button onClick={loadForm}>Load form</Button>
            <div>Note, that after clicking the Load form, both the project ID and the contract ID are correctly set.
                However, the contracts combo box is empty.
                The reason for this is that when the value is first set to the combo box, it does not contain any items
                at all. This in turn resets the value of the combo box to null.
                You could of course pre-populate the combo boxes before loading the form, but then you would have to
                support two different ways of populating them - before load and in
                response to user input. A better way would be to somehow be able to ask the form to resync itself with
                the combo box in question, as the form does contain the correct value all the time.
            </div>
        </div>
    );
}
