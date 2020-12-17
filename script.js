const SCREEN = document.getElementById("gameScreen");
const BUTTONDIV = document.getElementById("gameButtons");
const INV = document.getElementById("inventory");
const TITLE = document.getElementById("gameTitle");
const DESC = document.getElementById("desc");
var startLevel = 0;
function initialize(currentLevel){
    SCREEN.style.background = levels[currentLevel].background;
    TITLE.innerHTML = levels[currentLevel].title;
    DESC.innerHTML = levels[currentLevel].desc;
    createButtons(levels[currentLevel].buttons);
    console.log(currentLevel)
}
function createButtons(buttons){
    while(BUTTONDIV.hasChildNodes()) {
        BUTTONDIV.removeChild(BUTTONDIV.firstChild);
    }
    for (var i = 0; i < buttons.length; i++) {
        let button = document.createElement("Button");
        button.innerText = buttons[i]['text'];
        button.setAttribute('data-level', i);
        button.addEventListener("click", function(e){
            console.log(e.target.getAttribute('data-level'));
            initialize(buttons[e.target.getAttribute('data-level')].goToLevel)
        });
        button.onclick = buttons[i].function;
        button.disabled = buttons[i].dsb;
        BUTTONDIV.appendChild(button);
    }
}
initialize(startLevel)