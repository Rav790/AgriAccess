import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  fetchStatistics, 
  fetchRegions, 
  setFilters 
} from '../redux/slices/dataSlice';
import { FiTrendingUp, FiDroplet, FiLayers, FiActivity } from 'react-icons/fi';
import DashboardCard from '../components/DashboardCard';
import FilterPanel from '../components/FilterPanel';
import ChartSection from '../components/ChartSection';
import MapVisualization from '../components/MapVisualization';

// Mock statistics data when backend is unavailable
const mockStatistics = {
  avgLandHolding: 2.3,
  avgWellDepth: 12.5,
  year: 2023,
  state: 'All States',
  topCrops: [
    { crop_type: 'Rice', total_production: 4850 },
    { crop_type: 'Wheat', total_production: 4200 },
    { crop_type: 'Sugarcane', total_production: 3600 },
    { crop_type: 'Maize', total_production: 2100 },
    { crop_type: 'Cotton', total_production: 1800 },
  ],
  irrigationBreakdown: [
    { source: 'Groundwater', avg_percentage: 42 },
    { source: 'Canal', avg_percentage: 28 },
    { source: 'Tube Well', avg_percentage: 18 },
    { source: 'Rain-fed', avg_percentage: 8 },
    { source: 'Tank', avg_percentage: 4 },
  ],
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { statistics, filters, loading, states } = useSelector((state) => state.data);
  const [activeTab, setActiveTab] = useState('overview');

  // Use mock data if statistics is null
  const displayStats = statistics || mockStatistics;

  useEffect(() => {
    dispatch(fetchRegions());
    dispatch(fetchStatistics({ state: filters.state, year: filters.year }));
  }, [dispatch, filters.state, filters.year]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiActivity },
    { id: 'charts', label: 'Charts', icon: FiLayers },
    { id: 'map', label: 'Geographic', icon: FiDroplet },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Interactive agricultural data visualization
          </p>
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel 
        filters={filters}
        states={states}
        onFilterChange={handleFilterChange}
      />

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
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="card animate-pulse">
                    <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <DashboardCard
                  title="Avg Land Holding"
                  value={`${displayStats.avgLandHolding} ha`}
                  icon={FiLayers}
                  color="bg-blue-500"
                  trend="+2.5%"
                />
                <DashboardCard
                  title="Well Depth"
                  value={`${displayStats.avgWellDepth} m`}
                  icon={FiDroplet}
                  color="bg-cyan-500"
                  trend="+5.2%"
                />
                <DashboardCard
                  title="Top Crop"
                  value={displayStats.topCrops?.[0]?.crop_type || 'N/A'}
                  icon={FiTrendingUp}
                  color="bg-green-500"
                  subtitle={`${parseFloat(displayStats.topCrops?.[0]?.total_production || 0).toFixed(0)} tonnes`}
                />
                <DashboardCard
                  title="Year"
                  value={displayStats.year}
                  icon={FiActivity}
                  color="bg-purple-500"
                  subtitle={displayStats.state}
                />
              </div>
            )}

            {/* Quick Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Irrigation Sources Distribution
                </h3>
                {displayStats?.irrigationBreakdown && displayStats.irrigationBreakdown.length > 0 ? (
                  <div className="space-y-2">
                    {displayStats.irrigationBreakdown.map((item) => (
                      <div key={item.source}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700 dark:text-gray-300 capitalize">
                            {item.source}
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {parseFloat(item.avg_percentage).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-primary-500 h-2 rounded-full"
                            style={{ width: `${item.avg_percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No data available</p>
                )}
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Top 5 Crops by Production
                </h3>
                {displayStats?.topCrops && displayStats.topCrops.length > 0 ? (
                  <div className="space-y-3">
                    {displayStats.topCrops.map((crop, index) => (
                      <div key={crop.crop_type} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center justify-center w-6 h-6 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-xs font-bold">
                            {index + 1}
                          </span>
                          <span className="text-gray-700 dark:text-gray-300 capitalize">
                            {crop.crop_type}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {parseFloat(crop.total_production).toFixed(0)} T
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No data available</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'charts' && <ChartSection filters={filters} />}
        
        {activeTab === 'map' && <MapVisualization filters={filters} />}
      </motion.div>
    </div>
  );
};

export default Dashboard;
