import { useState, useEffect } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import { format, isToday, isYesterday } from "date-fns";

export default function CompletedTodos() {
  const [todos, setTodos] = useState([]);

  function formateDate(dateString) {
    const parsedDate = new Date(dateString);
    return isToday(parsedDate)
      ? "Today"
      : isYesterday(parsedDate)
      ? "Yesterday"
      : format(parsedDate, "EEEE, MMM d");
  }

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No auth token found");
      return;
    }

    axios
      .get("http://localhost:3000/api/task/todo/completed", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching completed todos:", error);
      });
  }, []);

  return (
    <div>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TaskCard
            key={todo._id}
            id={todo._id}
            title={todo.title}
            description={todo.description}
            status={todo.status}
            dueDate={formateDate(todo.dueDate)}
          />
        ))
      ) : (
        <h1>No completed todos found.</h1>
      )}
    </div>
  );
}
