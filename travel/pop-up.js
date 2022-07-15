const loginButton = document.querySelector('.login-button');
const loginPopUp = document.querySelector('.login-pop-up');
const wrapperLogin = document.querySelector('.wrapper');

loginButton.onclick = function () {
  loginPopUp.classList.add('pop-up-active');
  // wrapperLogin.classList.add('wrapper-overlay');
}


document.addEventListener('click', (event) => {
    if (event.target != loginPopUp && event.target != loginButton) {
      loginPopUp.classList.remove('pop-up-active');
      // wrapperLogin.classList.remove('wrapper-overlay');
    }
});