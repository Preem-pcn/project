const express = require('express');
import * as userController from "../controllers/userController.js"; // Import ฟังก์ชันทั้งหมดเป็นออบเจ็กต์


const router = express.Router();

//router.get('/', getUsers); // ดึงข้อมูลผู้ใช้ทั้งหมด
router.get('/:id', getUserById); // ดึงข้อมูลผู้ใช้ตาม ID
router.post('/', createUser); // สร้างผู้ใช้ใหม่
router.put('/:id', updateUser); // อัปเดตข้อมูลผู้ใช้
router.delete('/:id', deleteUser); // ลบผู้ใช้

module.exports = router;
