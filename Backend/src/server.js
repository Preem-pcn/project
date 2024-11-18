import "dotenv/config";
import "./config/db.js";

import app from "./app.js";
import { seedRooms } from "./config/roomseed.js";

// This is for maintaining the server.
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  console.log(err.stack);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(`${err}`);
  server.close(() => {
    process.exit(1);
  });
});

// const PORT = 3222;
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Backend Server ready at http://localhost:${PORT}`);
// });

const PORT = 3222;

(async () => {
  try {
    console.log("Seeding rooms...");
    await seedRooms(); // ตรวจสอบและสร้างห้องประชุมคงที่ในฐานข้อมูล
    console.log("Rooms seeded successfully!");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Backend Server ready at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
    process.exit(1); // ปิดโปรแกรมทันทีหากเกิดข้อผิดพลาด
  }
})();
