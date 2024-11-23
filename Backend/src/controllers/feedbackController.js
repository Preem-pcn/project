import Feedback from "../models/feedbackModel.js";
import Reservation from "../models/reservationModel.js";

export const addFeedback = async (req, res) => {
  const { roomId, userId, rating } = req.body;

  try {
    // ตรวจสอบว่าผู้ใช้มีการจองห้องนี้ก่อนให้ Feedback หรือไม่
    const reservationExists = await Reservation.findOne({ roomId, userId, status: "approved"});
    if (!reservationExists) {
      return res.status(400).json({
        success: false,
        message: "You can only provide feedback for completed reservations.",
      });
    }

    // สร้าง Feedback ID
    const feedbackId = `FB-${Date.now()}`;

    // สร้าง Feedback ใหม่
    const feedback = await Feedback.create({ feedbackId, roomId, userId, rating });

    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully.",
      data: feedback,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to submit feedback.",
    });
  }
};

export const getFeedbackByRoom = async (req, res) => {
  const { roomId } = req.params;

  try {
    // ดึง Feedback ทั้งหมดของห้อง
    const feedbacks = await Feedback.find({ roomId });

    if (!feedbacks.length) {
      return res.status(404).json({
        success: false,
        message: "No feedback found for this room.",
      });
    }

    return res.status(200).json({
      success: true,
      data: feedbacks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve feedback.",
    });
  }
};

export const getFeedbackByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // ดึง Feedback ทั้งหมดที่ผู้ใช้ส่งมา
    const feedbacks = await Feedback.find({ userId });

    if (!feedbacks.length) {
      return res.status(404).json({
        success: false,
        message: "No feedback found for this user.",
      });
    }

    return res.status(200).json({
      success: true,
      data: feedbacks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve feedback.",
    });
  }
};
