function signUp() {
    let name = document.getElementById('signupName').value;
    let email = document.getElementById('signupEmail').value;
    let age = document.getElementById('signupAge').value;
    let gender = document.getElementById('signupGender').value;
    let country = document.getElementById('signupCountry').value;
    let password = document.getElementById('signupPassword').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!name || !email || !age || !gender || !country || !password || !confirmPassword)
    {
        alert('Please fill in all fields.');
        return;
    }
    
    if (password !== confirmPassword)
    {
        alert('Passwords do not match.');
        return;
    }
    
    let accountPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!accountPattern.test(email)) {
        alert('Invalid email format.');
        return;
    }

    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
        alert('Invalid password format. Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        return;
    }


    
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    
    let existingAccount = accounts.find(account => account.email === email);
    if (existingAccount) {
        alert('An account with this email already exists.');
        return;
    }

   
    let newAccount = {
        name , 
        email,
        age,
        gender,
        country,
        password };
    accounts.push(newAccount);
    
    
    localStorage.setItem('accounts', JSON.stringify(accounts));

    
    window.location.href = './logInPage.html';
}
