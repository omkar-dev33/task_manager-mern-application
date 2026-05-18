import express from 'express';
import { createTask, updateTask, deleteTask, getTask, signUp, signIn } from '../controller/TaskControllers.js'

const router = express.Router();

router.post("/", createTask);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);
router.get("/", getTask);
router.post("/signup", signUp);
router.get("/login", signIn);

export default router;





