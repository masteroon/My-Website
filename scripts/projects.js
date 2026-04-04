import { generateHeader } from "./header.js";
import { projects } from "../data/projectsData.js";

generateProjectsPage();
function generateProjectsPage(){
  const smallProjects = [];
  const largeProjects = [];
  projects.forEach(project=>{
    if(project.size === 'small'){
      project.tooltip = 'onSite';
      project.tooltipText = 'Click for Live Demo ->';
      smallProjects.push(project);
    }
    else{
      project.tooltip = 'gitHub';
      project.tooltipText = 'View on GitHub ->';
      largeProjects.push(project);
    }
  });

  const largeProjectsElement = document.querySelector('.js-large-projects');
  const smallProjectsElement = document.querySelector('.js-small-projects');

  const largeProjectsHTML = generateProjectHTML(largeProjects);
  const smallProjectsHTML = generateProjectHTML(smallProjects);
  largeProjectsElement.innerHTML = largeProjectsHTML;
  smallProjectsElement.innerHTML = smallProjectsHTML;

  }


function generateProjectHTML(projects){
  let projectsHTML = '';
  projects.forEach(project => {
      projectsHTML+= `
      <a class="project-link" target="_blank" href="${project.link}">
        <div class="project-container">
          <p class="project-title  ${project.glow}-glow">${project.displayName}</p>
          <div class="project-content">
            <div class="project-image-container">
              <div class="tooltip ${project.tooltip}">
                ${project.tooltipText}
              </div>
              <img class="project-image" src="${project.img}">
            </div>
            <div class="project-text">
              <p class="project-summary">${project.summary}</p>
              <ul class="project-features">
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
              </ul>
              <p class="project-tech">${project.tech.join(' • ')}</p>
            </div>
          </div>
        </div>
      </a>  
      `;
    });
    return projectsHTML;
}