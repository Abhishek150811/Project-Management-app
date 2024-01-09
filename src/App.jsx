import NewProject from "./Components/NewProject.jsx";
import NoProjectSelected from "./Components/NoProjectSelected.jsx";
import ProjectSidebar  from "./Components/ProjectSidebar.jsx";
import { useState  } from "react";


function App() {
  const [projectState , setProjectState] = useState({
    selectedProjectId : undefined , 
    projects: []
  }) ;

  function handleStateAddProject(){
    setProjectState(prevState =>{
      return {
        ...prevState , 
        selectedProjectId: null , 
      }
    })
  }

  let content ; 
  if(projectState.selectedProjectId === null){
    content = <NewProject></NewProject>
  }
  else if(projectState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStateAddProject} ></NoProjectSelected>
  }

  return (
    <main className="h-screen my-8 flex gap-8" >
      <ProjectSidebar onStartAddProject={handleStateAddProject}></ProjectSidebar>
      {content}
    </main>
  );
}

export default App;
