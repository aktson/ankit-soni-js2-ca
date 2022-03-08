import { createMenu } from "../generalFunctions/createMenu.js";
import { getToken } from "../generalFunctions/storage.js";
import { displayMessage } from "../generalFunctions/displayMessage.js";
import { baseUrl } from "../settings.js";
import { removeMessage } from "../generalFunctions/removeMessage.js";
import { checkLength } from "../generalFunctions/checkLength.js"



createMenu();

const token = getToken();

if (!token) {
  location.href = "/";
}

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");

if (!id) {
  document.location = "/";
}


const form = document.querySelector("form");
const title = document.querySelector("#title");
const summary = document.querySelector("#summary");
const author = document.querySelector("#author");
const inputId = document.querySelector("#id");
const titleError = document.querySelector("#title-error");
const summaryError = document.querySelector("#summary-error");
const authorError = document.querySelector("#author-error");


(async function fetchUrl() {
  const url = baseUrl + `articles/${id}`;
  try {
    const response = await fetch(url);
    const result = await response.json();

    console.log(result);

    title.value = result.title;
    summary.value = result.summary;
    author.value = result.author;
    inputId.value = result.id

  } catch (error) {
    console.log(error)
  }
})()



form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  titleError.innerHTML = "";
  summaryError.innerHTML = "";
  authorError.innerHTML = "";


  if (!checkLength(title.value, 4)) {
    displayMessage("warning", "must be atleast 4 characters", "#title-error")
  }
  if (!checkLength(summary.value, 10)) {
    displayMessage("warning", "must be atleast 10 characters", "#summary-error")
  }
  if (!checkLength(author.value, 4)) {
    displayMessage("warning", "Author must be atleast 4 characters", "#author-error")
  }
  if (checkLength(title.value, 4) && checkLength(summary.value, 10) && checkLength(author.value, 4)) {
    submitEditedArticle(title.value, summary.value, author.value, inputId.value)

  }
}

async function submitEditedArticle(title, summary, author, id) {

  const url = baseUrl + `articles/${id}`;

  const data = JSON.stringify({ title: title, summary: summary, author: author })

  const options = {
    method: "PUT",
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
      displayMessage("success", "Article edit successful!!", "#message-container")
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



