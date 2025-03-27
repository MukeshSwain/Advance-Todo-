import cron from "node-cron";
import { sendMail } from "./notification.js";
import User from "../models/user.model.js";
import Task from "../models/task.model.js";

cron.schedule("0 10 * * *", async () => {
  console.log("✅ Running task reminder job...");
  const today = new Date();
  const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1); // Get tasks due tomorrow
    try {
        const tasks = await Task.find({
          dueDate: { $lte: tomorrow }, // Tasks due today or tomorrow
          status: { $ne: "completed" }, // Ignore completed tasks
        }).populate("createdBy");

        for (const task of tasks) { 
            const user = await User.findById(task.createdBy);
            if(!user || !user.email) continue;
            const subject = `⏳ Reminder: Task "${task.title}" is Due Soon!`;
            const message = `
                Hi ${user.name},

                Just a friendly reminder that your task **"${
                  task.title
                }"** is due on **${task.dueDate.toDateString()}**.  
                Don't let deadlines catch you off guard!

                ✅ Complete it before it's overdue: [Your App Link]

                If you've already completed it, you can ignore this message.

                Best Regards,  
                The MyTodo App Team
            `;
            await sendMail(user.email, subject, message);
            console.log(
              `📧 Reminder sent to ${user.email} for task "${task.title}"`
            );
        }
    } catch (error) {
                console.log("❌ Error sending reminders:", error.message);

    }
})