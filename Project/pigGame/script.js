'use strict';

// selecting elements
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const curScore0 = document.querySelector('#current--0');
const curScore1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting condition
let scores, curScore, activePlayer, stateGame;

// resetGame
const defaultValues = function(){
    activePlayer = 0;
    stateGame = true;
    scores = [0, 0]
    curScore = 0;
    score0.textContent = 0;
    curScore0.textContent = 0;
    score1.textContent = 0;
    curScore1.textContent = 0;
    player0.classList.add('player--active');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--active');
    player1.classList.remove('player--winner');
    dice.classList.add('hidden');
}
defaultValues();

// changePlayer
const changeToPlayer = function(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

// handleRollDice
const rollDice = function(){
    if(stateGame){
        let randomDiceNum = Math.floor(Math.random() * 6) + 1;
        if(randomDiceNum === 1){
            curScore = 0;
            document.querySelector(`#current--${activePlayer}`).textContent = curScore;
            changeToPlayer();
        }else{
            curScore += randomDiceNum;
            document.querySelector(`#current--${activePlayer}`).textContent = curScore;
        }
        dice.classList.remove('hidden');
        dice.setAttribute('src', `dice-${randomDiceNum}.png`);
    }
}

// handleHoldScore
const holdScore = function(){
    if(stateGame){
        scores[activePlayer] += curScore;
        curScore = 0;
        if(scores[activePlayer] < 100){
            document.querySelector(`#current--${activePlayer}`).textContent = curScore;
            document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
            changeToPlayer();
        }else{
            stateGame = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            dice.classList.add('hidden');
        }
    }
}

// addEventListener
btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', defaultValues);
