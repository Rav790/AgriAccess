import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiCheckCircle, FiAlertCircle, FiInfo,
  FiDroplet, FiTrendingUp, FiDollarSign
} from 'react-icons/fi';

const SoilHealthCalculator = () => {
  const [formData, setFormData] = useState({
    crop: 'rice',
    soilType: 'loamy',
    previousCrop: 'none',
    irrigation: 'canal',
    fieldSize: ''
  });

  const [results, setResults] = useState(null);

  const cropRequirements = {
    rice: {
      n: 120, p: 60, k: 40,
      ph: '5.5-7.0',
      organic: 'High',
      tips: ['Apply urea in split doses', 'Green manure before transplanting', 'Maintain 2-3 inches water']
    },
    wheat: {
      n: 100, p: 50, k: 50,
      ph: '6.0-7.5',
      organic: 'Medium',
      tips: ['Apply fertilizer at sowing and tillering', 'Ensure good drainage', 'Monitor for rust disease']
    },
    maize: {
      n: 120, p: 60, k: 40,
      ph: '5.8-7.0',
      organic: 'Medium',
      tips: ['Side-dress nitrogen at knee-high stage', 'Mulch to conserve moisture', 'Watch for borers']
    },
    potato: {
      n: 150, p: 80, k: 100,
      ph: '5.0-6.0',
      organic: 'High',
      tips: ['Use well-rotted FYM', 'Earth up plants regularly', 'Avoid waterlogging']
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateRecommendations = (e) => {
    e.preventDefault();
    
    const cropReq = cropRequirements[formData.crop];
    const fieldSizeHa = parseFloat(formData.fieldSize) || 1;

    // Calculate total fertilizer needed
    const totalN = cropReq.n * fieldSizeHa;
    const totalP = cropReq.p * fieldSizeHa;
    const totalK = cropReq.k * fieldSizeHa;

    // Calculate fertilizer quantities (approximations)
    const urea = (totalN / 0.46).toFixed(1); // Urea is 46% N
    const dap = (totalP / 0.46).toFixed(1); // DAP is 46% P2O5
    const mop = (totalK / 0.60).toFixed(1); // MOP is 60% K2O

    // Cost estimation (₹ per kg)
    const costUrea = (parseFloat(urea) * 6).toFixed(0);
    const costDAP = (parseFloat(dap) * 27).toFixed(0);
    const costMOP = (parseFloat(mop) * 18).toFixed(0);
    const totalCost = parseInt(costUrea) + parseInt(costDAP) + parseInt(costMOP);

    // Organic alternatives
    const fym = (totalN / 0.005).toFixed(0); // FYM has ~0.5% N
    const compost = (totalN / 0.015).toFixed(0); // Compost has ~1.5% N

    setResults({
      nutrients: {
        n: totalN.toFixed(1),
        p: totalP.toFixed(1),
        k: totalK.toFixed(1)
      },
      chemical: {
        urea,
        dap,
        mop
      },
      costs: {
        urea: costUrea,
        dap: costDAP,
        mop: costMOP,
        total: totalCost
      },
      organic: {
        fym,
        compost
      },
      cropData: cropReq
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Soil Health & Fertilizer Calculator
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Get precise NPK recommendations and cost estimates for your crops
        </p>
      </div>

      {/* Input Form */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Enter Your Farm Details
        </h3>
        <form onSubmit={calculateRecommendations} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Crop to Grow
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
                Soil Type
              </label>
              <select
                name="soilType"
                value={formData.soilType}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="sandy">Sandy</option>
                <option value="loamy">Loamy</option>
                <option value="clay">Clay</option>
                <option value="alluvial">Alluvial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Previous Crop
              </label>
              <select
                name="previousCrop"
                value={formData.previousCrop}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="none">No Previous Crop</option>
                <option value="legume">Legume (Pulses)</option>
                <option value="cereal">Cereal (Rice/Wheat)</option>
                <option value="vegetable">Vegetables</option>
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
            Calculate Recommendations
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
          {/* NPK Requirements */}
          <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              📊 Nutrient Requirements
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Nitrogen (N)</p>
                <p className="text-3xl font-bold text-blue-600">{results.nutrients.n} kg</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Phosphorus (P)</p>
                <p className="text-3xl font-bold text-purple-600">{results.nutrients.p} kg</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Potassium (K)</p>
                <p className="text-3xl font-bold text-orange-600">{results.nutrients.k} kg</p>
              </div>
            </div>
          </div>

          {/* Chemical Fertilizers */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              🧪 Chemical Fertilizer Recommendations
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Urea (46% N)</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">For Nitrogen requirement</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">{results.chemical.urea} kg</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">₹{results.costs.urea}</p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">DAP (46% P₂O₅)</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">For Phosphorus requirement</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-600">{results.chemical.dap} kg</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">₹{results.costs.dap}</p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">MOP (60% K₂O)</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">For Potassium requirement</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-600">{results.chemical.mop} kg</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">₹{results.costs.mop}</p>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-2 border-green-500">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-green-900 dark:text-green-200 text-lg">Total Estimated Cost</p>
                  <p className="text-3xl font-bold text-green-600">₹{results.costs.total}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Organic Alternatives */}
          <div className="card bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              🌿 Organic Alternatives
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">Farmyard Manure (FYM)</p>
                <p className="text-3xl font-bold text-amber-600 mb-1">{results.organic.fym} kg</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Slower release, better soil structure</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">Compost</p>
                <p className="text-3xl font-bold text-green-600 mb-1">{results.organic.compost} kg</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rich in micronutrients, improves texture</p>
              </div>
            </div>
          </div>

          {/* Crop-Specific Tips */}
          <div className="card border-l-4 border-primary-500">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              💡 Expert Tips for {formData.crop.charAt(0).toUpperCase() + formData.crop.slice(1)}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FiCheckCircle className="text-green-500 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">Ideal pH Range: <strong>{results.cropData.ph}</strong></p>
              </div>
              <div className="flex items-center space-x-2">
                <FiCheckCircle className="text-green-500 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">Organic Matter Requirement: <strong>{results.cropData.organic}</strong></p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {results.cropData.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-primary-500 mt-1">→</span>
                  <p className="text-gray-700 dark:text-gray-300">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Application Schedule */}
          <div className="card bg-blue-50 dark:bg-blue-900/20">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">
              📅 Fertilizer Application Schedule
            </h4>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 rounded p-3">
                <p className="font-medium text-gray-900 dark:text-white">Basal Dose (At Sowing/Transplanting)</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  50% Nitrogen + 100% Phosphorus + 50% Potassium
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded p-3">
                <p className="font-medium text-gray-900 dark:text-white">First Top Dressing (3-4 weeks)</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  25% Nitrogen + 25% Potassium
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded p-3">
                <p className="font-medium text-gray-900 dark:text-white">Second Top Dressing (6-7 weeks)</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  25% Nitrogen + 25% Potassium
                </p>
              </div>
            </div>
          </div>

          {/* Soil Testing Recommendation */}
          <div className="card bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start space-x-3">
              <FiAlertCircle className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
                  Important: Get Your Soil Tested!
                </h4>
                <p className="text-sm text-yellow-800 dark:text-yellow-300 mb-2">
                  These are general recommendations. For precise fertilizer requirements, conduct soil testing every 2-3 years.
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  • Visit nearest Soil Testing Lab (Krishi Vigyan Kendra)
                  <br />• Cost: ₹50-200 per sample
                  <br />• Get customized NPK recommendations
                  <br />• Avoid over-fertilization and save money
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SoilHealthCalculator;
