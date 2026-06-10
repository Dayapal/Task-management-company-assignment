import express from "express";

import {
  getAllUsers,
  deleteUser,
  updateUserStatus,
  getAllTasks,
  deleteAnyTask,
  getActivityLogs,
  getAnalytics,
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";

import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);

router.delete(
  "/users/:id",
  protect,
  adminOnly,
  deleteUser
);

router.put(
  "/users/:id/status",
  protect,
  adminOnly,
  updateUserStatus
);

router.get(
  "/tasks",
  protect,
  adminOnly,
  getAllTasks
);

router.delete(
  "/tasks/:id",
  protect,
  adminOnly,
  deleteAnyTask
);

router.get(
  "/activity",
  protect,
  adminOnly,
  getActivityLogs
);

router.get(
  "/analytics",
  protect,
  adminOnly,
  getAnalytics
);

export default router;