import { Router } from "express";
import {
  getAllColumn,
  searchColumn,
  getColumnById,
  createColumn,
  updateColumn,
  removeColumn,
} from "../controllers/index.js";
const router = Router();

router.get("/", getAllColumn);
router.get("/search", searchColumn);
router.get("/:id", getColumnById);
router.post("/", createColumn);
router.put("/:id", updateColumn);
router.delete("/:id", removeColumn);

export default router;