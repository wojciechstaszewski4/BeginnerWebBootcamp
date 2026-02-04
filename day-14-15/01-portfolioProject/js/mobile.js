// Temporarily adds and removes the "active" class with a custom timeout for mobile devices
function addTemporaryActiveEffect(selector, timeout = 1000) {
  document.querySelectorAll(selector).forEach((element) => {
    addHoverListeners(element, timeout);
  });
}

function addHoverListeners(element, timeout) {
  element.addEventListener("mouseover", () => {
    element.classList.add("active");
  });

  element.addEventListener("mouseout", () => {
    element.classList.remove("active");
  });

  element.addEventListener("touchstart", () => {
    element.classList.add("active");
    setTimeout(() => {
      element.classList.remove("active");
    }, timeout);
  });
}

addTemporaryActiveEffect("header button", 1000);
addTemporaryActiveEffect("header .social", 1000);
addTemporaryActiveEffect(".portfolio .web img", 1000);
addTemporaryActiveEffect(".examples .forward", 1000);
addTemporaryActiveEffect(".hobby .item", 2000);
addTemporaryActiveEffect(".hobby .item p", 2000);
addTemporaryActiveEffect(".contact button", 1000);
addTemporaryActiveEffect(".contact .socials a", 1000);
addTemporaryActiveEffect(".footer .logo", 1000);

const commentsContainer = document.getElementById("comments");

if (commentsContainer) {
  const observer = new MutationObserver(() => {
    document
      .querySelectorAll(".commentsSection .comments")
      .forEach((element) => {
        if (!element.hasAttribute("data-active-bound")) {
          addHoverListeners(element, 1000);
          element.setAttribute("data-active-bound", "true");
        }
      });
  });

  observer.observe(commentsContainer, { childList: true });
}
