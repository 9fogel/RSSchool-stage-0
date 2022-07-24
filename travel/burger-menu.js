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




console.log("Score: 125 / 100\n\n- [x] Слайдер изображений в секции destinations (++50)\n* на десктоп варианте при клике на урезанную картинку слева или справа изображение меняется по принципу карусели (например если нажать правую картинку та что была в центре на уезжает налево, а та что была видна наполовину оказывается справа). Слайдер может быть как конечным так и бесконечным - данный критерий не должен влиять на оценку +20\n* Три точки внизу отображают номер слайда, то есть каждому слайду соответствует свой кружочек, который становится активным при нахождении соответствующего ему слайда в центре. На мобильном варианте картинка одна, но поверх нее появляются стрелочки навигации (можно сделать как карусель или же затемнять кнопку если слайдер достиг края) +20\n* Анимации плавного перемещения для слайдера +10\n\n- [x] Нажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап (+50)\n* логин попап соответствует верстке его закрытие происходит при клике вне попапа +25\n* логин попап имеет 2 инпута (email и пароль) при нажатии на кнопку Sign In показывается браузерный алерт с введенными данными (для реализации можно использовать тег ) +25\n\n- [x] Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение). (+25)");