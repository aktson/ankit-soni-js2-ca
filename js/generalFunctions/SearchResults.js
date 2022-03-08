import { displayMessage } from "./displayMessage.js";
import { renderArticles } from "./renderArticles.js";


export function searchResults(results) {

  const searchInput = document.querySelector("#search-input");

  searchInput.addEventListener("keyup", (event) => {

    const searchInputValue = event.target.value.trim().toLowerCase();

    renderArticles(results)

    const filteredResults = results.filter(result => result.title.toLowerCase().includes(searchInputValue))

    if (filteredResults.length === 0) {
      displayMessage("dark", "Sorry, no results found", "#result-container");
    } else {
      renderArticles(filteredResults)
    }

  });

}