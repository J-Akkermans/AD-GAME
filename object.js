function play() {
    var audio = new Audio('sound/missionfailed.mp3');
    audio.play();
}


var levels = [{
        //--Hoofdmenu--
        title: "Hoofdmenu",
        desc: "Dit is het menu",
        background: "url('img/menu.jpg')",
        buttons: [{
            text: "Start",
            color: "green",
            goToLevel: 1
        }, ],
    },
    //Level1
    {
        title: "Level 1",
        desc: "Je zit in een cafe, wat doe je in het café?",
        background: "url('img/level1.jpg')",
        dependsON: false,
        buttons: [{
                text: "Praten",
                goToLevel: 1,
                "function": function () {
                    if (levels[1].dependsON != false) {
                        if (levels[3]["buttons"][0].keyInLevel == true) {
                            initialize(5)
                        } else {
                            talk.style.display = "block";
                            talk.innerHTML = "Hallo, je bent hier om te praten over de quest? <br> Goed ,je moet een sleutel vinden voor mij. <br> Wanneer je deze gevonden hebt, <br> breng de sleutel terug naar mij"
                            talk.style.color = 'white'
                            setTimeout(function () {
                                talk.style.display = "none"
                            }, 10000);
                        }

                    } else {
                        initialize(4)
                        play()
                    }
                },
            },
            {
                text: "Drinken",
                dsb: false,
                goToLevel: 1,
                "function": function () {
                    if (levels[1].dependsON != true) {
                        let inv = document.getElementById("inventory");
                        levels[1].dependsON = true;
                        let invItem = document.createElement("img");
                        invItem.height = "100%"
                        invItem.src = "img/bier.jpg";
                        inv.appendChild(invItem);
                        levels[1]["buttons"][1].dsb = true;
                        initialize(1)

                    }
                }
            },
            {
                text: "Buiten",
                goToLevel: 2
            }
        ]
    },
    {
        //Level2
        title: "Level 2",
        desc: "Je bent buiten het cafe, zorg dat de opdracht van de man in het cafe gedaan word.",
        background: "url('img/buiten.jpg')",
        buttons: [{
                text: "Ga terug",
                goToLevel: 1,
            },
            {
                text: "Loop",
                color: "green",
                goToLevel: 3,
                function: function () {
                    let manImg = document.createElement("img");
                    manImg.style.position = "absolute"
                    manImg.style.top = "275px"
                    manImg.style.left = "180px"
                    manImg.height = "150"
                    manImg.src = "img/manlevel3.png";
                    manImg.onclick = levels[3].function;
                    manImg.id = "Man"
                    SCREEN.appendChild(manImg);
                }
            },
            {
                text: "blijf staan",
                color: "green",
                goToLevel: 4,
                function: function playSound() {
                    var playSound = new Audio('sound/missionfailed.mp3');
                    playSound.play();
                }
            }
        ],
    }, 
    {
        // Level 3
        title: "Level 3",
        desc: "De man is hier ergens zijn sleutel verloren.... <br> Zoek de sleutel en druk op de sleutel om deze op te pakken",
        background: "url('img/buiten-loop.jpg')",
        addKey: function () {
            if (levels[3]["buttons"][0].keyInLevel == false ) {
                let inv = document.getElementById("inventory");
                let x = document.getElementById("key");
                key.remove()
                let invItem = document.createElement("img");
                invItem.height = "100%"
                invItem.src = "img/key.png";
                inv.appendChild(invItem);
                levels[3]["buttons"][0].keyInLevel = true;
            }

        },
        function: function () {
            sleutel = document.getElementById("key")
            if (!sleutel && levels[3]["buttons"][0].keyInLevel == false && levels[1].dependsON == true) {
                let keyImg = document.createElement("img");
                keyImg.style.position = "absolute"
                keyImg.style.bottom = "24px"
                keyImg.style.right = "155px"
                keyImg.height = "20"
                keyImg.id = "key"
                keyImg.src = "img/key.png";
                keyImg.onclick = levels[3].addKey;
                SCREEN.appendChild(keyImg);
            }

        },
        buttons: [{
            //Have to add some functionalibty that checks if key is picked up, else they'll  
            text: "Ga terug",
            goToLevel: 2,
            keyInLevel: false,
            function: function () {
                let manAfb = document.getElementById("Man")
                if (manAfb) {
                    manAfb.remove()
                }
            }
        }, ],
    },
    // Failed
    {
        title: "You failed.",
        desc: "Dit is het einde",
        background: "url('img/fail.gif')",
        buttons: [{
            text: "Try Again",
            goToLevel: 1,
            function: function () {
                location.reload()
            }
        }, ],
    },
    {
        title: "You won.",
        desc: "Dit is het einde",
        background: "url('img/won.gif')",
        buttons: [{
            text: "Play Again",
            goToLevel: 1,
            function: function () {
                location.reload()
            }
        }, ],
    },
];