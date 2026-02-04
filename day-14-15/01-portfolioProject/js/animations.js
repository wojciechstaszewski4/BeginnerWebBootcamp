// Smooth scroll to a given section
window.smoothScroll = function (target, steps = 35) {
  if (!target) {
    console.error("Nie zdefiniowano elementu docelowego!");
    return;
  }

  let scrollContainer = document.documentElement;
  let targetY = 0;
  let currentTarget = target;

  while (currentTarget && currentTarget !== scrollContainer) {
    targetY += currentTarget.offsetTop;
    currentTarget = currentTarget.offsetParent;
  }

  const scroll = (container, start, end, step = 0) => {
    if (step > steps) return;
    container.scrollTop = start + ((end - start) / steps) * step;
    requestAnimationFrame(() => scroll(container, start, end, step + 1));
  };

  scroll(scrollContainer, scrollContainer.scrollTop, targetY);
};

// Animation of the entry of projects and example sheets
$(document).on("scroll", function () {
  const windowHeight = $(window).height();
  const scrollValue = $(this).scrollTop();

  // Projects
  $(".project").each(function () {
    const $element = $(this);
    const elementFromTop = $element.offset().top - 100;
    const elementHeight = $element.outerHeight();

    if (scrollValue > elementFromTop + elementHeight - windowHeight) {
      $element.addClass("active");
    }
  });

  // Example sheets
  $(".example").each(function () {
    const $example = $(this);
    const exampleFromTop = $example.offset().top - 500;
    const exampleHeight = $example.outerHeight();

    if (scrollValue > exampleFromTop + exampleHeight - windowHeight) {
      $example.addClass("active");
    }
  });
});

// Typing effect for displaying text dynamically
function typewrite(element, text) {
  element.textContent = "";
  let index = 0;

  const typing = () => {
    if (index < text.length) {
      element.textContent += text[index];
      index++;
      setTimeout(typing, 100);
    }
  };

  typing();
}

// Smooth transition between slides with a typing effect for authors
function smoothTransition() {
  const mottos = [
    document.getElementById("motto1"),
    document.getElementById("motto2"),
    document.getElementById("motto3"),
  ];
  const authors = ["– Paulo Coelho", "– Thomas Edison", "– Paulo Coelho"];

  let current = 0;

  const changeMotto = () => {
    mottos.forEach((motto, index) => {
      motto.style.opacity = index === current ? "1" : "0";
    });

    const currentAuthorElement = mottos[current].querySelector(".author");
    typewrite(currentAuthorElement, authors[current]);

    current = (current + 1) % mottos.length;
    setTimeout(changeMotto, 5000);
  };

  changeMotto();
}

smoothTransition();

// Check if sections with the "fade-in" class are visible in the viewport
function checkVisibility() {
  document.querySelectorAll(".fade-in").forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight) {
      section.classList.add("visible");
    }
  });
}

document.addEventListener("DOMContentLoaded", checkVisibility);
document.addEventListener("scroll", checkVisibility);
