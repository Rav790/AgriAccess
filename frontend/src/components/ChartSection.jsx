import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchLandHoldings, 
  fetchIrrigationSources, 
  fetchCroppingPatterns 
} from '../redux/slices/dataSlice';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for charts when backend data is unavailable
const mockLandHoldings = [
  { region: { district: 'Patna' }, avg_size_ha: 1.8 },
  { region: { district: 'Gaya' }, avg_size_ha: 1.5 },
  { region: { district: 'Muzaffarpur' }, avg_size_ha: 2.1 },
  { region: { district: 'Lucknow' }, avg_size_ha: 2.5 },
  { region: { district: 'Varanasi' }, avg_size_ha: 1.9 },
  { region: { district: 'Ludhiana' }, avg_size_ha: 3.2 },
  { region: { district: 'Amritsar' }, avg_size_ha: 2.8 },
  { region: { district: 'Karnal' }, avg_size_ha: 2.4 },
  { region: { district: 'Hisar' }, avg_size_ha: 2.6 },
  { region: { district: 'Kanpur' }, avg_size_ha: 2.0 },
];

const mockIrrigationSources = [
  { source: 'Groundwater', percentage: 42 },
  { source: 'Canal', percentage: 28 },
  { source: 'Tube Well', percentage: 18 },
  { source: 'Rain-fed', percentage: 8 },
  { source: 'Tank', percentage: 4 },
];

const mockCroppingPatterns = [
  { crop_type: 'Rice', yield_tonnes_ha: 3.5 },
  { crop_type: 'Wheat', yield_tonnes_ha: 4.2 },
  { crop_type: 'Sugarcane', yield_tonnes_ha: 68.5 },
  { crop_type: 'Maize', yield_tonnes_ha: 2.8 },
  { crop_type: 'Cotton', yield_tonnes_ha: 1.5 },
];

const ChartSection = ({ filters }) => {
  const dispatch = useDispatch();
  const { landHoldings, irrigationSources, croppingPatterns, loading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchLandHoldings(filters));
    dispatch(fetchIrrigationSources(filters));
    dispatch(fetchCroppingPatterns(filters));
  }, [dispatch, filters]);

  // Use mock data if backend data is empty
  const displayLandHoldings = landHoldings.length > 0 ? landHoldings : mockLandHoldings;
  const displayIrrigationSources = irrigationSources.length > 0 ? irrigationSources : mockIrrigationSources;
  const displayCroppingPatterns = croppingPatterns.length > 0 ? croppingPatterns : mockCroppingPatterns;

  // Land Holdings Chart Data
  const landHoldingsData = {
    labels: displayLandHoldings.slice(0, 10).map(item => item.region?.district || 'N/A'),
    datasets: [{
      label: 'Average Land Holding (ha)',
      data: displayLandHoldings.slice(0, 10).map(item => parseFloat(item.avg_size_ha)),
      backgroundColor: 'rgba(76, 175, 80, 0.6)',
      borderColor: 'rgba(76, 175, 80, 1)',
      borderWidth: 1,
    }],
  };

  // Irrigation Pie Chart Data
  const irrigationData = {
    labels: [...new Set(displayIrrigationSources.map(item => item.source))],
    datasets: [{
      data: [...new Set(displayIrrigationSources.map(item => item.source))].map(source => {
        const items = displayIrrigationSources.filter(i => i.source === source);
        return items.reduce((sum, i) => sum + parseFloat(i.percentage), 0) / items.length;
      }),
      backgroundColor: [
        'rgba(59, 130, 246, 0.6)',
        'rgba(16, 185, 129, 0.6)',
        'rgba(245, 158, 11, 0.6)',
        'rgba(239, 68, 68, 0.6)',
        'rgba(139, 92, 246, 0.6)',
        'rgba(236, 72, 153, 0.6)',
      ],
    }],
  };

  // Cropping Pattern Line Chart Data
  const croppingData = {
    labels: [...new Set(displayCroppingPatterns.map(item => item.crop_type))].slice(0, 5),
    datasets: [{
      label: 'Yield (tonnes/ha)',
      data: [...new Set(displayCroppingPatterns.map(item => item.crop_type))].slice(0, 5).map(crop => {
        const items = displayCroppingPatterns.filter(c => c.crop_type === crop);
        return items.reduce((sum, i) => sum + parseFloat(i.yield_tonnes_ha || 0), 0) / items.length;
      }),
      borderColor: 'rgba(76, 175, 80, 1)',
      backgroundColor: 'rgba(76, 175, 80, 0.2)',
      tension: 0.4,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card h-80 animate-pulse">
            <div className="h-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Land Holdings by District
          </h3>
          <div className="h-80">
            <Bar data={landHoldingsData} options={chartOptions} />
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Irrigation Sources Distribution
          </h3>
          <div className="h-80 flex items-center justify-center">
            <Pie data={irrigationData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Crop Yield Comparison
        </h3>
        <div className="h-80">
          <Line data={croppingData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
