'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnShowModal = document.querySelectorAll('.show-modal');

const handleShowModal = function(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const handleCloseModal = function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

const keyCloseModal = function(e){
    if(e.key === 'Escape'){
        if(!modal.classList.contains('hidden') && !overlay.classList.contains('hidden')){
            handleCloseModal();
        }
    }
}

btnShowModal.forEach(btnSm => {
    btnSm.addEventListener('click', handleShowModal);
});

btnCloseModal.addEventListener('click', handleCloseModal);
overlay.addEventListener('click', handleCloseModal);
document.addEventListener('keydown', keyCloseModal);