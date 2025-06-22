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

  // Create FormData for Web3Forms
  const formData = new FormData();
  formData.append("access_key", "e02c5988-11b4-4118-8c98-7fc5ebdfe1bf"); // Replace with your actual access key
  formData.append("name", name);
  formData.append("email", email);
  formData.append("message", message);
  formData.append("subject", "New Contact Form Submission from Portfolio");

  // Optional: Add additional fields
  formData.append("from_name", name);
  formData.append("replyto", email);

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        successMessageElement.innerText =
          "Thank you for your submission! I will be in touch soon.";
        form.reset();
      } else {
        throw new Error(data.message || "Error submitting form.");
      }
    })
    .catch((error) => {
      successMessageElement.innerText =
        "Error sending message. Please try again.";
      console.error("Form submission error:", error);
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
