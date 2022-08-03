//Clock & calendar
const time = document.querySelector('.time');
const date = document.querySelector('.date');

const fullDate = new Date();
const curTime = fullDate.toLocaleTimeString('en-EN', {hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric'});

const options = {month: 'long', day: 'numeric',};
const curDate = fullDate.toLocaleDateString('en-EN', options);
const dayOftheWeek = fullDate.getDay();

const daysOftheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

showDate();
time.textContent = curTime;

setTimeout(function showTime(){
  const fullDate = new Date();
  const curTime = fullDate.toLocaleTimeString('en-EN', {hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric'});

  time.textContent = curTime;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}, 1000);

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
window.addEventListener('load', showGreeting);


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
  return Math.floor(Math.random() * (max - min)) + min;
}

let randomNum = (getRandomNum(1, 21));

function setBg () {
  const timeOfDay = getTimeOfDay();
  const bgNum = randomNum.toString().padStart(2, "0");

  const bgImage = new Image();
  bgImage.src = `https://raw.githubusercontent.com/9fogel/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  bgImage.onload = () => {
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


//Weather widget
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDesc = document.querySelector('.weather-description');
const userCity = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity.value}&lang=en&appid=2798d3ecd30e6ab70551a54dcef7db53&units=metric`;
  const res = await fetch(url);

  if (res.ok) {
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDesc.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherError.textContent = '';
    } else {
      const data = await res.json();
      weatherError.textContent = `Error! city not found for '${userCity.value}'`;
      // alert('Error HTTP: ' + res.status);
      temperature.textContent = '';
      weatherDesc.textContent = '';
      wind.textContent = '';
      humidity.textContent = '';
      weatherIcon.className = 'weather-icon owf';
      }
}

userCity.addEventListener('change', getWeather);

function setLocalStorageCity() {
  localStorage.setItem('userCity', userCity.value);
}

window.addEventListener('beforeunload', setLocalStorageCity);

function getLocalStorageCity() {
  if (localStorage.getItem('userCity')) {
    userCity.value = localStorage.getItem('userCity');
    getWeather();
  } else if (localStorage.getItem('userCity') === '') {
    userCity.value = 'Minsk';
    getWeather();
  }
}

window.addEventListener('load', getLocalStorageCity);

//Quotes widget
const quoteText = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');
const changeQuoteBtn = document.querySelector('.change-quote');

async function getQuotes() {
  const quotes = './assets/quotesEn.json';
  const res = await fetch(quotes);
  const data = await res.json();
  const quoteNum = getRandomNum(0, 5);

  quoteText.textContent = data[quoteNum].text;
  quoteAuthor.textContent = data[quoteNum].author;
  console.log(data);
}
getQuotes();

window.addEventListener('load', getQuotes);
changeQuoteBtn.addEventListener('click', getQuotes);