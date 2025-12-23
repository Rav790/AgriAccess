import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  generatePrediction, 
  sendChatMessage,
  clearChatHistory,
  addUserMessage
} from '../redux/slices/aiSlice';
import { showToast } from '../redux/slices/uiSlice';
import { FiSend, FiCpu, FiTrendingUp, FiTrash2, FiMapPin } from 'react-icons/fi';

const AIInsights = () => {
  const dispatch = useDispatch();
  const { chatHistory, predictions, loading } = useSelector((state) => state.ai);
  const { statistics } = useSelector((state) => state.data);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState('prompt');
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Request location permission
  const requestLocation = () => {
    if (!navigator.geolocation) {
      dispatch(showToast({ 
        type: 'error', 
        message: 'Geolocation is not supported by your browser' 
      }));
      return;
    }

    dispatch(showToast({ 
      type: 'info', 
      message: 'Requesting location permission...' 
    }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        setUserLocation(location);
        setLocationPermission('granted');
        dispatch(showToast({ 
          type: 'success', 
          message: 'Location access granted! AI can now provide personalized recommendations.' 
        }));
      },
      (error) => {
        setLocationPermission('denied');
        let errorMessage = 'Unable to get location';
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = 'Location permission denied. Please enable it in your browser settings.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = 'Location information unavailable';
        } else if (error.code === error.TIMEOUT) {
          errorMessage = 'Location request timed out';
        }
        dispatch(showToast({ 
          type: 'error', 
          message: errorMessage 
        }));
      }
    );
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const messageContent = message.trim();
    
    // Add user message to chat immediately
    dispatch(addUserMessage(messageContent));
    
    // Clear input immediately
    setMessage('');

    // Enhanced context with location data
    const enhancedContext = {
      ...statistics,
      userLocation: userLocation,
      timestamp: new Date().toISOString()
    };

    await dispatch(sendChatMessage({ 
      content: messageContent, 
      context: enhancedContext
    }));
  };

  const handleGeneratePrediction = async () => {
    if (!userLocation) {
      dispatch(showToast({ 
        type: 'warning', 
        message: 'Enable location access for accurate predictions' 
      }));
    }

    // Use sample data if statistics not available
    const historicalData = statistics || {
      years: [2020, 2021, 2022, 2023, 2024],
      state: 'Sample Region',
      description: 'Historical agricultural data sample'
    };

    const result = await dispatch(generatePrediction({
      historicalData: historicalData,
      region: historicalData.state || 'India',
      predictionType: 'Agricultural Trends',
      userLocation: userLocation
    }));

    if (generatePrediction.fulfilled.match(result)) {
      dispatch(showToast({ 
        type: 'success', 
        message: 'Predictions generated successfully!' 
      }));
      setActiveTab('predictions'); // Auto-switch to predictions tab
    } else {
      dispatch(showToast({ 
        type: 'error', 
        message: result.payload || 'Failed to generate predictions' 
      }));
    }
  };

  const tabs = [
    { id: 'chat', label: 'AI Chat', icon: FiCpu },
    { id: 'predictions', label: 'Predictions', icon: FiTrendingUp },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          AI Insights
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Powered by Google Gemini 2.5 Pro - Get intelligent, location-based agricultural analysis
        </p>
      </div>

      {/* Location Permission Banner */}
      {locationPermission !== 'granted' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-l-4 border-green-500"
        >
          <div className="flex items-start space-x-4">
            <FiMapPin className="text-green-500 flex-shrink-0 mt-1" size={24} />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Enable Location for Personalized Recommendations
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Get crop suggestions, weather insights, and farming tips specific to your region. 
                Your location data is only used to provide better recommendations and is never stored.
              </p>
              <button
                onClick={requestLocation}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <FiMapPin size={16} />
                <span>Enable Location Access</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Location Info */}
      {userLocation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <FiMapPin className="text-white" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-green-900 dark:text-green-200">
                Location Enabled
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Lat: {userLocation.latitude.toFixed(4)}, Long: {userLocation.longitude.toFixed(4)}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-800 text-primary-500 shadow'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <tab.icon size={18} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* AI Chat */}
        {activeTab === 'chat' && (
          <div className="card h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Chat with AI Assistant
              </h3>
              <button
                onClick={() => dispatch(clearChatHistory())}
                className="text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <FiTrash2 size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {chatHistory.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
                  <FiCpu size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="font-semibold text-lg">Start a conversation with AI Assistant</p>
                  <p className="text-sm mt-2">Try asking:</p>
                  <div className="mt-4 space-y-2 text-left max-w-md mx-auto">
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
                      "What crops are best for Bihar?"
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
                      "Analyze irrigation patterns in my region"
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
                      "Predict rainfall for next season"
                    </div>
                  </div>
                </div>
              ) : (
                chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      {msg.role === 'user' ? (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      ) : (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                              ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
                              ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                              li: ({node, ...props}) => <li className="mb-1" {...props} />,
                              strong: ({node, ...props}) => <strong className="font-bold text-gray-900 dark:text-white" {...props} />,
                              h1: ({node, ...props}) => <h1 className="text-xl font-bold mb-2" {...props} />,
                              h2: ({node, ...props}) => <h2 className="text-lg font-bold mb-2" {...props} />,
                              h3: ({node, ...props}) => <h3 className="text-base font-semibold mb-1" {...props} />,
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      )}
                      <p className={`text-xs mt-2 ${msg.role === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything about agricultural data..."
                  className="input-field flex-1"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !message.trim()}
                  className="btn-primary disabled:opacity-50"
                >
                  <FiSend size={20} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Predictions */}
        {activeTab === 'predictions' && (
          <div className="space-y-6">
            <div className="card">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Generate AI Predictions
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {userLocation 
                      ? 'Get location-specific predictions for crop yields, weather patterns, and agricultural trends.'
                      : 'Enable location access for accurate regional predictions.'}
                  </p>
                </div>
                <button
                  onClick={handleGeneratePrediction}
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <FiTrendingUp size={20} />
                  <span>{loading ? 'Generating Predictions...' : 'Generate Predictions'}</span>
                </button>
              </div>
            </div>

            {predictions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="card">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <FiTrendingUp className="mr-2 text-primary-500" />
                    Future Trends & Predictions
                  </h3>
                  <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({node, ...props}) => <p className="mb-3 text-gray-700 dark:text-gray-300" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold text-gray-900 dark:text-white" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-4 mb-2" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-base font-semibold text-gray-900 dark:text-white mt-3 mb-2" {...props} />,
                      }}
                    >
                      {typeof predictions.predictions === 'string' 
                        ? predictions.predictions 
                        : JSON.stringify(predictions.predictions, null, 2)}
                    </ReactMarkdown>
                  </div>
                </div>

                {predictions.challenges && predictions.challenges.length > 0 && (
                  <div className="card bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-900 dark:text-red-200 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Potential Challenges:
                    </h4>
                    <ul className="space-y-2">
                      {predictions.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start text-red-800 dark:text-red-300">
                          <span className="mr-2 mt-1">⚠️</span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {predictions.opportunities && predictions.opportunities.length > 0 && (
                  <div className="card bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Opportunities:
                    </h4>
                    <ul className="space-y-2">
                      {predictions.opportunities.map((opp, index) => (
                        <li key={index} className="flex items-start text-green-800 dark:text-green-300">
                          <span className="mr-2 mt-1">✓</span>
                          <span>{opp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AIInsights;
