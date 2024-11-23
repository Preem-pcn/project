import express from "express";
import * as userController from "../controllers/userController.js"; // Import ฟังก์ชันทั้งหมดเป็นออบเจ็กต์

const router = express.Router();

router.get("/", userController.getUsers); // ใช้ฟังก์ชันผ่านออบเจ็กต์
router.post("/:id", userController.getUserById);// นฟแก้ route get->post
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.put("/updateByUserId", userController.updateUserByUserId); // nf add
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.loginUser);

export default router;

