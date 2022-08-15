const settingsState = {
  language: 'en',
  photoSource: 'github',
  // blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio', 'todolist']
}

function setLocalStorageSettings() {
  localStorage.setItem('settings', settingsState.language);
}

//Clock & calendar
const time = document.querySelector('.time');
const date = document.querySelector('.date');

const fullDate = new Date();
const curTime = fullDate.toLocaleTimeString(`${settingsState.language}`, {hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric'});

const options = {month: 'long', day: 'numeric',};
const curDate = fullDate.toLocaleDateString(`${settingsState.language}`, options);
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
  // const curDate = fullDate.toLocaleDateString('en-EN', options);
  const curDate = fullDate.toLocaleDateString(`${settingsState.language}`, options);
  const dayOftheWeek = fullDate.getDay();

  const daysOftheWeekEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daysOftheWeekRu = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  if (settingsState.language === 'en') {
    date.textContent = daysOftheWeekEn[dayOftheWeek] + ', ' + curDate;
  } else if (settingsState.language === 'ru') {
    date.textContent = daysOftheWeekRu[dayOftheWeek] + ', ' + curDate;
  }
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

const greetingTextEn = `Good ${timeOfDay},`;
const greetingTextRu = getTimeOfDayRu();

function getTimeOfDayRu() {
  if (timeOfDay === 'morning') {
    return 'Доброе утро, ';
  } else if (timeOfDay === 'afternoon') {
    return 'Добрый день, ';
  } else if (timeOfDay === 'evening') {
    return 'Добрый вечер, ';
  }  else if (timeOfDay === 'night') {
    return 'Доброй ночи, '
  }
}

function showGreeting() {
  if (settingsState.language === 'en') {
    greeting.textContent = greetingTextEn;
  } else if (settingsState.language === 'ru') {
    greeting.textContent = greetingTextRu;
  }
  
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
  } else {
    if (settingsState.language === 'en') {
      name.setAttribute('placeholder', '[Enter name]');
    } else if (settingsState.language === 'ru') {
      name.setAttribute('placeholder', '[Введите имя]');
    }
  }
}
window.onload = function () {
  getLocalStorage();
  getLocalStorageCity();
  getLocalStorageSettings();
  if (settingsState.language === 'ru') {
    name.setAttribute('placeholder', '[Введите имя]');
  }

}
// window.addEventListener('load', getLocalStorage);


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
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity.value}&lang=en&appid=2798d3ecd30e6ab70551a54dcef7db53&units=metric`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity.value}&lang=${settingsState.language}&appid=2798d3ecd30e6ab70551a54dcef7db53&units=metric`;
  const res = await fetch(url);

  if (res.ok) {
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDesc.textContent = data.weather[0].description;
    weatherError.textContent = '';
    if (settingsState.language === 'en') {
      wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      } else if (settingsState.language === 'ru') {
      wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
      humidity.textContent = `Влажность: ${data.main.humidity}%`;
      }
    } else {
      const data = await res.json();
      if (settingsState.language === 'en') {
        weatherError.textContent = `Error! city not found for '${userCity.value}'`;
      } else if (settingsState.language === 'ru') {
        weatherError.textContent = `Ошибка! город '${userCity.value}' не найден`;
      }
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
  if(userCity.classList.contains('default')) {
    console.log('Dont save to local storage');
  } else {
    localStorage.setItem('userCity', userCity.value);
  }
}

window.addEventListener('beforeunload', setLocalStorageCity);

function getLocalStorageCity() {
  if (localStorage.getItem('userCity')) {
    userCity.value = localStorage.getItem('userCity');
    userCity.classList.remove('default');
    getWeather();
  } 
  // else if (localStorage.getItem('userCity') === '') {
  //   if (settingsState.language === 'en') {
  //     userCity.value = 'Minsk';
  //   } else if (settingsState.language === 'ru') {
  //     userCity.value = 'Минск';
  //   }
  //   getWeather();
  // }
}

// window.addEventListener('load', getLocalStorageCity);
window.addEventListener('load', () => {
  getLocalStorageCity();
  if (localStorage.getItem('userCity') === '') {
      if (settingsState.language === 'en') {
        userCity.value = 'Minsk';
        userCity.classList.add('default');
      } else if (settingsState.language === 'ru') {
        userCity.value = 'Минск';
        userCity.classList.add('default');
      }
      getWeather();
  }
});

//Quotes widget
const quoteText = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');
const changeQuoteBtn = document.querySelector('.change-quote');

let quotes = '';
async function getQuotes() {
  
  if (settingsState.language === 'en') {
    quotes = './assets/quotesEn.json';
  } else if (settingsState.language === 'ru') {
    quotes = './assets/quotesRu.json';
  }
  const res = await fetch(quotes);
  const data = await res.json();
  const quoteNum = getRandomNum(0, 5);
  
  if (settingsState.language === 'en') {
    quoteText.textContent = data[quoteNum].text;
    quoteAuthor.textContent = data[quoteNum].author;
  } else if (settingsState.language === 'ru') {
    quoteText.textContent = data[quoteNum].text;
    quoteAuthor.textContent = data[quoteNum].author;
  }
}
getQuotes();

window.addEventListener('load', getQuotes);
changeQuoteBtn.addEventListener('click', getQuotes);

//Audioplayer
const audio = new Audio();
const playBtn = document.querySelector('.play');
const nextBtn = document.querySelector('.play-next');
const prevBtn = document.querySelector('.play-prev');

let isPlay = false;
let playNum = 0;

//Create playlist
import playList from './playList.js';

const playListContainer = document.querySelector('.play-list');

playList.forEach((elem, index) => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = playList[index].title;

  playListContainer.append(li);
});

const playItems = document.querySelectorAll('.play-item');

function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 1;
  audio.play();
  playItems[playNum].classList.add('item-active');
}

playBtn.onclick = function () {
  if(!isPlay) {
    playAudio();
    playBtn.classList.add('pause');
    isPlay = true;
  } else if (isPlay) {
    audio.pause();
    playBtn.classList.remove('pause');
    isPlay = false;
  }
}

//Play next/previous
function playNext() {
  if (playNum < playList.length - 1) {
    playItems[playNum].classList.remove('item-active');
    playNum++;
  } else {
    playItems[playNum].classList.remove('item-active');
    playNum = 0;
  }
  playAudio();
}

function playPrev() {
  if (playNum !== 0) {
    playItems[playNum].classList.remove('item-active');
    playNum--;
  } else {
    playItems[playNum].classList.remove('item-active');
    playNum = playList.length - 1;
  }
  playAudio();
}

nextBtn.onclick = function () {
  if(!isPlay) {
    playNext();
    isPlay = true;
    playBtn.classList.add('pause');
  } else if (isPlay) {
    playNext();
    isPlay = true;
  }
}

prevBtn.onclick = function () {
  if(!isPlay) {
    playPrev();
    isPlay = true;
    playBtn.classList.add('pause');
  } else if (isPlay) {
    playPrev();
    isPlay = true;
  }
}

audio.addEventListener('ended', playNext);

//Settings popup
const settings = document.querySelector('.settings');
const settingsMenu = document.querySelector('.settings-menu');

function showSettings() {
  settingsMenu.classList.toggle('settings-menu-visible');
}

settings.addEventListener('click', showSettings);

//Translation
const languages = document.querySelectorAll('.lang');
const radioBtns = document.querySelectorAll('.custom-radio');
const radioEn = document.querySelector('.english-lang');
const radioRu = document.querySelector('.russian-lang');
const langTitle = document.querySelector('.lang-title');
const langLabels = document.querySelectorAll('label');
const toDoIcon = document.querySelector('.to-do-icon');
const toDoTitle = document.querySelector('.to-do-title');
const emptyText = document.querySelector('.empty-text');
const addToDoBtn = document.querySelector('.add-to-do-btn');
const newToDo = document.querySelector('.new-to-do');

languages.forEach((lang, index) => {
  lang.onclick = function () {
    radioBtns.forEach((radio) => {
      if (radio.hasAttribute('checked')) {
        radio.removeAttribute('checked');
        radio.classList.remove('checked');
      }
    });
    radioBtns[index].setAttribute('checked', 'checked');
    radioBtns[index].classList.add('checked');
    settingsState.language = radioBtns[index].value;
    console.log(settingsState.language);
    setLocalStorageSettings();
    getLocalStorageSettings();
    getQuotes();
    if (settingsState.language === 'ru') {
      getLocalStorageCity();
      getLocalStorage();
      translateToRu();
    }
    if (settingsState.language === 'en') {
      getLocalStorageCity();
      getLocalStorage();
      translateToEn();
    }
  }
});

window.addEventListener('beforeunload', setLocalStorageSettings);

function getLocalStorageSettings() {
  if(localStorage.getItem('settings')) {
    settingsState.language = localStorage.getItem('settings');
  }
  if(settingsState.language === 'ru') {
      radioRu.classList.add('checked');
      radioEn.classList.remove('checked');
      let checkedRadio = document.querySelector('.checked');
      checkedRadio.setAttribute('checked', 'checked');
      radioEn.removeAttribute('checked');
      langTitle.textContent = 'Выберите язык';
      langLabels[0].textContent = 'Английский';
      langLabels[1].textContent = 'Русский';
      toDoTitle.textContent = 'Сегодня';
      emptyText.textContent = 'Добавьте новую задачу';
      addToDoBtn.textContent = 'Добавить';
      newToDo.setAttribute('placeholder', 'Введите описание задачи');
      toDoIcon.textContent = 'Список дел';
    }
}

window.addEventListener('load', getLocalStorageSettings);

function translateToRu() {
    langTitle.textContent = 'Выберите язык';
    langLabels[0].textContent = 'Английский';
    langLabels[1].textContent = 'Русский';
    toDoTitle.textContent = 'Сегодня';
    emptyText.textContent = 'Добавьте новую задачу';
    addToDoBtn.textContent = 'Добавить';
    newToDo.setAttribute('placeholder', 'Введите описание задачи');
    toDoIcon.textContent = 'Список дел';
    getWeather();
    getLocalStorageCity();
    if (localStorage.getItem('userCity') === '') {
      userCity.value = 'Минск';
      userCity.classList.add('default');
    }
    getQuotes();
}

function translateToEn() {
  langTitle.textContent = 'Language';
  langLabels[0].textContent = 'English';
  langLabels[1].textContent = 'Russian';
  toDoTitle.textContent = 'Today';
  emptyText.textContent = 'Add a todo to get started';
  addToDoBtn.textContent = 'New ToDo';
  newToDo.setAttribute('placeholder', 'New ToDo');
  toDoIcon.textContent = 'To Do';
  getWeather();
  getLocalStorageCity();
  if (localStorage.getItem('userCity') === '') {
    userCity.value = 'Minsk';
    userCity.classList.add('default');
  }
  getQuotes();
}


//ToDo List
const toDoMenu = document.querySelector('.to-do-menu');
const toDoList = document.querySelector('.to-do-list')

function showToDoMenu() {
  toDoMenu.classList.toggle('to-do-menu-visible');
  newToDo.classList.remove('to-do-input-visible');
  addToDoBtn.classList.remove('add-to-do-btn-hidden');
}

toDoIcon.addEventListener('click', showToDoMenu);

// const newToDo = document.querySelector('.new-to-do');

function createToDoItem() {
  if (newToDo.value !== '' && newToDo.value !== ' ' && newToDo.value.trim() !== '') {
    const li = document.createElement('li');
    const label = document.createElement('label');
    const span = document.querySelector('span');
    const checkbox = document.createElement('input');
    const moreMenuItem = document.createElement('div');
    li.classList.add('to-do-item');
    li.classList.add('filled-item');
    toDoList.append(li);
    li.append(label);
    li.append(span);
    span.textContent = newToDo.value;
    span.classList.add('filled-item-text');
    // span.classList.remove('temperature');
    li.append(moreMenuItem);
    label.append(checkbox);
    checkbox.classList.add('custom-checkbox');
    checkbox.setAttribute('type', 'checkbox');
    moreMenuItem.classList.add('more-menu-item');
    newToDo.value = '';
    rememberCheckboxes();
  }
}

newToDo.addEventListener('change', createToDoItem);

function rememberCheckboxes() {
  const checkboxes = document.querySelectorAll('.custom-checkbox');
  checkboxes.forEach((checkbox) => {
    checkbox.onclick = function () {
      if (checkbox.classList.contains('checked')) {
        checkbox.removeAttribute('checked');
        checkbox.classList.remove('checked');
        (checkbox.parentNode).parentNode.classList.remove('crossed-item');
      } else {
        checkbox.setAttribute('checked', 'checked');
        checkbox.classList.add('checked');
        (checkbox.parentNode).parentNode.classList.add('crossed-item');
        console.log('line-through');
        console.log((checkbox.parentNode).parentNode);
      }
    }
  })
  console.log(checkboxes);
}

addToDoBtn.onclick = function () {
  newToDo.classList.add('to-do-input-visible');
  addToDoBtn.classList.add('add-to-do-btn-hidden');
  emptyText.classList.add('empty-text-hidden');
}

const moreActionsIcon = document.querySelector('.more-actions');
const dropdown = document.querySelector('.dropdown');
// const moreMenuItem = document.querySelector('.more-menu-item');

moreActionsIcon.onclick = function () {
  dropdown.classList.toggle('drop-down-hidden');
}

// moreMenuItem.onclick = function () {
//   console.log('More Actions Item');
// }

