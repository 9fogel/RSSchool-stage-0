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
userCity.onchange = function () {
  userCity.classList.remove('default');
}

function setLocalStorageCity() {
    localStorage.setItem('userCity', userCity.value);
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
    setLocalStorageSettings();
    getLocalStorageSettings();
    getQuotes();
    if (settingsState.language === 'ru') {
      getLocalStorageCity();
      getLocalStorage();
      translateToRu();
      showDate();
      showGreeting();
    }
    if (settingsState.language === 'en') {
      getLocalStorageCity();
      getLocalStorage();
      translateToEn();
      showDate();
      showGreeting();
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
    if (localStorage.getItem('userCity') === '' && userCity.classList.contains('default')) {
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
  if (localStorage.getItem('userCity') === '' && userCity.classList.contains('default')) {
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
  emptyText.classList.remove('empty-text-hidden');
  const filledItems = document.querySelectorAll('.filled-item');
  if (filledItems.length !== 0) {
    addToDoBtn.classList.add('add-to-do-btn-hidden');
    emptyText.classList.add('empty-text-hidden');
    newToDo.classList.add('to-do-input-visible');
  }
  console.log(filledItems);
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
      }
    }
  })
}

addToDoBtn.onclick = function () {
  newToDo.classList.add('to-do-input-visible');
  addToDoBtn.classList.add('add-to-do-btn-hidden');
  emptyText.classList.add('empty-text-hidden');
}

const moreActionsIcon = document.querySelector('.more-actions');
const dropdown = document.querySelector('.dropdown');

moreActionsIcon.onclick = function () {
  dropdown.classList.toggle('drop-down-hidden');
}

const actionClear = document.querySelector('.action-clear');
const actionEdit = document.querySelector('.action-edit');

actionClear.onclick = function () {
  const filledItems = document.querySelectorAll('.filled-item');
  filledItems.forEach((filledItem) => {
    toDoList.removeChild(filledItem);
  });
  dropdown.classList.add('drop-down-hidden');
}

// function showMoreActionsItem() {
//   const moreMenuItem = document.querySelector('.more-menu-item');
// console.log(moreMenuItem);
// }

// showMoreActionsItem();

actionEdit.onclick = function () {
  const filledItems = document.querySelectorAll('.filled-item');
  filledItems.forEach((filledItem) => {
    filledItem.setAttribute('contenteditable', 'true');
  });
  dropdown.classList.add('drop-down-hidden');
}

console.log('Score: 118 / 150\n\n- [x] Часы и календарь (+15)\n* время выводится в 24-часовом формате, например: 21:01:00 +5\n* время обновляется каждую секунду - часы идут. Когда меняется одна из цифр, остальные при этом не меняют своё положение на странице (время не дёргается) +5\n* выводится день недели, число, месяц, например: "Воскресенье, 16 мая" / "Sunday, May 16" / "Нядзеля, 16 траўня" +5\nЯзык и формат вывода даты определяется языком приложения.\n* при изменении дня недели, даты, месяца эти данные меняются в приложении (в ходе кросс-чека этот пункт не проверяется)\n\n- [x] Приветствие (+10)\n* текст приветствия меняется в зависимости от времени суток (утро, день, вечер, ночь) +5\nс 6:00 до 11:59 - Good morning / Доброе утро / Добрай раніцы\nс 12:00 до 17:59 - Good afternoon / Добрый день / Добры дзень\nс 18:00 до 23:59 - Good evening / Добрый вечер / Добры вечар\nс 00:00 до 5:59 - Good night / Доброй/Спокойной ночи / Дабранач\n* при изменении времени суток, если в это время приложение открыто, меняется текст приветствия (в ходе кросс-чека этот пункт не проверяется)\n* пользователь может ввести своё имя. При перезагрузке страницы приложения имя пользователя сохраняется, данные о нём хранятся в local storage +5\n\n- [x] Смена фонового изображения (+20)\n*ссылка на фоновое изображение формируется с учётом времени суток и случайного номера изображения (от 01 до 20) +5\nПример ссылки на фоновое изображение: https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg, здесьevening - время суток, другие значения afternoon, morning, night\n18 - рандомный (случайный) номер изображения, от 01 до 20.\n* изображения можно перелистывать кликами по стрелкам, расположенным по бокам экрана.\n* изображения перелистываются последовательно - после 18 изображения идёт 19 (клик по правой стрелке), перед 18 изображением идёт 17 (клик по левой стрелке) +5\n* изображения перелистываются по кругу: после двадцатого изображения идёт первое (клик по правой стрелке), перед 1 изображением идёт 20 (клик по левой стрелке) +5\n* при смене слайдов важно обеспечить плавную смену фоновых изображений. Не должно быть состояний, когда пользователь видит частично загрузившееся изображение или страницу без фонового изображения. Плавную смену фоновых изображений не проверяем: 1) при загрузке и перезагрузке страницы 2) при открытой консоли браузера 3) при слишком частых кликах по стрелкам для смены изображения +5\n\n- [x] Виджет погоды (+15)\n* город по умолчанию - Минск, пока пользователь не ввёл другой город\n* при перезагрузке страницы приложения указанный пользователем город сохраняется, данные о нём хранятся в local storage +5\n* для указанного пользователем населённого пункта выводятся данные о погоде, если их возвращает API\n* данные о погоде включают в себя: иконку погоды, описание погоды, температуру в °C, скорость ветра в м/с, относительную влажность воздуха в %. Числовые параметры погоды округляются до целых чисел +5\n* выводится уведомление об ошибке при вводе некорректных значений, для которых API не возвращает погоду (пустая строка или бессмысленный набор символов) +5\n\n- [x] Виджет цитата дня (+10)\n* при загрузке страницы приложения отображается рандомная цитата и её автор +5\nВ качестве источника цитаты можно использовать как API, так и созданный вами или найденный в интернете JSON-файл с цитатами и их авторами. API с цитатами не отличаются надёжностью и долговечностью, используемый в качестве источника цитат собственный JSON-файл гарантирует работоспособность вашего приложения. Запросы к JSON также осуществляются асинхронно, таким образом необходимые знания о работе с асинхронными запросами вы получите\n* при перезагрузке страницы цитата обновляется (заменяется на другую). Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) +5\n\n- [x] Аудиоплеер (+15)\n* при клике по кнопке Play/Pause проигрывается первый трек из блока play-list, иконка кнопки меняется на Pause +3\n* при клике по кнопке Play/Pause во время проигрывания трека, останавливается проигрывание трека, иконка кнопки меняется на Play +3\n* треки можно пролистывать кнопками Play-next и Play-prev\n* треки пролистываются по кругу - после последнего идёт первый (клик по кнопке Play-next), перед первым - последний (клик по кнопке Play-prev) +3\n* трек, который в данный момент проигрывается, в блоке Play-list выделяется стилем +3\n* после окончания проигрывания первого трека, автоматически запускается проигрывание следующего. Треки проигрываются по кругу: после последнего снова проигрывается первый. +3\n* Для удобства проверки треки возьмите небольшой продолжительности. Обрезать треки можно здесь: https://mp3cut.net/ru/\n* плейлист генерируется средствами JavaScript (в ходе кросс-чека этот пункт не проверяется)\n\n- [ ] Продвинутый аудиоплеер (реализуется без использования библиотек) (0)\n\n- [x] Перевод приложения на два языка (en/ru или en/be) (+15)\nПеревод приложения на два языка (en/ru или en/be) +15\nДля перевода приложения может использоваться библиотека, например, i18n или аналогичная.\n* переводится язык и меняется формат отображения даты +3\n* переводится приветствие и placeholder +3\n* переводится прогноз погоды в т.ч описание погоды (OpenWeatherMap API предоставляет такую возможность) и город по умолчанию +3\n* переводится цитата дня (используйте подходящий для этой цели API, возвращающий цитаты на нужном языке или создайте с этой целью JSON-файл с цитатами на двух языках) +3\n* переводятся настройки приложения. При переключении языка приложения в настройках, язык настроек тоже меняется +3\n* не переводятся данные, которые вводит пользователь: имя, город, тег для получения фонового изображения от API\n\n- [ ] Получение фонового изображения от API (0)\n\n- [x] Настройки приложения (+8)\n* в настройках приложения можно указать язык приложения (en/ru или en/be) +3* настройки приложения сохраняются при перезагрузке страницы +5\n\n- [x] Дополнительный функционал на выбор (+10)\nДостаточно выполнить только один из предложенных пунктов на ваш выбор.\n* ToDo List - список дел (как в оригинальном приложении) +10\n\n');
