import { generateHeader } from "./header.js";
import { skills } from "../data/skillsData.js";


let isExpanded = false;

generateSkillsPage();

function generateSkillsPage() {
  let html = '';

  skills.forEach(skill => {
    html += `
      <div class="skills-category js-skill-category" data-id="${skill.id}">
        <div class="skill-title js-skill-inner-category-${skill.id} glow-text">${skill.title}</div>
        ${getSkillsHTML(skill)}
        ${getToolsHTML(skill)}
      </div>
    `;
  });

  document.querySelector('.skills-categories-container').innerHTML = html;

  const skillCategoriesElem = document.querySelectorAll('.js-skill-category');
  skillCategoriesElem.forEach(category => {
    category.addEventListener('click', () => {
      document.querySelector(`.js-skills-container-${category.dataset.id}`)
        .classList.toggle('hidden');
      const tools = document.querySelector(`.js-tools-container-${category.dataset.id}`);
      if(tools)
        tools.classList.toggle('hidden');
      document.querySelector(`.js-skill-inner-category-${category.dataset.id}`)
        .classList.toggle('glow-text');
      category.classList.toggle('turn-grid');
      category.isExpanded = !category.isExpanded;
      isExpanded = isAllExpanded();
      const expandButton = document.querySelector('.js-expand-button');
      if(isExpanded){
        expandButton.innerHTML = 'Collapse All';
      }
      else {
        expandButton.innerHTML = 'Expand All';
      }
      
    });
  });
  toggleExpandButton();
}

function toggleExpandButton(){
  const expandButton = document.querySelector('.js-expand-button');
  expandButton.addEventListener('click', ()=>{
      const skillCategoriesElem = document.querySelectorAll('.js-skill-category');
      skillCategoriesElem.forEach(category => {
        const tools = document.querySelector(`.js-tools-container-${category.dataset.id}`);
        if(!isExpanded){
           document.querySelector(`.js-skills-container-${category.dataset.id}`)
            .classList.remove('hidden');
            if(tools)
              tools.classList.remove('hidden');
            document.querySelector(`.js-skill-inner-category-${category.dataset.id}`)
              .classList.remove('glow-text');
            category.classList.add('turn-grid');
            expandButton.innerHTML = 'Collapse All';
            category.isExpanded = true;

        } else {
          document.querySelector(`.js-skills-container-${category.dataset.id}`)
            .classList.add('hidden');
            if(tools)
              tools.classList.add('hidden');
            document.querySelector(`.js-skill-inner-category-${category.dataset.id}`)
              .classList.add('glow-text');
            category.classList.remove('turn-grid');
            expandButton.innerHTML = 'Expand All';
            category.isExpanded = false;
        }
      
      });
      if(isAllExpanded()){
        isExpanded = true;
      }    
      else{
        isExpanded = false;
      }

    });
 
  
}

function getSkillsHTML(skill) {
  let skillItemsHTML = `<div class="skills-container js-skills-container-${skill.id} hidden">
    <div class="skills-grid-col-title">Skills</div>
  `;

  skill.skills.forEach(item => {
    skillItemsHTML += `
      <div class="skill">
        ${item}
      </div>
    `;
  });

  skillItemsHTML += `</div>`;
  return skillItemsHTML;
}

function getToolsHTML(skill){
  if(!skill.tools){
    return '<div></div>';
  }
  let toolsHTML = `<div class="tools-container js-tools-container-${skill.id} hidden">
    <div class="tools-grid-col-title">Tools</div>
  `;

  skill.tools.forEach(tool =>{
    toolsHTML += `
      <div class="tool">
        ${tool}
      </div>
    `;
  });
  toolsHTML+= `</div>`
  return toolsHTML;
}

function isAllExpanded(){
  const skillCategoriesElem = document.querySelectorAll('.js-skill-category');
  let expandedCategoriesCounter = 0;
  skillCategoriesElem.forEach(category => {
    if(category.isExpanded===true){
      expandedCategoriesCounter++;
    }      
  });
  if(expandedCategoriesCounter === skillCategoriesElem.length)
    return true;
  return false;
}