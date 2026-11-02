
const emojis = ["🦀", "🐬","🧜","🐡","🐢","🐚","🐙","🐳 "];
const doubleEmojis = [...emojis, ...emojis].sort(() => 0.5 - Math.random());
const gameBoard = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('score');
const winMessage = document.getElementById('winMsg');

let score = 0;
let firstCard = null;
let lockBoard = false;
let matchesFound = 0;
const totalPairs = emojis.length;

doubleEmojis.forEach(emoji => {
    const card = document.createElement('button');
    card.type = 'button';
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.textContent = '';
    //card.setAttribute("aria-label", "Hidden card");
    //card.setAttribute("aria-pressed", "false");
    
    //card.addEventListener("click", () => {flipCard(card));
    card.addEventListener("click", () => {
        flipCard(card);
    });
    gameBoard.appendChild(card);
    //<div class="card-back">${emoji}</div>
});

//Flip a card

function flipCard(card) {
    if (
        lockBoard ||  card.classList.contains("flipped") || card.classList.contains("matched")) return;

    card.classList.add("flipped");
    gameSound(flipSound);
    card.textContent = card.dataset.emoji;
    

    if (!firstCard){
        firstCard = card;
       
    }else{
        lockBoard = true;

        if(firstCard.dataset.emoji === card.dataset.emoji) {
            gameSound(matchSound);
            firstCard.classList.add('matched');
            card.classList.add('matched');
            score++;
            matchesFound++;
            scoreDisplay.textContent = score;
            if (matchesFound === totalPairs) {
                     winMessage.style.display = 'block';
                     gameSound(winSound);
                     setTimeout(() => {
                        alert("yay!! You Won. you Matches all the Ocean Creatures!!");
                     }, 100);
            }
            resetTurn();
    }else{
        setTimeout(() => {
           firstCard.classList.remove("flipped");
           card.classList.remove("flipped"); 
           firstCard.textContent = '';
           card.textContent = '';
           resetTurn();
        }, 800);
    }

        }
    }

 function resetTurn(){
    [firstCard, lockBoard] = [null, false];
}
   
    



// Ponyo game sound Effects
const flipSound = new Audio("sounds/card_flip_sound.mp3");
const matchSound = new Audio("sounds/two_cards_match.mp3");
const winSound = new Audio("sounds/all_card_match_win.mp3");


function gameSound(sound){
    sound.currentTime=0;
    sound.play().catch(error => {
        console.log("Sound couldn't play:", error);
    });
}


/*card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">Ponyo</div>
                    <div class="card-back">${emoji}</div>
                    

                </div>
     `;*/