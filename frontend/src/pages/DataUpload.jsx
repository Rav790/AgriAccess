const DataUpload = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Data Upload (Admin Only)
      </h1>
      <div className="card">
        <p className="text-gray-600 dark:text-gray-400">
          CSV/JSON data upload functionality for administrators. This feature allows bulk data import for regions, land holdings, irrigation sources, cropping patterns, and well depths.
        </p>
        <div className="mt-6 p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
          <p className="text-gray-500 dark:text-gray-400">Upload feature coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default DataUpload;
