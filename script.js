'use strict';

// select elements
const score0 = document.querySelector("#score--0");
const score1 = document.getElementById("score--1");
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const currPlayer0 = document.querySelector(".player--0");
const currPlayer1 = document.querySelector(".player--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new")
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

const init = () => {
    // Starting conditions

    scores = [0,0]
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0.textContent = 0;
    score1.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add("hidden")
    currPlayer0.classList.remove('player--winner');
    currPlayer1.classList.remove('player--winner');
    currPlayer0.classList.add('player--active');
    currPlayer1.classList.remove('player--active');
    activePlayer = 0;
}

init();

const switchPlayer  = () => {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore
    activePlayer = activePlayer == 0 ? 1 : 0;
    currPlayer0.classList.toggle('player--active');
    currPlayer1.classList.toggle('player--active');
}

btnRoll.addEventListener('click', () => {
    if (playing) {
        let random = Math.floor(Math.random() * 6 + 1);
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${random}.png`;

        if (random !== 1) {
            currentScore += random;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        } else {
            switchPlayer();        
        }
    }
})

btnHold.addEventListener('click', () => {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 10) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
        }

        switchPlayer();    
    }
})

btnNew.addEventListener('click', init)
