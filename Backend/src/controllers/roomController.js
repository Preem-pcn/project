
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

      // ถ้าพบห้องที่มีสถานะ available
      return res.status(200).json({
        success: true,
        data: rooms,
      });
    } catch (error) {
      console.error("Error fetching rooms:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch available rooms.",
      });
    }
};


// ฟังก์ชันจองห้องและอัพเดตสถานะห้อง
export const reserveRoom = async (req, res) => {
    const { roomId, timeSlot } = req.body; // timeSlot คือ "${startTime}-${endTime}"

    // ตรวจสอบว่า timeSlot ถูกส่งมาหรือไม่
    if (!timeSlot) {
      return res.status(400).json({ message: "Please provide a timeSlot in the format 'startTime-endTime'." });
    }

    try {
      // ค้นหาห้องที่มี roomId ที่ตรงกัน
      const room = await Room.findOne({ roomId });

      // หากไม่พบห้อง
      if (!room) {
        return res.status(404).json({ message: "Room not found." });
      }

      // ตรวจสอบสถานะของห้องในช่วงเวลาที่จอง
      if (room.availabilityStatus.get(timeSlot) === 'unavailable') {
        return res.status(400).json({ message: `This room is already booked for the selected time: ${timeSlot}.` });
      }

      // อัปเดตสถานะห้องให้เป็น "unavailable" ในช่วงเวลาที่เลือก
      room.availabilityStatus.set(timeSlot, 'unavailable');

      // บันทึกการอัพเดต
      await room.save();

      return res.status(200).json({ message: `Room ${roomId} has been successfully booked for ${timeSlot}.` });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while booking the room." });
    }
};

// ฟังก์ชันยกเลิกการจองห้อง
export const cancelReservation = async (req, res) => {
  const { roomId, timeSlot } = req.body; // timeSlot คือ "${startTime}-${endTime}"

  // ตรวจสอบว่า timeSlot ถูกส่งมาหรือไม่
  if (!timeSlot) {
    return res.status(400).json({ message: "Please provide a timeSlot in the format 'startTime-endTime'." });
  }

  try {
    // ค้นหาห้องที่มี roomId ที่ตรงกัน
    const room = await Room.findOne({ roomId });

    // หากไม่พบห้อง
    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }

    // ตรวจสอบสถานะของห้องในช่วงเวลาที่เลือก
    if (room.availabilityStatus.get(timeSlot) === 'available') {
      return res.status(400).json({ message: `This room is not booked for the selected time: ${timeSlot}.` });
    }

    // อัปเดตสถานะห้องให้เป็น "available" ในช่วงเวลาที่เลือก (ยกเลิกการจอง)
    room.availabilityStatus.set(timeSlot, 'available');

    // บันทึกการอัพเดต
    await room.save();

    return res.status(200).json({ message: `Room ${roomId} has been successfully cancelled for ${timeSlot}.` });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while canceling the booking." });
  }
};