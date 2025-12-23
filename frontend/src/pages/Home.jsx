import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiBarChart2, FiCpu, FiMap, FiTrendingUp } from 'react-icons/fi';
import { GiWheat, GiWaterDrop, GiPlantSeed } from 'react-icons/gi';

const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const features = [
    {
      icon: FiBarChart2,
      title: 'Interactive Dashboards',
      description: 'Visualize agricultural data with dynamic charts and real-time analytics',
      color: 'text-blue-500'
    },
    {
      icon: FiCpu,
      title: 'AI-Powered Insights',
      description: 'Get intelligent predictions and recommendations using Google Gemini AI',
      color: 'text-purple-500'
    },
    {
      icon: FiMap,
      title: 'Geographic Analysis',
      description: 'Explore data patterns across regions with interactive heatmaps',
      color: 'text-green-500'
    },
    {
      icon: FiTrendingUp,
      title: 'Trend Forecasting',
      description: 'Predict future agricultural patterns with machine learning',
      color: 'text-orange-500'
    },
  ];

  const stats = [
    { icon: GiWheat, label: 'Regions Covered', value: '25+', color: 'bg-primary-500' },
    { icon: GiWaterDrop, label: 'Irrigation Sources', value: '6 Types', color: 'bg-blue-500' },
    { icon: GiPlantSeed, label: 'Crop Varieties', value: '40+', color: 'bg-green-500' },
    { icon: FiBarChart2, label: 'Data Points', value: '50K+', color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mb-6">
          <GiWheat className="text-white text-4xl" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Agricultural Assessment Platform
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
          Empowering farmers and policymakers with data-driven insights for sustainable agriculture
        </p>
        {isAuthenticated ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-green-900 dark:text-green-200 mb-2">
              Welcome back, {user?.name || 'User'}! 👋
            </h3>
            <p className="text-green-700 dark:text-green-300 mb-4">
              Explore our comprehensive agricultural analysis tools and data insights
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/dashboard"
                className="btn-primary"
              >
                Go to Dashboard
              </Link>
              <Link
                to="/ai-insights"
                className="btn-secondary"
              >
                AI Insights
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="btn-primary"
            >
              Get Started Free
            </Link>
            <Link
              to="/about"
              className="btn-secondary"
            >
              Learn More
            </Link>
          </div>
        )}
      </motion.section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card text-center"
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.color} rounded-full mb-3`}>
              <stat.icon className="text-white text-2xl" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Powerful Features
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-lg transition-shadow"
            >
              <feature.icon className={`${feature.color} text-4xl mb-4`} />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section - Only show if NOT logged in */}
      {!isAuthenticated && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of farmers, researchers, and policymakers using AgriAssess
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Create Free Account
          </Link>
        </motion.section>
      )}

      {/* Use Cases Section */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
          <div className="text-3xl mb-4">🌾</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            For Farmers
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Access data-driven insights to optimize crop selection, irrigation, and yield management
          </p>
        </div>

        <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
          <div className="text-3xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            For Researchers
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Analyze comprehensive agricultural datasets with advanced AI-powered tools
          </p>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <div className="text-3xl mb-4">🏛️</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            For Policymakers
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Make informed decisions with regional agricultural assessments and forecasts
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
