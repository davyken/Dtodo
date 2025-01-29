import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Shield,
  BarChart3,
  Target,
  Globe2,
  Star,
} from "lucide-react";

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-300 hover:text-teal-400 transition-colors duration-200 text-sm font-medium"
  >
    {children}
  </Link>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="flex flex-col items-center bg-gray-800 rounded-lg shadow-lg p-8 hover:scale-105 transition-all w-64 h-64" // Set width and height
  >
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mb-6">
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
    <p className="text-gray-300 text-center">{description}</p> {/* Center text */}
  </motion.div>
);

const StatCard = ({ number, label }) => (
  <div className="flex flex-col items-center text-center py-8 px-6 rounded-lg bg-gray-700 shadow-lg w-64 h-64"> {/* Set width and height */}
    <div className="text-5xl font-bold text-teal-400 mb-2">{number}</div>
    <div className="text-gray-300 text-sm">{label}</div>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">TaskMaster</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/login" className="text-white">
              Log In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-400 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>
      <div className="relative pt-40 pb-20 px-6 text-left text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-gradient-to-br from-teal-500/60 to-teal-600/50 z-0"
          style={{
            backgroundImage: "url(https://via.placeholder.com/1600x900)",
          }}
        ></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl font-bold mb-6">
              Streamline Your Workflows with TaskMaster
            </h1>
            <p className="text-lg mb-8">
              Effortlessly manage your team’s tasks, projects, and collaboration
              with TaskMaster. Focus on what matters most.
            </p>
            <Link
              to="/register"
              className="px-8 py-4 text-lg font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-500 transition-all duration-300"
            >
              Start Your Free Trial
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Key Features</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Unlock the full potential of your team with powerful features
            designed to make collaboration and productivity easier than ever.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          <FeatureCard
            icon={Users}
            title="Real-Time Collaboration"
            description="Keep everyone on the same page with shared tasks and live updates."
          />
          <FeatureCard
            icon={BarChart3}
            title="Powerful Analytics"
            description="Make data-driven decisions with comprehensive insights."
          />
          <FeatureCard
            icon={Calendar}
            title="Smart Scheduling"
            description="Organize your tasks and deadlines with intelligent scheduling."
          />
          <FeatureCard
            icon={Target}
            title="Goal Setting"
            description="Set clear objectives and track progress effectively."
          />
        
        </div>
        <div>
          <h1> .</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          <FeatureCard
            icon={Users}
            title="Real-Time Collaboration"
            description="Keep everyone on the same page with shared tasks and live updates."
          />
          <FeatureCard
            icon={BarChart3}
            title="Powerful Analytics"
            description="Make data-driven decisions with comprehensive insights."
          />
         
          <FeatureCard
            icon={Globe2}
            title="Anywhere Access"
            description="Access TaskMaster from any device, anywhere in the world."
          />
          <FeatureCard
            icon={Shield}
            title="Enterprise-Grade Security"
            description="Your data is secure with state-of-the-art protection."
          />
        </div>
      </div>
      <div className="w-full py-12 bg-gray-800">
      <div className="w-full py-12 bg-gray-800">
  <div className="max-w-7xl mx-auto px-6">
    <p className="text-center text-sm text-gray-400 mb-8">
      Trusted by organizations across the world for efficient task management.
    </p>
    <div className="flex flex-wrap justify-center items-center gap-5">
      <StatCard number="12M+" label="Users Worldwide" />
      <StatCard number="250+" label="Integration Options" />
      <StatCard number="99.9%" label="Uptime Guarantee" />
      <StatCard number="24/7" label="Customer Support" />
    </div>
    <div><p>.</p></div>
    <div className="flex flex-wrap justify-center items-center gap-5">
      <StatCard number="15M+" label="Users Worldwide" />
      <StatCard number="300+" label="Integration Options" />
      <StatCard number="99.9%" label="Uptime Guarantee" />
      <StatCard number="24/7" label="Customer Support" />
    </div>
  </div>
</div>
</div>
      <div className="py-24 px-6 bg-gradient-to-r from-teal-500/10 to-teal-600/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="p-12 rounded-lg bg-gray-800 border border-teal-500/20"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Get Started Today
            </h2>
            <p className="text-gray-300 mb-8">
              Sign up now and discover a new way to streamline your team's
              productivity.
            </p>
            <Link
              to="/register"
              className="px-8 py-4 text-lg font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-400 transition-all duration-300"
            >
              Start Here
            </Link>
          </motion.div>
        </div>
      </div>
      <footer className="bg-gray-900/80 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mb-3 mx-auto">
              <Star className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">TaskMaster</span>
          </div>
          <p className="text-sm text-gray-500">
            © 2025 TaskMaster. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}