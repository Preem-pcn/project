import mongoose from "mongoose";


// สร้าง Schema สำหรับ Recommendations Collection
const recommendationSchema = new mongoose.Schema({
  recommendationId: {
    type: String,
    required: true,
    unique: true, // Recommendation ID ต้องไม่ซ้ำ
    trim: true
  },
  userId: {
    type: String,
    required: true, // เชื่อมโยงกับ User ID
    trim: true
  },
  suggestedRoomIds: {
    type: [String], // รายการ Room IDs ที่แนะนำ
    required: true, // ต้องระบุว่าจะแนะนำห้องอะไรบ้าง
    default: [] // ค่าเริ่มต้นเป็นอาร์เรย์ว่าง
  },
  reason: {
    type: String, // เหตุผลที่แนะนำ
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

// สร้าง Model สำหรับ Recommendations Collection
const Recommendation = mongoose.model('Recommendation', recommendationSchema);

export default Recommendation;
