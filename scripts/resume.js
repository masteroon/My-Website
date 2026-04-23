import { generateHeader } from "./header.js";



const languageSelect = document.getElementById('language');
const fileTypeSelect = document.getElementById('fileType');

activateResumePage();

function activateResumePage (){
  languageSelect.addEventListener('change', changePdfPreview);
  const downloadButtonElem = document.querySelector('.js-download-button');

  downloadButtonElem.addEventListener('click', ()=>{
    const language = languageSelect.value;
    const fileType = fileTypeSelect.value;
    const filePath = `/files/resume/Oron_Bar_${language}.${fileType}`;

    const link = document.createElement('a');
    link.href = filePath;
    link.download = `Oron_Bar_${language}.${fileType}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}



function changePdfPreview(){
    const language = languageSelect.value;

    const iframeElement = document.querySelector('.js-pdf-viewer');
    iframeElement.src = `./files/resume/Oron_Bar_${language}.pdf`;

    
} 

