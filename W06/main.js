const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list")
const fragment = new DocumentFragment();
let count = 0;
const todos = []

addBtn.addEventListener("click", addEventListenerToAddBtn);

function addEventListenerToAddBtn(event) {
    event.preventDefault();
    const todoName = todoInput.value;
    const todo = { id : count++, content: todoName, completed: false }
    todos.push(todo);
    appendFragmentToList(todo, fragment);
}

function createListItemNode(todo) {
    const listItem = document.createElement('li');
    const label = document.createElement('label');
    label.textContent = todo.content;
    listItem.appendChild(label);
    return listItem;
}

function appendFragmentToList(todo, fragment) {
    const todoNode = createListItemNode(todo);
    fragment.appendChild(todoNode);
    todoList.appendChild(fragment);
}
