import mongoose from "mongoose";

const mongoose = require('mongoose');

// สร้าง Schema สำหรับ Users Collection
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true, // ไม่ให้ userId ซ้ำ
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true, // Username ต้องไม่ซ้ำกัน
    trim: true
  },
  passwordHash: {
    type: String,
    required: true // รหัสผ่านต้องถูกแฮชแล้ว
  },
  email: {
    type: String,
    required: true,
    unique: true, // อีเมลต้องไม่ซ้ำ
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // ตรวจสอบรูปแบบอีเมล
  },
  role: {
    type: String,
    enum: ['admin', 'user'], // จำกัดให้เลือกเฉพาะ "admin" หรือ "user"
    default: 'user' // ค่าเริ่มต้นเป็น "user"
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

// สร้าง Model สำหรับ Users Collection
const User = mongoose.model('User', userSchema);

module.exports = User;
