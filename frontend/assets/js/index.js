import { loginUser } from "./api.js";

document.getElementById('loginBtn').addEventListener('click', async function () {
    const userID = document.getElementById('userID').value.trim();
    const password = document.getElementById('password').value.trim();

    if (userID && password) {
        // Call API to verify user credentials
        const haveUser = await loginUser(userID, password);
        if (haveUser) {
            // Store the userID in sessionStorage
            sessionStorage.setItem('loggedInUserID', userID);

            // Redirect on successful login
            window.location.href = 'reservationPage.html';
        } else {
            alert('Invalid credentials. Please try again.');
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
