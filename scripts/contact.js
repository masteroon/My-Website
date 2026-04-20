import { generateHeader } from "./header.js";

emailjs.init("sqn7mcpCpXtxWBSlt");

const formElem = document.querySelector('.contact-form');
const buttonElem = document.querySelector('.js-contact-submit-btn');
const confirmationMessageElem = document.querySelector('.js-confirmation-message');

const nameInputElem = document.querySelector('#name');
const emailInputElem = document.querySelector('#email');
const messageInputElem = document.querySelector('#message');

const nameErrorElem = document.querySelector('.js-name-error');
const emailErrorElem = document.querySelector('.js-email-error');
const messageErrorElem = document.querySelector('.js-message-error');

formElem.addEventListener('submit', function(e) {
  e.preventDefault();

  const isValid = validateForm();

  if (!isValid) {
    return;
  }

  buttonElem.disabled = true;
  buttonElem.classList.add('contact-submit-btn-disabled');

  emailjs.sendForm(
    'service_xzvbrdj',
    'template_hzxb6mc',
    this
  ).then(() => {
    confirmationMessageElem.classList.remove('hidden');
    formElem.reset();

    setTimeout(() => {
      confirmationMessageElem.classList.add('hidden');
      buttonElem.disabled = false;
      buttonElem.classList.remove('contact-submit-btn-disabled');
    }, 3000);
  }, (error) => {
    buttonElem.disabled = false;
    buttonElem.classList.remove('contact-submit-btn-disabled');
    alert('Failed to send: ' + error.text);
  });
});

function validateForm() {
  let isValid = true;

  clearErrors();

  const nameValue = nameInputElem.value.trim();
  const emailValue = emailInputElem.value.trim();
  const messageValue = messageInputElem.value.trim();

  if (nameValue.length < 2) {
    showError(nameInputElem, nameErrorElem, 'Please enter your name');
    isValid = false;
  }

  if (!isValidEmail(emailValue)) {
    showError(emailInputElem, emailErrorElem, 'Please enter a valid email');
    isValid = false;
  }

  if (messageValue.length < 3) {
    showError(messageInputElem, messageErrorElem, 'Message must be at least 3 characters');
    isValid = false;
  }

  return isValid;
}

function showError(inputElem, errorElem, message) {
  inputElem.classList.add('input-error');
  errorElem.textContent = message;
  errorElem.classList.remove('hidden');
}

function clearErrors() {
  nameInputElem.classList.remove('input-error');
  emailInputElem.classList.remove('input-error');
  messageInputElem.classList.remove('input-error');

  nameErrorElem.classList.add('hidden');
  emailErrorElem.classList.add('hidden');
  messageErrorElem.classList.add('hidden');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}