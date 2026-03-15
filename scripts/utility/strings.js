export function splitApart(message) {
  return message.split('');
}

let intervalId;

export function generateText(message, elementName) {
  let i = 0;
  const element = document.querySelector(elementName);

  if (!element) {
    console.error(`Element not found: ${elementName}`);
    return;
  }

  element.textContent = '';

  intervalId = setInterval(() => {
    element.textContent += message[i];
    i++;

    if (i === message.length) {
      clearInterval(intervalId);
    }
  }, 1);
}