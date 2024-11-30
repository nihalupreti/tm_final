const { todos } = require("../config/database");
const sendNotification = require("./mailer");

async function checkOverdueTasks() {
  const now = new Date();
  try {
    // Find overdue tasks and populate user information
    const overdueTasks = await todos
      .find({ dueDate: { $lt: now }, status: false })
      .populate("user", "email");

    // Send notifications
    overdueTasks.forEach((task) => {
      console.log(task.user);
      if (task.user && task.user.email) {
        sendNotification(task.user.email, task);
      } else {
        console.log(`User email not found for task: ${task.title}`);
      }
    });
  } catch (error) {
    console.error(`Error checking overdue tasks: ${error}`);
  }
}

module.exports = checkOverdueTasks;
