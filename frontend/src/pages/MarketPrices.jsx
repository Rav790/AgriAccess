import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiTrendingUp, FiTrendingDown, FiDollarSign, FiMapPin, 
  FiSearch, FiCalendar, FiAlertCircle, FiBarChart2,
  FiRefreshCw, FiNavigation
} from 'react-icons/fi';

const MarketPrices = () => {
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [selectedState, setSelectedState] = useState('bihar');
  const [prices, setPrices] = useState([]);
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // State-wise and crop-wise market data with realistic prices
  const mockPrices = {
    bihar: {
      rice: {
        current: 2100,
        yesterday: 2050,
        lastWeek: 2000,
        prediction: 2150,
        markets: [
          { name: 'Patna Mandi', price: 2100, distance: '5 km', trend: 'up' },
          { name: 'Gaya Mandi', price: 2080, distance: '95 km', trend: 'stable' },
          { name: 'Muzaffarpur Mandi', price: 2120, distance: '75 km', trend: 'up' },
          { name: 'Bhagalpur Mandi', price: 2050, distance: '220 km', trend: 'down' },
          { name: 'Darbhanga Mandi', price: 2090, distance: '145 km', trend: 'stable' },
          { name: 'Samastipur Mandi', price: 2105, distance: '105 km', trend: 'up' }
        ]
      },
      wheat: {
        current: 2300,
        yesterday: 2280,
        lastWeek: 2250,
        prediction: 2350,
        markets: [
          { name: 'Patna Mandi', price: 2300, distance: '5 km', trend: 'up' },
          { name: 'Gaya Mandi', price: 2280, distance: '95 km', trend: 'stable' },
          { name: 'Muzaffarpur Mandi', price: 2320, distance: '75 km', trend: 'up' },
          { name: 'Bhagalpur Mandi', price: 2250, distance: '220 km', trend: 'down' },
          { name: 'Rohtas Mandi', price: 2310, distance: '135 km', trend: 'up' },
          { name: 'Nalanda Mandi', price: 2295, distance: '60 km', trend: 'stable' }
        ]
      },
      maize: {
        current: 1800,
        yesterday: 1820,
        lastWeek: 1850,
        prediction: 1750,
        markets: [
          { name: 'Patna Mandi', price: 1800, distance: '5 km', trend: 'down' },
          { name: 'Gaya Mandi', price: 1780, distance: '95 km', trend: 'down' },
          { name: 'Muzaffarpur Mandi', price: 1820, distance: '75 km', trend: 'stable' },
          { name: 'Bhagalpur Mandi', price: 1750, distance: '220 km', trend: 'down' },
          { name: 'Vaishali Mandi', price: 1795, distance: '55 km', trend: 'down' },
          { name: 'Begusarai Mandi', price: 1810, distance: '125 km', trend: 'stable' }
        ]
      },
      potato: {
        current: 950,
        yesterday: 930,
        lastWeek: 900,
        prediction: 1020,
        markets: [
          { name: 'Patna Mandi', price: 950, distance: '5 km', trend: 'up' },
          { name: 'Nalanda Mandi', price: 970, distance: '60 km', trend: 'up' },
          { name: 'Muzaffarpur Mandi', price: 980, distance: '75 km', trend: 'up' },
          { name: 'Vaishali Mandi', price: 940, distance: '55 km', trend: 'up' },
          { name: 'Saran Mandi', price: 960, distance: '85 km', trend: 'up' },
          { name: 'East Champaran Mandi', price: 935, distance: '165 km', trend: 'stable' }
        ]
      },
      onion: {
        current: 1200,
        yesterday: 1180,
        lastWeek: 1250,
        prediction: 1150,
        markets: [
          { name: 'Patna Mandi', price: 1200, distance: '5 km', trend: 'down' },
          { name: 'Gaya Mandi', price: 1220, distance: '95 km', trend: 'down' },
          { name: 'Muzaffarpur Mandi', price: 1190, distance: '75 km', trend: 'down' },
          { name: 'Bhagalpur Mandi', price: 1180, distance: '220 km', trend: 'down' },
          { name: 'Saharsa Mandi', price: 1210, distance: '195 km', trend: 'stable' },
          { name: 'Purnia Mandi', price: 1230, distance: '285 km', trend: 'down' }
        ]
      },
      tomato: {
        current: 1650,
        yesterday: 1620,
        lastWeek: 1500,
        prediction: 1750,
        markets: [
          { name: 'Patna Mandi', price: 1650, distance: '5 km', trend: 'up' },
          { name: 'Gaya Mandi', price: 1680, distance: '95 km', trend: 'up' },
          { name: 'Muzaffarpur Mandi', price: 1670, distance: '75 km', trend: 'up' },
          { name: 'Darbhanga Mandi', price: 1640, distance: '145 km', trend: 'up' },
          { name: 'Samastipur Mandi', price: 1660, distance: '105 km', trend: 'up' },
          { name: 'Begusarai Mandi', price: 1690, distance: '125 km', trend: 'up' }
        ]
      }
    },
    up: {
      rice: {
        current: 2080,
        yesterday: 2070,
        lastWeek: 2020,
        prediction: 2120,
        markets: [
          { name: 'Lucknow Mandi', price: 2080, distance: '5 km', trend: 'up' },
          { name: 'Kanpur Mandi', price: 2100, distance: '80 km', trend: 'up' },
          { name: 'Varanasi Mandi', price: 2090, distance: '320 km', trend: 'stable' },
          { name: 'Prayagraj Mandi', price: 2070, distance: '200 km', trend: 'stable' },
          { name: 'Gorakhpur Mandi', price: 2110, distance: '270 km', trend: 'up' },
          { name: 'Meerut Mandi', price: 2095, distance: '480 km', trend: 'up' }
        ]
      },
      wheat: {
        current: 2350,
        yesterday: 2330,
        lastWeek: 2300,
        prediction: 2400,
        markets: [
          { name: 'Lucknow Mandi', price: 2350, distance: '5 km', trend: 'up' },
          { name: 'Kanpur Mandi', price: 2360, distance: '80 km', trend: 'up' },
          { name: 'Varanasi Mandi', price: 2340, distance: '320 km', trend: 'stable' },
          { name: 'Prayagraj Mandi', price: 2330, distance: '200 km', trend: 'up' },
          { name: 'Meerut Mandi', price: 2370, distance: '480 km', trend: 'up' },
          { name: 'Bareilly Mandi', price: 2345, distance: '250 km', trend: 'stable' }
        ]
      },
      maize: {
        current: 1850,
        yesterday: 1860,
        lastWeek: 1900,
        prediction: 1800,
        markets: [
          { name: 'Lucknow Mandi', price: 1850, distance: '5 km', trend: 'down' },
          { name: 'Kanpur Mandi', price: 1840, distance: '80 km', trend: 'down' },
          { name: 'Gorakhpur Mandi', price: 1870, distance: '270 km', trend: 'stable' },
          { name: 'Meerut Mandi', price: 1830, distance: '480 km', trend: 'down' },
          { name: 'Agra Mandi', price: 1860, distance: '330 km', trend: 'stable' },
          { name: 'Bareilly Mandi', price: 1845, distance: '250 km', trend: 'down' }
        ]
      },
      potato: {
        current: 920,
        yesterday: 910,
        lastWeek: 880,
        prediction: 980,
        markets: [
          { name: 'Lucknow Mandi', price: 920, distance: '5 km', trend: 'up' },
          { name: 'Kanpur Mandi', price: 930, distance: '80 km', trend: 'up' },
          { name: 'Agra Mandi', price: 940, distance: '330 km', trend: 'up' },
          { name: 'Meerut Mandi', price: 950, distance: '480 km', trend: 'up' },
          { name: 'Bareilly Mandi', price: 925, distance: '250 km', trend: 'up' },
          { name: 'Faizabad Mandi', price: 915, distance: '130 km', trend: 'stable' }
        ]
      },
      onion: {
        current: 1180,
        yesterday: 1200,
        lastWeek: 1220,
        prediction: 1120,
        markets: [
          { name: 'Lucknow Mandi', price: 1180, distance: '5 km', trend: 'down' },
          { name: 'Kanpur Mandi', price: 1190, distance: '80 km', trend: 'down' },
          { name: 'Varanasi Mandi', price: 1170, distance: '320 km', trend: 'down' },
          { name: 'Prayagraj Mandi', price: 1185, distance: '200 km', trend: 'stable' },
          { name: 'Agra Mandi', price: 1195, distance: '330 km', trend: 'down' },
          { name: 'Meerut Mandi', price: 1175, distance: '480 km', trend: 'down' }
        ]
      },
      tomato: {
        current: 1620,
        yesterday: 1580,
        lastWeek: 1520,
        prediction: 1700,
        markets: [
          { name: 'Lucknow Mandi', price: 1620, distance: '5 km', trend: 'up' },
          { name: 'Kanpur Mandi', price: 1640, distance: '80 km', trend: 'up' },
          { name: 'Varanasi Mandi', price: 1610, distance: '320 km', trend: 'up' },
          { name: 'Agra Mandi', price: 1650, distance: '330 km', trend: 'up' },
          { name: 'Meerut Mandi', price: 1630, distance: '480 km', trend: 'up' },
          { name: 'Gorakhpur Mandi', price: 1615, distance: '270 km', trend: 'stable' }
        ]
      }
    },
    punjab: {
      rice: {
        current: 2150,
        yesterday: 2140,
        lastWeek: 2100,
        prediction: 2200,
        markets: [
          { name: 'Ludhiana Mandi', price: 2150, distance: '5 km', trend: 'up' },
          { name: 'Amritsar Mandi', price: 2160, distance: '140 km', trend: 'up' },
          { name: 'Jalandhar Mandi', price: 2145, distance: '75 km', trend: 'stable' },
          { name: 'Patiala Mandi', price: 2155, distance: '65 km', trend: 'up' },
          { name: 'Bathinda Mandi', price: 2140, distance: '160 km', trend: 'stable' },
          { name: 'Moga Mandi', price: 2165, distance: '50 km', trend: 'up' }
        ]
      },
      wheat: {
        current: 2400,
        yesterday: 2390,
        lastWeek: 2360,
        prediction: 2450,
        markets: [
          { name: 'Ludhiana Mandi', price: 2400, distance: '5 km', trend: 'up' },
          { name: 'Amritsar Mandi', price: 2410, distance: '140 km', trend: 'up' },
          { name: 'Jalandhar Mandi', price: 2395, distance: '75 km', trend: 'stable' },
          { name: 'Patiala Mandi', price: 2405, distance: '65 km', trend: 'up' },
          { name: 'Bathinda Mandi', price: 2420, distance: '160 km', trend: 'up' },
          { name: 'Sangrur Mandi', price: 2390, distance: '90 km', trend: 'stable' }
        ]
      },
      maize: {
        current: 1900,
        yesterday: 1910,
        lastWeek: 1950,
        prediction: 1850,
        markets: [
          { name: 'Ludhiana Mandi', price: 1900, distance: '5 km', trend: 'down' },
          { name: 'Amritsar Mandi', price: 1890, distance: '140 km', trend: 'down' },
          { name: 'Jalandhar Mandi', price: 1910, distance: '75 km', trend: 'stable' },
          { name: 'Patiala Mandi', price: 1895, distance: '65 km', trend: 'down' },
          { name: 'Bathinda Mandi', price: 1880, distance: '160 km', trend: 'down' },
          { name: 'Moga Mandi', price: 1905, distance: '50 km', trend: 'stable' }
        ]
      },
      potato: {
        current: 980,
        yesterday: 970,
        lastWeek: 940,
        prediction: 1050,
        markets: [
          { name: 'Ludhiana Mandi', price: 980, distance: '5 km', trend: 'up' },
          { name: 'Amritsar Mandi', price: 990, distance: '140 km', trend: 'up' },
          { name: 'Jalandhar Mandi', price: 985, distance: '75 km', trend: 'up' },
          { name: 'Patiala Mandi', price: 975, distance: '65 km', trend: 'stable' },
          { name: 'Hoshiarpur Mandi', price: 995, distance: '110 km', trend: 'up' },
          { name: 'Kapurthala Mandi', price: 970, distance: '95 km', trend: 'up' }
        ]
      },
      onion: {
        current: 1250,
        yesterday: 1270,
        lastWeek: 1300,
        prediction: 1200,
        markets: [
          { name: 'Ludhiana Mandi', price: 1250, distance: '5 km', trend: 'down' },
          { name: 'Amritsar Mandi', price: 1260, distance: '140 km', trend: 'down' },
          { name: 'Jalandhar Mandi', price: 1245, distance: '75 km', trend: 'down' },
          { name: 'Patiala Mandi', price: 1255, distance: '65 km', trend: 'stable' },
          { name: 'Bathinda Mandi', price: 1240, distance: '160 km', trend: 'down' },
          { name: 'Moga Mandi', price: 1265, distance: '50 km', trend: 'down' }
        ]
      },
      tomato: {
        current: 1700,
        yesterday: 1680,
        lastWeek: 1620,
        prediction: 1780,
        markets: [
          { name: 'Ludhiana Mandi', price: 1700, distance: '5 km', trend: 'up' },
          { name: 'Amritsar Mandi', price: 1710, distance: '140 km', trend: 'up' },
          { name: 'Jalandhar Mandi', price: 1695, distance: '75 km', trend: 'up' },
          { name: 'Patiala Mandi', price: 1705, distance: '65 km', trend: 'up' },
          { name: 'Hoshiarpur Mandi', price: 1720, distance: '110 km', trend: 'up' },
          { name: 'Bathinda Mandi', price: 1690, distance: '160 km', trend: 'stable' }
        ]
      }
    },
    haryana: {
      rice: {
        current: 2120,
        yesterday: 2100,
        lastWeek: 2070,
        prediction: 2170,
        markets: [
          { name: 'Karnal Mandi', price: 2120, distance: '5 km', trend: 'up' },
          { name: 'Panipat Mandi', price: 2130, distance: '60 km', trend: 'up' },
          { name: 'Kurukshetra Mandi', price: 2115, distance: '45 km', trend: 'stable' },
          { name: 'Rohtak Mandi', price: 2125, distance: '150 km', trend: 'up' },
          { name: 'Hisar Mandi', price: 2110, distance: '180 km', trend: 'stable' },
          { name: 'Ambala Mandi', price: 2135, distance: '75 km', trend: 'up' }
        ]
      },
      wheat: {
        current: 2380,
        yesterday: 2370,
        lastWeek: 2340,
        prediction: 2430,
        markets: [
          { name: 'Karnal Mandi', price: 2380, distance: '5 km', trend: 'up' },
          { name: 'Panipat Mandi', price: 2390, distance: '60 km', trend: 'up' },
          { name: 'Kurukshetra Mandi', price: 2375, distance: '45 km', trend: 'stable' },
          { name: 'Rohtak Mandi', price: 2385, distance: '150 km', trend: 'up' },
          { name: 'Hisar Mandi', price: 2395, distance: '180 km', trend: 'up' },
          { name: 'Sirsa Mandi', price: 2370, distance: '260 km', trend: 'stable' }
        ]
      },
      maize: {
        current: 1880,
        yesterday: 1895,
        lastWeek: 1920,
        prediction: 1830,
        markets: [
          { name: 'Karnal Mandi', price: 1880, distance: '5 km', trend: 'down' },
          { name: 'Panipat Mandi', price: 1870, distance: '60 km', trend: 'down' },
          { name: 'Kurukshetra Mandi', price: 1890, distance: '45 km', trend: 'stable' },
          { name: 'Rohtak Mandi', price: 1875, distance: '150 km', trend: 'down' },
          { name: 'Hisar Mandi', price: 1860, distance: '180 km', trend: 'down' },
          { name: 'Ambala Mandi', price: 1885, distance: '75 km', trend: 'stable' }
        ]
      },
      potato: {
        current: 960,
        yesterday: 950,
        lastWeek: 920,
        prediction: 1030,
        markets: [
          { name: 'Karnal Mandi', price: 960, distance: '5 km', trend: 'up' },
          { name: 'Panipat Mandi', price: 970, distance: '60 km', trend: 'up' },
          { name: 'Kurukshetra Mandi', price: 965, distance: '45 km', trend: 'up' },
          { name: 'Rohtak Mandi', price: 955, distance: '150 km', trend: 'stable' },
          { name: 'Sonipat Mandi', price: 975, distance: '120 km', trend: 'up' },
          { name: 'Gurgaon Mandi', price: 950, distance: '200 km', trend: 'up' }
        ]
      },
      onion: {
        current: 1220,
        yesterday: 1240,
        lastWeek: 1280,
        prediction: 1170,
        markets: [
          { name: 'Karnal Mandi', price: 1220, distance: '5 km', trend: 'down' },
          { name: 'Panipat Mandi', price: 1230, distance: '60 km', trend: 'down' },
          { name: 'Kurukshetra Mandi', price: 1215, distance: '45 km', trend: 'down' },
          { name: 'Rohtak Mandi', price: 1225, distance: '150 km', trend: 'stable' },
          { name: 'Hisar Mandi', price: 1210, distance: '180 km', trend: 'down' },
          { name: 'Ambala Mandi', price: 1235, distance: '75 km', trend: 'down' }
        ]
      },
      tomato: {
        current: 1680,
        yesterday: 1650,
        lastWeek: 1590,
        prediction: 1760,
        markets: [
          { name: 'Karnal Mandi', price: 1680, distance: '5 km', trend: 'up' },
          { name: 'Panipat Mandi', price: 1690, distance: '60 km', trend: 'up' },
          { name: 'Kurukshetra Mandi', price: 1675, distance: '45 km', trend: 'up' },
          { name: 'Rohtak Mandi', price: 1685, distance: '150 km', trend: 'up' },
          { name: 'Hisar Mandi', price: 1695, distance: '180 km', trend: 'up' },
          { name: 'Ambala Mandi', price: 1670, distance: '75 km', trend: 'stable' }
        ]
      }
    }
  };

  const crops = [
    { id: 'rice', name: 'Rice (Paddy)', unit: 'Quintal' },
    { id: 'wheat', name: 'Wheat', unit: 'Quintal' },
    { id: 'maize', name: 'Maize', unit: 'Quintal' },
    { id: 'potato', name: 'Potato', unit: 'Quintal' },
    { id: 'onion', name: 'Onion', unit: 'Quintal' },
    { id: 'tomato', name: 'Tomato', unit: 'Quintal' }
  ];

  useEffect(() => {
    fetchPriceData();
  }, [selectedCrop, selectedState]);

  const fetchPriceData = () => {
    setLoading(true);
    setTimeout(() => {
      const stateData = mockPrices[selectedState] || mockPrices.bihar;
      const data = stateData[selectedCrop] || stateData.rice;
      setPrices(data);
      setLoading(false);
    }, 500);
  };

  const getPriceChange = (current, previous) => {
    const change = current - previous;
    const percentage = ((change / previous) * 100).toFixed(1);
    return { change, percentage };
  };

  const currentData = prices;
  const dailyChange = currentData ? getPriceChange(currentData.current, currentData.yesterday) : null;
  const weeklyChange = currentData ? getPriceChange(currentData.current, currentData.lastWeek) : null;
  const predictionChange = currentData ? getPriceChange(currentData.prediction, currentData.current) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Market Price Intelligence
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Real-time mandi rates and price predictions powered by AI
        </p>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Crop
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="input-field"
            >
              {crops.map(crop => (
                <option key={crop.id} value={crop.id}>{crop.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="input-field"
            >
              <option value="bihar">Bihar</option>
              <option value="up">Uttar Pradesh</option>
              <option value="punjab">Punjab</option>
              <option value="haryana">Haryana</option>
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={fetchPriceData} className="btn-primary w-full flex items-center justify-center space-x-2">
              <FiRefreshCw size={18} />
              <span>Refresh Prices</span>
            </button>
          </div>
        </div>
      </div>

      {/* Price Overview Cards */}
      {currentData && (
        <div className="grid md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-gradient-to-br from-green-500 to-green-700 text-white"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-100">Current Price</span>
              <FiDollarSign size={24} />
            </div>
            <p className="text-3xl font-bold">₹{currentData.current}</p>
            <p className="text-green-100 text-sm mt-1">per Quintal</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`card ${dailyChange?.change >= 0 ? 'bg-gradient-to-br from-blue-500 to-blue-700' : 'bg-gradient-to-br from-red-500 to-red-700'} text-white`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/90">Daily Change</span>
              {dailyChange?.change >= 0 ? <FiTrendingUp size={24} /> : <FiTrendingDown size={24} />}
            </div>
            <p className="text-3xl font-bold">
              {dailyChange?.change >= 0 ? '+' : ''}₹{Math.abs(dailyChange?.change || 0)}
            </p>
            <p className="text-white/90 text-sm mt-1">
              {dailyChange?.percentage >= 0 ? '+' : ''}{dailyChange?.percentage}%
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`card ${weeklyChange?.change >= 0 ? 'bg-gradient-to-br from-purple-500 to-purple-700' : 'bg-gradient-to-br from-orange-500 to-orange-700'} text-white`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/90">Weekly Change</span>
              <FiBarChart2 size={24} />
            </div>
            <p className="text-3xl font-bold">
              {weeklyChange?.change >= 0 ? '+' : ''}₹{Math.abs(weeklyChange?.change || 0)}
            </p>
            <p className="text-white/90 text-sm mt-1">
              {weeklyChange?.percentage >= 0 ? '+' : ''}{weeklyChange?.percentage}%
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card bg-gradient-to-br from-yellow-500 to-yellow-700 text-white"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-yellow-100">AI Prediction (7 days)</span>
              <FiTrendingUp size={24} />
            </div>
            <p className="text-3xl font-bold">₹{currentData.prediction}</p>
            <p className="text-yellow-100 text-sm mt-1">
              {predictionChange?.change >= 0 ? '+' : ''}{predictionChange?.percentage}% expected
            </p>
          </motion.div>
        </div>
      )}

      {/* Best Time to Sell Alert */}
      {predictionChange && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`card border-l-4 ${
            predictionChange.change > 0 
              ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
              : 'border-green-500 bg-green-50 dark:bg-green-900/20'
          }`}
        >
          <div className="flex items-start space-x-4">
            <FiAlertCircle 
              className={predictionChange.change > 0 ? 'text-yellow-500' : 'text-green-500'} 
              size={24} 
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {predictionChange.change > 0 ? '⏰ Wait for Better Prices!' : '✅ Good Time to Sell!'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {predictionChange.change > 0 
                  ? `Prices expected to increase by ₹${Math.abs(predictionChange.change)} (${predictionChange.percentage}%) in next 7 days. Consider holding your produce.`
                  : `Current prices are at peak. Prices may drop by ₹${Math.abs(predictionChange.change)} (${Math.abs(predictionChange.percentage)}%) next week. Sell now!`
                }
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Nearby Markets */}
      {currentData?.markets && (
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <FiMapPin className="mr-2" />
            Nearby Markets & Prices
          </h3>
          <div className="space-y-4">
            {currentData.markets.map((market, index) => {
              const marketChange = getPriceChange(market.price, currentData.current);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{market.name}</h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center">
                        <FiNavigation size={14} className="mr-1" />
                        {market.distance}
                      </span>
                      <span className={`flex items-center font-medium ${
                        market.trend === 'up' ? 'text-green-600' :
                        market.trend === 'down' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {market.trend === 'up' && <FiTrendingUp className="mr-1" />}
                        {market.trend === 'down' && <FiTrendingDown className="mr-1" />}
                        {market.trend === 'up' ? 'Rising' : market.trend === 'down' ? 'Falling' : 'Stable'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{market.price}</p>
                    <p className={`text-sm ${
                      marketChange.change > 0 ? 'text-green-600' :
                      marketChange.change < 0 ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {marketChange.change > 0 ? '+' : ''}{marketChange.change} vs avg
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Transportation Cost Calculator */}
      <div className="card bg-blue-50 dark:bg-blue-900/20">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">
          💡 Pro Tip: Transportation Cost Analysis
        </h4>
        <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">
          Even if a distant market offers higher prices, factor in transportation costs:
        </p>
        <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-400">
          <li>• Truck rental: ₹15-20 per km (for 5-10 quintal)</li>
          <li>• Labor for loading/unloading: ₹300-500</li>
          <li>• Mandi fee: 1-2% of sale value</li>
          <li>• Commission: 2-4% of sale value</li>
        </ul>
        <p className="text-sm text-blue-800 dark:text-blue-300 mt-3 font-medium">
          Example: For Muzaffarpur (75 km), transport cost ≈ ₹1500 + fees ≈ ₹2000 total
        </p>
      </div>
    </div>
  );
};

export default MarketPrices;
