import express from "express";
import * as feedbackController from "../controllers/feedbackController.js";

const router = express.Router();

// POST - เพิ่ม Feedback หลังการจองห้องเสร็จสิ้น
router.post("/add", feedbackController.addFeedback);

// GET - ดึง Feedback ทั้งหมดของห้อง
router.get("/room/:roomId", feedbackController.getFeedbackByRoom);

// GET - ดึง Feedback ทั้งหมดที่ผู้ใช้ส่งมา
router.get("/user/:userId", feedbackController.getFeedbackByUser);

export default router;
