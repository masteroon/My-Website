import { generateHeader } from "./header.js";
import { projects } from "../data/projectsData.js";


function generateProjectsPage(){
  const smallProjects = [];
  const largeProjects = [];
  projects.forEach(project=>{
    if(project.size === 'small'){
      smallProjects.push(project);
    }
    else{
      largeProjects.push(project);
    }
  });

  
}