import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { createHousehold, deleteHouseholdById, getHouseholds, updateHousehold } from "../controllers/householdController.js";
import { createUpload } from "../config/multer.js";

const router = express.Router();
const upload = createUpload('residents');

router.get('/', authenticate, getHouseholds);
router.post("/", authenticate, upload.array('photo'), createHousehold);
router.put("/:id", authenticate, updateHousehold);
router.delete("/:id", authenticate, deleteHouseholdById);

export default router;