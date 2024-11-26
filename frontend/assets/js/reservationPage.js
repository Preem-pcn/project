import { checkAvailableroom, getUserById, updateUser,reserveRoom,cancelReservation,checkUserReservation} from "./api.js";


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
        console.log(user.userId);
        const result = await reserveRoom(user.userId, room.name, selectedTime);
        // ตรวจสอบผลลัพธ์
        if (result.success) {
            alert(`You successfully reserved ${room.name} for ${selectedTime}`);
        } else {
            alert(`Failed to reserve room. ${result.message}`);
        }
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

// Edit Profile: Open and Close Modals
document.getElementById('edit-profile-btn').addEventListener('click', () => {
  profileModal.style.display = 'none'; // Hide profile modal
  editProfileModal.style.display = 'block'; // Show edit profile modal
});

document.getElementById('close-edit-profile-btn').addEventListener('click', () => {
  editProfileModal.style.display = 'none'; // Hide edit profile modal
});

// Save Profile Changes
document.getElementById('save-profile-btn').addEventListener('click', async () => {
  const username = document.getElementById('edit-username').value;
  const email = document.getElementById('edit-email').value;
  const oldPassword = document.getElementById('old-password').value;
  const newPassword = document.getElementById('edit-password').value;

  // Validate required fields
  if (!oldPassword) {
    alert('Please enter your current password.');
    return;
  }

  // Build updates object for fields that are provided
  const updates = { oldPassword }; // Always include oldPassword for validation
  if (username) updates.username = username;
  if (email) updates.email = email;
  if (newPassword) updates.password = newPassword;

  try {
    // Call updateUser API function
    const updatedUser = await updateUser(userId, updates);

    if (updatedUser) {
      // Reflect updated details on the profile modal
      document.getElementById("profile-username").textContent = updatedUser.username || username;
      document.getElementById("profile-email").textContent = updatedUser.email || email;

      alert('Profile updated successfully!');
      editProfileModal.style.display = 'none'; // Close edit profile modal
    } else {
      alert('Failed to update profile. Please try again.');
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    alert('An error occurred while updating your profile. Please try again.');
  }
});

// Back button
document.getElementById('back-btn').addEventListener('click', function () {
  window.location.href = 'index.html';
});


async function getReservationStatus(userId) {
  try {
    const data = await checkUserReservation(userId); // Get reservation data from API
    
    if (data && data.success) {
      const reservation = data.data; // Single reservation object

      if (reservation) {
        // Display reservation details
        document.getElementById('reservation-status').textContent = `You already booked Room: ${reservation.roomId} TimeSlot: ${reservation.timeSlot}`;
        document.getElementById('cancel-reservation-btn').style.display = 'inline-block'; // Show cancel button
      } else {
        // No active reservations found
        document.getElementById('reservation-status').textContent = 'No reservations found.';
        document.getElementById('cancel-reservation-btn').style.display = 'none'; // Hide cancel button
      }
    } else {
      document.getElementById('reservation-status').textContent = 'No reservations found.';
      document.getElementById('cancel-reservation-btn').style.display = 'none'; // Hide cancel button on error
    }
  } catch (error) {
    console.error('Error fetching reservation:', error);
    document.getElementById('reservation-status').textContent = 'No reservations found.';
    document.getElementById('cancel-reservation-btn').style.display = 'none'; // Hide cancel button on error
  }
}

getReservationStatus(user.userId);

// Event listener for the cancel button (if the user has a reservation)
document.getElementById('cancel-reservation-btn').addEventListener('click', async () => {
  try {
    const response = await cancelReservation(userId); // API to cancel reservation

    if (response.success) {
      alert('Your reservation has been cancelled.');
      document.getElementById('reservation-status').textContent = 'No reservations found.';
      document.getElementById('cancel-reservation-btn').style.display = 'none'; // Hide cancel button after cancellation
    } else {
      alert('Failed to cancel the reservation.');
    }
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    alert('An error occurred while canceling your reservation.');
  }
  //cancelReservation(userId);
});


