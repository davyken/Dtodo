import React from 'react';

const DailyTaskList = ({ tasks, onUpdateTask }) => {
  const handleUpdateTask = (taskId, updates) => {
    onUpdateTask(taskId, updates);
  };

  return (
    <ul className="space-y-4">
      {tasks.length === 0 ? (
        <li className="text-gray-400">No tasks available.</li>
      ) : (
        tasks.map((task) => (
          <li key={task.id} className="bg-white/10 backdrop-blur-md p-4 rounded-xl">
            <div>
              <h3 className="text-lg font-bold">{task.title}</h3>
              <p className="text-sm text-gray-400">{task.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm text-gray-500">Assigned by: {task.assignedBy}</span>
                {task.supervisorEmail && (
                  <span className="text-sm text-blue-400">{task.supervisorEmail}</span>
                )}
              </div>
            </div>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => handleUpdateTask(task.id, { completed: true })}
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                Mark as Completed
              </button>
              <button
                onClick={() => handleUpdateTask(task.id, { status: 'In Progress' })}
                className="px-4 py-2 bg-yellow-600 text-white rounded-md"
              >
                Mark as In Progress
              </button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default DailyTaskList;
