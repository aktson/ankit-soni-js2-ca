import { displayMessage } from "../generalFunctions/displayMessage.js";
import { articlesKey, getFromStorage, saveToStorage, getUser } from "../generalFunctions/storage.js";
import { createMenu } from "../generalFunctions/createMenu.js"


createMenu();

const savedItems = getFromStorage(articlesKey);

const username = getUser();

let clearBtn = `<button class="btn btn-danger w-25 mt-4" >Clear</button>`
if (!username) {
  clearBtn = "";
}

const resultContainer = document.querySelector("#result-container");



if (savedItems.length === 0) {
  displayMessage("dark", "No items in favourites!!", "#result-container")
}

function renderHtml(savedItems) {

  savedItems.forEach(item => {

    resultContainer.innerHTML += `<div class="card col-md-3 p-4 position-relative" >    
                                      <h2 class="card-title w-100 h-100 ">${item.title}</h2>
                                      <p class="card-text h-100">${item.summary}</p>
                                      <p class="card-subtitle mb-2 text-muted border-top p-2">Author: ${item.author}</p>   
                                      <i class="bi bi-star-fill fs-4 favourited" id="favourites"></i>
                                      <div data-id =${item.id} id="clear">${clearBtn}</div>
                                  </div>`
  })
}

renderHtml(savedItems)

const clearBtns = document.querySelectorAll("#clear");

if (savedItems.length > 0) {
  clearBtns.forEach(clearBtn => {
    clearBtn.addEventListener("click", ClearItem);
  })

}

function ClearItem(event) {

  const id = event.target.parentElement.dataset.id;
  const doClear = window.confirm("Are you sure that you want to delete?");


  if (doClear) {

    const filteredResults = savedItems.filter(function (item) {
      return parseInt(item.id) !== parseInt(id);
    })

    resultContainer.innerHTML = "";

    saveToStorage(articlesKey, filteredResults)

    const newSavedItems = getFromStorage(articlesKey)

    renderHtml(newSavedItems);

    // location.reload();

    if (newSavedItems.length === 0) {
      displayMessage("dark", "No items in favourites", "#result-container");
    }
  }
}
