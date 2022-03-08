import { getUser, userKey, tokenKey } from "./storage.js";


const username = getUser();

const { pathname } = document.location;

let authLink = `<a class="nav-link ${pathname === "/login.html" ? "active" : ""}" aria-current="page" href="login.html">Login</a>`;

if (username) {
  authLink = `<li class="nav-item">
                <a class="nav-link ${pathname === "/add-articles.html" ? "active" : ""}" href="add-articles.html">Add article</a>
              </li>
              <li class="nav-item">
                <button class="btn btn-info" id="logout">Logout</button>
              </li>
              <li class="nav-item"><span class="text-info fw-bold p-2 lead">"Hello ${username}"</span></li>`
}


export function createMenu() {

  const menuContainer = document.querySelector("#menu-container");

  menuContainer.innerHTML = `<li class="nav-item">
                              <a class="nav-link ${pathname === "/" || pathname === "/index.html" ? "active" : ""}" aria-current="page" href="index.html">Home</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link ${pathname === "/favourites.html" ? "active" : ""}" href="favourites.html">Favourites</a>
                            </li>
                            ${authLink}`


  if (username) {
    const logoutBtn = document.querySelector("#logout");
    const { pathname } = window.location;

    logoutBtn.onclick = function () {
      localStorage.removeItem(userKey);
      localStorage.removeItem(tokenKey);
      location.href = pathname;
    }

  }


}