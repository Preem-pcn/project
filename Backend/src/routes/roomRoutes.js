import express from "express";
import * as roomController from "../controllers/roomController.js"; // Import ฟังก์ชันทั้งหมดเป็นออบเจ็กต์

const router = express.Router();

router.get("/", roomController.getRooms); // ใช้ฟังก์ชันผ่านออบเจ็กต์
router.post("/insert-many", roomController.insertManyRooms);
router.get("/available", roomController.getRoomByAvailableTime);
router.patch("/reserve",roomController.reserveRoom);
router.patch("/cancle",roomController.cancelReservation);

export default router;

