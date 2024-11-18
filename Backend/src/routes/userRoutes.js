import express from "express";
import * as userController from "../controllers/userController.js"; // Import ฟังก์ชันทั้งหมดเป็นออบเจ็กต์

const router = express.Router();

router.get("/", userController.getUsers); // ใช้ฟังก์ชันผ่านออบเจ็กต์
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;

