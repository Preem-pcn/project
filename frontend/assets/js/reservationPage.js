// Mock current password (In a real application, fetch this securely from your backend)
let currentPassword = "securepassword123"; // Replace this with the actual hashed value on the server

// Handle room search
document.getElementById('search-btn').addEventListener('click', () => {
  const selectedTime = document.getElementById('time-select').value;
  const roomOptionsContainer = document.getElementById('room-options');

  // Clear previous options
  roomOptionsContainer.innerHTML = '';

  // Generate mock data for available rooms
  const availableRooms = [
    'Room A',
    'Room B',
    'Room C',
    'Room D',
    'Room E',
    'Room F'
  ];

  availableRooms.forEach((room) => {
    const roomCard = document.createElement('div');
    roomCard.className = 'room-card';
    roomCard.textContent = room;
    roomCard.addEventListener('click', () => {
      alert(`You selected ${room} for ${selectedTime}`);
      document.getElementById('rating-modal').style.display = 'block';
    });
    roomOptionsContainer.appendChild(roomCard);
  });
});

// Profile button logic
const profileModal = document.getElementById('profile-modal');
const editProfileModal = document.getElementById('edit-profile-modal');

document.getElementById('profile-btn').addEventListener('click', () => {
  profileModal.style.display = 'block';
});

document.getElementById('close-profile-btn').addEventListener('click', () => {
  profileModal.style.display = 'none';
});

// Edit Profile
document.getElementById('edit-profile-btn').addEventListener('click', () => {
  profileModal.style.display = 'none';
  editProfileModal.style.display = 'block';
});

document.getElementById('close-edit-profile-btn').addEventListener('click', () => {
  editProfileModal.style.display = 'none';
});

document.getElementById('save-profile-btn').addEventListener('click', () => {
  const username = document.getElementById('edit-username').value;
  const email = document.getElementById('edit-email').value;
  const oldPassword = document.getElementById('old-password').value;
  const newPassword = document.getElementById('edit-password').value;

  // Validate old password
  if (oldPassword !== currentPassword) {
    alert('Incorrect current password. Please try again.');
    return;
  }

  // Update profile details
  document.getElementById('profile-username').textContent = username || 'JohnDoe';
  document.getElementById('profile-email').textContent = email || 'john@example.com';

  // Optionally update password
  if (newPassword) {
    currentPassword = newPassword; // In a real app, send this change to the backend securely
    alert('Password updated successfully!');
  }

  alert('Profile updated successfully!');
  editProfileModal.style.display = 'none';
});

// Rating Modal
const stars = document.querySelectorAll('#star-rating span');
let selectedRating = 0;

// Add click event to each star
stars.forEach((star) => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.getAttribute('data-star'), 10); // Get star number
    updateStarDisplay(selectedRating); // Update stars' appearance
  });
});

// Function to visually update the stars
function updateStarDisplay(rating) {
  stars.forEach((star) => {
    const starValue = parseInt(star.getAttribute('data-star'), 10);
    if (starValue <= rating) {
      star.style.color = 'gold'; // Highlight selected and previous stars
    } else {
      star.style.color = 'gray'; // Reset unselected stars
    }
  });
}

// Initialize stars with default gray color
updateStarDisplay(0);

// Handle close button
document.getElementById('close-rating-btn').addEventListener('click', () => {
  document.getElementById('rating-modal').style.display = 'none';
});

// Handle submit button
document.getElementById('submit-rating-btn').addEventListener('click', () => {
  if (selectedRating > 0) {
    alert(`Thank you for rating! You rated this ${selectedRating} stars.`);
  } else {
    alert('Please select a star rating before submitting.');
  }
  document.getElementById('rating-modal').style.display = 'none';
});

// Back button
document.getElementById('back-btn').addEventListener('click', function () {
  window.location.href = 'index.html';
});
