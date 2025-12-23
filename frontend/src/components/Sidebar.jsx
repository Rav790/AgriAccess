import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  FiHome, 
  FiBarChart2, 
  FiCpu, 
  FiUpload, 
  FiUser, 
  FiInfo,
  FiCloud,
  FiDollarSign,
  FiDroplet,
  FiZap,
  FiMap,
  FiPieChart,
  FiActivity,
  FiTrendingUp,
  FiTrendingDown
} from 'react-icons/fi';

const Sidebar = () => {
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const navItems = [
    { path: '/', icon: FiHome, label: 'Home', public: true },
    { path: '/dashboard', icon: FiBarChart2, label: 'Dashboard', public: true },
    { path: '/gis-map', icon: FiMap, label: 'GIS Portal', public: true },
    { path: '/weather', icon: FiCloud, label: 'Weather', public: true },
    { path: '/market-prices', icon: FiDollarSign, label: 'Market Prices', public: true },
    { path: '/soil-health', icon: FiDroplet, label: 'Soil Health', public: true },
    { path: '/smart-irrigation', icon: FiZap, label: 'Smart Irrigation', public: true },
    { path: '/land-holding-analysis', icon: FiPieChart, label: 'Land Holdings', public: true },
    { path: '/irrigation-analysis', icon: FiActivity, label: 'Irrigation Sources', public: true },
    { path: '/cropping-patterns', icon: FiTrendingUp, label: 'Cropping Patterns', public: true },
    { path: '/well-depth-analysis', icon: FiTrendingDown, label: 'Well Depth', public: true },
    { path: '/ai-insights', icon: FiCpu, label: 'AI Insights', public: false },
    { path: '/data-upload', icon: FiUpload, label: 'Upload Data', admin: true },
    { path: '/profile', icon: FiUser, label: 'Profile', public: false },
    { path: '/about', icon: FiInfo, label: 'About', public: true },
  ];

  const filteredNavItems = navItems.filter(item => {
    if (item.admin) return user?.role === 'admin';
    if (item.public) return true;
    return isAuthenticated;
  });

  if (!sidebarOpen) return null;

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-md overflow-y-auto z-40">
      <nav className="p-4 space-y-2">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
