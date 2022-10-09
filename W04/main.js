const gridElem = document.getElementById("game-grid")
gridElem.addEventListener("click", (event) => {
const players = ["X", "O"]
let turn = 0;
    const div = event.target;
    const currentValue = div.innerText;
    if(!currentValue) {
        const textNode = document.createTextNode(players[turn]);
        div.appendChild(textNode)
        if(turn < 1) {
            turn += 1
        } else {
            turn = 0
        }
    } else {
        alert("You can select this one again.")
    }
})
