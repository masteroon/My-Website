const display = JSON.parse(localStorage.getItem('display')) || {
  coins: 0,
  bestCoins: 0,
  timer: 2000,
  activeBuffs: [],
  coinMultiplier: 1,
  totalCoinsEarned: 0,
  freeze: 0,
  rareCardsMultiplier: 0,
  totalGamesPlayed:0,
  fatigue: 0,
  clicks: 0,
  coinsPerClick:0,
  isPlaying: false
};
let intervalId;

document.querySelector('.js-start-game-button')
  .addEventListener('click',()=>{
    document.querySelector('.js-display')
      .classList.add('border');
    document.querySelector('.js-draw-button')
      .classList.remove('hidden');
    document.querySelector('.js-starting-screen')
      .classList.add('hidden');
    document.querySelector('.js-shop-button')
      .classList.remove('hidden');
    document.querySelector('.js-edit-deck-button')
      .classList.remove('hidden');
    renderGame();
  });

function renderGame(){
  const displayElement = document.querySelector('.js-display');
  const html = `
  <div class = "display-row">
    <p class="display-row-first-item">Coins:</p> <p>${display.coins}</p>
  </div>
  <div class = "display-row">
    <p class="display-row-first-item">Time Left:</p> <p>${display.timer/100} sec</p>
  </div>
  <div class = "display-row">
    <p class="display-row-first-item">Active Buffs:</p> <p>${display.activeBuffs}</p>
  </div>
  `;
  displayElement.innerHTML = html;
  
}


function playGame(){
  if(!display.isPlaying){
    intervalId = setInterval(()=>{
      display.isPlaying = true;
      
      if(display.freeze=== 0){
        display.timer -= 100;
      }
      if(display.timer === 0){
        clearInterval(intervalId);  
        display.isPlaying = false;
        document.querySelectorAll('.js-card').forEach(divElement=>{
          divElement.classList.add('disabled-card');
        });
        let endGameHTML ='';
        display.totalGamesPlayed++;
        if(display.coins > display.bestCoins)
          display.bestCoins = display.coins;
        display.totalCoinsEarned += display.coins;
        display.coinsPerClick =  display.clicks === 0 ? 0 : display.coins / display.clicks;

        display.coinsPerClick = Number(display.coinsPerClick.toFixed(2));
        if(!display.coinsPerClick)
          display.coinsPerClick = 0;
        endGameHTML = `
          <div class = "display-row">
            <p class="display-row-first-item">Total Games Played:</p> <p>${display.totalGamesPlayed}</p>
          </div>
          <div class = "display-row">
            <p class="display-row-first-item">Coins earned this game:</p> <p>${display.coins}</p>
          </div>
          <div class = "display-row">
            <p class="display-row-first-item">Clicks this game:</p> <p>${display.clicks}</p>
          </div>
          <div class = "display-row">
            <p class="display-row-first-item">Coins per click:</p> <p>${display.coinsPerClick}</p>
          </div>
          <div class = "display-row">
            <p class="display-row-first-item">Best Coins:</p> <p>${display.bestCoins}</p>
          </div>
          <div class = "display-row">
            <p class="display-row-first-item">Total Coins Earned</p> <p>${display.totalCoinsEarned}</p>
          </div>
        `
        document.querySelector('.js-display')
          .innerHTML = endGameHTML;
        document.querySelector('.js-shop-button')
          .classList.remove('hidden');
        document.querySelector('.js-edit-deck-button')
          .classList.remove('hidden');
        document.querySelector('.js-draw-button')
        .classList.remove('hidden');
        display.timer = 2000;
        display.activeBuffs = [];
        display.coinMultiplier=1;
        display.freeze = 0,
        display.rareCardsMultiplier = 0,
        display.coins = 0;
        display.fatigue = 0;
        currentDeck = [];
        console.log(currentDeck);
        remainingCards = [];
        deck.forEach((card)=>{
         remainingCards.push(card);
        });
        console.log(remainingCards);

        localStorage.setItem('display',JSON.stringify(display));

        display.clicks = 0;
        display.coinsPerClick = 0;
        return;
      }
      renderGame();

    },1000);
  }
}


