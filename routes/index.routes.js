import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import columnRoutes from "./column.routes.js";
import boardRoutes from "./board.routes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/columns", columnRoutes)
router.use("/boards", boardRoutes)
export default router;