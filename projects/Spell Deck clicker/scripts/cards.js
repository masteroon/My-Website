
const cards = [{
  id: 'spark',
  name: 'Spark',
  emoji: '⚡',
  rarity: 'common',
  cost: 0,
  description: 'Generate 1 coin',
  effect: function (state) { 
      state.coins += Math.max(1-state.fatigue, 0) * state.coinMultiplier;
   }   
},{
  id: 'gold-burst',
  name: 'Gold Burst',
  emoji: '💰',
  rarity: 'common',
  cost: 0,
  description: 'Generate 3 coins but increases fatigue',
  timeoutId: undefined,
  effect: function (state){ 
    state.coins += Math.max(3-state.fatigue,0) * state.coinMultiplier;
    state.fatigue ++ ;
    if(!state.activeBuffs.includes('🥵')){
      state.activeBuffs.push('🥵');
    } 
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() =>{
      state.fatigue=0;
      state.activeBuffs = endBuffDisplay(state.activeBuffs,'🥵');
    },2000);
   }
},{
  id: 'time-pebble',
  name: 'Time Pebble',
  emoji: '⏳',
  rarity: 'rare',
  description: 'Adds an additional second to the game',
  cost: 0,
  effect: function(state) { 
    state.timer+=100;
   }   
},{
  id: 'double-vision',
  name: 'Double Vision',
  emoji: '✨',
  rarity: 'rare',
  description: 'Doubles gold gain for 3 seconds',
  cost: 0,
  timeoutId: undefined,
  effect: function(state)  { 
    state.coinMultiplier *= 2;
    if(!state.activeBuffs.includes('✨')){
      state.activeBuffs.push('✨');
    } 
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(()=>{
      state.coinMultiplier = 1;
      state.activeBuffs = endBuffDisplay(state.activeBuffs,'✨');
    },3000);
   }   
},{
  id: 'freeze',
  name: 'Freeze',
  emoji: '❄️',
  rarity: 'epic',
  description: 'Freezes the time for 1.5 seconds',
  cost: 0,
  timeoutId: undefined,
  effect: function (state){ 
     if(!state.activeBuffs.includes('❄️')){
      state.activeBuffs.push('❄️');
    } 
    state.freeze = 1;
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(()=>{
      state.freeze = 0;
      state.activeBuffs = endBuffDisplay(state.activeBuffs,'❄️');
    },1500);
   }   
},{
  id: 'tax',
  name: 'Tax',
  emoji: '💸',
  rarity: 'troll',
  description: 'Lose 2 gold to increase chance of finding high rarity cards for 3 seconds',
  cost: 0,
  timeoutId: undefined,
  effect: function(state){ 
    if(!state.activeBuffs.includes('💸')){
      state.activeBuffs.push('💸');
    } 
    state.rareCardsMultiplier = 0.2;
    state.coins -=2;
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(()=>{
      state.rareCardsMultiplier = 0;
      state.activeBuffs = endBuffDisplay(state.activeBuffs, '💸');
    },3000);
    
   }   
}

];

function endBuffDisplay(activeBuffs,emoji){
     activeBuffs = activeBuffs.filter(buff=>buff !== emoji);
      return activeBuffs;
}