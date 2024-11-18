import Room from "../models/roomModel.js";

// รายการห้องประชุมคงที่
const defaultRooms = [
  {
    roomId: "R001",
    roomName: "Conference Room 1",
    capacity: 10,
    location: "Floor 1",
    amenities: ["Projector", "Whiteboard"],
  },
  {
    roomId: "R002",
    roomName: "Conference Room 2",
    capacity: 8,
    location: "Floor 2",
    amenities: ["TV", "Whiteboard"],
  },
  {
    roomId: "R003",
    roomName: "Conference Room 3",
    capacity: 12,
    location: "Floor 1",
    amenities: ["Video Conferencing", "Whiteboard"],
  },
  {
    roomId: "R004",
    roomName: "Conference Room 4",
    capacity: 6,
    location: "Floor 3",
    amenities: ["TV", "Speakers"],
  },
  {
    roomId: "R005",
    roomName: "Conference Room 5",
    capacity: 15,
    location: "Floor 2",
    amenities: ["Projector", "Whiteboard", "Speakers"],
  },
  {
    roomId: "R006",
    roomName: "Conference Room 6",
    capacity: 20,
    location: "Floor 1",
    amenities: ["Video Conferencing", "Projector"],
  },
];

// ฟังก์ชันสำหรับเพิ่มห้องประชุมคงที่
export const seedRooms = async () => {
  try {
    const existingRooms = await Room.find(); // ตรวจสอบว่ามีห้องประชุมในระบบหรือยัง
    if (existingRooms.length === 0) {
      // ถ้ายังไม่มีห้องประชุมใดเลย ให้เพิ่มห้องทั้งหมด
      await Room.insertMany(defaultRooms);
      console.log("Default rooms have been added.");
    } else {
      console.log("Rooms already exist. No action taken.");
    }
  } catch (error) {
    console.error("Error seeding rooms:", error);
  }
};
