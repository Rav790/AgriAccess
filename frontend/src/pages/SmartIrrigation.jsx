import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDroplet, FiCalendar, FiTrendingDown, FiDollarSign, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

const SmartIrrigation = () => {
  const [formData, setFormData] = useState({
    crop: 'rice',
    soilType: 'loamy',
    fieldSize: '',
    irrigationType: 'flood',
    growthStage: 'vegetative'
  });

  const [weatherData, setWeatherData] = useState(null);
  const [results, setResults] = useState(null);

  // Mock weather data (in production, fetch from OpenWeatherMap)
  useEffect(() => {
    setWeatherData({
      temperature: 28,
      humidity: 65,
      rainfall7Days: 15, // mm in last 7 days
      forecastRain: 25 // mm expected in next 7 days
    });
  }, []);

  // Crop water requirements (mm/day)
  const cropWaterRequirements = {
    rice: {
      initial: 5,
      vegetative: 7,
      flowering: 9,
      maturity: 4
    },
    wheat: {
      initial: 3,
      vegetative: 5,
      flowering: 7,
      maturity: 3
    },
    maize: {
      initial: 4,
      vegetative: 6,
      flowering: 8,
      maturity: 3
    },
    potato: {
      initial: 4,
      vegetative: 5,
      flowering: 6,
      maturity: 3
    }
  };

  // Irrigation efficiency
  const irrigationEfficiency = {
    flood: 0.40, // 40% efficiency
    furrow: 0.60, // 60% efficiency
    sprinkler: 0.75, // 75% efficiency
    drip: 0.90 // 90% efficiency
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateIrrigation = (e) => {
    e.preventDefault();
    
    const waterReq = cropWaterRequirements[formData.crop][formData.growthStage];
    const efficiency = irrigationEfficiency[formData.irrigationType];
    const fieldSizeHa = parseFloat(formData.fieldSize) || 1;
    
    // Calculate daily water requirement (liters)
    const dailyWaterReq = waterReq * fieldSizeHa * 10000; // 1 ha = 10000 m², 1mm = 1L/m²
    const actualWaterNeeded = dailyWaterReq / efficiency;

    // Account for rainfall
    const effectiveRainfall = weatherData.forecastRain * 0.8; // 80% effectiveness
    const rainContribution = (effectiveRainfall / 7) * fieldSizeHa * 10000;
    const netWaterNeeded = Math.max(0, dailyWaterReq - rainContribution);

    // Irrigation frequency (days)
    let frequency = formData.soilType === 'sandy' ? 2 : 
                    formData.soilType === 'loamy' ? 4 : 
                    formData.soilType === 'clay' ? 5 : 3;

    // Calculate costs (₹)
    const electricityCost = (actualWaterNeeded / 1000) * 3; // ₹3 per 1000L
    const dailyCost = electricityCost;
    const monthlyCost = dailyCost * 30;

    // Drip irrigation savings
    const floodWater = dailyWaterReq / irrigationEfficiency.flood;
    const dripWater = dailyWaterReq / irrigationEfficiency.drip;
    const waterSavings = ((floodWater - dripWater) / floodWater * 100).toFixed(1);
    const costSavings = ((floodWater - dripWater) / 1000 * 3).toFixed(0);

    setResults({
      waterRequirement: {
        daily: (dailyWaterReq / 1000).toFixed(1), // Convert to m³
        actual: (actualWaterNeeded / 1000).toFixed(1),
        net: (netWaterNeeded / 1000).toFixed(1)
      },
      schedule: {
        frequency,
        amount: ((netWaterNeeded * frequency) / 1000).toFixed(1),
        duration: ((actualWaterNeeded / 3600) * frequency).toFixed(1) // Assuming 1000L/hour flow
      },
      costs: {
        daily: dailyCost.toFixed(0),
        monthly: monthlyCost.toFixed(0)
      },
      savings: {
        water: waterSavings,
        cost: costSavings,
        dripCost: (monthlyCost * 0.4).toFixed(0) // 60% savings with drip
      },
      rainfall: {
        recent: weatherData.rainfall7Days,
        forecast: weatherData.forecastRain,
        contribution: (rainContribution / 1000).toFixed(1)
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Smart Irrigation Planner
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Optimize water usage and reduce irrigation costs with AI-powered scheduling
        </p>
      </div>

      {/* Weather Info Card */}
      {weatherData && (
        <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
          <div className="flex items-center space-x-2 mb-3">
            <FiDroplet className="text-blue-600" size={24} />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Current Weather Conditions</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Temperature</p>
              <p className="text-2xl font-bold text-blue-600">{weatherData.temperature}°C</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Humidity</p>
              <p className="text-2xl font-bold text-cyan-600">{weatherData.humidity}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Rainfall (7d)</p>
              <p className="text-2xl font-bold text-green-600">{weatherData.rainfall7Days}mm</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Forecast (7d)</p>
              <p className="text-2xl font-bold text-purple-600">{weatherData.forecastRain}mm</p>
            </div>
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Enter Your Irrigation Details
        </h3>
        <form onSubmit={calculateIrrigation} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Crop
              </label>
              <select
                name="crop"
                value={formData.crop}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="rice">Rice (Paddy)</option>
                <option value="wheat">Wheat</option>
                <option value="maize">Maize</option>
                <option value="potato">Potato</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Growth Stage
              </label>
              <select
                name="growthStage"
                value={formData.growthStage}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="initial">Initial (Germination)</option>
                <option value="vegetative">Vegetative</option>
                <option value="flowering">Flowering/Reproductive</option>
                <option value="maturity">Maturity</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Soil Type
              </label>
              <select
                name="soilType"
                value={formData.soilType}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="sandy">Sandy (Low retention)</option>
                <option value="loamy">Loamy (Medium retention)</option>
                <option value="clay">Clay (High retention)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Irrigation Type
              </label>
              <select
                name="irrigationType"
                value={formData.irrigationType}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="flood">Flood (40% efficient)</option>
                <option value="furrow">Furrow (60% efficient)</option>
                <option value="sprinkler">Sprinkler (75% efficient)</option>
                <option value="drip">Drip (90% efficient)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Field Size (Hectares)
              </label>
              <input
                type="number"
                name="fieldSize"
                value={formData.fieldSize}
                onChange={handleInputChange}
                placeholder="e.g., 1.5"
                step="0.1"
                min="0.1"
                className="input-field"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full md:w-auto">
            Calculate Irrigation Plan
          </button>
        </form>
      </div>

      {/* Results */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Water Requirements */}
          <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              💧 Water Requirements
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Crop Needs</p>
                <p className="text-3xl font-bold text-blue-600">{results.waterRequirement.daily} m³</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">per day (ideal)</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">With Efficiency Loss</p>
                <p className="text-3xl font-bold text-purple-600">{results.waterRequirement.actual} m³</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">actual water needed</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">After Rainfall</p>
                <p className="text-3xl font-bold text-green-600">{results.waterRequirement.net} m³</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">you need to irrigate</p>
              </div>
            </div>
          </div>

          {/* Irrigation Schedule */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <FiCalendar className="text-primary-500" />
              <span>Recommended Irrigation Schedule</span>
            </h3>
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-2 border-green-500">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-green-900 dark:text-green-200">Irrigate Every</p>
                  <p className="text-3xl font-bold text-green-600">{results.schedule.frequency} Days</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Water per session</p>
                    <p className="text-xl font-bold text-green-700 dark:text-green-300">{results.schedule.amount} m³</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                    <p className="text-xl font-bold text-green-700 dark:text-green-300">{results.schedule.duration} hours</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <p className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Rainfall Contribution</p>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  Expected rainfall in next 7 days: <strong>{results.rainfall.forecast}mm</strong>
                  <br />
                  This will provide approximately <strong>{results.rainfall.contribution} m³</strong> of water
                  <br />
                  <span className="text-green-600 font-medium">
                    {results.rainfall.forecast > 20 ? '✓ Good natural irrigation expected!' : '⚠ Low rainfall - maintain regular irrigation'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Cost Analysis */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <FiDollarSign className="text-green-500" />
              <span>Cost Analysis</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <p className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">Current System Costs</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Daily</span>
                    <span className="font-bold text-yellow-700 dark:text-yellow-300">₹{results.costs.daily}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Monthly</span>
                    <span className="font-bold text-yellow-700 dark:text-yellow-300">₹{results.costs.monthly}</span>
                  </div>
                  <div className="flex justify-between border-t border-yellow-200 dark:border-yellow-800 pt-2">
                    <span className="text-gray-700 dark:text-gray-300">Yearly</span>
                    <span className="font-bold text-yellow-700 dark:text-yellow-300">₹{(results.costs.monthly * 12).toFixed(0)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <p className="font-semibold text-green-900 dark:text-green-200 mb-2">With Drip Irrigation</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Water Savings</span>
                    <span className="font-bold text-green-700 dark:text-green-300">{results.savings.water}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Daily Savings</span>
                    <span className="font-bold text-green-700 dark:text-green-300">₹{results.savings.cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Monthly Cost</span>
                    <span className="font-bold text-green-700 dark:text-green-300">₹{results.savings.dripCost}</span>
                  </div>
                  <div className="flex justify-between border-t border-green-200 dark:border-green-800 pt-2">
                    <span className="text-gray-700 dark:text-gray-300">Yearly Savings</span>
                    <span className="font-bold text-green-700 dark:text-green-300">₹{(results.savings.cost * 365).toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upgrade Recommendation */}
          {formData.irrigationType !== 'drip' && (
            <div className="card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-300 dark:border-purple-700">
              <h3 className="text-xl font-bold text-purple-900 dark:text-purple-200 mb-3">
                🚀 Upgrade to Drip Irrigation - Save {results.savings.water}% Water!
              </h3>
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">Investment Analysis</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Drip System Cost (1 ha)</span>
                      <span className="font-bold">₹40,000 - 60,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Government Subsidy (50%)</span>
                      <span className="font-bold text-green-600">- ₹20,000 - 30,000</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Your Cost</span>
                      <span className="font-bold text-purple-600">₹20,000 - 30,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Yearly Savings</span>
                      <span className="font-bold text-green-600">₹{(results.savings.cost * 365).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-bold">Payback Period</span>
                      <span className="font-bold text-green-600">
                        {((25000) / (results.savings.cost * 365) * 12).toFixed(1)} months
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3">
                  <p className="font-semibold text-green-900 dark:text-green-200 mb-2">Additional Benefits</p>
                  <ul className="text-sm text-green-800 dark:text-green-300 space-y-1">
                    <li className="flex items-center space-x-2">
                      <FiCheckCircle className="flex-shrink-0" />
                      <span>Uniform water distribution - Better crop growth</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FiCheckCircle className="flex-shrink-0" />
                      <span>Reduced weed growth - Lower labor costs</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FiCheckCircle className="flex-shrink-0" />
                      <span>Fertilizer can be applied through drip - Fertigation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FiCheckCircle className="flex-shrink-0" />
                      <span>15-30% yield increase reported</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Smart Tips */}
          <div className="card border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">
              💡 Smart Irrigation Tips
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">→</span>
                <span>Best time to irrigate: Early morning (4-8 AM) or evening (6-9 PM) to minimize evaporation</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">→</span>
                <span>Check soil moisture before irrigation - Don't water if soil is already moist</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">→</span>
                <span>Mulching can reduce water requirement by 20-30%</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">→</span>
                <span>Monitor weather forecast and adjust irrigation accordingly</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">→</span>
                <span>Critical stages need more water: Flowering for most crops</span>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SmartIrrigation;
