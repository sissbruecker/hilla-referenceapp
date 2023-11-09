import {useState} from "react";
import {ComboBox} from "@hilla/react-components/ComboBox";
import {TextField} from "@hilla/react-components/TextField";
import {Button} from "@hilla/react-components/Button.js";

interface Project {
    id: string;
    name: string;
}

export default function AboutView() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectId, setProjectId] = useState<string>();
    const [selectedProject, setSelectedProject] = useState<Project>();

    function populateProjects() {
        setProjects([{id: "1", name: "Project 1"}, {id: "2", name: "Project 2"}, {id: "3", name: "Project 3"}]);
    }

    function clearProjects() {
        setProjects([]);
    }

    return (
        <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
            <ComboBox items={projects}
                      value={projectId}
                      label="Project"
                      itemLabelPath="name"
                      itemValuePath="id"
                      onValueChanged={(e) => {
                          console.log(`combo box value changed to ${e.detail.value}`);
                          setProjectId(e.detail.value);
                      }}
                      onSelectedItemChanged={(e) => {
                          console.log(`combo box selected item changed to ${e.detail.value}`);
                          setSelectedProject(e.detail.value as Project);
                      }}/>
            <TextField label="Project ID" value={projectId} readonly/>
            <TextField label="Selected Project" value={selectedProject?.name} readonly/>
            <Button onClick={populateProjects}>Populate Projects</Button>
            <Button onClick={clearProjects}>Clear Projects</Button>
            <TextField label="Set Project ID" onValueChanged={(e) => setProjectId(e.detail.value)}/>
        </div>
    );
}
