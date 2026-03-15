import { generateHeader } from "./header.js";

generateExperiencePage();

function generateExperiencePage(){
  generateHeader();
  const workButton = document.querySelector('.js-work-text');
  const educationButton = document.querySelector('.js-education-text');
  const experienceButtons = document.querySelectorAll('.js-inner-category');


  workButton.addEventListener('click',()=>{
    workButton.classList.toggle('text-decoration');
    experienceButtons.forEach((expButton)=>{
      const buttonType = expButton.dataset.buttonType;
      if(buttonType === 'work'){
        expButton.classList.toggle('hidden');
      }
    });
    const newButtonText =  toggleButtonText(workButton.innerText);
    workButton.innerHTML = newButtonText;

  });

  educationButton.addEventListener('click', ()=>{
    educationButton.classList.toggle('text-decoration');
    experienceButtons.forEach((expButton)=>{
      const buttonType = expButton.dataset.buttonType;
      if(buttonType === 'education'){
        expButton.classList.toggle('hidden');
      }
    });
    const newButtonText =  toggleButtonText(educationButton.innerText);
    educationButton.innerHTML = newButtonText;

  });

  const experienceButtonElement = document.querySelectorAll('.js-experience-button');
  experienceButtonElement.forEach(button=>{
    button.addEventListener('click', ()=>{
      const buttonExperienceName = button.dataset.experienceName;
      const textExperiences = document.querySelectorAll('.js-experience-text');
      textExperiences.forEach((experience)=>{
        const textExperienceName = experience.dataset.experienceName;
        if(buttonExperienceName === textExperienceName){
          experience.classList.toggle('hidden');
          const innerCategoryTexts = document.querySelectorAll('.js-inner-category-text');
          innerCategoryTexts.forEach(textElement=>{
            const innerCategoryExperienceName = textElement.dataset.experienceName;
            if(innerCategoryExperienceName === textExperienceName){
              const newText = toggleButtonText(textElement.innerText);
              textElement.classList.toggle('text-decoration');
              textElement.innerHTML = newText;
            }  
          });
        }
      });
      
    });
  });

}

function toggleButtonText(buttonText){
  if(buttonText.includes('->')){
    const newText = buttonText.split("->");
    return newText[0];
  }
  else {
    return buttonText + ' ->';
  }
    
}

