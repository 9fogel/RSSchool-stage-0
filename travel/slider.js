let slider = document.querySelector('.slider-list');
let sliderItems = document.querySelectorAll('.slider-item');
let paginationCircles = document.querySelectorAll('.pagination-circle');
let leftControl = document.querySelector('.left-arrow');
let rightControl = document.querySelector('.right-arrow');
let paginationCirclesMobile = document.querySelectorAll('.pagination-circle-mobile');

if (window.innerWidth > 391) {
  sliderItems.forEach((sliderItem) => {
  sliderItem.onclick = function () {
    if (sliderItem.classList.contains('left-item')) {
      slider.classList.add('to-right');
      document.querySelector('.active-item').classList.add('.moved-right');
      paginationCircles[0].setAttribute('src', './assets/img/pagination-active.svg');
      paginationCircles[1].setAttribute('src', './assets/img/pagination.svg');
    } else if (sliderItem.classList.contains('right-item')) {
      slider.classList.add('to-left');
      document.querySelector('.active-item').classList.add('.moved-left');
      paginationCircles[2].setAttribute('src', './assets/img/pagination-active.svg');
      paginationCircles[1].setAttribute('src', './assets/img/pagination.svg');
    } else if (sliderItem.classList.contains('active-item')) {
      if (document.querySelector('.active-item').classList.contains('.moved-right')) {
        slider.classList.remove('to-right');
        document.querySelector('.active-item').classList.remove('.moved-right');
        paginationCircles[1].setAttribute('src', './assets/img/pagination-active.svg');
        paginationCircles[0].setAttribute('src', './assets/img/pagination.svg');
      } else if (document.querySelector('.active-item').classList.contains('.moved-left')) {
        slider.classList.remove('to-left');
        document.querySelector('.active-item').classList.remove('.moved-left');
        paginationCircles[1].setAttribute('src', './assets/img/pagination-active.svg');
        paginationCircles[2].setAttribute('src', './assets/img/pagination.svg');
      }
    }
  }
})
}


const mobileToLeft = () => {
  slider.style.transform = `translateX(calc((-860/2520*100%))`;
}

const mobileToLeftDouble = () => {
  slider.style.transform = `translateX(calc(2*(-860/2520*100%)))`;
}

const mobileToRight = () => {
  slider.style.transform = `translateX(calc((-860/2520*100%))`;
}

const mobileToRightDouble = () => {
  slider.style.transform = `translateX(0)`;
}

window.onresize = function(){
  if (window.innerWidth <= 391) {
    location.reload();
    document.querySelector('.active-item').classList.remove('.moved-right');
    document.querySelector('.active-item').classList.remove('.moved-left');
    slider.classList.remove('to-right');
    slider.classList.remove('to-left');
      }  else if (window.innerWidth > 392) {
        location.reload();
        document.querySelector('.active-item').classList.remove('moved-left');
        document.querySelector('.active-item').classList.remove('moved-right');
        document.querySelector('.active-item').classList.remove('left-end');
        slider.style.transform = null;
  }
}

if (window.innerWidth <= 391) {
  rightControl.onclick = function () {
    if (document.querySelector('.active-item').classList.contains('moved-left')) {
      rightControl.setAttribute('src', './assets/img/slider-arrow-right-inactive.svg');
      paginationCirclesMobile[1].setAttribute('src', './assets/img/pagination.svg');
      paginationCirclesMobile[2].setAttribute('src', './assets/img/pagination-active.svg');
      mobileToLeftDouble();
      document.querySelector('.active-item').classList.remove('moved-left');
      document.querySelector('.active-item').classList.add('left-end');
      } else if (document.querySelector('.active-item').classList.contains('rightend')) {
        mobileToLeft();
        document.querySelector('.active-item').classList.add('moved-left');
        leftControl.setAttribute('src', './assets/img/slider-arrow-left-active.svg');
        paginationCirclesMobile[0].setAttribute('src', './assets/img/pagination.svg');
        paginationCirclesMobile[1].setAttribute('src', './assets/img/pagination-active.svg');
        document.querySelector('.active-item').classList.remove('rightend');
        } else if (document.querySelector('.active-item').classList.contains('moved-right')) {
          mobileToLeftDouble();
          rightControl.setAttribute('src', './assets/img/slider-arrow-right-inactive.svg');
          paginationCirclesMobile[1].setAttribute('src', './assets/img/pagination.svg');
          paginationCirclesMobile[2].setAttribute('src', './assets/img/pagination-active.svg');
          document.querySelector('.active-item').classList.remove('moved-right');
          document.querySelector('.active-item').classList.add('left-end');
          } else if (document.querySelector('.active-item').classList.contains('left-end')) {
            return;
            }
    
  }
  leftControl.onclick = function () {
    if (document.querySelector('.active-item').classList.contains('left-end')) {
      mobileToRight();
      document.querySelector('.active-item').classList.add('moved-right');
      leftControl.setAttribute('src', './assets/img/slider-arrow-left-active.svg');
      rightControl.setAttribute('src', './assets/img/slider-arrow-right.svg');
      paginationCirclesMobile[1].setAttribute('src', './assets/img/pagination-active.svg');
      paginationCirclesMobile[0].setAttribute('src', './assets/img/pagination.svg');
      paginationCirclesMobile[2].setAttribute('src', './assets/img/pagination.svg');
      document.querySelector('.active-item').classList.remove('left-end');
    } else if (document.querySelector('.active-item').classList.contains('moved-right')) {
      mobileToRightDouble();
      leftControl.setAttribute('src', './assets/img/slider-arrow-left.svg');
      rightControl.setAttribute('src', './assets/img/slider-arrow-right.svg');
      paginationCirclesMobile[0].setAttribute('src', './assets/img/pagination-active.svg');
      paginationCirclesMobile[1].setAttribute('src', './assets/img/pagination.svg');
      paginationCirclesMobile[2].setAttribute('src', './assets/img/pagination.svg');
      document.querySelector('.active-item').classList.remove('moved-right');
      document.querySelector('.active-item').classList.add('rightend');
    } else if (document.querySelector('.active-item').classList.contains('moved-left')) {
      mobileToRightDouble();
      leftControl.setAttribute('src', './assets/img/slider-arrow-left.svg');
      paginationCirclesMobile[0].setAttribute('src', './assets/img/pagination-active.svg');
      paginationCirclesMobile[1].setAttribute('src', './assets/img/pagination.svg');
      paginationCirclesMobile[2].setAttribute('src', './assets/img/pagination.svg');
      document.querySelector('.active-item').classList.remove('moved-left');
      document.querySelector('.active-item').classList.add('rightend');
    }
  }
}