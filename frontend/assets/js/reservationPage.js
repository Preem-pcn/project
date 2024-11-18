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
      });
      roomOptionsContainer.appendChild(roomCard);
    });
  });
  
  // Profile button logic
  document.getElementById('profile-btn').addEventListener('click', () => {
    alert('Profile Information: [User Data Here]');
  });

  document.getElementById('back-btn').addEventListener('click', function () {
    window.location.href = 'index.html';
});
  