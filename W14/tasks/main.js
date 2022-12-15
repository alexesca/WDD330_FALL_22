const addBtn = document.getElementById("add-btn");
const allBtn = document.getElementById("all-btn");
const completeBtn = document.getElementById("complete-btn");
const incompleteBtn = document.getElementById("incomplete-btn");

const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list")
const fragment = new DocumentFragment();

let count = 0;
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addBtn.addEventListener("click", addEventListenerToAddBtn);
allBtn.addEventListener("click", showAlltasks);
completeBtn.addEventListener("click", showCompletedtasks);
incompleteBtn.addEventListener("click", showIncompletetasks);
taskList.addEventListener("dblclick", addEventListenerTotaskList);

function addEventListenerToAddBtn(event) {
    event.preventDefault();
    const taskName = taskInput.value;
    if(!taskName) return alert("Enter a valid task.");
    const task = { id : count++, content: taskName, completed: false }
    tasks.push(task);
    appendFragmentToList(task, fragment);
    taskInput.value = "";
    taskInput.focus();
    updateLocalStorage(tasks);
}

function addEventListenerTotaskList(event) {
    event.preventDefault();
    deletetask(event);
    let li;
    if(event.target.nodeName === "LABEL") li = event.target.parentElement
    else li = event.target;
    taskList.removeChild(li);
}

function createListItemNode(task) {
    const listItem = document.createElement('li');
    const checkbox = createtaskCheckBox(task);
    const label = createLabel(task, checkbox.id);
    listItem.appendChild(label);
    listItem.appendChild(checkbox);
    listItem.setAttribute('id', task.id);
    return listItem;
}

function appendFragmentToList(task, fragment) {
    const taskNode = createListItemNode(task);
    fragment.appendChild(taskNode);
    taskList.appendChild(fragment);
}

function createtaskCheckBox(task) {
    const checkbox = document.createElement('input');
    checkbox.id = "task-checkbox-" + task.id;
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.onclick = changetaskStatus;
    return checkbox;
}

function changetaskStatus(event) {
    const searchId = parseInt(event.target.parentElement.id);
    const index = tasks.findIndex(task => task.id === searchId);
    const currenttask = tasks[index];
    currenttask.completed = !currenttask.completed;
    updateLocalStorage(tasks);
}

function createLabel(task, checkboxName) {
    const label = document.createElement('label');
    label.textContent = task.content;
    label.setAttribute('for', checkboxName);
    return label;
}

function removeAlltasksFromList(el) {
    while(el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}

function showAlltasks() {
    removeAlltasksFromList(taskList);
    tasks.forEach(task => appendFragmentToList(task, fragment));
}

function showCompletedtasks() {
    removeAlltasksFromList(taskList);
    tasks
        .filter(task => task.completed)
        .forEach(task => appendFragmentToList(task, fragment));
}

function showIncompletetasks() {
    removeAlltasksFromList(taskList);
    tasks
        .filter(task => !task.completed)
        .forEach(task => appendFragmentToList(task, fragment));
}

function updateLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deletetask(event) {
    const searchId = parseInt(event.target.parentElement.id);
    const index = tasks.findIndex(task => task.id === searchId);
    tasks.splice(index, 1);
    updateLocalStorage(tasks);
}


/**
 * Render tasks
 */
removeAlltasksFromList(taskList);
tasks
    .filter(task => task)
    .forEach(task => appendFragmentToList(task, fragment));

