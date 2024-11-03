'use strict';

const mesg = document.querySelector('.message');
const number = document.querySelector('.number');
const score = document.querySelector('.score');
const btnCheck = document.querySelector('.check');
const btnAgain = document.querySelector('.again');

let secretNumber = Math.floor(Math.random() * 20) + 1;
let scoreLabel = 20;

btnCheck.addEventListener('click', function(){
    const guessNumber = Number(document.querySelector('.guess').value);
    if(!guessNumber){
        mesg.textContent = `No number!😒`
    }else if(guessNumber === secretNumber){
        mesg.textContent = `Correct Number!😁`
        document.body.style.backgroundColor = '#40c057';
        number.style.width = '30rem';
        number.textContent = secretNumber;
    }else if(guessNumber > secretNumber){
        if(scoreLabel > 1){
            mesg.textContent = `Too high!🫠`
            scoreLabel -= 1;
            score.textContent = scoreLabel; 
        }else {
            mesg.textContent = `You lose the game!😢`
            score.textContent = 0; 
        }
    }else if(guessNumber < secretNumber){
        if(scoreLabel > 1){
            mesg.textContent = `Too low!🤣`
            scoreLabel -= 1;
            score.textContent = scoreLabel;
        }else{
            mesg.textContent = `You lose the game!😢`
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
    mesg.textContent = `Start guessing...`;
    number.textContent = `?`;
    number.style.width = '15rem';
    document.body.style.backgroundColor = '#222';
    changeRandomNumber();
})