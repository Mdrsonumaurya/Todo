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

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString();
      setDateTime(`${formattedDate} - ${formattedTime}`);
    }, 1000);

    return () => clearInterval(intervalId);
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
    <section className="bg-green-400 min-h-screen flex flex-col items-center p-4 sm:p-6">
      <header className="text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-700">
          Todo List
        </h1>
      </header>
      <h2 className="text-lg sm:text-2xl lg:text-3xl mt-2 sm:mt-4 font-semibold text-zinc-100">
        {dateTime}
      </h2>
      <section className="form mt-4 w-full max-w-md px-4">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-wrap sm:flex-nowrap justify-center"
        >
          <input
            className="flex-1 w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 mb-4 sm:mb-0 rounded-tl-md rounded-bl-md border-2 border-pink-500 text-sm sm:text-base lg:text-lg placeholder-gray-500 focus:outline-none focus:border-pink-700 transition-all duration-300"
            type="text"
            placeholder="Add a new task"
            autoComplete="off"
            value={inputValue}
            onChange={handleInputChange}
          />

          <button
            type="submit"
            className="bg-green-700 text-white text-xs  md:text-base lg:text-lg px-3 sm:px-5 md:px-6 py-3  sm:py-5 md:py-4 rounded-tr-md rounded-br-md hover:bg-green-800 transition-all duration-300 w-full sm:w-auto"
          >
            Add Task
          </button>
        </form>
      </section>

      <section className="w-full max-w-md px-4">
        {tasks.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No tasks yet!</p>
        ) : (
          <ul className="list-disc list-inside max-h-[50vh] overflow-y-auto space-y-2">
            {tasks.map((task, index) => (
              <li
                key={index}
                className={`flex items-center font-bold text-lg sm:text-xl font-serif ${
                  task.completed ? "line-through text-red-600" : ""
                }`}
              >
                <span className="flex-1">{task.text}</span>
                <button
                  onClick={() => markTaskCompleted(index)}
                  className="mt-10 mr-4 text-xl sm:text-2xl text-white h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-800"
                  aria-label="Mark task completed"
                >
                  <IoMdCheckmark className="ml-2" />
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="mt-10 text-xl sm:text-2xl text-fuchsia-800 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white"
                  aria-label="Delete task"
                >
                  <MdDeleteForever className="ml-2 " />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
};
