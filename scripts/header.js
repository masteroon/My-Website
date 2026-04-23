
const headerButtons = [{
  name: 'about',
  tooltip: 'Learn more about me'
  },
  {
  name: 'experience',
  tooltip: 'View my professional experience'
  },
  {
  name: 'projects',
  tooltip: 'Explore my projects'
  },
  {
  name: 'skills',
  tooltip: 'See my technical skills'
  },
  {
  name: 'resume',
  tooltip: 'Download my resume'
  },
  {
  name: 'contact',
  tooltip: 'Get in touch'
  },
  {
  name: 'linkedin',
  tooltip: 'Visit my LinkedIn profile'
  }
];

generateHeader();

export function generateHeader(){
  let html = `
    <div class="header-title-button-container">
    <button class="hamburger-menu js-hamburger-menu">
      <img class="hamburger-icon" src="./Icons/header/hamburger_white.svg">
    </button>
    <a href="./index.html">
      <div class="website-title-container">
        <p class="website-title">
          Oron Bar
        </p>
        
      </div>
    </a>
    </div>

    <div class="header-buttons-container">
    `
    headerButtons.forEach(item => {
      html += 
      `
      <div class="${item.name}-icon-button-container">
        <a class="header-link js-header-button" target="${getTargetRef(item)}" data-button-name = "${item.name}" href="${getButtonHref(item)}.html">
          <img class="header-icon" src="./Icons/header/${item.name}_white.svg">
          <img class="header-icon-active" src="./Icons/header/${item.name}.svg">
            <p class="header-text">
            ${item.name}
          </p>
          <div class="header-item-tooltip">
            ${item.tooltip}
          </div>
        </a>
      </div>
      `
    });
  
    html += `</div>`
  document.querySelector('.js-header')
    .innerHTML = html;
  
  toggleButton();

  handleResponsiveMenu();

  document.querySelector('.js-hamburger-menu')
    .addEventListener('click',()=>{
      toggleHamburgerMenu();
    });

  window.addEventListener('resize', handleResponsiveMenu);
}

function getButtonHref(button){
  if(button.name !== 'linkedin')
    return `./${button.name}`;
  else 
    return 'https://www.linkedin.com/in/oron-bar-b985a1161/';
}

function getTargetRef(button){
   if(button.name !== 'linkedin')
    return '_self';
  else 
    return '_target';
}

function toggleButton() {
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.js-header-button').forEach((button) => {
    const href = button.getAttribute('href');
   
    const container = button.parentElement;
    const buttonName = button.dataset.buttonName; 
    console.log(container);
    console.log(buttonName);
    if (href === currentPage) {
      container.classList.add(`${buttonName}-active-button`);
    }
   
  });

}

function toggleHamburgerMenu(){
  const buttonsElement = document.querySelector('.header-buttons-container');
  buttonsElement.classList.toggle('hidden');
}

function handleResponsiveMenu() {
  const buttonsElement = document.querySelector('.header-buttons-container');

  if (window.innerWidth <= 768) {
    buttonsElement.classList.add('hidden');
  } else {
    buttonsElement.classList.remove('hidden');
  }
}
