const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list")
const fragment = new DocumentFragment();
let count = 0;
const todos = []

addBtn.addEventListener("click", addEventListenerToAddBtn);
todoList.addEventListener("dblclick", addEventListenerToTodoList);

function addEventListenerToAddBtn(event) {
    event.preventDefault();
    const todoName = todoInput.value;
    const todo = { id : count++, content: todoName, completed: false }
    todos.push(todo);
    appendFragmentToList(todo, fragment);
    todoInput.value = "";
    todoInput.focus();
}

function addEventListenerToTodoList(event) {
    event.preventDefault();
    const li = event.target.parentElement;
    todoList.removeChild(li);
;}

function createListItemNode(todo) {
    const listItem = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = createTodoCheckBox(todo);
    label.textContent = todo.content;
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
    return checkbox;
}
