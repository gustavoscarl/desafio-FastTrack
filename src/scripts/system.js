// Write username in header
const userObject = JSON.parse(localStorage.getItem("loggedInUser"));

const headerSelect = document.querySelector("header");
const usernameDiv = document.createElement("div");
usernameDiv.setAttribute('class','username-div text-white ps-3 ps-md-5');

usernameDiv.innerText = `Olá, ${userObject.username}!`;
headerSelect.appendChild(usernameDiv);

    /* logout button*/
const logoutDiv = document.createElement("div");

const logoutLink = document.createElement("a");
logoutLink.setAttribute('href', '#');
logoutLink.textContent = "Sair";
logoutLink.setAttribute('class','logout-div text-white pe-3 pe-md-5');

logoutDiv.appendChild(logoutLink);
headerSelect.appendChild(logoutDiv);