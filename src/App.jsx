import NewProject from "./Components/NewProject.jsx";
import NoProjectSelected from "./Components/NoProjectSelected.jsx";
import ProjectSidebar from "./Components/ProjectSidebar.jsx";
import { useState } from "react";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleStateAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }
  
  function handleCancelAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
    
  }

  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  console.log(projectState);

  let content;
  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} ></NewProject>;
  } else if (projectState.selectedProjectId === undefined) {
    content = (
      <NoProjectSelected
        onStartAddProject={handleStateAddProject}
      ></NoProjectSelected>
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        projects={projectState.projects} 
        onStartAddProject={handleStateAddProject}
      ></ProjectSidebar>
      {content}
    </main>
  );
}

export default App;
