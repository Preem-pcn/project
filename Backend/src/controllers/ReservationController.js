import Reservation from "../models/reservationModel.js";
import Room from "../models/roomModel.js";

export const reserveRoom = async (req, res) => {
  const { userId, roomId, date, timeSlot, purpose } = req.body;

  try {
    // ตรวจสอบว่าผู้ใช้มีการจองช่วงเวลาอื่นในวันเดียวกันหรือไม่
    const existingReservation = await Reservation.findOne({ userId, date, timeSlot });
    if (existingReservation) {
      return res.status(400).json({
        success: false,
        message: "You have already booked a room for this time slot.",
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
      date,
      timeSlot,
      purpose,
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

export const cancelReservation = async (req, res) => {
    const { reservationId } = req.body;
  
    try {
      // หา Reservation ที่ต้องการยกเลิก
      const reservation = await Reservation.findOne({ reservationId });
      if (!reservation) {
        return res.status(404).json({
          success: false,
          message: "Reservation not found.",
        });
      }
  
      // อัปเดตสถานะห้องให้ว่าง
      const room = await Room.findOne({ roomId: reservation.roomId });
      if (room) {
        room.availabilityStatus.set(reservation.timeSlot, "available");
        await room.save();
      }
  
      // ยกเลิกการจอง
      reservation.status = "cancelled";
      await reservation.save();
  
      return res.status(200).json({
        success: true,
        message: "Reservation cancelled successfully.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to cancel reservation." });
    }
  };
  