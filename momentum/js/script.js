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
console.log(name);

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