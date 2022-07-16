const loginButton = document.querySelector('.login-button');
const mobileLogin = document.querySelector('.mobile-login');
const loginPopUp = document.querySelector('.login-pop-up');
const popUpWrapper = document.querySelector('.login-pop-up-wrapper');
// const wrapperLogin = document.querySelector('.wrapper');
const registerLink = document.querySelector('.register-link');

const inputs = document.querySelectorAll('.input-field');

const popUpTitle = document.querySelector('.pop-up-title');
const noAccount = document.querySelector('.no-account');
const signInDirectlyBtn = document.querySelector('.sign-in-directly');

const socialsLogin = document.querySelector('.socials-login')
const dividerSocials = document.querySelector('.divider-socials');
const forgotPsw = document.querySelector('.forgot-psw-wrapper');

const hiddenElements = [socialsLogin, dividerSocials, forgotPsw];

const signInForm = document.querySelector('.form-sign-in');

//Login pop-up apperance-closure
loginButton.onclick = function () {
  loginPopUp.classList.toggle('pop-up-active');
  popUpWrapper.classList.toggle('pop-up-wrapper-hidden');  
}

popUpWrapper.onclick = function () {
  loginPopUp.classList.toggle('pop-up-active');
  popUpWrapper.classList.toggle('pop-up-wrapper-hidden');
}

mobileLogin.onclick = function () {
  loginPopUp.classList.toggle('pop-up-active');
  popUpWrapper.classList.toggle('pop-up-wrapper-hidden');  
}

//Sign in button click + alert
signInDirectlyBtn.onclick = function () {
  let email = inputs[0].value;
  let password = inputs[1]. value;
  if (signInDirectlyBtn.textContent === 'Sign In') {
    alert(`Введены данные для входа:\nEmail: ${email}\nPassword: ${password}`);
  } else {
    alert(`Введены данные для регистрации:\nEmail: ${email}\nPassword: ${password}`);
  }
}

const toLogin = () => {
  if (registerLink.innerHTML === 'Register') {
    popUpTitle.innerHTML = 'Create account';
    signInDirectlyBtn.innerHTML = 'Sign Up';
    noAccount.innerHTML = 'Already have an account?';
    registerLink.innerHTML = 'Log in';

    popUpTitle.style.marginBottom = '20px';

    hiddenElements.forEach((hiddenEl) => {
      hiddenEl.style.display = 'none';
    });
  } else {
    popUpTitle.innerHTML = 'Log in to your account';
    signInDirectlyBtn.innerHTML = 'Sign In';
    noAccount.innerHTML = 'Don’t have an account?';
    registerLink.innerHTML = 'Register';

    popUpTitle.style.marginBottom = '0px';

    hiddenElements.forEach((hiddenEl) => {
      hiddenEl.style.display = 'flex';
    });

  }
}

registerLink.onclick = toLogin;