

/*export const projects = [{
  name: 'amazon-clone',
  displayName: 'Amazon Clone Website',
  description:'Full Amazon e-commerce flow replication built with HTML, CSS, and modular vanilla JavaScript. Includes product listing, cart management, checkout system, order history, and tracking pages, with state persistence via localStorage and business logic validated using Jasmine unit tests.',
  size: 'large',
  link: 'https://github.com/masteroon/Amazon-clone/tree/main/javascript-amazon-project',
  img: '../projects/Projects Images/amazon.png'

},{
  name: 'spell-deck-clicker',
  displayName: 'Spell Deck Clicker',
  description:'Browser-based deck-building clicker game built with vanilla JavaScript: modular card architecture with dynamic effect functions, weighted rarity generation system, persistent state management via localStorage, deck editing and collection system, shop economy, timed game loop, and CSS-driven animation effects.',
  size: 'small',
  link: '../projects/Spell Deck clicker/main.html',
  img: '../projects/Projects Images/spell-deck-clicker.png'
},{
  name: 'rock-paper-scissors',
  displayName: 'Rock Paper Scissors',
  description: 'Interactive Rock Paper Scissors app using vanilla JavaScript: DOM updates, event listeners (click + keydown), localStorage state persistence, interval-based Auto Play toggle, and UI confirmation flow for resetting stats.',
  size: 'small',
  link: '../projects/Rock Paper Scissors/Final/rock-paper-scissors.html',
  img: '../projects/Projects Images/rock-paper-scissors.png'
},{
  name: 'youtube-clone',
  displayName: 'YouTube Clone Website',
  description: 'This is a project in which I recreated YouTube using HTML and CSS (no javascript)',
  size: 'large',
  link: 'https://github.com/masteroon/youtube-clone',
  img: '../projects/Projects Images/youtube.png'

},{
  name: 'calculator',
  displayName: 'calculator',
  description: 'A responsive calculator application built with HTML, CSS, and vanilla JavaScript, featuring dynamic DOM manipulation and event handling.',
  size: 'small',
  link: '../projects/Calculator/calculator.html',
  img: '../projects/Projects Images/calculator.png'

}];*/

export const projects = [
  {
    name: 'amazon-clone',
    displayName: 'Amazon Clone Website',
    summary: 'Full Amazon e-commerce flow replica built with modular vanilla JavaScript.',
    features: [
      'Product listing, cart, and checkout flow',
      'Order history and tracking pages',
      'State persistence with localStorage',
      'Business logic tested with Jasmine'
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Jasmine'],
    size: 'large',
    link: 'https://github.com/masteroon/Amazon-clone/tree/main/javascript-amazon-project',
    img: './projects/Projects Images/amazon.png',
    glow: 'orange'
  },
  {
    name: 'spell-deck-clicker',
    displayName: 'Spell Deck Clicker',
    summary: 'Browser-based deck-building clicker game with dynamic mechanics.',
    features: [
      'Modular card system with dynamic effects',
      'Weighted rarity generation',
      'Deck editing and collection system',
      'Shop economy and timed game loop'
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    size: 'small',
    link: './projects/Spell Deck clicker/main.html',
    img: './projects/Projects Images/spell-deck-clicker.png',
    glow: 'cyan'

  },
  {
    name: 'rock-paper-scissors',
    displayName: 'Rock Paper Scissors',
    summary: 'Interactive browser game built with vanilla JavaScript.',
    features: [
      'Click and keyboard controls',
      'Auto-play mode with intervals',
      'Stats saved with localStorage',
      'Reset confirmation flow'
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    size: 'small',
    link: './projects/Rock Paper Scissors/Final/rock-paper-scissors.html',
    img: './projects/Projects Images/rock-paper-scissors.png',
    glow: 'purple'
  },
  {
    name: 'youtube-clone',
    displayName: 'YouTube Clone Website',
    summary: 'A YouTube-inspired interface recreated using only HTML and CSS.',
    features: [
      'Responsive video grid layout',
      'Header, sidebar, and thumbnail components',
      'Accurate spacing and typography',
      'No JavaScript used'
    ],
    tech: ['HTML', 'CSS'],
    size: 'large',
    link: 'https://github.com/masteroon/youtube-clone',
    img: './projects/Projects Images/youtube.png',
    glow: 'red'
  },
  {
    name: 'calculator',
    displayName: 'Calculator',
    summary: 'Responsive calculator app with dynamic input handling.',
    features: [
      'DOM-based rendering',
      'Button click handling',
      'Responsive layout',
      'Vanilla JavaScript logic'
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    size: 'small',
    link: './projects/Calculator/calculator.html',
    img: './projects/Projects Images/calculator.png',
    glow: 'blue'
  }
];