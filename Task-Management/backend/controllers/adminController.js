import User from "../models/User.js";
import Task from "../models/Task.js";
import ActivityLog from "../models/ActivityLog.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) {
  return res.status(400).json({
    message: "Admin cannot delete own account",
  });
}
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (
      !["Active", "Inactive"].includes(req.body.status)
    ) {
      return res.status(400).json({
        message: "Invalid status. Status must be Active or Inactive",
      });
    }

    user.status = req.body.status;

    await user.save();

    res.json({
      message: "User status updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("user", "name email");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteAnyTask = async (
  req,
  res
) => {
  try {
   const task = await Task.findById(req.params.id);

if (!task) {
  return res.status(404).json({
    message: "Task not found",
  });
}

await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getActivityLogs = async (
  req,
  res
) => {
  try {
    const logs = await ActivityLog.find()
      .populate("user", "name email")
      .populate("task");

    res.json(logs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAnalytics = async (
  req,
  res
) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalTasks = await Task.countDocuments();

    const completedTasks =
      await Task.countDocuments({
        status: "Completed",
      });

    const pendingTasks =
      await Task.countDocuments({
        status: "Pending",
      });

    res.json({
      totalUsers,
      totalTasks,
      completedTasks,
      pendingTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};