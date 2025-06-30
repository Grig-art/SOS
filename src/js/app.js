// language-toggle.js
document.addEventListener("DOMContentLoaded", () => {
  const selector = document.querySelector(".language-selector");
  if (!selector) return;

  selector.addEventListener("click", (e) => {
    e.stopPropagation();
    selector.classList.toggle("open");
  });

  document.addEventListener("click", () => {
    selector.classList.remove("open");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".accordion details");

  accordions.forEach((details) => {
    details.addEventListener("toggle", () => {
      if (details.open) {
        accordions.forEach((el) => {
          if (el !== details) el.removeAttribute("open");
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {

  const slides = Array.from(document.querySelectorAll(".slider__slide"));
  const arrow = document.querySelector(".slider__arrow");


  const posMods = ["first", "second", "three"];
  let offset = 0; 

  arrow.addEventListener("click", () => {

    offset = (offset + 1) % slides.length;

    slides.forEach((slide, idx) => {
      slide.classList.remove(
        "slider__slide--first",
        "slider__slide--second",
        "slider__slide--three",
        "is-active-1",
        "is-active-2",
        "is-active-3"
      );


      const newPos = (idx - offset + slides.length) % slides.length;


      slide.classList.add(
        `slider__slide--${posMods[newPos]}`,
        `is-active-${newPos + 1}`
      );
    });
  });
});

document.body.addEventListener("click", (event) => {
  // ...
});
const burger = document.querySelector(".burger");
const nav = document.querySelector(".header__nav");

burger.addEventListener("click", () => {
  nav.classList.toggle("active");
});

document.body.addEventListener("click", (event) => {

  if (!burger.contains(event.target) && !nav.contains(event.target)) {
    nav.classList.remove("active"); 
  }
});
