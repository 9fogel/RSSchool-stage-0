let slider = document.querySelector('.slider-list');
let sliderItems = document.querySelectorAll('.slider-item');

sliderItems.forEach((sliderItem) => {
  sliderItem.onclick = function () {
    if (sliderItem.classList.contains('left-item')) {
      slider.classList.add('to-right');
      document.querySelector('.active-item').classList.add('.moved-right');
    } else if (sliderItem.classList.contains('right-item')) {
      slider.classList.add('to-left');
      document.querySelector('.active-item').classList.add('.moved-left');
    } else if (sliderItem.classList.contains('active-item')) {
      if (document.querySelector('.active-item').classList.contains('.moved-right')) {
        slider.classList.remove('to-right');
        document.querySelector('.active-item').classList.remove('.moved-right');
      } else if (document.querySelector('.active-item').classList.contains('.moved-left')) {
        slider.classList.remove('to-left');
        document.querySelector('.active-item').classList.remove('.moved-left');
      }
    }
  }
})

// function toLeft() {
//   // document.querySelector('.left-item'). classList.remove('left-item');
//   document.querySelector('.active-item').classList.add('left-item');
//   document.querySelector('.active-item').classList.remove('active-item');
//   slider.classList.add('to-left');
//   document.querySelector('.right-item').classList.add('active-item');
//   document.querySelector('.right-item').classList.remove('right-item');
// }

// function toRight() {
//   // document.querySelector('.right-item'). classList.remove('right-item');
//   document.querySelector('.active-item').classList.add('right-item');
//   document.querySelector('.active-item').classList.remove('active-item');
//   slider.classList.add('to-right');
//   document.querySelector('.left-item').classList.add('active-item');
//   document.querySelector('.left-item').classList.remove('left-item');
// }

// document.querySelector('.right-item').addEventListener('click', function() {
//   toLeft();
//   slider.addEventListener('transitionend', function() {
//     // slider.classList.remove('to-left');
//   });
//   // slider.classList.remove('to-left');
// });

// document.querySelector('.left-item').addEventListener('click', function() {
//   toRight();
//   slider.addEventListener('transitionend', function() {
//     // slider.classList.remove('to-right');
//   });
  
// });



// document.querySelector('.left-item').addEventListener('click', function() {
//   document.querySelector('.active-item').classList.add('right-item');
//   document.querySelector('.active-item').classList.remove('active-item');
//   slider.classList.add('to-right');
//   this.classList.add('active-item');
//   this.classList.remove('left-item');
// })

// document.querySelector('.right-item').addEventListener('click', function() {
//   document.querySelector('.active-item').classList.add('left-item');
//   document.querySelector('.active-item').classList.remove('active-item');
//   slider.classList.add('to-left');
//   this.classList.add('active-item');
//   this.classList.remove('right-item');
// })



// function changeCurrentItem(n) {
//   currentItem = (n + sliderItems.length) % sliderItems.length;
// }

// function hideItem(direction) {
//   isEnabled = false;
//   sliderItems[currentItem].classList.add(direction);
//   sliderItems[currentItem].addEventListener('animationend', function () {
//     this.classList.remove('active-item', direction);
//   });
// }

// function showItem(direction) {
//   sliderItems[currentItem].classList.add('next-item', direction);
//   sliderItems[currentItem].addEventListener('animationend', function () {
//     this.classList.remove('next-item', direction);
//     this.classList.add('active-item', direction);
//     isEnabled = true;
//   });
// }

// function previousItem() {
//   hideItem('to-right');
//   changeCurrentItem(n - 1);
//   showItem('from-left');
// }

// function nextItem() {
//   hideItem('to-left');
//   changeCurrentItem(n + 1);
//   showItem('from-right');
// }

// document.querySelector('.left-item').addEventListener('click', function() {
//   // changeCurrentItem(currentItem - 1);
//   if (isEnabled) {
//     previousItem(currentItem);
//   }
// });

// document.querySelector('.right-item').addEventListener('click', function() {
//   if (isEnabled) {
//     nextItem(currentItem);
//   }
// });