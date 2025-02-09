function login() {
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;

    
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    
    let account = accounts.find(acc => acc.email === email);

    if (!account) {
        alert('No account found with this email.');
        return;
    }

    if (account.password !== password) {
        alert('Incorrect password.');
        return;
    }

    localStorage.setItem('loggedInEmail', email);
    window.location.href = '../HTML/homePage.html';
}
