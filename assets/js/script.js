"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

function submitForm(event) {
  event.preventDefault();
  const form = document.getElementById("form");
  const nameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const successMessageElement = document.getElementById("successMessage");
  const formButtonIconElement = document.getElementById("formButtonIcon");
  const formSubmitBtnElement = document.getElementById("formSubmitBtn");

  const name = nameInput.value;
  const email = emailInput.value;
  const message = messageInput.value;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  formButtonIconElement.setAttribute("name", "refresh-outline");
  formSubmitBtnElement.classList.add("formDisabledSubmitBtn");
  formButtonIconElement.classList.add("loading-spinner");

  fetch("https://formsubmit.co/contact@subhamjangid.in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      message,
    }),
  })
    .then((response) => {
      if (response.ok) {
        successMessageElement.innerText =
          "Thank you for your submission! I will be in touch soon.";
        form.reset();
      } else {
        throw new Error("Error submitting form.");
      }
    })
    .catch((error) => {
      successMessageElement.innerText(error);
    })
    .finally(() => {
      formButtonIconElement.setAttribute("name", "paper-plane");
      formSubmitBtnElement.classList.remove("formDisabledSubmitBtn");
      formButtonIconElement.classList.remove("loading-spinner");
    });
}

// page navigation variables

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

const handleActivePage = function () {
  for (let i = 0; i < pages.length; i++) {
    if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
      pages[i].classList.add("active");
      navigationLinks[i].classList.add("active");
      window.scrollTo(0, 0);
    } else {
      pages[i].classList.remove("active");
      navigationLinks[i].classList.remove("active");
    }
  }
};

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", handleActivePage);
}
