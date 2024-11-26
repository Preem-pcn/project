import Reservation from "../models/reservationModel.js";
import Room from "../models/roomModel.js";

export const createReservation = async (req, res) => {
  const { userId, roomId, date, timeSlot} = req.body;

  try {
    // ตรวจสอบว่าผู้ใช้มีการจองช่วงเวลาอื่นในวันเดียวกันหรือไม่
    const existingReservation = await Reservation.findOne({ userId, date,status: { $ne: "cancelled" } });
    if (existingReservation) {
      return res.status(400).json({
        success: false,
        message: "You have already booked a room.",
      });
    }

    // ตรวจสอบห้องที่ต้องการจอง
    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found.",
      });
    }

    if (room.availabilityStatus.get(timeSlot) === "unavailable") {
      return res.status(400).json({
        success: false,
        message: `Room ${roomId} is already booked for this time slot.`,
      });
    }

    // อัปเดตสถานะห้องเป็น "unavailable"
    room.availabilityStatus.set(timeSlot, "unavailable");
    await room.save();

    // สร้างการจอง
    const newReservation = await Reservation.create({
      reservationId: `RES-${Date.now()}`,
      userId,
      roomId,
      date: date,
      timeSlot,
      status: "approved",
    });

    return res.status(201).json({
      success: true,
      message: "Room reserved successfully.",
      data: newReservation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to reserve room." });
  }
};

export const checkUserReservation = async (req, res) => {
  const { userId } = req.body; // Get `userId` from the request body
  
  try {
    // Find a single active reservation (not cancelled) for the user
    const reservation = await Reservation.findOne({
      userId,
      status: { $ne: "cancelled" }, // Exclude cancelled reservations
    });

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "No active reservations found for this user.",
      });
    }

    // Return the reservation data
    return res.status(200).json({
      success: true,
      data: reservation, // Send back the reservation data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to check user reservation.",
    });
  }
};


// export const cancelReservation = async (req, res) => {
//   const { userId } = req.body; // รับแค่ userId จาก body

//   try {
//     // ค้นหาการจองทั้งหมดที่ผู้ใช้ทำไว้ (ไม่ว่าจะเป็นห้องใดๆ และช่วงเวลาใดๆ)
//     const reservations = await Reservation.find({ userId, status: { $ne: "cancelled" } });

//     if (reservations.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No active reservations found for this user.",
//       });
//     }

//     // อัปเดตสถานะห้องให้ว่างและยกเลิกการจอง
//     for (let reservation of reservations) {
//       const room = await Room.findOne({ roomId: reservation.roomId });
//       if (room) {
//         room.availabilityStatus.set(reservation.timeSlot, "available");
//         await room.save();
//       }

//       // เปลี่ยนสถานะการจองเป็น cancelled
//       reservation.status = "cancelled";
//       await reservation.save();
//     }

//     return res.status(200).json({
//       success: true,
//       message: "All reservations for this user have been cancelled successfully.",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Failed to cancel reservations." });
//   }
// };

export const cancelReservation = async (req, res) => {
  const { userId } = req.body; // รับแค่ userId จาก body

  try {
    // ค้นหาการจองทั้งหมดที่ผู้ใช้ทำไว้ (ไม่ว่าจะเป็นห้องใดๆ และช่วงเวลาใดๆ)
    const reservations = await Reservation.find({ userId, status: { $ne: "cancelled" } });

    if (reservations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No active reservations found for this user.",
      });
    }

    // ลบการจองทั้งหมดที่พบ
    for (let reservation of reservations) {
      // ลบการจองจากฐานข้อมูล
      await Reservation.deleteOne({ userId : reservation.userId});

      // อัปเดตสถานะห้องให้ว่าง
      const room = await Room.findOne({ roomId: reservation.roomId });
      if (room) {
        room.availabilityStatus.set(reservation.timeSlot, "available");
        await room.save();
      }
    }

    return res.status(200).json({
      success: true,
      message: "All reservations for this user have been cancelled and removed successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to cancel and remove reservations." });
  }
};
