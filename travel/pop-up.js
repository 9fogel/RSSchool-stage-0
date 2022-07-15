const loginButton = document.querySelector('.login-button');
const loginPopUp = document.querySelector('.login-pop-up');
const wrapperLogin = document.querySelector('.wrapper');
const registerLink = document.querySelector('.register-link');

const popUpTitle = document.querySelector('.pop-up-title');
const noAccount = document.querySelector('.no-account');
const signInDirectlyBtn = document.querySelector('.sign-in-directly');

const socialsLogin = document.querySelector('.socials-login')
const dividerSocials = document.querySelector('.divider-socials');
const forgotPsw = document.querySelector('.forgot-psw-wrapper');

const hiddenElements = [socialsLogin, dividerSocials, forgotPsw];


loginButton.onclick = function () {
  loginPopUp.classList.add('pop-up-active');
  // wrapperLogin.classList.add('wrapper-overlay');
}

registerLink.addEventListener('click', (event) => {
  if (registerLink.innerHTML === 'Register') {
    popUpTitle.innerHTML = 'Create account';
    signInDirectlyBtn.innerHTML = 'Sign Up';
    noAccount.innerHTML = 'Already have an account?';
    registerLink.innerHTML = 'Log in';

    popUpTitle.style.marginBottom = '20px';

    hiddenElements.forEach((hiddenEl) => {
      hiddenEl.style.display = 'none';
    });

    console.log('Клик register');
  } 
  
  if (registerLink.innerHTML === 'Log in') {
    registerLink.onclick = function () {
      popUpTitle.innerHTML = 'Log in to your account';
      signInDirectlyBtn.innerHTML = 'Sign In';
      noAccount.innerHTML = 'Don’t have an account?';
      registerLink.innerHTML = 'Register';

      popUpTitle.style.marginBottom = '0px';

      hiddenElements.forEach((hiddenEl) => {
        hiddenEl.style.display = 'flex';
      });
    }
    console.log('Клик Log In');
  }
});


// if (registerLink.innerHTML === 'Register') {
//   registerLink.onclick = function () {
//     popUpTitle.innerHTML = 'Create account';
//     signInDirectlyBtn.innerHTML = 'Sign Up';
//     noAccount.innerHTML = 'Already have an account?';
//     registerLink.innerHTML = 'Log in';

//     popUpTitle.style.marginBottom = '20px';

//     hiddenElements.forEach((hiddenEl) => {
//       hiddenEl.style.display = 'none';
//     });
//   }

//   if (registerLink.innerHTML === 'Log in') {
//     registerLink.onclick = function () {
//       popUpTitle.innerHTML = 'Log in to your account';
//       signInDirectlyBtn.innerHTML = 'Sign In';
//       noAccount.innerHTML = 'Don’t have an account?';
//       registerLink.innerHTML = 'Register';

//       popUpTitle.style.marginBottom = '0px';

//       hiddenElements.forEach((hiddenEl) => {
//         hiddenEl.style.display = 'flex';
//       });
//     }
//   }

// }






document.addEventListener('click', (event) => {
    if (event.target != loginPopUp && event.target != loginButton && event.target != registerLink) {
      loginPopUp.classList.remove('pop-up-active');
      // wrapperLogin.classList.remove('wrapper-overlay');
    }
});