import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const DashboardCard = ({ title, value, icon: Icon, color, trend, subtitle }) => {
  const isPositive = trend && trend.startsWith('+');

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </h3>
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="text-white" size={20} />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">
              {subtitle}
            </p>
          )}
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <FiTrendingUp size={16} /> : <FiTrendingDown size={16} />}
            <span className="text-sm font-semibold">{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
