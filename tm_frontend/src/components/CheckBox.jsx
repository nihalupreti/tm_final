import axios from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoAtom } from "../store/atoms/Todo";

export default function CheckBox({ id, title, description, dueDate, status }) {
  const [checked, setChecked] = useState(status);
  const setTodo = useSetRecoilState(todoAtom);

  const handleChange = () => {
    setChecked(!checked);

    const token = localStorage.getItem("authToken");

    axios
      .put(
        `http://localhost:3000/api/task/todo/${id}`,
        {
          title,
          description,
          dueDate,
          status: !checked,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setTodo((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        console.log("Task updated successfully", response.data);
      })
      .catch((error) => {
        console.error("Error updating task", error);
      });
  };

  return (
    <div className="inline-flex items-center m-3">
      <label className="flex items-center cursor-pointer relative">
        <input
          type="checkbox"
          className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
          checked={checked}
          onChange={handleChange}
        />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </label>
    </div>
  );
}
