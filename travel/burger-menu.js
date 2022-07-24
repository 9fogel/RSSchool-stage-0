const navigation = document.querySelector('.navigation');
const burgerMenu = document.querySelector('.burger');
const closeMenuButton = document.querySelector('.nav-close');
const navList = document.querySelector('.nav-list');
const wrapper = document.querySelector('.wrapper');

burgerMenu.onclick = function () {
  navigation.classList.add('navigation-active');
  wrapper.classList.add('wrapper-overlay');
}

closeMenuButton.onclick = function () {
  navigation.classList.remove('navigation-active');
  wrapper.classList.remove('wrapper-overlay');
}

navList.onclick = function () {
  navigation.classList.remove('navigation-active');
  wrapper.classList.remove('wrapper-overlay');
}

const closeMobileMenu = () => {
  if (window.innerWidth <= 391) {
  document.addEventListener('click', (event) => {
      if (event.target != burgerMenu) {
        navigation.classList.remove('navigation-active');
        wrapper.classList.remove('wrapper-overlay');
        }
      });
}
}

closeMobileMenu();







// console.log("Score: 85 / 75\n\n- [x] Вёрстка соответствует макету. Ширина экрана 390px (+48)\n* блок <header> +6\n* секция preview +9\n* секция steps +9\n* секция destinations +9\n* секция stories +9\n* блок <footer> +6\n\n- [x] Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется (+15)\n* нет полосы прокрутки при ширине страницы от 1440рх до 390px +7\n* нет полосы прокрутки при ширине страницы от 390px до 320рх +8\n\n- [x] На ширине экрана 390рх и меньше реализовано адаптивное меню (+22)\n* при ширине страницы 390рх панель навигации скрывается, появляется бургер-иконка +2\n* при нажатии на бургер-иконку плавно появляется адаптивное меню +4\n* адаптивное меню соответствует макету +4\n* при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран +4\n* ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +4 (все кроме Account, она пока что просто закрывает меню)\n* при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +4");