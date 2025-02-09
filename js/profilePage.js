document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("loggedInEmail")) {
    window.location.href = "../HTML/logInPage.html";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const loggedInEmail = localStorage.getItem("loggedInEmail");
  const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  const userAccount = accounts.find(
    (account) => account.email === loggedInEmail
  );

  document.getElementById("name").textContent =
    userAccount.name || "Not Provided";
  document.getElementById("email").textContent =
    userAccount.email || "Not Provided";
  document.getElementById("age").textContent =
    userAccount.age || "Not Provided";
  document.getElementById("gender").textContent =
    userAccount.gender || "Not Provided";
  document.getElementById("country").textContent =
    userAccount.country || "Not Provided";

  const profilePic = userAccount.profilePic || "../Img/Default-Picture.png";
  document.getElementById("profilePic").src = profilePic;

  document.getElementById("uploadPic").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = function () {
        const base64Image = reader.result;
        userAccount.profilePic = base64Image;
        localStorage.setItem("accounts", JSON.stringify(accounts));
        document.getElementById("profilePic").src = base64Image;
      };

      reader.readAsDataURL(file);
    }
  });

  document.getElementById("editBtn").addEventListener("click", () => {
    document.getElementById("editModal").style.display = "block";
    document.getElementById("editName").value = userAccount.name;
    document.getElementById("editEmail").value = userAccount.email;
    document.getElementById("editAge").value = userAccount.age;
    document.getElementById("editGender").value = userAccount.gender;
    document.getElementById("editCountry").value = userAccount.country;

    document.getElementById("editForm").addEventListener("submit", (e) => {
      e.preventDefault();
      userAccount.name = document.getElementById("editName").value;
      userAccount.email = document.getElementById("editEmail").value;
      userAccount.age = document.getElementById("editAge").value;
      userAccount.gender = document.getElementById("editGender").value;
      userAccount.country = document.getElementById("editCountry").value;
      localStorage.setItem("accounts", JSON.stringify(accounts));
      document.getElementById("name").textContent = userAccount.name;
      document.getElementById("email").textContent = userAccount.email;
      document.getElementById("age").textContent = userAccount.age;
      document.getElementById("gender").textContent = userAccount.gender;
      document.getElementById("country").textContent = userAccount.country;
      document.getElementById("editModal").style.display = "none";
    });
  });

  document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("editModal").style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const changePasswordBtn = document.getElementById("change-password-btn");
  const passwordModal = document.getElementById("passwordModal");
  const passwordCloseBtn = document.querySelector("#passwordModal .close");
  const savePasswordBtn = document.getElementById("save-password-btn");

  passwordModal.style.display = "none";

  changePasswordBtn.addEventListener("click", function () {
    passwordModal.style.display = "flex";
  });

  passwordCloseBtn.addEventListener("click", function () {
    passwordModal.style.display = "none";
  });

  savePasswordBtn.addEventListener("click", function () {
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    let loggedInEmail = localStorage.getItem("loggedInEmail");
    let user = accounts.find((acc) => acc.email === loggedInEmail);

    let currentPassword = document.getElementById("current-password").value;
    let newPassword = document.getElementById("new-password").value;

    if (currentPassword !== user.password) {
      alert("Incorrect current password!");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      alert(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    user.password = newPassword;
    localStorage.setItem("accounts", JSON.stringify(accounts));
    alert("Password changed successfully!");
    document.getElementById("current-password").value = "";
    document.getElementById("new-password").value = "";
    passwordModal.style.display = "none";
  });
});






function logout() {
  localStorage.removeItem("loggedInEmail");
  window.location.href = "../HTML/homePage.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
});
