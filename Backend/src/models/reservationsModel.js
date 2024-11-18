import mongoose from "mongoose";
const mongoose = require('mongoose');

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
  startTime: {
    type: Date,
    required: true // เวลาที่เริ่มการจอง
  },
  endTime: {
    type: Date,
    required: true // เวลาที่สิ้นสุดการจอง
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'cancelled'], // สถานะการจอง
    default: 'pending' // ค่าเริ่มต้นเป็น "pending"
  },
  purpose: {
    type: String, // จุดประสงค์การจอง (ถ้ามี)
    trim: true,
    default: '' // ค่าเริ่มต้นเป็นค่าว่าง
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

// สร้าง Model สำหรับ Reservations Collection
const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
