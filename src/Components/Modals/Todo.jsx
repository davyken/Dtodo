import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Mail, Calendar, Star } from 'lucide-react';
import { toast } from 'sonner';

const TodoModal = ({ isOpen, onClose, onAddTodos, onUpdateTodo, currentTodo }) => {
  const [todo, setTodo] = useState(getInitialTodoState());
  const [errors, setErrors] = useState({});
  const [assignedTo, setAssignedTo] = useState('');

  function getInitialTodoState() {
    return {
      title: '',
      description: '',
      subtodos: [],
      priority: 'medium',
      dueDate: '',
    };
  }

  useEffect(() => {
    if (currentTodo) {
      setTodo({
        ...currentTodo,
        subtodos: currentTodo.subtodos || [] // Ensure subtodos are set
      });
      setAssignedTo(currentTodo.assignedTo || ''); // Set assignedTo if available
    } else {
      setTodo(getInitialTodoState()); // Reset if no currentTodo
      setAssignedTo('');
    }
  }, [currentTodo, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!todo.title.trim()) {
      newErrors.title = 'Title is required';
    }

    // Validate that dueDate is not a past date
    if (todo.dueDate) {
      const dueDate = new Date(todo.dueDate);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);  // Remove time for accurate comparison

      if (dueDate < currentDate) {
        newErrors.dueDate = 'Due date must be today or in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setTodo(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const addSubtask = () => {
    setTodo(prev => ({
      ...prev,
      subtodos: [...prev.subtodos, { title: '', completed: false }]
    }));
  };

  const updateSubtask = (index, value) => {
    const newSubtodos = [...todo.subtodos];
    newSubtodos[index].title = value;
    setTodo(prev => ({ ...prev, subtodos: newSubtodos }));
  };

  const removeSubtask = (index) => {
    const newSubtodos = todo.subtodos.filter((_, i) => i !== index);
    setTodo(prev => ({ ...prev, subtodos: newSubtodos }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const cleanedTodo = {
          ...todo,
          title: todo.title.trim(),
          description: todo.description.trim(),
          subtodos: todo.subtodos
            .map(sub => ({ ...sub, title: sub.title.trim() }))
            .filter(sub => sub.title !== ''),
          completed: false,
          assignedTo: assignedTo.trim()
        };

        if (currentTodo) {
          await onUpdateTodo({ ...cleanedTodo, _id: currentTodo._id }); // Update existing todo
          toast.success('Todo updated successfully!');
        } else {
          await onAddTodos(cleanedTodo); // Create new todo
          toast.success('Todo added successfully!');
        }

        setTodo(getInitialTodoState());
        setAssignedTo('');
        onClose();
      } catch (error) {
        toast.error('Failed to save todo. Please try again.');
        console.error('Todo save error:', error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-lg ring-1 ring-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{currentTodo ? 'Edit Todo' : 'Add New Todo'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={todo.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`border rounded-lg p-2 w-full ${errors.title ? 'border-red-500' : 'border-gray-700'} bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500`}
              placeholder="Title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <textarea
            value={todo.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="border border-gray-700 rounded-lg p-2 w-full min-h-[100px] bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Description (optional)"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Priority</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Star className="h-5 w-5 text-gray-500" />
                </div>
                <select
                  value={todo.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="border rounded-lg p-2 w-full bg-gray-800 text-white pl-10"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Due Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="date"
                  value={todo.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                  className={`border rounded-lg p-2 w-full ${errors.dueDate ? 'border-red-500' : 'border-gray-700'} bg-gray-800 text-white pl-10`}
                />
                {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
              </div>
            </div>
          </div>

          <input
            type="email"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="border rounded-lg p-2 w-full bg-gray-800 text-white"
            placeholder="Enter email to assign reviewer"
          />

          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-semibold text-white">Subtasks</h3>
              <button
                type="button"
                onClick={addSubtask}
                className="text-teal-500 hover:text-teal-400 flex items-center"
              >
                <Plus size={16} className="mr-1" /> Add Subtask
              </button>
            </div>
            {todo.subtodos.map((subtask, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={subtask.title}
                  onChange={(e) => updateSubtask(index, e.target.value)}
                  className="border border-gray-700 rounded-lg p-2 flex-grow bg-gray-800 text-white"
                  placeholder={`Subtask ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeSubtask(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {errors.submit && <p className="text-red-500 text-sm text-center">{errors.submit}</p>}

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white rounded-lg px-4 py-2 hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-500 text-white rounded-lg px-4 py-2 hover:bg-teal-600"
            >
              {currentTodo ? "Update Todo" : "Add Todo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;