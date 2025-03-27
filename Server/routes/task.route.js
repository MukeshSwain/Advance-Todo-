import express from 'express'
import { addTask, completeTask, deleteTask, getAllTasks, updateTask } from '../controllers/task.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';


const router = express.Router();
router.route('/add').post(isAuthenticated, addTask)
router.route('/delete/:taskId').delete(isAuthenticated, deleteTask)
router.route('/complete/:taskId').patch(isAuthenticated, completeTask)

router.route("/update/:taskId").put(isAuthenticated, updateTask);
router.route("/get").get(isAuthenticated, getAllTasks);

export default router