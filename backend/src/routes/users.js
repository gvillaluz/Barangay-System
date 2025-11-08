import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  verifyAdmin,
} from "../controllers/usersController.js";

const router = express.Router();

// All routes require admin access
router.use(verifyAdmin);

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;

