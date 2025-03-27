import Task from "../models/task.model.js";
import { sendMail } from "../util/notification.js";
import User from "../models/user.model.js";

export const addTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  const userId = req.id;
  try {
    if (!title) {
      return res
        .status(400)
        .json({ error: "Title is required", success: false });
    }
    const newTask = new Task({
      title,
      createdBy: userId,
    });
    if (description) {
      newTask.description = description;
    }
    if (dueDate) {
      newTask.dueDate = dueDate;
    }
    if (priority) {
      newTask.priority = priority;
    }

    await newTask.save();
    const user = await User.findById(userId);
    await sendMail(
      user.email,
      "✅ Task Added Successfully - MyTodo App",
      `Hi ${user.name},

Your new task **"${newTask.title}"** has been created successfully!  

📅 **Due Date:** ${newTask.dueDate}  

Stay focused and complete it on time.  

Best Regards,  
The MyTodo App Team  `
    );
    res.status(201).json({ message: "Task added successfully", success: true });
  } catch (error) {
    console.log("Internal server error ", error.message);
    return res
      .status(500)
      .json({ error: "Internal server error", success: false });
  }
};

export const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    if (!taskId) {
      return res
        .status(400)
        .json({ error: "Task ID is required", success: false });
    }
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Task deleted successfully", success: true });
  } catch (error) {
    console.log("Internal server error ", error.message);
    return res
      .status(500)
      .json({ error: "Internal server error", success: false });
  }
};

export const completeTask = async (req, res) => {
  const taskId = req.params.taskId;

  try {
    if (!taskId) {
      return res
        .status(400)
        .json({ error: "Task ID is required", success: false });
    }
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found", success: false });
    }
    if (task.status === "completed") {
      task.status = "pending";
      await task.save();
      return res
        .status(200)
        .json({ message: "Task marked as pending", success: true });
    }
    if (task.status === "pending") {
      task.status = "completed";
      await task.save();
      const user = await User.findById(task.createdBy);
      await sendMail(
        user.email,
        "🎯 Task Completed Successfully!",
        `Hi ${user.name},  

Great job! 🎉 You have successfully completed the task **"${task.title}"**. Keep up the productivity!  

Want to set your next goal? Log in now and add new tasks:  
🔗 [Your App Link]  

Best Regards,  
The MyTodo App Team  
`
      );
      return res
        .status(200)
        .json({ message: "Task completed successfully", success: true });
    }
  } catch (error) {
    console.log("Internal server error ", error.message);
    return res
      .status(500)
      .json({ error: "Internal server error", success: false });
  }
};

export const updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  const { title, description, dueDate, priority } = req.body;
  try {
    if (!taskId) {
      return res
        .status(400)
        .json({ error: "Task ID is required", success: false });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found", success: false });
    }
    if (title) {
      task.title = title;
    }
    if (description) {
      task.description = description;
    }
    if (dueDate) {
      task.dueDate = new Date(dueDate);
    }
    if (priority) {
      task.priority = priority;
    }
    await task.save();
    return res
      .status(200)
      .json({ message: "Task updated successfully", success: true });
  } catch (error) {}
};

export const getAllTasks = async (req, res) => {
  try {
    const id = req.id;
    const tasks = await Task.find({ createdBy: id }).sort({
      dueDate: 1,
      
    });
    res
      .status(200)
      .json({ tasks, success: true, message: "Tasks fetched successfully" });
  } catch (error) {
    console.log("Error in getAllTasks ", error.message);
    return res
      .status(500)
      .json({ error: "Internal server error", success: false });
  }
};
