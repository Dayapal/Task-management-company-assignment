import Task from "../models/Task.js";
import ActivityLog from "../models/ActivityLog.js";

export const createTask = async (req, res) => {
  try {
    
    const { title, description } = req.body;
      if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const task = await Task.create({
      title,
      description,
      user: req.user._id,
    });

    await ActivityLog.create({
      user: req.user._id,
      task: task._id,
      action: "TASK_CREATED",
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user._id,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    task.title =
      req.body.title || task.title;

    task.description =
      req.body.description || task.description;

    task.status =
      req.body.status || task.status;

    const updatedTask = await task.save();

    await ActivityLog.create({
      user: req.user._id,
      task: task._id,
      action: "TASK_UPDATED",
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    await ActivityLog.create({
      user: req.user._id,
      task: task._id,
      action: "TASK_DELETED",
    });

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};