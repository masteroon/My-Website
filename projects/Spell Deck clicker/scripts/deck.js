document.querySelector('.js-draw-button')
  .addEventListener('click', ()=>{
    document.querySelector('.js-draw-button')
            .classList.add('hidden');
    document.querySelector('.js-shop-button')
        .classList.add('hidden');
    document.querySelector('.js-edit-deck-button')
        .classList.add('hidden');
    if(!display.isPlaying){
      generateDeck();
      playGame();
    }


  });
let deck = [];
deck = JSON.parse(localStorage.getItem('deck'));


if(!deck){
  deck =[];
  cards.forEach(card=>{
  deck.push(card);
  });
}
else {
  deck.forEach((card)=>{
  ogCard = cards.find(ogCard => ogCard.id === card.id);
  card.effect = ogCard.effect;
});
}

let currentDeck =[];
let remainingCards = [];
const cardLimit = 4;

let pickedRarity = {
  common: 0,
  rare: 0,
  epic: 0,
  troll: 0
};

let collection = JSON.parse(localStorage.getItem('collection'));

if(!collection){
  collection =[];
  deck.forEach(card => 
    collection.push(card)
  );
}


deck.forEach((card)=>{
  remainingCards.push(card);
});


function generateDeck(){
  generateCards();
  renderBoard();
}

let raritiesLeft =[];

function generateCards(){
  let chosenRarities =[];
  raritiesLeft =[];
  remainingCards.forEach(card => {
    raritiesLeft.push(card.rarity);
   });
  for(let i=0; i< cardLimit; i++){
    chosenRarities.push(generateRarities());
  }
  chosenRarities.forEach((rarity)=>{
    generateCard(rarity);
  })

}



function generateRarities(){
  let goodCard = false;
  let generatedNumber;
  while(!goodCard){
    generatedNumber = Math.random();
   if ((generatedNumber >= 0 && generatedNumber < 0.4 - display.rareCardsMultiplier) && raritiesLeft.includes('common')) {
      goodCard = true;
      const index = raritiesLeft.indexOf('common');
      raritiesLeft.splice(index, 1);
      return 'common';
}
    else if((generatedNumber >= 0.4 - display.rareCardsMultiplier && generatedNumber < 0.6 - display.rareCardsMultiplier) && raritiesLeft.includes('troll')){
      goodCard = true;
      const index = raritiesLeft.indexOf('troll');
      raritiesLeft.splice(index, 1);
      return 'troll';
    }
    if((generatedNumber >= 0.6 - display.rareCardsMultiplier && generatedNumber < 0.85 - (display.rareCardsMultiplier/2)) && raritiesLeft.includes('rare')){
      goodCard = true;
      const index = raritiesLeft.indexOf('rare');
      raritiesLeft.splice(index, 1);
      return 'rare';
    }
    if(generatedNumber >= 0.85 - (display.rareCardsMultiplier/2) && raritiesLeft.includes('epic')){
      goodCard = true;
      const index = raritiesLeft.indexOf('epic');
      raritiesLeft.splice(index, 1);
      return 'epic';
    }
  }
  
}

function generateCard(rarity){
  let cardsOfChosenRarity = remainingCards.filter(card => {
    return card.rarity === rarity;
  });
  cardsOfChosenRarity = shuffleArray(cardsOfChosenRarity);
  currentDeck.push(cardsOfChosenRarity[0]);
  remainingCards.forEach((card,index)=>{
    if (card.id === cardsOfChosenRarity[0].id)
      remainingCards.splice(index, 1);
    
  });
  
  
  renderBoard();

}


function shuffleArray(array){
  return array.sort(() => Math.random() - 0.5); 

}



function renderBoard(){
  let html ='';

  currentDeck.forEach((card)=>{

    html += `
    <div class = "js-card card ${card.rarity}-card" data-js-card-id="${card.id}">
      <img class="card-image" src="./images/Spell Images/${card.id}-spell.png">
      <p class = "rarity-title">${card.rarity.toUpperCase()}</p>
      <button class="js-card-button card-button" data-card-id="${card.id}" >Use Card</button>
    </div>
    `;
  });

  document.querySelector('.js-board')
    .innerHTML = html;
  
  const buttons = document.querySelectorAll('.js-card-button');
  buttons.forEach((button)=>{
    button.addEventListener('click',()=>{
      const cardId = button.dataset.cardId;
      const card = deck.find(card=> card.id === cardId);
      display.clicks ++;
      card.effect(display);  

      raritiesLeft =[];
      remainingCards.forEach(card => {
        raritiesLeft.push(card.rarity);
      });
      const chosenRarity = generateRarities(raritiesLeft);
      generateCard(chosenRarity);
      

      remainingCards.push(card);
      const index = currentDeck.findIndex(c => c.id === cardId);
      currentDeck.splice(index, 1)
      button.closest('.js-card').classList.add('hidden');


      renderBoard();

   
      renderGame();
    });
  });
 
}

document.querySelector('.js-edit-deck-button')
  .addEventListener('click', ()=>{
    createDeckList();
  });

function createDeckList(){
  const editDeck =[];
  collection.forEach((card)=>{
    const index = editDeck.findIndex(c=> c.id === card.id);
    if (index === -1)
      editDeck.push({...card,inDeck: 0,inCollection: 1});
    else {
      editDeck[index].inCollection++;
    }
  }); 
  deck.forEach(card =>{
    const index = editDeck.findIndex(c=> c.id===card.id);
    editDeck[index].inDeck ++;
  });


  renderDeckList(editDeck);
}

function renderDeckList(eDeck) {
  document.querySelector('.js-display') 
    .classList.add('hidden');
  document.querySelector('.js-draw-button') 
    .classList.add('hidden');
  document.querySelector('.js-edit-deck-button') 
    .classList.add('hidden'); 
  document.querySelector('.js-shop-button') 
    .classList.add('hidden'); 
  document.querySelector('.js-board')
    .classList.remove('board');
  document.querySelector('.js-board')
    .classList.add('edit-deck-board');
  document.querySelector('.js-leave-collection-button')?.remove();
  document.querySelector('.js-board').insertAdjacentHTML(
    'beforebegin',
    `<button class="leave-collection-button js-leave-collection-button">Leave Collection</button>`
  );
  let boardHTML ='';
  eDeck.forEach(card => {
    boardHTML += `
    <div class = "card edit-card js-card ${card.rarity}-card" data-js-card-id="${card.id}">
      <img class="shop-card-image" src="./images/Spell Images/${card.id}-spell.png">
      <p class="rarity-title">${card.rarity.toUpperCase()}</p>
      <p class="occurances">x${card.inDeck}</p>
      <div class="card-description edit-card-description">${card.description}</div>
      <div class="edit-buttons-container">
        <button class="js-add-card-button add-card-button" data-button-id="${card.id}">
          Add card
        </button>
        <button class="js-remove-card-button remove-card-button" data-button-id="${card.id}">
          Remove card
        </button>
      </div>
      <div>
        <p>In deck: ${card.inDeck}</p>
        <p>Available: ${card.inCollection - card.inDeck}</p>
      </div>
    </div>
    `
  });
  document.querySelector('.js-board')
    .innerHTML = boardHTML;
  
    document.querySelector('.js-leave-collection-button')
  .addEventListener('click',()=>{
    
    document.querySelector('.js-main-screen')
      .innerHTML = `
      <div class="display js-display">

      </div>

      <button class="draw-button js-draw-button">Draw Cards</button>

      <button class="edit-deck-button js-edit-deck-button">Edit Deck</button>

      <button class="shop-button js-shop-button">Shop</button>

      <div class="board js-board">

      </div>
      `;
    document.querySelector('.js-display')
      ?.classList.add('border');
  
    document.querySelector('.js-starting-screen')
      ?.classList.add('hidden');
  
    
    document.querySelector('.js-draw-button')
      .addEventListener('click', ()=>{
        generateDeck();
        playGame();
        document.querySelector('.js-shop-button')
            .classList.add('hidden');

      }); 
    document.querySelector('.js-shop-button')
      .addEventListener('click',()=>{
        renderShop();
      });
    document.querySelector('.js-edit-deck-button')
      .addEventListener('click', ()=>{
        createDeckList();
      });
    renderGame();
  });

  const addButtons = document.querySelectorAll('.js-add-card-button');
  addButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
      const buttonId = button.dataset.buttonId;
      const index = eDeck.findIndex(c => c.id === buttonId);
      if(eDeck[index].inCollection-eDeck[index].inDeck>0){
        eDeck[index].inDeck++;
        const { inDeck, inCollection, ...cleanCard } = eDeck[index];
        deck.push(cleanCard);
      }
      localStorage.setItem('deck',JSON.stringify(deck))
      renderDeckList(eDeck);
    });
  });

  const removeButtons = document.querySelectorAll('.js-remove-card-button');
  removeButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
      const cardId = button.dataset.buttonId;
      const index = eDeck.findIndex(c => c.id === cardId);
      if(eDeck[index].inDeck > 1){
        eDeck[index].inDeck --;
        const cardId = button.dataset.buttonId;
        const deckIndex = deck.findIndex(c=>c.id === cardId);
        console.log(deckIndex);
        deck.splice(deckIndex, 1);
      }
      localStorage.setItem('deck',JSON.stringify(deck))
      renderDeckList(eDeck);
    });
  });
}