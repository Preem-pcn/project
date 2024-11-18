import mongoose from "mongoose";



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
    type: Map,
    of: String, // สถานะเป็น String (available/unavailable)
    default: {
      '08:00-10:00': 'available',
      '10:00-12:00': 'available',
      '12:00-14:00': 'available',
      '14:00-16:00': 'available',
      '16:00-18:00': 'available',
      '18:00-20:00': 'available',
    },
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

export default Room;
