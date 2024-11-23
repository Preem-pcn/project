//import { createUser } from "./api.js";
import { BACKEND_URL } from "./config.js";
/*=============== SHOW OR HIDE PASSWORD ===============*/
const showHiddenPass = (inputPassId, inputIconId) => {
    const inputField = document.getElementById(inputPassId); // Password input
    const iconEye = document.getElementById(inputIconId); // Icon for toggling
  
    if (inputField && iconEye) {
      iconEye.addEventListener('click', () => {
        if (inputField.type === 'password') {
          // Show password
          inputField.type = 'text';
          iconEye.classList.add('ri-eye-line'); // Add open-eye icon
          iconEye.classList.remove('ri-eye-off-line'); // Remove closed-eye icon
        } else {
          // Hide password
          inputField.type = 'password';
          iconEye.classList.remove('ri-eye-line'); // Remove open-eye icon
          iconEye.classList.add('ri-eye-off-line'); // Add closed-eye icon
        }
      });
    } else {
      console.error('Invalid element IDs. Check inputPassId and inputIconId.');
    }
  };
  
  // Initialize the password toggle functionality
  showHiddenPass('input-password', 'input-icon');



  
  // signup.js

document.querySelector('.login__form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get form field values
  const userId = document.getElementById('input-userid').value;
  const username = document.getElementById('input-username').value;
  const email = document.getElementById('input-email').value;
  const password = document.getElementById('input-password').value;

  // Prepare data to send
  const userData = { userId, username,  password ,email};

  try {
    // Send POST request to the server
    const response = await fetch(`${BACKEND_URL}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const result = await response.json();
      alert("Success"); // Show success message
    } else {
      alert('Failed to create user.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while creating the user.');
  }
});

  