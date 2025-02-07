
document.getElementById("RegisterForm").addEventListener("submit",function(event){
    event.preventDefault();
    let UserName = document.getElementById("User-Name").value;
    let email = document.getElementById("floatingInput").value;
    let password = document.getElementById("floatingPassword").value;
    let confirmPassword = document.getElementById("confirm-Password").value;
    if(password !== confirmPassword){
        alert("Passwords do not match");
        return;
    
    }

   let users = {  
    "UserName" : UserName ,
    "email" : email ,
    "password" : password
   }

   let datauser = JSON.parse(localStorage.getItem("datauser")) || [];

   datauser.push(users);

   localStorage.setItem("datauser", JSON.stringify(datauser));

    window.location.href = "Login.html";
  
  }); 

