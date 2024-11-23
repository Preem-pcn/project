import { checkAvailableroom, getUserById, updateUser,reserveRoom} from "./api.js";


// Retrieve the logged-in user's ID from sessionStorage
const userId = sessionStorage.getItem('loggedInUserID');
const user = await getUserById(userId);

// Check if the user is logged in; if not, redirect to the login page
// if (!userID) {
//   alert('Please log in first.');
//   window.location.href = 'index.html';
// }

// Mock current password (this should be securely handled in real applications)
let currentPassword = user.password; // Replace with a hashed value fetched from the backend

// Handle room search
document.getElementById('search-btn').addEventListener('click', async () => {
  const selectedTime = document.getElementById('time-select').value;
  const roomOptionsContainer = document.getElementById('room-options');

  // Clear previous options
  roomOptionsContainer.innerHTML = '';
  // Fetch available rooms using the logged-in user's ID
  const availableRooms = await checkAvailableroom(selectedTime); //<-ห้องว่างอยู่นี่
  availableRooms.data.forEach((room) => {
    const roomCard = document.createElement('div');
    roomCard.className = 'room-card';
    roomCard.textContent = room.name;
    // เพิ่มรายละเอียดเพิ่มเติม เช่น ความจุ และสิ่งอำนวยความสะดวก
    const capacityElement = document.createElement('p');
    capacityElement.textContent = `Capacity: ${room.capacity}`;  // แสดงความจุของห้อง
    roomCard.appendChild(capacityElement);

    const facilitiesElement = document.createElement('ul');  // ใช้ <ul> เพื่อแสดงรายการสิ่งอำนวยความสะดวก
    room.facilities.forEach(facility => {
    const facilityItem = document.createElement('li');
    facilityItem.textContent = facility;  // แสดงแต่ละสิ่งอำนวยความสะดวกในรายการ
    facilitiesElement.appendChild(facilityItem);
    });
    roomCard.appendChild(facilitiesElement)
    roomCard.addEventListener('click', async () => {
        // เรียก reserveRoom และรอผลลัพธ์
        const result = await reserveRoom(user, room.name, selectedTime);
        // ตรวจสอบผลลัพธ์
        if (result.success) {
            alert(`You successfully reserved ${room.name} for ${selectedTime}`);
        } else {
            alert(`Failed to reserve room. ${result.message}`);
        }
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

  // Populate profile modal with user data
  document.getElementById('profile-username').textContent = user.username; // Use userID as username
  document.getElementById('profile-userid').textContent = user.userId;
  document.getElementById('profile-email').textContent = user.email; // Mock email
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

document.getElementById('save-profile-btn').addEventListener('click', async () => {
  const username = document.getElementById('edit-username').value;
  const email = document.getElementById('edit-email').value;
  const oldPassword = document.getElementById('old-password').value;
  const newPassword = document.getElementById('edit-password').value;
  
  console.log(userId);
  console.log(currentPassword);

  // Validate old password
  if (oldPassword !== currentPassword) {
    alert('Incorrect current password. Please try again.');
    return;
  }

  const updates = {};
  if (username) updates.username = username;
  if (email) updates.email = email;
  if (newPassword) updates.password = newPassword;

  const updatedUser = await updateUser(userId, updates);

  if (updatedUser) {
    // Optionally update the UI with the new user details
    document.getElementById("profile-username").textContent = updatedUser.username;
    document.getElementById("profile-email").textContent = updatedUser.email;
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
