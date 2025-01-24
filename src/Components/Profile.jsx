import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { useAuth } from "../Pages/AuthContext";

const Profile = () => {
  const { currentUser, currentUserLoading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUserLoading && !currentUser) {
      navigate("/login");
    }
  }, [currentUser, currentUserLoading, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Logged out successfully");
  };

  if (currentUserLoading) {
    return (
      <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-4 rounded-lg animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 space-y-6 transition-all duration-300">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
          <span className="text-xl font-bold text-white">
            {currentUser.email[0].toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">
            {currentUser.email.split('@')[0]}
          </h3>
          <p className="text-sm text-gray-300">{currentUser.email}</p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors group"
      >
        <LogOut className="mr-2 group-hover:rotate-180 transition-transform" />
        Logout
      </button>
    </div>
  );
};

export default Profile;