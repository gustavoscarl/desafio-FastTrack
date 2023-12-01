// Initial user object
class UserInfo {
  constructor() {
    this.username = "";
    this.password = "";
    this.email = "";
  }
}

// New user function
function createUser(event) {
  event.preventDefault();

  const newUsername = document.getElementById("new-user-name");
  const newPassword = document.getElementById("new-user-password");
  const newEmail = document.getElementById("new-user-email");

  // Retrieve existing user data from localStorage
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Check if email is registered
  const emailExists = existingUsers.some((item) => item.email === newEmail.value);

  if (emailExists) {
    alert("Este e-mail já está cadastrado")
  } else if (newUsername.value && newPassword.value && newEmail.value) {

    // Create a new user object
    const newUser = new UserInfo();
    newUser.username = newUsername.value;
    newUser.password = newPassword.value;
    newUser.email = newEmail.value;

    // Add the new user to the array
    existingUsers.push(newUser);

    // Save the updated array back to localStorage
    localStorage.setItem("users", JSON.stringify(existingUsers));
  
    var sucessModal = new bootstrap.Modal(document.getElementById('sucessModal'));
    sucessModal.show();
    
  } else {
    alert("Preencha todos os campos para criar sua conta!");
  }
}

// User login
function login(event) {
  event.preventDefault();

  // Retrieve existing user data from localStorage
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Get the input values
  const inputPassword = document.getElementById("password").value;
  const inputEmail = document.getElementById("email").value;

  // Find the user with the matching email and password
  const matchedUser = existingUsers.find(
    (user) => user.email === inputEmail && user.password === inputPassword
  );

  if (matchedUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

    window.location.href = "/desafio-FastTrack/src/pages/system.html";
  } else {
    alert("Ops! O seu usuário ou senha não foram encontrados.");
  }
}
