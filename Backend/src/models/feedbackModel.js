import mongoose from "mongoose";

const mongoose = require('mongoose');

// สร้าง Schema สำหรับ Feedback Collection
const feedbackSchema = new mongoose.Schema({
  feedbackId: {
    type: String,
    required: true,
    unique: true, // Feedback ID ต้องไม่ซ้ำ
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
  rating: {
    type: Number,
    required: true, // ต้องมีคะแนน
    min: 1, // คะแนนขั้นต่ำ
    max: 5 // คะแนนสูงสุด
  },
  comments: {
    type: String, // คำอธิบายเพิ่มเติม
    trim: true,
    default: '' // ค่าเริ่มต้นเป็นค่าว่าง
  },
  createdAt: {
    type: Date,
    default: Date.now // ค่าเริ่มต้นเป็นเวลาปัจจุบัน
  }
}, {
  timestamps: true // สร้างฟิลด์ createdAt และ updatedAt ให้อัตโนมัติ
});

// สร้าง Model สำหรับ Feedback Collection
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
