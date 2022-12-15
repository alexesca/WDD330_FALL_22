const addBtn = document.getElementById("add-btn");

const myBreakInput = document.getElementById("myBreak-input");
const myBreakList = document.getElementById("myBreak-list")
const fragment = new DocumentFragment();

const myBreaks = JSON.parse(localStorage.getItem("breaks")) || [];
let count = myBreaks ? myBreaks.length : 1;

addBtn.addEventListener("click", addEventListenerToAddBtn);
myBreakList.addEventListener("dblclick", addEventListenerToMyBreakList);

function addEventListenerToAddBtn(event) {
    event.preventDefault();
    const myBreakName = myBreakInput.value;
    if(!myBreakName) return alert("Enter a valid break.");
    const myBreak = { id : count++, content: myBreakName, completed: false }
    myBreaks.push(myBreak);
    appendFragmentToList(myBreak, fragment);
    myBreakInput.value = "";
    myBreakInput.focus();
    updateLocalStorage(myBreaks);
}

function addEventListenerToMyBreakList(event) {
    event.preventDefault();
    deleteMyBreak(event);
    let li;
    if(event.target.nodeName === "LABEL") li = event.target.parentElement
    else li = event.target;
    myBreakList.removeChild(li);
}

function createListItemNode(myBreak) {
    const listItem = document.createElement('li');
    const checkbox = createMyBreakCheckBox(myBreak);
    const label = createLabel(myBreak, checkbox.id);
    listItem.appendChild(label);
    // listItem.appendChild(checkbox);
    listItem.setAttribute('id', myBreak.id);
    return listItem;
}

function appendFragmentToList(myBreak, fragment) {
    const myBreakNode = createListItemNode(myBreak);
    fragment.appendChild(myBreakNode);
    myBreakList.appendChild(fragment);
}

function createMyBreakCheckBox(myBreak) {
    const checkbox = document.createElement('input');
    checkbox.id = "myBreak-checkbox-" + myBreak.id;
    checkbox.type = 'checkbox';
    checkbox.checked = myBreak.completed;
    checkbox.onclick = changeMyBreakStatus;
    return checkbox;
}

function changeMyBreakStatus(event) {
    const searchId = parseInt(event.target.parentElement.id);
    const index = myBreaks.findIndex(myBreak => myBreak.id === searchId);
    const currentMyBreak = myBreaks[index];
    currentMyBreak.completed = !currentMyBreak.complete;
    updateLocalStorage(myBreaks);
}

function createLabel(myBreak, checkboxName) {
    const label = document.createElement('label');
    label.textContent = myBreak.content;
    label.setAttribute('for', checkboxName);
    return label;
}

function removeAllMyBreaksFromList(el) {
    while(el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}

function updateLocalStorage(myBreaks) {
    localStorage.setItem("breaks", JSON.stringify(myBreaks));
}

function deleteMyBreak(event) {
    const searchId = parseInt(event.target.parentElement.id);
    const index = myBreaks.findIndex(myBreak => myBreak.id === searchId);
    myBreaks.splice(index, 1);
    updateLocalStorage(myBreaks);
}


/**
 * Render myBreaks
 */
removeAllMyBreaksFromList(myBreakList);
myBreaks
    .filter(myBreak => myBreak)
    .forEach(myBreak => appendFragmentToList(myBreak, fragment));

