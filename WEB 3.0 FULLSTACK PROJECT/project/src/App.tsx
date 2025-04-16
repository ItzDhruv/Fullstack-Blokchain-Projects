import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { Bot, Brain, Command, Cpu, MessageSquare, Rocket, Send, Search, ArrowRight } from 'lucide-react';

// Types
interface Agent {
  id: string;
  name: string;
  description: string;
  provider: string;
  model: string;
  role: string;
  instructions: string;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: number;
}

// Components
function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function AgentCard({ agent, onClick }: { agent: Agent, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6 text-indigo-600" />
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold">{agent.name}</h3>
          <p className="text-sm text-gray-500">{agent.role}</p>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{agent.description}</p>
      <div className="flex items-center text-sm text-gray-500">
        <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
          {agent.provider} - {agent.model}
        </span>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Bot className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">AI Launchpad</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/explore" className="text-gray-600 hover:text-gray-900">Explore</Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
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

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-8">
          <Rocket className="w-16 h-16 text-indigo-600" />
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          AI Agent Launchpad
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Deploy and manage intelligent AI agents that work for you. Streamline your workflow with automated assistance.
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => navigate('/create')}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Launch Your Agent
          </button>
          <button 
            onClick={() => navigate('/explore')}
            className="bg-white text-indigo-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            Explore Agents
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Brain}
            title="Advanced Intelligence"
            description="Powered by state-of-the-art machine learning models for human-like interactions"
          />
          <FeatureCard
            icon={Command}
            title="Custom Commands"
            description="Create and customize commands to automate your specific workflows"
          />
          <FeatureCard
            icon={MessageSquare}
            title="Natural Conversations"
            description="Engage in fluid, context-aware conversations with your AI agent"
          />
          <FeatureCard
            icon={Bot}
            title="24/7 Availability"
            description="Your AI agent is always ready to assist, whenever you need it"
          />
          <FeatureCard
            icon={Cpu}
            title="Resource Efficient"
            description="Optimized performance with minimal computational overhead"
          />
          <FeatureCard
            icon={MessageSquare}
            title="Multi-task Support"
            description="Handle multiple tasks simultaneously with ease and precision"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-indigo-600 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience the Future?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already benefiting from AI-powered assistance.
          </p>
          <button 
            onClick={() => navigate('/create')}
            className="bg-white text-indigo-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-50 transition-colors"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>© 2025 AI Agent Launchpad. All rights reserved.</p>
      </footer>
    </div>
  );
}

function DashboardPage() {
  const navigate = useNavigate();
  const agents = JSON.parse(localStorage.getItem('agents') || '[]') as Agent[];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your AI Agents</h1>
          <button
            onClick={() => navigate('/create')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Create New Agent
          </button>
        </div>

        {agents.length === 0 ? (
          <div className="text-center py-12">
            <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">No Agents Yet</h2>
            <p className="text-gray-500 mb-4">Create your first AI agent to get started</p>
            <button
              onClick={() => navigate('/create')}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create Agent
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
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

function ChatPage() {
  const { agentId } = useParams();
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const agents = JSON.parse(localStorage.getItem('agents') || '[]') as Agent[];
  const agent = agents.find(a => a.id === agentId);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Agent Not Found</h2>
          <p className="text-gray-500 mb-4">The agent you're looking for doesn't exist</p>
          <button
            onClick={() => navigate('/explore')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Explore Agents
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I am ${agent.name}, your ${agent.role}. How can I assist you today?`,
        sender: 'agent',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Bot className="w-8 h-8 text-indigo-600 mr-3" />
            <div>
              <h1 className="text-xl font-semibold">{agent.name}</h1>
              <p className="text-sm text-gray-500">{agent.role}</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/explore')}
            className="text-gray-600 hover:text-gray-900"
          >
            Back to Explore
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto max-w-4xl">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-800 border'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white border-t p-4">
        <div className="container mx-auto max-w-4xl">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function CreateAgentPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    provider: '',
    model: '',
    role: '',
    instructions: ''
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.provider) {
      newErrors.provider = 'Please select a provider';
    }
    
    if (!formData.model) {
      newErrors.model = 'Please select a model';
    }
    
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }
    
    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Instructions are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      const newAgent: Agent = {
        ...formData,
        id: Date.now().toString(),
      };

      // Save to localStorage
      const agents = JSON.parse(localStorage.getItem('agents') || '[]');
      localStorage.setItem('agents', JSON.stringify([...agents, newAgent]));

      // Navigate to dashboard
      navigate('/dashboard');
    } else {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-center mb-8">
              <Bot className="w-12 h-12 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Create Agent</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Agent name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Agent Description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-2">
                    LLM Provider
                  </label>
                  <select
                    name="provider"
                    id="provider"
                    value={formData.provider}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.provider ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                  >
                    <option value="">Select Provider</option>
                    <option value="openai">OpenAI</option>
                    <option value="anthropic">Anthropic</option>
                    <option value="google">Google AI</option>
                  </select>
                  {errors.provider && (
                    <p className="mt-1 text-sm text-red-600">{errors.provider}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                    LLM Model
                  </label>
                  <select
                    name="model"
                    id="model"
                    value={formData.model}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.model ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                  >
                    <option value="">Select a Provider First</option>
                    {formData.provider === 'openai' && (
                      <>
                        <option value="gpt-4">GPT-4</option>
                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                      </>
                    )}
                    {formData.provider === 'anthropic' && (
                      <>
                        <option value="claude-2">Claude 2</option>
                        <option value="claude-instant">Claude Instant</option>
                      </>
                    )}
                    {formData.provider === 'google' && (
                      <>
                        <option value="gemini-pro">Gemini Pro</option>
                        <option value="gemini-ultra">Gemini Ultra</option>
                      </>
                    )}
                  </select>
                  {errors.model && (
                    <p className="mt-1 text-sm text-red-600">{errors.model}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Agent Role
                </label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  placeholder="e.g. Customer Support Assistant"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.role ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                />
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                )}
              </div>

              <div>
                <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
                  Agent Instructions
                </label>
                <textarea
                  name="instructions"
                  id="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.instructions ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                  placeholder="Provide detailed instructions for your agent..."
                />
                {errors.instructions && (
                  <p className="mt-1 text-sm text-red-600">{errors.instructions}</p>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Agent'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/create" element={<CreateAgentPage />} />
        <Route path="/chat/:agentId" element={<ChatPage />} />
        <Route path="/explore" element={<ExplorePage />} />
      </Routes>
    </Router>
  );
}

export default App;