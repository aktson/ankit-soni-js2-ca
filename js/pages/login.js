import { displayMessage } from "../generalFunctions/displayMessage.js";
import { saveToken, saveUser } from "../generalFunctions/storage.js";
import { baseUrl } from "../settings.js";
import { createMenu } from "../generalFunctions/createMenu.js"


createMenu();



const form = document.querySelector("form");

const username = document.querySelector("#username");
const password = document.querySelector("#password");
const usernameError = document.querySelector("#username-error");
const passwordError = document.querySelector("#password-error");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (!usernameValue) {
    displayMessage("warning", "please enter username", "#username-error")
  }
  if (!passwordValue) {
    displayMessage("warning", "Please enter valid password", "#password-error")
  }
  else if (usernameValue.length > 0 && passwordValue.length > 0) {
    usernameError.innerHTML = "";
    passwordError.innerHTML = "";

    doLogin(usernameValue, passwordValue);

  }
}

async function doLogin(username, password) {

  const messageContainer = document.querySelector("#message-container")

  const url = baseUrl + "auth/local";
  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },

  }
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    messageContainer.innerHTML = "";

    if (response.ok) {
      displayMessage("success", "Login successful", "#message-container");
      form.reset();
      saveToken(result.jwt);
      saveUser(result.user);
      location.href = "/";
    }
    if (result.error) {
      displayMessage("danger", "Invalid login details", "#message-container")
    }

  } catch (error) {
    console.log(error)
    displayMessage("danger", "Unknown error occured", "#message-container")
  }

}