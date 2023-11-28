function createUser(event){
  event.preventDefault();

  newUsername = document.getElementById("new-user-name");
  newPassword = document.getElementById("new-user-password");
  newEmail = document.getElementById("new-user-email");

  if (newUsername.value && newPassword.value && newEmail.value) {
    localStorage.setItem("username", newUsername.value);
    localStorage.setItem("password", newPassword.value);
    localStorage.setItem("email", newEmail.value);
    window.location.href= "http://127.0.0.1:5500/src/pages/system.html";
  } else {
    alert('Preencha todos os campos para criar sua conta!')
  }
}


function login(event) {
  event.preventDefault();

  const inputPassword = document.getElementById("password");
  const inputEmail = document.getElementById("email");
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  if (password === inputPassword.value || email === inputEmail.value) {
    window.location.href="http://127.0.0.1:5500/src/pages/system.html"
  }
  else{alert("Ops! O seu usuário ou senha não foram encontrados.")}
}

