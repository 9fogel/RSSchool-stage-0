//Clock & calendar
const time = document.querySelector('.time');
const date = document.querySelector('.date');

const fullDate = new Date();
const curTime = fullDate.toLocaleTimeString('en-EN', {hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric'});

const options = {month: 'long', day: 'numeric',};
const curDate = fullDate.toLocaleDateString('en-EN', options);
const dayOftheWeek = fullDate.getDay();

const daysOftheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


setTimeout(function showTime(){
  const fullDate = new Date();
  const curTime = fullDate.toLocaleTimeString('en-EN', {hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric'});

  time.textContent = curTime;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}, 1000);


// showTime();

function showDate() {
  const fullDate = new Date();
  const options = {month: 'long', day: 'numeric',};
  const curDate = fullDate.toLocaleDateString('en-EN', options);
  const dayOftheWeek = fullDate.getDay();

  const daysOftheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  date.textContent = daysOftheWeek[dayOftheWeek] + ', ' + curDate;
}


//Greeting
const greeting = document.querySelector('.greeting');
const timeOfDay = getTimeOfDay();

function getTimeOfDay() {
  const hours = fullDate.getHours();
  if (hours >= 6 && hours <= 11) {
    return 'morning';
  } else if (hours >= 12 && hours <= 17) {
    return 'afternoon';
  } else if (hours >= 18 && hours <= 23) {
    return 'evening';
  } else if (hours >= 0 && hours <= 5) {
    return 'night';
  }
}

const greetingText = `Good ${timeOfDay},`;

function showGreeting() {
  greeting.textContent = greetingText;
}

getTimeOfDay();
// showGreeting();

//Save name to local storage
const name = document.querySelector('.name');

function setLocalStorage() {
  localStorage.setItem('name', name.value);
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}

window.addEventListener('load', getLocalStorage);

//Background slider
const body = document.querySelector('body');

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

let randomNum = (getRandomNum(1, 21));

function setBg () {
  const timeOfDay = getTimeOfDay();
  const bgNum = randomNum.toString().padStart(2, "0");

  const bgImage = new Image();
  bgImage.src = `https://raw.githubusercontent.com/9fogel/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  // const bgLink = `https://raw.githubusercontent.com/9fogel/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  bgImage.onload = () => {
    // body.style.backgroundImage = `url(${bgLink})`;
    body.style.backgroundImage = `url(${bgImage.src})`;
  }
  
}

setBg ();

const previousSlide = document.querySelector('.slide-prev');
const nextSlide = document.querySelector('.slide-next');

function getSlideNext() {
  if (randomNum < 20) {
    randomNum++;
    setBg();
  } else if (randomNum = 20) {
    randomNum = 1;
    setBg();
  }
  
}

function getSlidePrev() {
  if (randomNum > 1) {
    randomNum--;
    setBg();
  } else if (randomNum = 1) {
    randomNum = 20;
    setBg();
  }
}

nextSlide.addEventListener('click', getSlideNext);
previousSlide.addEventListener('click', getSlidePrev);
console.log(randomNum);