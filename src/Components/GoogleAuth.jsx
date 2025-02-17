import React, { useState, useEffect } from 'react';  
import { FcGoogle } from "react-icons/fc";  
import { useNavigate } from 'react-router-dom';  
import { useAuth } from '../Pages/AuthContext';  
import { toast } from 'sonner';  
import { Circles } from 'react-loader-spinner'; 

const GoogleAuth = () => {  
  const navigate = useNavigate();  
  const { isAuthenticated } = useAuth();  
  const [loading, setLoading] = useState(false);  

  useEffect(() => {  
    if (isAuthenticated) {  
      navigate('/dashboard');  
    }  
  }, [isAuthenticated, navigate]);  

  const handleGoogleLogin = async () => {  
    setLoading(true);  
    try {  
      window.location.href = `https://dtodoserver.onrender.com/users/auth/google`;  
    } catch (error) {  
      console.error("Google login failed:", error);  
      setLoading(false);  
      toast.error('Something went wrong. Please try again.');  
    }  
  };  

  return (  
    <div className="flex items-center justify-center flex-col w-full">  
      <button  
        onClick={handleGoogleLogin}  
        className="w-full h-11 3xl:h-24 3xl:text-4xl rounded-md text-white flex items-center justify-center bg-black transition-colors hover:bg-gray-800"  
        disabled={loading}  
      >  
        {loading ? (
          <Circles color="#FFFFFF" height={24} width={24} /> 
        ) : (
          <>
            <FcGoogle className="m-2 h-7 w-10 3xl:h-24" />  
            Login with Google  
          </>
        )}  
      </button>  
    </div>  
  );  
};  

export default GoogleAuth;