import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { createHousehold, deleteHouseholdById, getHouseholds, updateHousehold } from "../controllers/householdController.js";

const router = express.Router();

router.get('/', authenticate, getHouseholds);
router.post("/", authenticate, createHousehold);
router.put("/:id", authenticate, updateHousehold);
router.delete("/:id", authenticate, deleteHouseholdById);

export default router;