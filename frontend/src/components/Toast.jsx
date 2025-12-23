import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideToast } from '../redux/slices/uiSlice';
import { FiCheckCircle, FiXCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';

const Toast = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.ui.toast);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, toast.duration || 3000);

      return () => clearTimeout(timer);
    }
  }, [toast, dispatch]);

  if (!toast) return null;

  const icons = {
    success: <FiCheckCircle className="text-green-500" size={24} />,
    error: <FiXCircle className="text-red-500" size={24} />,
    info: <FiInfo className="text-blue-500" size={24} />,
    warning: <FiAlertTriangle className="text-yellow-500" size={24} />,
  };

  const bgColors = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className={`flex items-center space-x-3 px-6 py-4 rounded-lg border ${bgColors[toast.type || 'info']} shadow-lg max-w-md`}>
        {icons[toast.type || 'info']}
        <div className="flex-1">
          {toast.title && (
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {toast.title}
            </h4>
          )}
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {toast.message}
          </p>
        </div>
        <button
          onClick={() => dispatch(hideToast())}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <FiXCircle size={20} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
