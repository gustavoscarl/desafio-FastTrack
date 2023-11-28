// Write username in header
const userObject = JSON.parse(localStorage.getItem("loggedInUser"))
document.write(`Olá, ${userObject.username}!`)
