// routes/todoRoutes.js
import express from 'express';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todo.controller.js';
//import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/', createTodo); // Create a new to-do
router.get('/',  getTodos);    // Get all to-dos for the authenticated user
router.put('/:id', updateTodo); // Update a specific to-do by ID
router.delete('/:id', deleteTodo); // Delete a specific to-do by ID

export default router;
