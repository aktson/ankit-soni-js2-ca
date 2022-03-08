import { baseUrl } from "../settings.js";
import { displayMessage } from "./displayMessage.js";
import { getFromStorage, saveToStorage } from "./storage.js";
import { articlesKey } from "./storage.js";
import { getUser, getToken } from "./storage.js";
import { removeMessage } from "./removeMessage.js";


const token = getToken();
const username = getUser();
const favourties = getFromStorage(articlesKey);



export function renderArticles(results) {

  const resultContainer = document.querySelector("#result-container");
  resultContainer.innerHTML = "";

  let deleteBtn = `<button class="btn btn-danger w-100 mt-4">Delete</button>`;
  let editBtn = `<span class="btn btn-info w-100 mt-4" href  >Edit</span>`
  if (!username) {
    deleteBtn = "";
    editBtn = "";
  }


  results.forEach(result => {

    //css class to to add favourited class
    let cssClass = "";

    //looking for  id if matches with id which is saved to local storage
    const favouriteExist = favourties.find(function (fav) {
      return parseInt(fav.id) === result.id;

    });

    if (favouriteExist) {
      cssClass = "favourited";
    }
    const date = new Date(result.published_at).toLocaleString()

    //rendering html
    resultContainer.innerHTML += `<div class="col-md-6 mx-auto my-3">
                                    <div class="card">
                                      <div class="card-header d-flex justify-content-between align-items-center">
                                        <span class="fs-5 fst-italic text-dark">Author: ${result.author}</span>
                                          <i class="bi bi-star-fill fs-4 ${cssClass} " data-id=${result.id} data-title ="${result.title}" data-summary = "${result.summary}" data-author = "${result.author}"></i>
                                      </div>
                                      <div class="card-body ">
                                        <h2 class="card-title">${result.title}</h2>
                                        <p class="card-text ">${result.summary}.</p>
                                        <div class="d-flex gap-2">
                                          <a href="edit.html?id=${result.id}" >${editBtn}</a>
                                          <span data-id=${result.id} >${deleteBtn} </span>
                                        </div>
                                      </div>
                                      <div class="card-footer text-muted">
                                        <small>Published: ${date}</small>
                                      </div>
                                    </div>
                                  </div>`
  })


  //favourite (star) on click event
  const favourtieBtns = document.querySelectorAll(".card i");

  favourtieBtns.forEach(favourtieBtn => {
    favourtieBtn.addEventListener("click", toggleFavourite)
  })

  //delete button event
  const deleteBtns = document.querySelectorAll(".card button");

  deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener("click", deletePost)
  })

}

//onclick event for favourites (star) 
function toggleFavourite(event) {

  event.target.classList.toggle("favourited")

  const id = event.target.dataset.id;
  const title = event.target.dataset.title;
  const summary = event.target.dataset.summary;
  const author = event.target.dataset.author;

  const currentFavourite = getFromStorage(articlesKey);

  const findCurrentFavourite = currentFavourite.find(function (favourite) {
    return favourite.id === id;
  })

  if (!findCurrentFavourite) {
    const article = { id, title, summary, author }
    currentFavourite.push(article)
    saveToStorage(articlesKey, currentFavourite)
  }
  else {
    const filterCurrentFavourite = currentFavourite.filter(item => item.id !== id)
    saveToStorage(articlesKey, filterCurrentFavourite)
  }

}

//onclick event for delete button

async function deletePost(event) {
  const id = event.target.parentElement.dataset.id
  const url = baseUrl + `articles/${id}`

  const options = {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  const doDelete = window.confirm("Are you sure that you want to delete?");

  if (doDelete) {

    try {

      const response = await fetch(url, options)

      if (response.ok) {
        const result = await response.json();
        displayMessage("success", "Article deleted", "#toast")
        removeMessage("#toast");
        location.reload();
        console.log(result)
      }

    } catch (error) {
      console.log(error);
      displayMessage("danger", "Unknown error occured", "#toast")

    }

  }

}