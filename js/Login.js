
document.getElementById("LoginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let email = document.getElementById("loginput").value;
    let password = document.getElementById("logPassword").value;

    let users = JSON.parse(localStorage.getItem("datauser")) || [];

    function checkLogin(users, email, password) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email && users[i].password === password) {
                return true;
            }
        }
        return false;
    }

    if (checkLogin(users, email, password)) {
        window.location.href = "homePage.html";
    } else {
        alert("incorrect password or Email");
    }
});

