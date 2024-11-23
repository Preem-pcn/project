import { BACKEND_URL } from "./config.js";
export async function loginUser(userId, password) {
    try {
      const response = await fetch(`${BACKEND_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(`Login successful! Welcome`);
        return true;
      } else {
        alert("wrong password or userId");
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Failed to login. Please try again.");
      return false;
    }
}

export async function checkAvailableroom(selectedTime) {
  try {
    //console.log('Sending request with timeSlot:', selectedTime); // Debug

    const response = await fetch(`${BACKEND_URL}/rooms/available`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ timeSlot: selectedTime }), // ตรวจสอบข้อมูลที่ส่ง
    });

    console.log('Response status:', response.status); // Debug
    if (response.ok) {
      const data = await response.json();
      console.log('Response data:', data); // Debug
      return data;
    } else {
      console.error('Error fetching rooms:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return [];
  }
}


// Function to get user details by userId
export async function getUserById(userId) {
  try {
    const response = await fetch(`${BACKEND_URL}/users/getUserById`, {
      method: "POST", // Using POST since the API accepts userId in the body
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }), // Send userId in the request body
    });

    if (response.ok) {
      const user = await response.json(); // Parse and return user data
      return user;
    } else {
      console.error("Failed to fetch user:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function updateUser(userId, updates) {
  try {
    const response = await fetch(`${BACKEND_URL}/users/updateByUserId`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, updates }),
    });

    if (response.ok) {
      const updatedUser = await response.json(); // Parse the updated user data
      alert("User updated successfully!");
      return updatedUser;
    } else {
      console.error("Failed to update user:", response.statusText);
      alert("Failed to update user.");
      return null;
    }
  } catch (error) {
    console.error("Error updating user:", error);
    alert("An error occurred while updating the user.");
    return null;
  }
}



export async function reserveRoom(userId, roomId, timeSlot) {
  try {
    // ส่งคำขอ POST ไปที่ /reservations/reserve API
    const response = await fetch(`${BACKEND_URL}/reservations/reserve`, {
      method: 'POST', // ใช้ POST method
      headers: {
        'Content-Type': 'application/json', // กำหนดให้เป็น JSON
      },
      body: JSON.stringify({ userId, roomId, date:Date.now,timeSlot }), // ส่งข้อมูลใน body
    });

    // ตรวจสอบสถานะของการตอบกลับ
    if (response.ok) {
      const data = await response.json(); // แปลงข้อมูลจาก JSON
      console.log('Reservation successful:', data);
      return data; // ส่งคืนข้อมูลการจองที่ได้รับ
    } else {
      const errorData = await response.json(); // ดึงข้อมูลข้อผิดพลาด
      console.error('Error reserving room:', errorData.message);
      return { success: false, message: errorData.message }; // ส่งคืนข้อความข้อผิดพลาด
    }
  } catch (error) {
    console.error('Error reserving room:', error);
    return { success: false, message: 'Failed to reserve room.' }; // ส่งคืนข้อความข้อผิดพลาด
  }
}


export async function cancelReservation(roomId, timeSlot) {
  try {
    const response = await fetch(`${BACKEND_URL}/reservations/cancel`, {
      method: 'POST', // ใช้ POST method
      headers: {
        'Content-Type': 'application/json', // กำหนดให้เป็น JSON
      },
      body: JSON.stringify({
        roomId, // ส่ง roomId ไปใน body
        timeSlot, // ส่ง timeSlot ไปใน body
      }),
    
    });
    const result = await response.json();
    if (response.ok) {
      alert(result.message); // แจ้งข้อความจาก backend
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to cancel reservation.');
  }
}
