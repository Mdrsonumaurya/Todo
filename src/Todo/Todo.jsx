import { useState, useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import "./Todo.css";

export const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [dateTime, setDateTime] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() && !tasks.some((task) => task.text === inputValue)) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { text: inputValue, completed: false }
      ]);
      setInputValue("");
    }
  };

  // Date and Time
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString();
      setDateTime(`${formattedDate} - ${formattedTime}`);
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const markTaskCompleted = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <section className="bg-green-400 min-h-screen flex flex-col items-center p-6">
      <header>
        <h1 className="text-5xl font-bold text-red-700">Todo List</h1>
      </header>
      <h2 className="text-3xl mt-4 font-semibold text-zinc-100">{dateTime}</h2>
      <section className="form mt-4 w-full max-w-md">
        <form onSubmit={handleFormSubmit} className="flex justify-center">
          <div>
            <input
              className="mt-9 px-4 py-2 rounded-tl-md rounded-bl-md border-2 border-pink-500 mb-8"
              type="text"
              autoComplete="off"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-green-700 py-2.5 px-5 mt-9 rounded-tr-md rounded-br-md text-white"
            >
              Add Task
            </button>
          </div>
        </form>
      </section>

      <section className="w-full max-w-md">
        <ul className="list-disc list-inside">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`flex items-center font-bold text-xl font-serif ${
                task.completed ? "line-through text-red-600 " : ""
              }`}
            >
              <span className="flex-1">{task.text}</span>
              <button
                onClick={() => markTaskCompleted(index)}
                className="mr-20 text-2xl text-white -600 h-10 w-10 rounded-full bg-gray-800"
              >
                <IoMdCheckmark className="ml-2" />
              </button>
              <button
                onClick={() => deleteTask(index)}
                className="mr-12 text-2xl text-fuchsia-800 h-10 w-10 rounded-full bg-white"
              >
                <MdDeleteForever className="ml-2" />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};
