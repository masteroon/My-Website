let calculation = '';
calculation = updateLocalStorage('load','calculation');
updateDisplay();

function updateCalculation(operator) {
  calculation += operator
  updateDisplay();
  updateLocalStorage ('save','calculation',calculation);
}


function updateLocalStorage(state, key, item=''){
  
  if(state === 'save'){
    localStorage.setItem(key, JSON.stringify(item));
    return;
  }
  else if (state === 'load') {
    calculation = JSON.parse(localStorage.getItem(key));
    if (!calculation){
      return '';
    }
    return calculation;
  }
  else if (state === 'remove') {
    localStorage.removeItem(key);
  }
  return;
}

function updateDisplay() {
  document.querySelector('.js-display').innerHTML = calculation;
}