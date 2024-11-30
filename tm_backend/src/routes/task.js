const express = require("express");
const authMiddleware = require("../middlewares/auth");
const { todos: task } = require("../config/database");

const router = express.Router();

router.post("/todo", authMiddleware, (req, res) => {
  const { title, description, dueDate, status } = req.body;

  const todo = new task({
    title: title,
    description: description,
    dueDate: dueDate,
    status: status,
    user: req.user.userid,
  });
  todo
    .save()
    .then((data) => {
      console.log("sucessfully saved the todo.");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log("could not save the todos.");
      res.status(400).json({
        message: "something went wrong while trying to save to the database",
      });
    });
});

router.get("/todos", authMiddleware, (req, res) => {
  task
    .find({ user: req.user.userid })
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((err) => {
      console.log("couldnot fetch tasks from database.");
      res.status(400).json({ message: "try again" });
    });
});

router.delete("/todo/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  task
    .findByIdAndDelete({ _id: id, user: req.user.userid })
    .then((deletedTask) => {
      if (!deletedTask) {
        return res
          .status(404)
          .json({ message: "Task not found or not authorized" });
      }
      res.status(200).json(deletedTask);
    })
    .catch((err) => {
      console.error("Error deleting task:", err);
      res
        .status(500)
        .json({ message: "An error occurred while deleting the task" });
    });
});

router.put("/todo/:id", authMiddleware, (req, res) => {
  const { title, description, dueDate, status } = req.body; //updated data
  const { id } = req.params;
  task
    .findByIdAndUpdate(
      id, //id of tasks to be updated
      { title, description, dueDate, status }, // New data to update
      { new: true } // Returns the updated task
    )
    .then((updatedTask) => {
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      res
        .status(200)
        .json({ message: "Task updated successfully", task: updatedTask });
    })
    .catch((err) => {
      console.log("Error updating task:", err);
      res.status(500).json({ message: "Server error" });
    });
});

router.get("/todo/completed", authMiddleware, (req, res) => {
  task
    .find({ user: req.user.userid, status: true })
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((err) => {
      console.log("couldnot fetch completed tasks from database.");
      res.status(400).json({ message: "try again" });
    });
});
module.exports = router;
