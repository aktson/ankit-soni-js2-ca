export function removeMessage(container) {
  const element = document.querySelector(container)
  setTimeout(() => { element.innerHTML = "" }, 4000)
}