import NewProject from "./Components/NewProject.jsx";
import NoProjectSelected from "./Components/NoProjectSelected.jsx";
import ProjectSidebar from "./Components/ProjectSidebar.jsx";
import { useState } from "react";
import SelectedProject from "./Components/SelectedProject.jsx";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks:[] ,
  });

  function handleAddTask(text) {
    setProjectState((prevState) => {
      const TaskId = Math.random() ;
      const newTask = {
        text:text ,
        projectId : prevState.selectedProjectId , 
        id: TaskId,
      };
      return {
        ...prevState,
        tasks:[...prevState.tasks , newTask]
      };
    });
  }

  function handleDeleteingTask(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          (task) => task.id !== id
        ),
      };
    });
  }

  function handleSelectProject(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }
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
      const projectId = Math.random()
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  console.log(projectState);

  function handleDeleteProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }
  const selectProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteingTask}
      tasks={projectState.tasks}
    />
  );
  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject
        onAdd={handleAddProject}
        onCancel={handleCancelAddProject}
      ></NewProject>
    );
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
        onSelectProject={handleSelectProject}
        selectedProjectId = {projectState.selectedProjectId}
      ></ProjectSidebar>
      {content}
    </main>
  );
}

export default App;
