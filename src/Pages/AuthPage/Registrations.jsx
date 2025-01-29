import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import GoogleAuth from "../../Components/GoogleAuth";
import { Mail, Lock, User, AlertCircle, Eye, EyeOff, Star } from "lucide-react";
import { motion } from "framer-motion";

const Registration = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await fetch(`https://dtodoserver.onrender.com/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            setLoading(false);

            if (response.ok) {
                const responseData = await response.json();
                toast.success("Registration successful! Please check your email for verification instructions.");
                navigate("/verify-email");
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("An error occurred during registration. Please try again later.");
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Link to="/" className="flex items-center justify-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                            <Star className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">TaskMaster</span>
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="sm:mx-auto sm:w-full sm:max-w-md"
                >
                    <h2 className="mt-6 text-center text-3xl font-bold text-white">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-teal-400 hover:text-teal-300 transition-colors">
                            Sign in
                        </Link>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
                >
                    <div className="bg-gray-900/50 backdrop-blur-xl py-8 px-4 shadow-xl ring-1 ring-gray-800/50 sm:rounded-xl sm:px-10">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-white">
                            {errors.username && (
                                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg relative flex items-center" role="alert">
                                    <AlertCircle className="w-5 h-5 mr-2" />
                                    <span className="block sm:inline">{errors.username.message}</span>
                                </div>
                            )}
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium">
                                    Username
                                </label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <input
                                        {...register("username", { required: "Username is required" })}
                                        type="text"
                                        className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                        placeholder="Username"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium">
                                    Your email
                                </label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^@]+@[^@]+\.[^@]+$/,
                                                message: "Invalid email address",
                                            },
                                        })}
                                        type="email"
                                        className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                        placeholder="name@cgmail.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium">
                                    Password
                                </label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <input
                                        {...register("password", { required: "Password is required" })}
                                        type={passwordVisible ? "text" : "password"}
                                        className="appearance-none block w-full pl-10 pr-12 px-3 py-2 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                        placeholder="Capital letter, min-5-words"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                                    >
                                        {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white p-2.5 rounded-lg text-2xl"
                                    disabled={loading}
                                >
                                    {loading ? "Registering..." : "Sign up"}
                                </button>
                            </div>

                            <div>
                                <GoogleAuth />
                            </div>

                            <p className="text-sm text-center mt-4 text-white">
                                Already have an account?{" "}
                                <Link to="/login" className="text-teal-400">
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Registration;