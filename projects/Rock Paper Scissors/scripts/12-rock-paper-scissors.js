let score = loadFromLocalStorage('score');
      
      if(!score){
        score= {
          wins: 0,
          losses: 0,
          ties: 0
        };
      }
      refreshScore();
      let isAutoPlaying = false;
      let intervalID;


      function autoPlay(){
        if(!isAutoPlaying){
          intervalID = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
          }, 1000);
          document.querySelector('.auto-play-button')
            .innerHTML = 'Stop Play';
          isAutoPlaying = true;
        }
        else {
          clearInterval(intervalID);
          document.querySelector('.auto-play-button')
            .innerHTML = 'Auto Play';
          isAutoPlaying = false;    
        }
      }

      document.body.addEventListener('keydown', (event)=> {
        if(event.key === 'r'){
          playGame('rock');
        }
        else if (event.key === 'p'){
          playGame('paper');
        }
        else if(event.key === 's') {
          playGame('scissors');
        }
      });

      document.querySelector('.js-rock-button')
        .addEventListener('click',() => {
          playGame('rock');
        });

      document.querySelector('.js-paper-button')
        .addEventListener('click',() => {
          playGame('paper');
        });

       document.querySelector('.js-scissors-button')
        .addEventListener('click',() => {
          playGame('scissors');
        });

        document.querySelector('.js-reset-score-button')
        .addEventListener('click',() => {
          resetScore();
        });
        
        document.querySelector('.js-auto-play-button')
        .addEventListener('click',() => {
           autoPlay();
        });


      function playGame(playerMove) {
        const computerMove = pickComputerMove();     
        if(computerMove === playerMove){
          result = 'Tie.';
        }

        else if (playerMove === 'rock'){
          if (computerMove === 'paper') {
            result = 'You lose.';
          }

          else {
            result = 'You win.';
          }
        }

        else if (playerMove === 'paper'){
          if (computerMove === 'scissors') {
            result = 'You lose.';
          }

          else {
            result = 'You win.';
          }
        }

        else if (playerMove === 'scissors'){
          if (computerMove === 'rock') {
            result = 'You lose.';
          }

          else {
            result = 'You win.';
          }
        }

        if(result === 'You win.' ) {
          score.wins++;
        }
        else if (result === 'You lose.'){
          score.losses++;
        }
        else if (result === 'Tie.'){
          score.ties++;
        }

        
        saveToLocalStorage('score',score);

        refreshRound(result,playerMove,computerMove);
        refreshScore();
      }

      

      function pickComputerMove() {
        const randomNumber = Math.random();
        let result = '';
        let computerMove = '';
      


        if (randomNumber < 1/3){
          computerMove ='rock';
        }

        else if (randomNumber >= 1/3 && randomNumber < 2/3 ){
          computerMove = 'paper';
        }

        else {
          computerMove = 'scissors';
        }

        return computerMove;

      }
    function resetScore (){
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      removeFromLocalStorage('score');
      refreshScore();
    }

    function saveToLocalStorage(key, object) {
      localStorage.setItem(key, JSON.stringify(object));
    }
    
    function removeFromLocalStorage(key) {
      localStorage.removeItem(key);
    }

    function loadFromLocalStorage(key) {
      return JSON.parse(localStorage.getItem(key));
    }

    function refreshScore(){
      document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    }

    function refreshRound(result, playerMove, computerMove){
      document.querySelector('.js-result').innerHTML = result;
      document.querySelector('.js-picks')
        .innerHTML = `You
        <img class="move-icon" src="Icons/${playerMove}-emoji.png">
        <img class="move-icon" src="Icons/${computerMove}-emoji.png">
      Computer  `;

    }