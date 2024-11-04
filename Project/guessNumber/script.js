'use strict';

const mesg = document.querySelector('.message');
const number = document.querySelector('.number');
const score = document.querySelector('.score');
const btnCheck = document.querySelector('.check');
const btnAgain = document.querySelector('.again');
const highScore = document.querySelector('.highscore');

let secretNumber = Math.floor(Math.random() * 20) + 1;
let scoreLabel = 20;
let highScorex = 0;

const displayMesg = function(message){
    mesg.textContent = message;
}

const changeStyleElementNumber = function(width, mesg){
    number.style.width = width;
    number.textContent = mesg;
}

const changeBodyBackgroundColor = function(color){
    document.body.style.backgroundColor = color;
}

btnCheck.addEventListener('click', function(){
    const guessNumber = Number(document.querySelector('.guess').value);
    if(!guessNumber){
        displayMesg(`No number!😒`);
    }else if(guessNumber === secretNumber){
        displayMesg(`Correct Number!😁`);
        changeBodyBackgroundColor('#40c057');
        changeStyleElementNumber('30rem', secretNumber);
        if(scoreLabel > highScorex){
            highScore.textContent = scoreLabel;
            highScorex = scoreLabel;
        }
    }else if(guessNumber !== secretNumber){
        if(scoreLabel > 1){
            displayMesg(guessNumber > secretNumber ? mesg.textContent = `Too high!🫠` : mesg.textContent = `Too low!🤣`);
            scoreLabel -= 1;
            score.textContent = scoreLabel; 
        }else {
            displayMesg(`You lose the game!😢`);
            score.textContent = 0; 
        }
    }
})

const changeRandomNumber = function(){
    secretNumber = Math.floor(Math.random() * 20) + 1;
}

btnAgain.addEventListener('click', function(){
    const guessNumber = document.querySelector('.guess');
    guessNumber.value = ``;
    scoreLabel = 20;
    score.textContent = scoreLabel;
    displayMesg(`Start guessing...`);
    changeStyleElementNumber('15rem', `?`);
    changeBodyBackgroundColor('#222');
    changeRandomNumber();
})