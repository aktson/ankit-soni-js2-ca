import { baseUrl } from "../settings.js"
import { displayMessage } from "../generalFunctions/displayMessage.js";
import { renderArticles } from "../generalFunctions/renderArticles.js";
import { searchResults } from "../generalFunctions/SearchResults.js";
import { createMenu } from "../generalFunctions/createMenu.js"


createMenu();

(async function () {
  try {
    const url = baseUrl + "articles";
    const response = await fetch(url);

    if (response.ok) {
      const results = await response.json();
      renderArticles(results)
      searchResults(results)

    } else {
      const error = new Error(response.statusText);
      return displayMessage("danger", `${error}`, "#result-container")
    }

  }
  catch (error) {
    console.log(error)
    displayMessage("danger", "Sorry, we failed to get your data", "#result-container")
  }

})();



