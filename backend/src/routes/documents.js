import express from "express";
import {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument
} from "../controllers/documentsController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/", authenticate, getDocuments);
// router.get("/:id", getDocument);
router.post("/", authenticate, createDocument);
router.put("/:id", authenticate, updateDocument);
router.delete("/:id", authenticate, deleteDocument);

export default router;
