import express from 'express';
import { createTask, updateTask, deleteTask, getTask } from '../controller/TaskControllers.js'

const router = express.Router();

router.post("/", createTask);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);
router.get("/", getTask);

export default router;





