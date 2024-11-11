'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function(btn){
  btn.addEventListener('click', openModal);
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Scroll to firstSection
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
// console.log(btnScroll, section1);

const scorllTOSection1 = function(e){
  // height viewport of elemet
  const sectionHeight = section1.getBoundingClientRect();
  console.log(sectionHeight);

  console.log('current scroll: ', window.pageXOffset, window.pageYOffset);
  console.log('height/width of viewpot: ', window.innerHeight, window.innerWidth);

  //viewport not includes scrollBar
  console.log('height/width of viewpot: ', document.documentElement.clientHeight, document.documentElement.clientWidth);

  //Scrolling
  // window.scrollTo(sectionHeight.left + window.pageXOffset, sectionHeight.top + window.pageYOffset);
  // window.scrollTo({
  //   left: sectionHeight.left + window.pageXOffset,
  //   top: sectionHeight.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });
  section1.scrollIntoView({behavior: 'smooth'});

}

btnScroll.addEventListener('click', scorllTOSection1);

//Page Navigation
const navs = document.querySelectorAll('.nav__link');
const containerNav = document.querySelector('.nav__links');
containerNav.addEventListener('click', function(e){
  e.preventDefault();

  // Matching target
  if(e.target.classList.contains('nav__link') && !e.target.classList.contains('nav__link--btn')){
    document.querySelector(`${e.target.getAttribute('href')}`).scrollIntoView({behavior: 'smooth'});
  }
})

//Tap component
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');

  //Guard cause
  if(!clicked) return;

  //Active tab
  tabs.forEach(function(tab){
    tab.classList.remove('operations__tab--active');
  })
  clicked.classList.add('operations__tab--active');
  
  //Active content
  tabContents.forEach(function(content){
    content.classList.remove('operations__content--active');
  })
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

//Menu effect
const handleHoverEffect = function(e){
  if(e.target.classList.contains('nav__link')){
    const opacityValue = this;
    const hover = e.target;
    const sibling = hover.closest('.nav').querySelectorAll('.nav__link');
    const logo = hover.closest('.nav').querySelector('img');
    sibling.forEach(function(s){
      if(s != hover){
        s.style.opacity = opacityValue;
      }
    })
    logo.style.opacity = opacityValue;
  }
};

const container_Nav = document.querySelector('.nav');
container_Nav.addEventListener('mouseover', handleHoverEffect.bind(0.5));
container_Nav.addEventListener('mouseout', handleHoverEffect.bind(1));


//Sticky Nav
// const section1Top = section1.offsetTop;
// window.addEventListener('scroll', function(){
//   if(window.scrollY >= section1Top){
//     container_Nav.classList.add('sticky');
//   }else{
//     container_Nav.classList.remove('sticky');
//   }
// })

const header1 = document.querySelector('.header');
const optionObserverHeader = function(entries){
  const [entry] = entries;
  if(!entry.isIntersecting){
    container_Nav.classList.add('sticky');
  }else{
    container_Nav.classList.remove('sticky');
  }
  // console.log(entry.isIntersecting);
}

const observerHeader = new IntersectionObserver(optionObserverHeader, {root: null, threshold: 0, rootMargin: `-${container_Nav.getBoundingClientRect().height}px`});
observerHeader.observe(header1);

//Reveal section
const allSection = document.querySelectorAll('.section');
const revealSection = function(entries, observer){
  const [entry] = entries;
  if(entry.isIntersecting){
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
}

const sectionObserve = new IntersectionObserver(revealSection, {root: null, threshold: 0.15});
allSection.forEach(function(section){
  sectionObserve.observe(section);
  section.classList.add('section--hidden');
})

//Lazy loading Image
const featureImages = document.querySelectorAll('.features__img');
const loadingFeaImage = function(items, observer){
  const [item] = items;
  if(!item.isIntersecting) return;
  item.target.setAttribute('src', `${item.target.dataset.src}`);
  item.target.addEventListener('load', function(){
    item.target.classList.remove('lazy-img');
  })
  observer.unobserve(item.target);
}

const fImageObserver = new IntersectionObserver(loadingFeaImage, {root: null, threshold: 0.4});
featureImages.forEach(function(fimg){
  fImageObserver.observe(fimg);
})

//Slider
const slides = document.querySelectorAll('.slide')
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
let curSlide = 0;
const maxSlide = slides.length;

const createDots = function(){
  slides.forEach(function(_, i){
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
  })
}

const activateDots = function(slide){
  const allDot = document.querySelectorAll('.dots__dot');
  allDot.forEach(function(d){
    d.classList.remove('dots__dot--active');
  })
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

const goToSlide = function(slide){
  slides.forEach(function(s, i){
    s.style.transform = `translateX(${(i-slide)*100}%)`;
  })
}

//Next slide
const nextSlide = function(){
  if(curSlide === maxSlide - 1){
    curSlide = 0;
  }else{
    curSlide ++;
  }
  goToSlide(curSlide);
  activateDots(curSlide);
}

const previousSlide = function(){
  if(curSlide === 0){
    curSlide = maxSlide - 1;
  }else{
    curSlide --;
  }
  goToSlide(curSlide);
  activateDots(curSlide);
}

const startPage = function(){
  createDots();
  goToSlide(0);
  activateDots(0);
}

startPage();

//Event handle
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);
document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowLeft'){
    previousSlide();
  }else if(e.key === 'ArrowRight'){
    nextSlide();
  }
})
dotContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('dots__dot')){
    goToSlide(e.target.dataset.slide);
    activateDots(e.target.dataset.slide);
  }
})

document.addEventListener('DOMContentLoaded', function(e){
  console.log(e);
})

window.addEventListener('load', function(e){
  console.log(e);
})

window.addEventListener('beforeunload', function(e){
  e.preventDefault();
  e.returnValue = '';
})

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

//Dom api training
console.log(document.documentElement);
const header = document.querySelector('.header');

//creating and inserting elements
//.insertAdjectHTML();

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'hello customers';
// header.prepend(message);
// header.append(message);
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);

//Deleting elements
const btnText = document.querySelector('.btn--text');
btnText.addEventListener('click', function(){
  // btnText.remove();
  // message.parentElement.removeChild(message);
});

//Styles
console.log(getComputedStyle(message));
// console.log(document.documentElement.style.setProperty('--color-primary', '#000'));

//Attributes
const logo = document.querySelector('.nav__logo')
console.log(logo.alt);
console.log(logo.className);

//non-standard
console.log(logo.getAttribute('src'));
logo.setAttribute('name', 'nickel');
console.log(logo.getAttribute('name'));

//Date attributes
console.log(logo.dataset.nickel);

//Classes
logo.classList.add('a');
logo.classList.remove('a');
logo.classList.toggle('a');
logo.classList.contains('a');

// Don't use it
// logo.className = 'nickel';

//More Event
// const h1 = document.querySelector('h1');
// const notiH1 = function(e){
//   alert('adkadada');
//   setTimeout(function(){
//     h1.removeEventListener('mouseenter', notiH1);
//   }, 3000);
// }

// h1.addEventListener('mouseenter', notiH1);

const randomInt = function(min, max){
  return Math.floor((Math.random() * (max-min)) + 1) + min;
}

const randomColor = function(){
  return `rgb(${randomInt(0, 255), randomInt(0, 255), randomInt(0, 255)})`;
}

// Dom traverse (child)
const h1= document.querySelector('h1');
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);

// Dom traverse (parent)
console.log(h1.parentNode);
console.log(h1.parentElement);
console.log(h1.closest('.header'));

// Dom traverse (sibling)
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.parentElement.children);

// const observerCallback = function(entries, observer){
//   console.log(entries);
// }

// const optionObserver = {
//   root: null,
//   threshold: 0.2
// }

// const section1Observer = new IntersectionObserver(observerCallback, optionObserver)
// section1Observer.observe(section1);

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
