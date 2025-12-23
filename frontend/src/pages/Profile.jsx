import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../redux/slices/authSlice';
import { showToast } from '../redux/slices/uiSlice';
import { FiUser, FiMail, FiBriefcase, FiPhone, FiSave } from 'react-icons/fi';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        organization: user.organization || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateProfile(formData));
    if (updateProfile.fulfilled.match(result)) {
      dispatch(showToast({ 
        type: 'success', 
        message: 'Profile updated successfully!' 
      }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Profile Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your account information
        </p>
      </div>

      {/* Profile Info */}
      <div className="card">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {user?.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            <span className="inline-block mt-1 px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-xs rounded-full capitalize">
              {user?.role}
            </span>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="label">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="label">Email (Read-only)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                value={user?.email || ''}
                className="input-field pl-10 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                disabled
              />
            </div>
          </div>

          <div>
            <label htmlFor="organization" className="label">Organization</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiBriefcase className="text-gray-400" />
              </div>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="label">Phone</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiPhone className="text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field pl-10"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            <FiSave className="inline mr-2" />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* Account Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Last Login</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
            {user?.last_login ? new Date(user.last_login).toLocaleDateString() : 'N/A'}
          </p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Account Status</p>
          <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-1">
            {user?.is_verified ? 'Verified' : 'Unverified'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
