export function displayMessage(msgType, msg, container) {
  const element = document.querySelector(container);

  element.innerHTML = `<div class="bg-${msgType} p-2 w-auto text-light my-2 mx-3 text-center">${msg}</div>`
}