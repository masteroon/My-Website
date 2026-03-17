let score = loadFromLocalStorage('score');
      
      if(!score){
        score= {
          wins: 0,
          losses: 0,
          ties: 0
        };
      }
      refreshScore();


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