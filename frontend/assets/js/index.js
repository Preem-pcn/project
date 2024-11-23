import { loginUser } from "./api.js";
document.getElementById('loginBtn').addEventListener('click', async function () {
    const userID = document.getElementById('userID').value.trim();
    const password = document.getElementById('password').value.trim();

    if (userID && password) {
        // Redirect to another page if both fields are filled
        const haveUser = await loginUser(userID,password);
        if (haveUser) {
            // Redirect on successful login
            window.location.href = 'reservationPage.html';
        }
    } else {
        // Alert if fields are empty
        alert('Something went wrong. Please fill in both fields.');
    }
});

document.getElementById('signupBtn').addEventListener('click', function () {
    // Redirect to the sign-up page
    window.location.href = 'signup.html';
});