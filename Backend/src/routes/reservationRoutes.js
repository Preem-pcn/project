import express from "express";
import * as reservationController from "../controllers/ReservationController.js"; // Import ฟังก์ชันทั้งหมดเป็นออบเจ็กต์

const router = express.Router();


router.post("/reserve", createReservation);
router.get("/user/:userId", getUserReservations);
router.post("/cancel", cancelReservation);
router.post("/approve", approveReservation);

export default router;
