import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoAtom } from "../store/atoms/Todo";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Default styles
import axios from "axios";
import Modal from "react-modal";

export default function TodoForm({ isOpen, closeModal }) {
  const setTodo = useSetRecoilState(todoAtom);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default page reload

    const { title, description, dueDate } = formData;

    if (!title || !description || !dueDate) {
      setErrorMessage("All fields are required");
      return;
    }

    const token = localStorage.getItem("authToken"); // Retrieve JWT from local storage

    axios
      .post(
        "http://localhost:3000/api/task/todo",
        {
          ...formData,
          status: false, // Default is always false
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setTodo((prev) => [...prev, response.data]);
        closeModal();

        setFormData({ title: "", description: "", dueDate: null });
        setErrorMessage("");
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage(error.message || "Something went wrong!");
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="form modal"
      ariaHideApp={false}
      className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-sm w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50"
    >
      <form className="max-w-sm mx-auto bg-gray-700" onSubmit={handleSubmit}>
        <FormInput
          label="Title"
          name="title"
          value={formData.title}
          placeholder="Go to Gym"
          onChange={handleChange}
        />
        <FormInput
          label="Description"
          name="description"
          value={formData.description}
          placeholder="Do some cardio in gym"
          onChange={handleChange}
        />
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Due Date
          </label>
          <DatePicker
            selected={formData.dueDate}
            onChange={(date) =>
              setFormData((prev) => ({ ...prev, dueDate: date }))
            }
            dateFormat="yyyy-MM-dd"
            isClearable
            placeholderText="Select a date"
            showYearDropdown
            scrollableMonthYearDropdown
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </Modal>
  );
}

function FormInput({ label, name, value, placeholder, onChange }) {
  return (
    <div className="mb-5">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
    </div>
  );
}
