import User from "../models/userModel.js";

// [GET] ดึงข้อมูลผู้ใช้ทั้งหมด for test
export const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // ค้นหาผู้ใช้ทั้งหมด
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [GET] ดึงข้อมูลผู้ใช้ตาม ID
export const getUserById = async (req, res) => {
  try {
    //const user = await User.findById(req.params.id); // ค้นหาผู้ใช้ตาม ID
    const { userId } = req.body;
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [POST] สร้างผู้ใช้ใหม่
export const createUser = async (req, res) => {
  const { userId, username, passwordHash, email, role } = req.body;

  const newUser = new User({
    userId,
    username,
    passwordHash,
    email,
    role: "student",
  });

  try {
    const savedUser = await newUser.save(); // บันทึกข้อมูลใน MongoDB
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [PUT] อัปเดตข้อมูลผู้ใช้
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body, // ข้อมูลใหม่ที่ต้องการอัปเดต
      { new: true, runValidators: true } // คืนค่าที่อัปเดตแล้วและตรวจสอบข้อมูล
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [DELETE] ลบผู้ใช้
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id); // ลบผู้ใช้ตาม ID
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
