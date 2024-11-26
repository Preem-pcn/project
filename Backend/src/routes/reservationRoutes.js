import express from "express";
import * as reservationController from "../controllers/ReservationController.js"; // Import ฟังก์ชันทั้งหมดเป็นออบเจ็กต์

const router = express.Router();


router.post("/reserve", reservationController.createReservation);
router.post("/cancel", reservationController.cancelReservation);
router.post("/check-reservation", reservationController.checkUserReservation);

export default router;
