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
  