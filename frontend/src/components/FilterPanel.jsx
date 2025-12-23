import { FiFilter } from 'react-icons/fi';

const FilterPanel = ({ filters, states, onFilterChange }) => {
  const handleChange = (e) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    onFilterChange({
      state: '',
      district: '',
      year: 2023,
      crop: '',
      season: '',
    });
  };

  const years = Array.from({ length: 15 }, (_, i) => 2025 - i);

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-4">
        <FiFilter className="text-primary-500" size={20} />
        <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="label text-xs">State</label>
          <select
            name="state"
            value={filters.state}
            onChange={handleChange}
            className="input-field text-sm"
          >
            <option value="">All States</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label text-xs">District</label>
          <input
            type="text"
            name="district"
            value={filters.district}
            onChange={handleChange}
            placeholder="Enter district"
            className="input-field text-sm"
          />
        </div>

        <div>
          <label className="label text-xs">Year</label>
          <select
            name="year"
            value={filters.year}
            onChange={handleChange}
            className="input-field text-sm"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label text-xs">Crop</label>
          <input
            type="text"
            name="crop"
            value={filters.crop}
            onChange={handleChange}
            placeholder="e.g., rice, wheat"
            className="input-field text-sm"
          />
        </div>

        <div>
          <label className="label text-xs">Season</label>
          <select
            name="season"
            value={filters.season}
            onChange={handleChange}
            className="input-field text-sm"
          >
            <option value="">All Seasons</option>
            <option value="kharif">Kharif</option>
            <option value="rabi">Rabi</option>
            <option value="zaid">Zaid</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button onClick={handleReset} className="btn-secondary text-sm">
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
