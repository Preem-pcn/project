// Initialize time slots (8:00 AM - 8:00 PM, each 2 hours)
const timeSlots = [
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM"
];

// Function to show timetable for booking
function showTimetable() {
    const selectedRoom = document.getElementById('room-select').value;
    const timetableContainer = document.getElementById('timetable-container');
    const timetable = document.getElementById('timetable');
    const confirmButton = document.getElementById('confirm-booking');

    // Check if a room is selected
    if (!selectedRoom) {
        alert("Please select a room first!");
        return;
    }

    // Display timetable
    timetableContainer.style.display = "block";
    timetable.innerHTML = ""; // Clear previous timetable
    confirmButton.style.display = "none"; // Hide confirm button initially

    timeSlots.forEach(slot => {
        const timeSlotElement = document.createElement('div');
        timeSlotElement.className = "time-slot";
        timeSlotElement.textContent = slot;

        // Add click event to select a time slot
        timeSlotElement.addEventListener('click', function () {
            // Remove "selected" class from all time slots
            document.querySelectorAll('.time-slot').forEach(el => el.classList.remove('selected'));
            // Add "selected" class to clicked slot
            timeSlotElement.classList.add('selected');
            confirmButton.style.display = "block"; // Show confirm button
        });

        timetable.appendChild(timeSlotElement);
    });
}

// Function to confirm booking
function confirmBooking() {
    const selectedRoom = document.getElementById('room-select').value;
    const selectedSlot = document.querySelector('.time-slot.selected');

    if (!selectedSlot) {
        alert("Please select a time slot!");
        return;
    }

    const time = selectedSlot.textContent;
    alert(`Room "${selectedRoom}" has been successfully booked for ${time}.`);
}

// Event listeners
document.getElementById('show-timetable').addEventListener('click', showTimetable);
document.getElementById('confirm-booking').addEventListener('click', confirmBooking);
