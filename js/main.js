const darkModeSwitch = document.getElementById("dark-mode-switch");

darkModeSwitch.addEventListener("change", () => {
  if (darkModeSwitch.checked) {
    main.classList.add("dark-mode");
    console.log("Modo oscuro activado");
  } else {
    main.classList.remove("dark-mode");
    console.log("Modo oscuro desactivado");
  }
});

const sections = document.querySelectorAll("section");
const circleContainer = document.getElementById("circle-container");
let scrollTimeout;

sections.forEach((section, index) => {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circleContainer.appendChild(circle);

  circle.addEventListener("click", () => {
    section.scrollIntoView({ behavior: "smooth" });
  });
});

const main = document.querySelector("main");
main.addEventListener("scroll", () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  scrollTimeout = setTimeout(() => {
    const currentSectionIndex = getCurrentSectionIndex();
    updateCircle(currentSectionIndex);
  }, 100);
});

function getCurrentSectionIndex() {
  let currentIndex = 0;
  let minDistance = Infinity;

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top);

    if (distance < minDistance) {
      minDistance = distance;
      currentIndex = index;
    }
  });

  return currentIndex;
}

function updateCircle(index) {
  const circles = document.querySelectorAll(".circle");
  circles.forEach((circle, i) => {
    if (i === index) {
      circle.classList.add("fill");
    } else {
      circle.classList.remove("fill");
    }
  });
}

updateCircle(getCurrentSectionIndex());

var swiper = new Swiper(".blog-slider", {
  spaceBetween: 30,
  effect: "fade",
  loop: true,
  mousewheel: {
    invert: false,
  },

  pagination: {
    el: ".blog-slider__pagination",
    clickable: true,
  },
});

var initialSlide = $('.slides-container [data-order="1"]');
var initalSelected = $('.slide-navigation__txt [data-order="1"]');
var mq_medium = window.matchMedia("(min-width: 860px)");
var mq_big = window.matchMedia("(min-width: 1200px)");

function activate_slide(order) {
  var unactiveSlide = $(".slide.active");
  var activeSlide = $('.slides-container [data-order="' + order + '"]');

  if (!activeSlide.hasClass("active")) {
    slide_in(activeSlide);
    slide_out(unactiveSlide);
  }
}

function slide_in(slide) {
  var _this = slide;

  animation_in(slide);
  _this.addClass("active");
  TweenMax.to(_this, 1, { autoAlpha: 1 }, "-=1");
}

function slide_out(slide) {
  var _this = slide;

  _this.css("z-index", "2");
  _this.removeClass("active");
  TweenMax.to(_this, 1, { autoAlpha: 0, onComplete: removeZ });

  function removeZ() {
    _this.css("z-index", "1");
  }

  animation_out(slide);
}

function animation_in(slide) {
  var title = slide.find("h1");
  var subtitle = $(slide).find("h2");
  var text = $(slide).find("p");
  var button = $(slide).find("button");
  var image = $(slide).find("img");

  TweenMax.fromTo(
    title,
    0.6,
    { autoAlpha: 0, x: 100 },
    { autoAlpha: 0.6, x: 0, ease: Power2.easeOut }
  );
  TweenMax.fromTo(
    subtitle,
    0.5,
    { autoAlpha: 0, x: -200 },
    { autoAlpha: 1, x: 0, ease: Power2.easeOut },
    "-0.1"
  );
  TweenMax.fromTo(
    text,
    0.8,
    { autoAlpha: 0, x: 50 },
    { autoAlpha: 1, x: 0, ease: Power2.easeOut }
  );
  TweenMax.fromTo(button, 0.5, { autoAlpha: 0 }, { autoAlpha: 1 });
  TweenMax.to(image, 0, { autoAlpha: 1, scale: 1 });
}

function animation_out(slide) {
  var title = slide.find("h1");
  var subtitle = $(slide).find("h2");
  var text = $(slide).find("p");
  var button = $(slide).find("button");
  var image = $(slide).find("img");

  TweenMax.to(title, 0.6, { autoAlpha: 0, x: 0 });
  TweenMax.to(subtitle, 0.5, { autoAlpha: 0, x: 200 });
  TweenMax.to(text, 0.5, { autoAlpha: 0 });
  TweenMax.to(button, 0.5, { autoAlpha: 0 });
  TweenMax.to(image, 1, { scale: 1.1 });
}

$(".slide-navigation__txt span").on("click", function () {
  var _this = $(this);
  var order = _this.data("order");
  var spans = $(".slide-navigation__txt span");
  var current = $(".active").data("order");

  spans.removeClass("active");
  _this.addClass("active");
  activate_slide(order);
  stagger_squares(order, current);
});

function stagger_squares(order, current) {
  var mq = 0.7;
  var moveY;
  var squares = $(".slide-navigation__squares .square");
  var staggerTime = -0.12;

  if (order < current) {
    staggerTime = staggerTime * -1;
  }

  if (mq_medium.matches) {
    mq = 1;
  }
  if (mq_big.matches) {
    mq = 1.3;
  }

  moveY = (order - 1) * (15 * mq);
  TweenMax.staggerTo(squares, 0.1, { y: moveY }, staggerTime);
}

$(document).ready(function () {
  initialSlide.addClass("active");
  initalSelected.addClass("active");
  TweenMax.to(initialSlide, 0.5, { autoAlpha: 1 });
});

var btns = document.querySelectorAll(".openModalButton");

var modals = document.querySelectorAll(".modal");

var spans = document.querySelectorAll(".close");

btns.forEach(function (btn) {
  btn.onclick = function (event) {
    event.preventDefault();
    var targetModalId =
      this.closest("article").getAttribute("data-modal-target");
    var targetModal = document.querySelector(targetModalId);
    targetModal.style.display = "flex";
    setTimeout(function () {
      targetModal.classList.add("show");
    }, 10);
  };
});

spans.forEach(function (span) {
  span.onclick = function () {
    var modal = this.closest(".modal");
    modal.classList.remove("show");
    setTimeout(function () {
      modal.style.display = "none";
    }, 500);
  };
});

window.onclick = function (event) {
  modals.forEach(function (modal) {
    if (event.target == modal) {
      modal.classList.remove("show");
      setTimeout(function () {
        modal.style.display = "none";
      }, 500);
    }
  });
};

lottie.loadAnimation({
  container: document.getElementById("lottie-animation"), // el elemento DOM que contendrá la animación
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "/assets/img/Animation - 1717634476296.json", // la ruta al archivo JSON de la animación
});
