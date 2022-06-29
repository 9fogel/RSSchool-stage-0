const navigation = document.querySelector('.navigation');
const burgerMenu = document.querySelector('.burger');
const closeMenuButton = document.querySelector('.nav-close');
const navList = document.querySelector('.nav-list');
// const emptySpace

burgerMenu.onclick = function () {
  navigation.classList.add('navigation-active');
}

closeMenuButton.onclick = function () {
  navigation.classList.remove('navigation-active');
}

navList.onclick = function () {
  navigation.classList.remove('navigation-active');
}

// emptySpace.onclick = function () {
//   navigation.classList.remove('navigation-active');
// }




console.log("Score: 110 / 100\n\n- [x] Вёрстка валидная (+10)\n\n- [x] Вёрстка семантическая (+20)\nВ коде странице присутствуют следующие элементы (указано минимальное количество, может быть больше):\n* <header>, <main>, <footer> +3\n* четыре элемента <section> (по количеству секций) +3\n* только один заголовок <h1> +3\n* три заголовка <h2> (количество секций минус одна, у которой заголовок <h1>) +3\n* один элемент <nav> (панель навигации) +3\n* два списка ul > li > a (панель навигации, ссылки на соцсети) +3\n* четыре кнопки <button> +2\n\n- [x] Вёрстка соответствует макету (+48)\n* блок <header> +6\n* секция preview +9\n* секция steps +9\n* секция destinations +9\n* секция stories +9\n* блок <footer> +6\n\n- [x] Требования к css (+12)\n* для построения сетки используются флексы или гриды +2\n* при уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону +2\n* фоновый цвет тянется на всю ширину страницы +2\n* иконки добавлены в формате .svg. SVG может быть добавлен любым способом. Оращаем внимание на формат, а не на способ добавления +2\n* изображения добавлены в формате .jpg +2\n* есть favicon +2\n\n- [x] Интерактивность, реализуемая через css (+20)\n* плавная прокрутка по якорям +5\n* ссылки в футере ведут на гитхаб автора проекта и на страницу курса https://rs.school/js-stage0/ +5\n* интерактивность включает в себя не только изменение внешнего вида курсора, например, при помощи свойства cursor: pointer, но и другие визуальные эффекты, например, изменение цвета фона или цвета шрифта. Если в макете указаны стили при наведении и клике, для элемента указываем эти стили. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета +5\n* обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы +5\n");