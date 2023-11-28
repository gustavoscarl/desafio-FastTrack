class UserInfo {
  constructor(){
  this.username= "",
  this.password= "",
  this.email= "" }
};

function createUser(event){
  event.preventDefault();

  newUsername = document.getElementById("new-user-name");
  newPassword = document.getElementById("new-user-password");
  newEmail = document.getElementById("new-user-email");

  if (newUsername.value && newPassword.value && newEmail.value) {
    let newUser = new UserInfo()
      newUser.username = newUsername.value;
      newUser.password = newPassword.value;
      newUser.email = newEmail.value;

    localStorage.setItem(`id${Math.random()*1000}`, JSON.stringify(newUser))

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
