
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
    <a href="website.html">
      <div class="website-title-container">
        <p class="website-title">
          Oron Bar
        </p>
      </div>
    </a>
    `
    headerButtons.forEach(item => {
      html += 
      `
      <div class="${item.name}-icon-button-container">
        <a class="header-link js-header-button" data-button-name = "${item.name}" href="${item.name}.html">
          <img class="header-icon" src="/Icons/header/${item.name}_white.svg">
          <img class="header-icon-active" src="/Icons/header/${item.name}.svg">
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

  document.querySelector('.js-header')
    .innerHTML = html;
  
  toggleButton();
}

function toggleButton() {
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.js-header-button').forEach((button) => {
    const href = button.getAttribute('href');
    const container = button.parentElement;
    const buttonName = button.dataset.buttonName;

    if (href === currentPage) {
      container.classList.add(`${buttonName}-active-button`);
    }
  });

}

