import express from 'express';
import {  createTask,
          deleteTask,
           getTask,
           getTasks,
           updateTask,} from '../controllers/taskController.js';
import { protect, creatorMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/task/create", protect, createTask);
router.get("/tasks", protect, getTasks);
router.get("/task/:id", protect, getTask);
router.patch("/task/:id", protect, updateTask);
router.delete("/task/:id", protect, deleteTask);

export default router;