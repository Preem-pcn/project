import mongoose from "mongoose";


// สร้าง Schema สำหรับ Reservations Collection
const reservationSchema = new mongoose.Schema({
  reservationId: {
    type: String,
    required: true,
    unique: true, // Reservation ID ต้องไม่ซ้ำ
    trim: true
  },
  roomId: {
    type: String,
    required: true, // เชื่อมโยงกับ Room ID
    trim: true
  },
  userId: {
    type: String,
    required: true, // เชื่อมโยงกับ User ID
    trim: true
  },
  date: {
    type: Date, // เก็บวันที่ของการจอง
    required: true,
  },
  timeSlot: {
    type: String, // "${startTime}-${endTime}"
    required: true,
  },
  status: {
    type: String,
    enum: ["approved", "cancelled"], // สถานะการจอง
    default: "approved",
  },
  createdAt: {
    type: Date,
    default: Date.now // ค่าเริ่มต้นเป็นเวลาปัจจุบัน
  },
  updatedAt: {
    type: Date,
    default: Date.now // ค่าเริ่มต้นเป็นเวลาปัจจุบัน
  }
}, {
  timestamps: true // สร้างฟิลด์ createdAt และ updatedAt ให้อัตโนมัติ
});

reservationSchema.index({ userId: 1, date: 1, timeSlot: 1 }, { unique: true });

// สร้าง Model สำหรับ Reservations Collection
const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
