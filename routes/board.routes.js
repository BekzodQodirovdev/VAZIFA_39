import { Router } from "express";
import {
  getAllBoards,
  searchBoard,
  getBoardById,
  createBoard,
  updateBoard,
  removeBoard,
} from "../controllers/index.js";
const router = Router();

router.get("/", getAllBoards);
router.get("/search", searchBoard);
router.get("/:id", getBoardById);
router.post("/", createBoard);
router.put("/:id", updateBoard);
router.delete("/:id", removeBoard);

export default router;