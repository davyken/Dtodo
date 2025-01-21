import React, { useState } from 'react';
import { FiHome, FiUser, FiList, FiSettings, FiLogOut, FiCheck } from 'react-icons/fi';
import DailyTaskForm from '../components/DailyTaskForm'; // Ensure this component exists
import DailyTaskList from '../components/DailyTaskList'; // Ensure this component exists
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('daily-tasks');
  const [dailyTasks, setDailyTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [userProfile, setUserProfile] = useState({
    name: 'Davy Ken',
    email: 'Davykennang552@gmail.com',
    role: 'User'
  });

  const handleTaskSubmit = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      assignedBy: userProfile.email
    };
    setDailyTasks([...dailyTasks, newTask]);
    
    // Simulate sending an email to the supervisor
    const supervisorEmail = task.supervisorEmail || 'supervisor@example.com'; 
    console.log(`Email sent to ${supervisorEmail} for task review:`, newTask);
  };

  const handleTaskUpdate = (taskId, updates) => {
    setDailyTasks(dailyTasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const handleProfileUpdate = () => {
    setIsEditing(false); // Exit edit mode
    console.log('Updated Profile:', userProfile);
  };

  const sidebarItems = [
    { icon: FiList, label: 'Daily Tasks', id: 'daily-tasks' },
    { icon: FiCheck, label: 'My Reviews', id: 'reviews' },
    { icon: FiUser, label: 'Profile', id: 'profile' },
    { icon: FiSettings, label: 'Settings', id: 'settings' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'daily-tasks':
        return (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6">
              <h1 className="text-3xl font-bold mb-2">Daily Task Manager</h1>
              <p className="text-gray-400">
                Create and manage your daily tasks, assign supervisors, and track progress
              </p>
            </div>

            <DailyTaskForm onSubmit={handleTaskSubmit} />

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">Today's Tasks</h2>
              <DailyTaskList tasks={dailyTasks} onUpdateTask={handleTaskUpdate} />
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Tasks to Review</h2>
              <DailyTaskList
                tasks={dailyTasks.filter(task => task.supervisorEmail === userProfile.email)}
                onUpdateTask={handleTaskUpdate}
              />
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Profile</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                    className="w-full bg-white/5 rounded-lg px-4 py-2"
                    readOnly={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                    className="w-full bg-white/5 rounded-lg px-4 py-2"
                    readOnly={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                  <input
                    type="text"
                    value={userProfile.role}
                    onChange={(e) => setUserProfile({ ...userProfile, role: e.target.value })}
                    className="w-full bg-white/5 rounded-lg px-4 py-2"
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              <button
                onClick={() => { isEditing ? handleProfileUpdate() : setIsEditing(true); }}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg"
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 h-auto md:h-screen bg-white/10 backdrop-blur-md p-6 flex flex-col md:flex-shrink-0">
          <div className="flex items-center space-x-3 mb-8">
            <FiList className="w-8 h-8 text-purple-400" />
            <span className="text-xl font-bold">Task Manager</span>
          </div>

          <nav className="flex-1 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  activeTab === item.id
                    ? 'bg-purple-600 text-white'
                    : 'hover:bg-white/5 text-gray-300 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
