import mongoose from "mongoose";

const mongoose = require('mongoose');

// สร้าง Schema สำหรับ Rooms Collection
const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true, // Room ID ต้องไม่ซ้ำ
    trim: true
  },
  roomName: {
    type: String,
    required: true, // ต้องระบุชื่อห้อง
    trim: true
  },
  capacity: {
    type: Number,
    required: true, // ต้องระบุความจุของห้อง
    min: 1 // ความจุขั้นต่ำคือ 1
  },
  location: {
    type: String,
    required: true, // ต้องระบุที่ตั้งของห้อง
    trim: true
  },
  amenities: {
    type: [String], // เก็บรายการสิ่งอำนวยความสะดวกเป็นอาร์เรย์ของสตริง
    default: [] // ค่าเริ่มต้นเป็นอาร์เรย์ว่าง
  },
  availabilityStatus: {
    type: String,
    enum: ['available', 'unavailable'], // กำหนดสถานะว่า "available" หรือ "unavailable"
    default: 'available' // ค่าเริ่มต้นเป็น "available"
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

// สร้าง Model สำหรับ Rooms Collection
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
