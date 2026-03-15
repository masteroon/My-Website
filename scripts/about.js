import { generateBorderColor } from "./general.js";
import { generateHeader } from "./header.js";
import { splitApart,generateText} from "./utility/strings.js"



let intervalId;
let isAnimationRunning = true;

generateHeader();
renderAboutImages();



function renderAboutImages(){
  let imageNumber = 1;
  intervalId = setInterval(() => {
    const imageElement = document.querySelector('.js-about-image');
    if(imageNumber < 4){
      imageElement.classList.remove(`about-image-shadow-${imageNumber}`);
      imageNumber++;
      imageElement.src = `/Images/About Page/oron-${imageNumber}.png`;
      imageElement.classList.add(`about-image-shadow-${imageNumber}`);
    }
    else {
      imageElement.classList.remove(`about-image-shadow-${imageNumber}`);
      imageNumber = 1;
      imageElement.src = `/Images/About Page/oron-${imageNumber}.png`;
      imageElement.classList.add(`about-image-shadow-${imageNumber}`);
    }
  }, 180);
}

const toggleAnimationButtonElement = document.querySelector('.toggle-animation-button');
toggleAnimationButtonElement.addEventListener('click', ()=>{
  toggleAnimationButton();
});

function toggleAnimationButton() {
  if(isAnimationRunning){
    clearInterval(intervalId);
    toggleAnimationButtonElement.innerHTML = 'Start Animation';
    isAnimationRunning = false;
  }
  else {
    toggleAnimationButtonElement.innerHTML = 'Stop Animation';
    renderAboutImages();
    isAnimationRunning = true;
  }

}