
import Room from "../models/roomModel.js";
  
export const getRooms = async (req, res) => {
    try {
      // ค้นหาห้องประชุมทั้งหมดในฐานข้อมูล
      const rooms = await Room.find();
      
      // ส่งคืนข้อมูลในรูปแบบ JSON
      res.status(200).json({
        success: true,
        data: rooms,
      });
    } catch (error) {
      // จัดการข้อผิดพลาด
      console.error("Error fetching rooms:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch rooms",
      });
    }
    
};

export const insertManyRooms = async (req, res) => {
    const { rooms } = req.body; // รับข้อมูลห้องประชุมจาก body

    // ตรวจสอบว่ามีข้อมูล rooms หรือไม่ และต้องเป็นอาร์เรย์
    if (!rooms || !Array.isArray(rooms)) {
      return res.status(400).json({
        success: false,
        message: "Invalid input. 'rooms' should be an array of room objects.",
      });
    }

    try {
      // เพิ่มห้องประชุมในฐานข้อมูล
      const insertedRooms = await Room.insertMany(rooms);

      res.status(201).json({
        success: true,
        message: "Rooms added successfully.",
        data: insertedRooms,
      });
    } catch (error) {
      // ตรวจสอบข้อผิดพลาด เช่น roomId ซ้ำกันในฐานข้อมูล
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Duplicate roomId detected. Please provide unique roomId values.",
          error: error.message,
        });
      }

      res.status(500).json({
        success: false,
        message: "Failed to add rooms.",
        error: error.message,
      });
    }
};


// ฟังก์ชันในการดึงห้องประชุมที่มีสถานะ 'available' ตามช่วงเวลาที่เลือก
export const getRoomByAvailableTime = async (req, res) => {
    const { timeSlot } = req.body; // รับข้อมูล timeSlot จาก body request (เช่น "08:00-10:00")
    console.log("Received request at /rooms/available");
    console.log("Request body:", req.body); // ดูว่า body ถูกส่งมาถูกต้องหรือไม่
    // ตรวจสอบว่า timeSlot เป็นค่าว่างหรือไม่
    if (!timeSlot) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid timeSlot.",
      });
    }

    try {
      // ค้นหาห้องที่มีสถานะ 'available' ในช่วงเวลาที่เลือก
      const rooms = await Room.find({
        [`availabilityStatus.${timeSlot}`]: "available", // ใช้ timeSlot ตรงๆ ในการเข้าถึง availabilityStatus
      });

      // ถ้าไม่พบห้องที่มีสถานะ available
      if (rooms.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No rooms available for the selected time.",
        });
      }

      const roomData = rooms.map(room => ({
        name: room.roomId, // ชื่อห้อง
        capacity: room.capacity, // ความจุ
        facilities: room.amenities, // สิ่งอำนวยความสะดวก
      }));

      // ถ้าพบห้องที่มีสถานะ available
      return res.status(200).json({
        success: true,
        data: roomData, // ส่งเฉพาะชื่อห้อง
      });
    } catch (error) {
      console.error("Error fetching rooms:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch available rooms.",
      });
    }
};




