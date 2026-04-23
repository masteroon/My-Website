document.querySelector('.js-shop-button')
  .addEventListener('click',()=>{
    renderShop();
  });

function renderShop(){
  let html = `
    <div class="animation-overlay js-animation-overlay"></div>
    <p class="game-title">Shop</p>
    <button class="js-leave-shop-button leave-shop-button">Leave Shop </button>
    <p class="js-available-coins available-coins">Available Coins: ${display.totalCoinsEarned}</p>
    <div class="shop-display">`;
  cards.forEach(card=>{
    card.cost = setCardCost(card.rarity);
    html +=`
    <div class = "js-card shop-card ${card.rarity}-card" data-js-card-id="${card.id}">
      <img class="shop-card-image" src="./Images/Spell Images/${card.id}-spell.png">
      <div class="shop-card-description">
        <p class="rarity-title">${card.rarity.toUpperCase()}</p>
        <p class="price-title">Price: <span class="card-cost">${card.cost} &#129689;</span></p>
        <div class="card-description">${card.description}</div>
        <button class="js-buy-card-button buy-card-button ${card.rarity}-card" data-card-id="${card.id}" >Buy Card</button>
        <div class="js-buy-message buy-message" data-message-id="${card.id}"></div>
      </div>
    </div>
    `
  });
  html += `</div>`
    
  document.querySelector('.js-main-screen')
    .innerHTML = html;

  document.querySelector('.js-leave-shop-button')
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
         document.querySelector('.js-edit-deck-button')
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
  const buttons = document.querySelectorAll('.js-buy-card-button');

  buttons.forEach(button=>{
    button.addEventListener('click', ()=>{
    const cardId = button.dataset.cardId;
    const card = cards.find(card => card.id === cardId);
    const cardElement = button.closest('.shop-card');
    const message = cardElement.querySelector('.js-buy-message');

    if(display.totalCoinsEarned >= card.cost){
      display.totalCoinsEarned -= card.cost;
      collection.push(card);
      message.innerHTML = 'Card Bought';
      message.classList.add('green-message');
      localStorage.setItem('collection',JSON.stringify(collection));
      localStorage.setItem('display',JSON.stringify(display));
      
    }
    else{
      message.classList.add('red-message');
      message.innerHTML = 'Insufficient Funds';
    }
    setTimeout(()=>{
      message.innerHTML = '';
    },2000);
    renderAvaialbeCoins();
   });
  });
  
  const overlay = document.querySelector('.js-animation-overlay');

  document.querySelectorAll('.js-buy-card-button').forEach(button=>{
    const id = button.dataset.cardId;

    if(id === 'spark'){
      button.addEventListener('mouseenter', ()=>{
        overlay.classList.remove('lightning-flash');
        void overlay.offsetWidth; 
        overlay.classList.add('lightning-flash');
      });
       button.addEventListener('mouseleave', ()=>{
      overlay.classList.remove('lightning-flash');
      });
    }
    else if(id === 'gold-burst'){
      button.addEventListener('mouseenter', ()=>{
        overlay.classList.remove('gold-shine');
        void overlay.offsetWidth; 
        overlay.classList.add('gold-shine');
      });
       button.addEventListener('mouseleave', ()=>{
      overlay.classList.remove('gold-shine');
      });
    }
    else if (id === 'freeze') {
    button.addEventListener('mouseenter', () => {
      overlay.classList.remove('freeze-blast');
      void overlay.offsetWidth; 
      overlay.classList.add('freeze-blast');
    });

    button.addEventListener('mouseleave', () => {
      overlay.classList.remove('freeze-blast');
    });
    
    }
    else if(id === 'time-pebble'){
      const screen = document.querySelector('.js-main-screen');

      button.addEventListener('mouseenter', ()=>{
        screen.classList.remove('screen-shake', 'vision-distort', 'tax-tilt');
        void screen.offsetWidth; 
        screen.classList.add('screen-shake');
      });
    }
    else if(id === 'double-vision'){
      const screen = document.querySelector('.js-main-screen');

      button.addEventListener('mouseenter', ()=>{
        screen.classList.remove('screen-shake', 'vision-distort', 'tax-tilt');
        void screen.offsetWidth;
        screen.classList.add('vision-distort');
      });
    }
    else if (id === 'tax') {
      const screen = document.querySelector('.js-main-screen');
      button.addEventListener('mouseenter', () => {
        screen.classList.remove('screen-shake', 'vision-distort', 'tax-tilt');
        void screen.offsetWidth; // restart animation
        screen.classList.add('tax-tilt');
      });

      button.addEventListener('mouseleave', () => {
        screen.classList.remove('tax-tilt');
      });
    }


   
  });

  

}

function renderAvaialbeCoins(){
  document.querySelector('.js-available-coins')
  .innerHTML = `Available Coins: ${display.totalCoinsEarned}`;
}

function setCardCost(rarity) {
  if(rarity === 'common'){
    return 10;
  }
  else if (rarity === 'troll'){
    return 15;
  }
  else if (rarity === 'rare'){
    return 25;
  }
  else if (rarity === 'epic'){
    return 35;
  }
}

