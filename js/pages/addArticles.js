import { createMenu } from "../generalFunctions/createMenu.js";
import { getToken } from "../generalFunctions/storage.js";
import { displayMessage } from "../generalFunctions/displayMessage.js";
import { baseUrl } from "../settings.js";
import { removeMessage } from "../generalFunctions/removeMessage.js";
import { checkLength } from "../generalFunctions/checkLength.js";


createMenu();
const token = getToken();

if (!token) {
  location.href = "/";
}



const form = document.querySelector("form");
const title = document.querySelector("#title");
const summary = document.querySelector("#summary");
const author = document.querySelector("#author");
const titleError = document.querySelector("#title-error");
const summaryError = document.querySelector("#summary-error");
const authorError = document.querySelector("#author-error");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const titleValue = title.value.trim();
  const summaryValue = summary.value.trim();
  const authorValue = author.value.trim();

  titleError.innerHTML = "";
  summaryError.innerHTML = "";
  authorError.innerHTML = "";


  if (!checkLength(title.value, 4)) {
    displayMessage("warning", "must be atleast 4 characters", "#title-error")
  }
  if (!checkLength(summaryValue, 10)) {
    displayMessage("warning", "must be atleast 10 characters", "#summary-error")
  }
  if (!checkLength(authorValue, 4)) {
    displayMessage("warning", "Author must be atleast 4 characters", "#author-error")
  }
  if (titleValue.length >= 4 && summaryValue.length >= 10 && authorValue.length >= 4) {
    addArticle(titleValue, summaryValue, authorValue)
    form.reset();

  }
}

async function addArticle(title, summary, author) {

  const url = baseUrl + "articles";

  const data = JSON.stringify({ title: title, summary: summary, author: author })

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if (result.published_at) {

      displayMessage("success", "Article added!!", "#message-container")
      removeMessage("#message-container");
    }
    if (result.error) {
      displayMessage("danger", result.error.message, "#message-container")
    }

  } catch (error) {
    console.log(error)
    displayMessage("danger", "Unknown erroe occured", "#message-container")
  }

}



