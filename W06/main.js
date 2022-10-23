const addBtn = document.getElementById("add-btn");
const allBtn = document.getElementById("all-btn");
const completeBtn = document.getElementById("complete-btn");
const incompleteBtn = document.getElementById("incomplete-btn");

const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list")
const fragment = new DocumentFragment();

let count = 0;
const todos = JSON.parse(localStorage.getItem("todos")) || [];

addBtn.addEventListener("click", addEventListenerToAddBtn);
allBtn.addEventListener("click", showAllTodos);
completeBtn.addEventListener("click", showCompletedTodos);
incompleteBtn.addEventListener("click", showIncompleteTodos);
todoList.addEventListener("dblclick", addEventListenerToTodoList);

function addEventListenerToAddBtn(event) {
    event.preventDefault();
    const todoName = todoInput.value;
    if(!todoName) return alert("Enter a valid todo.");
    const todo = { id : count++, content: todoName, completed: false }
    todos.push(todo);
    appendFragmentToList(todo, fragment);
    todoInput.value = "";
    todoInput.focus();
    updateLocalStorage(todos);
}

function addEventListenerToTodoList(event) {
    event.preventDefault();
    deleteTodo(event);
    const li = event.target;
    todoList.removeChild(li);
}

function createListItemNode(todo) {
    const listItem = document.createElement('li');
    const checkbox = createTodoCheckBox(todo);
    const label = createLabel(todo, checkbox.id);
    listItem.appendChild(label);
    listItem.appendChild(checkbox);
    listItem.setAttribute('id', todo.id);
    return listItem;
}

function appendFragmentToList(todo, fragment) {
    const todoNode = createListItemNode(todo);
    fragment.appendChild(todoNode);
    todoList.appendChild(fragment);
}

function createTodoCheckBox(todo) {
    const checkbox = document.createElement('input');
    checkbox.id = "todo-checkbox-" + todo.id;
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.onclick = changeTodoStatus;
    return checkbox;
}

function changeTodoStatus(event) {
    const searchId = parseInt(event.target.parentElement.id);
    const index = todos.findIndex(todo => todo.id === searchId);
    const currentTodo = todos[index];
    currentTodo.completed = !currentTodo.complete;
    updateLocalStorage(todos);
}

function createLabel(todo, checkboxName) {
    const label = document.createElement('label');
    label.textContent = todo.content;
    label.setAttribute('for', checkboxName);
    return label;
}

function removeAllTodosFromList(el) {
    while(el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}

function showAllTodos() {
    removeAllTodosFromList(todoList);
    todos.forEach(todo => appendFragmentToList(todo, fragment));
}

function showCompletedTodos() {
    removeAllTodosFromList(todoList);
    todos
        .filter(todo => todo.completed)
        .forEach(todo => appendFragmentToList(todo, fragment));
}

function showIncompleteTodos() {
    removeAllTodosFromList(todoList);
    todos
        .filter(todo => !todo.completed)
        .forEach(todo => appendFragmentToList(todo, fragment));
}

function updateLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(event) {
    const searchId = parseInt(event.target.parentElement.id);
    const index = todos.findIndex(todo => todo.id === searchId);
    todos.splice(index, 1);
    updateLocalStorage(todos);
}


/**
 * Render todos
 */
removeAllTodosFromList(todoList);
todos
    .filter(todo => todo)
    .forEach(todo => appendFragmentToList(todo, fragment));
