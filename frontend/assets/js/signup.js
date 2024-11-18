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
  