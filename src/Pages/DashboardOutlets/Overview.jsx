import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { CheckCircle, Timer, List as ListIcon, Circle, Trash2 } from "lucide-react"; 
import TodoModal from "../../Components/Modals/Todo";
import { toast } from "sonner";
import { Clock, Flag, Clipboard } from "lucide-react"; 
import { Plus } from "lucide-react"; 


const Overview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, currentUser, currentUserLoading } = useAuth();

  useEffect(() => {
    fetchTodos();
  }, [currentUser, isAuthenticated]);

  const fetchTodos = async () => {
    if (currentUserLoading || !isAuthenticated) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/todos/api/todos/${currentUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      toast.error("Failed to load todos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodos = async (newTodo) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/todos/api/todos",
        newTodo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodos((prevTodos) => [response.data, ...prevTodos]);
      toast.success("Todo added successfully!");
      return response.data;
    } catch (error) {
      console.error("Error adding todo:", error.response?.data || error.message);
      toast.error("Failed to add todo");
      throw error;
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const toggleTodoCompletion = async (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/todos/api/todos/${updatedTodos[index]._id}`,
        updatedTodos[index],
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === response.data._id ? response.data : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete(`http://localhost:5000/todos/api/todos/${todoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
      toast.success("Todo deleted successfully!");
    } catch (error) {
      console.error("Delete todo error:", error);
      toast.error("Failed to delete todo");
    }
  };

  const toggleSubtaskVisibility = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].showSubtasks = !updatedTodos[index].showSubtasks;
    setTodos(updatedTodos);
  };

  const remainingTodos = todos.filter((todo) => !todo.completed);
  const completedTodosList = todos.filter((todo) => todo.completed);

  return (
    <div className="w-full flex flex-col items-center justify-center">

<div className="flex items-center justify-between w-full mb-4">
  <h1 className="text-3xl font-bold text-gray-800">Overview</h1>
  <button
    onClick={handleOpenModal}
    className="bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-indigo-700 shadow-md flex items-center"
  >
    <Plus size={20} className="mr-2" /> 
    Add Todo
  </button>
</div>
      <TodoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddTodos={handleAddTodos}
      />

<div className="mt-6 flex justify-between w-full">
  <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg w-1/3 shadow-md">
    <Clock size={40} className="text-yellow-400 mb-2" />
    <h3 className="text-2xl font-semibold text-white">
      Pending ({remainingTodos.length})
    </h3>
  </div>

  <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg w-1/3 shadow-md">
    <Flag size={40} className="text-green-400 mb-2" />
    <h3 className="text-2xl font-semibold text-white">
      Completed ({completedTodosList.length})
    </h3>
  </div>

  <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg w-1/3 shadow-md">
    <Clipboard size={40} className="text-blue-400 mb-2" />
    <h3 className="text-2xl font-semibold text-white">
      Total Todos ({todos.length})
    </h3>
  </div>
</div>

<div className="mt-6 bg-white shadow-lg rounded-lg p-6 w-full">
  <h3 className="text-3xl font-bold text-gray-800 mb-6">Your Todos</h3>
  <ul className="space-y-4">
    {todos.map((todo, index) => (
      <li
        key={index}
        className={`flex flex-col p-5 rounded-lg transition-shadow duration-200 
          ${todo.completed ? "bg-gray-100" : "bg-white"} 
          hover:shadow-xl border border-gray-200`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => toggleTodoCompletion(index)}
              className="focus:outline-none"
            >
              {todo.completed ? (
                <CheckCircle className="w-6 h-6 text-green-500 cursor-pointer" />
              ) : (
                <Circle className="w-6 h-6 text-gray-400 cursor-pointer" />
              )}
            </button>
            <div className="flex-1">
              <span className={`font-semibold text-lg ${
                todo.completed ? "text-gray-500 line-through" : "text-gray-800"
              }`}>
                {todo.title}
              </span>
              {todo.description && (
                <p className="mt-1 text-sm text-gray-600">
                  {todo.description}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={() => handleDeleteTodo(todo._id)}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 size={20} />
          </button>
        </div>

        <div className="mt-3 flex gap-4">
          {todo.priority && (
            <span
              className={`px-3 py-1 rounded-full text-white 
                ${todo.priority === "high" ? "bg-red-600" : 
                  todo.priority === "medium" ? "bg-yellow-500" : "bg-green-500"}`}
            >
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>
          )}

          {todo.dueDate && (
            <span className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700">
              Due: {new Date(todo.dueDate).toLocaleDateString()}
            </span>
          )}

          {todo.subtodos && todo.subtodos.length > 0 && (
            <button
              className="bg-blue-600 text-white rounded-full px-4 py-1 text-sm hover:bg-blue-700 transition-colors"
              onClick={() => toggleSubtaskVisibility(index)}
            >
              {todo.subtodos.length} Subtasks
            </button>
          )}
        </div>

        {todo.showSubtasks && todo.subtodos && (
          <div className="mt-4 ml-6 border-l-4 border-blue-300 pl-4">
            <h4 className="font-semibold text-gray-700 mb-2">Subtasks:</h4>
            <ul className="space-y-1">
              {todo.subtodos.map((subtask, subIndex) => (
                <li
                  key={subIndex}
                  className={`flex items-center gap-3 text-gray-600 
                    ${subtask.completed ? "line-through" : ""}`}
                >
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  {subtask.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </li>
    ))}
  </ul>
</div>
    </div>
  );
};

export default Overview;