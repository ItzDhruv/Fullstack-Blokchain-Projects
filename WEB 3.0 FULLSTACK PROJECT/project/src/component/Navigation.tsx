import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { Bot, Brain, Command, Cpu, MessageSquare, Rocket, Send, Search, ArrowRight } from 'lucide-react';



function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Bot className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">AI Launchpad</span>
          </Link>
          
          {/* Added flex-grow div for spacing */}
          <div className="flex-grow"></div>
          
          {/* Centered navigation links with gradient text */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/explore" 
              className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-80 transition-opacity"
            >
              Explore
            </Link>
            <Link 
              to="/dashboard" 
              className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-80 transition-opacity"
            >
              Profile
            </Link>
          </div>
          
          {/* Added flex-grow div for spacing */}
          <div className="flex-grow"></div>
          
          <div>
            <Link
              to="/create"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create Agent
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
  export default Navigation;