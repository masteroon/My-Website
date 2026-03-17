const todoList = [{
  name:'make dinner',
  dueDate: '2026-02-08'
}, {
  name: 'wash dishes',
  dueDate: '2026-02-08'
}];


renderTodoList();

function renderTodoList(){
  let todoListHTML = '';
  for(let i = 0; i < todoList.length; i++){
    const todoObject = todoList[i];
    const {name, dueDate} = todoObject;
    const html = 
    ` <div>${name}</div>
      <div>${dueDate}</div>
      <button class = "red-button"
      onclick="
        removeToDo(${i});
      ">
        Delete
      </button>
    `;
    todoListHTML += html;
  }

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const inputValue = inputElement.value;

  const dueDateInputElement = document.querySelector('.js-due-date-input');
  const dueDateValue = dueDateInputElement.value;

  todoList.push({
    name: inputValue,
    dueDate: dueDateValue
  });
  
  inputElement.value = '';

  renderTodoList();
}

function removeToDo(index){
  todoList.splice(index,1);
  renderTodoList();
}