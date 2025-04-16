import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { Bot, Brain, Command, Cpu, MessageSquare, Rocket, Send, Search, ArrowRight } from 'lucide-react';
import Navigation from '../component/Navigation';
import AgentCard from '../component/AgentCard';

interface Agent {
    id: string;
    name: string;
    description: string;
    provider: string;
    model: string;
    role: string;
    instructions: string;
    tokenName: string;
    tokenSymbol: string;
    tokenSupply: string;
  }

function ExplorePage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState('');
    const agents = JSON.parse(localStorage.getItem('agents') || '[]') as Agent[];
  
    const filteredAgents = agents.filter(agent => 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Explore AI Agents</h1>
            <p className="text-xl text-indigo-100 mb-8">
              Discover and chat with AI agents created by the community
            </p>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search agents by name, description, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>
        </div>
  
        {/* Agents Grid */}
        <div className="container mx-auto px-4 py-12">
          {filteredAgents.length === 0 ? (
            <div className="text-center py-12">
              <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">No Agents Found</h2>
              <p className="text-gray-500 mb-4">Try adjusting your search or create a new agent</p>
              <button
                onClick={() => navigate('/create')}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Create Agent
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onClick={() => navigate(`/chat/${agent.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
export default ExplorePage;  