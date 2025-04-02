////////////////////////////////////////////////////
// OPEN AND CLOSE SEARCH MODAL
////////////////////////////////////////////////////
const openSearchEl = document.querySelector(".nav-icons__link--search");
const closeSearchEl = document.querySelector(".search-modal__close");

const searchModalEl = document.querySelector(".search-modal");

// open search modal
openSearchEl.onclick = function (e) {
  searchModalEl.classList.add("active");
};

// close search modal
searchModalEl.onclick = closeSearchEl.onclick = function (e) {
  const isSearch = e.target.closest(".search-modal__container");
  if (!isSearch) {
    searchModalEl.classList.remove("active");
  }
};

////////////////////////////////////////////////////
// OPEN AND CLOSE MENU SLIDER
// OPEN MENU FOR MINI SCREEN (SCREEN HAVE WIDTH BELOW 1200px)
////////////////////////////////////////////////////

const openMenuSliderEl = document.querySelector(".nav-icons__link--menu");
const closeMenuSliderEl = document.querySelector(".infor__close");

const menuSliderEl = document.querySelector(".header__infor-box");
const menuSliderContainerEl = document.querySelector(".header__infor");

const miniScreenMenuEl = document.querySelector(".header__nav-list-father");

// open menu slider
openMenuSliderEl.onclick = function (e) {
  const windowWidth = window.innerWidth;
  if (windowWidth > 1200) {
    menuSliderEl.classList.add("active");
  } else {
    e.preventDefault();
    miniScreenMenuEl.classList.toggle("active");
  }
};

menuSliderContainerEl.onclick = function (e) {
  e.stopPropagation();
};

// close menu slider
menuSliderEl.onclick = closeMenuSliderEl.onclick = function (e) {
  menuSliderEl.classList.remove("active");
};

////////////////////////////////////////////////////
// SLIDER SECTION
////////////////////////////////////////////////////

const sliderImgBoxEl = document.querySelector(".slider__img-box");
const sliderTextBoxEL = document.querySelector(".slider__text-box");

const sliderBtnEls = document.querySelectorAll(".slider__button");

const sliderInfoArr = [
  {
    src: "./assets/img/slider-section/skiing-slider-img-1.jpg",
    alt: "A man wear a orange coat is skiing in moutains",
    subHeading: "From Alps",
    heading: "Snow Adventure",
    description: `Let's get the best trips you ever have with the cheap cost and
            excellent. Contact us immediately in today to receive coupons`,
  },
  {
    src: "./assets/img/slider-section/skiing-slider-img-2.jpg",
    alt: "Snow Mountains",
    subHeading: "Enjoy Your",
    heading: "Winter Vacation",
    description: `Let's get the best trips you ever have with the cheap cost and
            excellent. Contact us immediately in today to receive coupons`,
  },
];

let sliderImgIndex = 0;
let intervalSliderID = setInterval(changeSlider, 10000);

sliderBtnEls.forEach(function (sliderBtnEl) {
  // function conduct change slider, clear and set up interval change slider again
  sliderBtnEl.onclick = function (e) {
    changeSlider();
    clearInterval(intervalSliderID);
    intervalSliderID = setInterval(changeSlider, 10000);
  };
});

// Function uses information from sliderInfoArr to innerHTML into Elements
function changeSlider() {
  if (sliderImgIndex === 0) {
    // change slider image
    sliderImgBoxEl.innerHTML = `
      <img
          src="${sliderInfoArr[1].src}"
          alt="${sliderInfoArr[1].alt}"
          class="slider__img"
        />`;
    // change slider text
    sliderTextBoxEL.innerHTML = `
        <span class="slider__sub-heading">${sliderInfoArr[1].subHeading}</span>
        <h1 class="slider__heading">${sliderInfoArr[1].heading}</h1>
        <p class="slider__description">
          ${sliderInfoArr[1].description}
        </p>`;
    // sync for interval
    sliderImgIndex = 1;
  } else {
    // change slider image
    sliderImgBoxEl.innerHTML = `
      <img
          src="${sliderInfoArr[0].src}"
          alt="${sliderInfoArr[0].alt}"
          class="slider__img"
        />`;
    // change slider text
    sliderTextBoxEL.innerHTML = `
       <span class="slider__sub-heading">${sliderInfoArr[0].subHeading}</span>
        <h1 class="slider__heading">${sliderInfoArr[0].heading}</h1>
        <p class="slider__description">
        ${sliderInfoArr[0].description}
        </p>`;
    // sync for interval
    sliderImgIndex = 0;
  }
}

////////////////////////////////////////////////////
// MOVE PLACE BOXS
////////////////////////////////////////////////////
const placesContainerEl = document.querySelector(".places__box");
const placeDotEls = document.querySelectorAll(".dot--place-box");

// this variable is used for interval change
let indexPlaceBox = 1;

let intervalPlaceID = setInterval(placeInterval, 10000);

placeDotEls.forEach(function (placeDotEl, index) {
  placeDotEl.onclick = function () {
    const windowWidth = window.innerWidth;
    // move place box
    changePlaceBox(index);
    // adjust highlight Dot
    highlightDot(placeDotEls, index);
    // change indexPlaceBox for interval
    if (windowWidth > 896) {
      if (index === 0) {
        indexPlaceBox = 1;
      } else {
        indexPlaceBox = 0;
      }
    } else if (windowWidth > 656) {
      if (index < 2) {
        indexPlaceBox = index + 1;
      } else {
        indexPlaceBox = 0;
      }
    } else {
      if (index < 5) {
        indexPlaceBox = index + 1;
      } else {
        indexPlaceBox = 0;
      }
    }
    // clear and set new interval to sync with user behavior
    clearInterval(intervalPlaceID);
    intervalPlaceID = setInterval(placeInterval, 10000);
  };
});

// move place box to right position user want
function changePlaceBox(index) {
  const windowWidth = window.innerWidth;
  // the placeItemEl variable contain the chill we want to scroll to. It depend on index and window.innerWidth
  let placeItemEl;
  if (index === 0) {
    placeItemEl = document.querySelector(".places__item:nth-child(1)");
  } else {
    if (windowWidth > 1408) {
      placeItemEl = document.querySelector(".places__item:nth-child(2)");
    } else if (windowWidth > 1200) {
      placeItemEl = document.querySelector(".places__item:nth-child(3)");
    } else if (windowWidth > 896) {
      placeItemEl = document.querySelector(".places__item:nth-child(4)");
    } else if (windowWidth > 656) {
      if (index === 1) {
        placeItemEl = document.querySelector(".places__item:nth-child(3)");
      } else {
        placeItemEl = document.querySelector(".places__item:nth-child(5)");
      }
    } else {
      placeItemEl = document.querySelector(
        `.places__item:nth-child(${index + 1})`
      );
    }
  }
  // let scroll to the X position of placeItemEl
  placesContainerEl.setAttribute(
    "style",
    `translate: -${placeItemEl.offsetLeft}px 0`
  );
}

function placeInterval() {
  const windowWidth = window.innerWidth;
  changePlaceBox(indexPlaceBox);
  // remove hightlight Dot and add new hightlight Dot
  highlightDot(placeDotEls, indexPlaceBox);
  if (windowWidth > 896) {
    if (indexPlaceBox === 0) {
      indexPlaceBox = 1;
    } else {
      indexPlaceBox = 0;
    }
  } else if (windowWidth > 656) {
    if (indexPlaceBox < 2) {
      indexPlaceBox += 1;
    } else {
      indexPlaceBox = 0;
    }
  } else {
    if (indexPlaceBox < 5) {
      indexPlaceBox += 1;
    } else {
      indexPlaceBox = 0;
    }
  }
}

////////////////////////////////////////////////////
// OPEN / CLOSE VIDEO MODAL
////////////////////////////////////////////////////
const playVideoEL = document.querySelector(".video__play");
const videoModalEL = document.querySelector(".video-watch");
const videoEl = document.querySelector(".video-watch__video");

// Open video modal
playVideoEL.onclick = function (e) {
  videoModalEL.classList.add("active");
};

// prevent turn off modal when click in video section
videoEl.onclick = function (e) {
  e.stopPropagation();
};

// Close video modal
videoModalEL.onclick = function (e) {
  videoModalEL.classList.remove("active");
};

////////////////////////////////////////////////////
// MOVE TESTIMONIAL
////////////////////////////////////////////////////
const testimonialDots = document.querySelectorAll(".dot--testimonial");
const testimonialScrollEL = document.querySelector(".testimonial__scroll-box");
let indexTestimonialBox = 0;

let intervalTestimonialID = setInterval(testimonialInterval, 5000);
testimonialDots.forEach(function (testimonialDot, index) {
  testimonialDot.onclick = function (e) {
    changeTestimonialBox(index);
    // remove hightlight Dot and add new hightlight Dot
    highlightDot(testimonialDots, index);

    const windowWidth = window.innerWidth;
    if (windowWidth > 1408) {
      if (index < 2) {
        indexTestimonialBox = index + 1;
      } else {
        indexTestimonialBox = 0;
      }
    } else if (windowWidth > 896) {
      if (index < 3) {
        indexTestimonialBox = index + 1;
      } else {
        indexTestimonialBox = 0;
      }
    } else {
      if (index < 6) {
        indexTestimonialBox = index + 1;
      } else {
        indexTestimonialBox = 0;
      }
    }
    clearInterval(intervalTestimonialID);
    intervalTestimonialID = setInterval(testimonialInterval, 5000);
  };
});

function changeTestimonialBox(index) {
  const windowWidth = window.innerWidth;
  let testimonialItemEl;
  if (index === 0) {
    testimonialItemEl = document.querySelector(
      ".testimonial__item:nth-child(1)"
    );
  } else if (windowWidth > 1408) {
    if (index === 1) {
      testimonialItemEl = document.querySelector(
        ".testimonial__item:nth-child(4)"
      );
    } else {
      testimonialItemEl = document.querySelector(
        ".testimonial__item:nth-child(5)"
      );
    }
  } else if (windowWidth > 896) {
    if (index === 1) {
      testimonialItemEl = document.querySelector(
        ".testimonial__item:nth-child(3)"
      );
    } else if (index === 2) {
      testimonialItemEl = document.querySelector(
        ".testimonial__item:nth-child(5)"
      );
    } else {
      testimonialItemEl = document.querySelector(
        ".testimonial__item:nth-child(6)"
      );
    }
  } else if (windowWidth <= 896) {
    testimonialItemEl = document.querySelector(
      `.testimonial__item:nth-child(${index + 1})`
    );
  }
  const testimonialEl = document.querySelector(".testimonial");
  const scrollTestimonialEl = document.querySelector(
    ".testimonial__scroll-box"
  );
  // can't just use testimonialItemEl.offsetLeft because testimonialEl.offsetWidth is not same with scrollTestimonialEl.offsetWidth (because padding left and right) so we need to handle before scroll
  const widthToScroll =
    testimonialItemEl.offsetLeft -
    (testimonialEl.offsetWidth - scrollTestimonialEl.offsetWidth) / 2;
  testimonialScrollEL.scrollTo(`${widthToScroll}`, 0);
}

function testimonialInterval() {
  changeTestimonialBox(indexTestimonialBox);
  // remove hightlight Dot and add new hightlight Dot
  highlightDot(testimonialDots, indexTestimonialBox);
  if (indexTestimonialBox < 2) {
    indexTestimonialBox += 1;
  } else {
    indexTestimonialBox = 0;
  }
}
////////////////////////////////////////////////////
// STICKY HEADING
////////////////////////////////////////////////////
const sliderEl = document.querySelector(".slider");
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    const bodyEl = document.querySelector("body");

    if (ent.isIntersecting) {
      bodyEl.classList.remove("sticky");
    } else {
      bodyEl.classList.add("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sliderEl);

////////////////////////////////////////////////////
// SCROLL LOOP
////////////////////////////////////////////////////
const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach(function (scroller) {
    // add data-animated = "true" make scroller active
    scroller.setAttribute("data-animated", true);

    // duplicate scrollInner's children
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      // avoid repeat elements when user use screen reader
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

////////////////////////////////////////////////////
// GENERAL FUNCTION
////////////////////////////////////////////////////

// clear highlight Dot and add new highlight Dot
function highlightDot(array, hightlightIndex) {
  for (el of array) {
    if (el.classList.contains("active")) {
      el.classList.remove("active");
    }
  }
  array[hightlightIndex].classList.add("active");
}
