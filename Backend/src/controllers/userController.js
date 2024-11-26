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
  const { userId, username, password, email, role } = req.body;

  const newUser = new User({
    userId,
    username,
    password,
    email,
    role: "user",
  });

  try {
    const savedUser = await newUser.save(); // บันทึกข้อมูลใน MongoDB
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// [PUT] Update user information by userId
export const updateUserByUserId = async (req, res) => {
  const { userId, oldPassword, username, email, password } = req.body;
  
  try {
    // Fetch the user by userId
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Validate the old password
    if (user.password !== oldPassword) {
      return res.status(403).json({ message: 'Incorrect current password.' });
    }

    // Update allowed fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password; // Save the new password as plain text

    // Save updated user data
    const updatedUser = await user.save();

    // Respond with updated details
    res.status(200).json({
      message: 'Profile updated successfully.',
      user: {
        userId: updatedUser.userId,
        username: updatedUser.username,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update user profile.', error: error.message });
  }
};

//export default { updateUserByUserId };




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

// Login User
export const loginUser = async (req, res) => {
  const { userId, password } = req.body;

  try {
    // ตรวจสอบว่า userId มีอยู่ในระบบหรือไม่
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ตรวจสอบว่า password ตรงกับฐานข้อมูลหรือไม่
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // Login สำเร็จ
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        userId: user.userId,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during login.",
    });
  }
};