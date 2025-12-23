import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setDarkMode } from './redux/slices/uiSlice';

// Layout
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AIInsights from './pages/AIInsights';
import DataUpload from './pages/DataUpload';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Weather from './pages/Weather';
import MarketPrices from './pages/MarketPrices';
import SoilHealthCalculator from './pages/SoilHealthCalculator';
import SmartIrrigation from './pages/SmartIrrigation';
import GISMap from './pages/GISMap';
import LandHoldingAnalysis from './pages/LandHoldingAnalysis';
import IrrigationAnalysis from './pages/IrrigationAnalysis';
import CroppingPatternAnalysis from './pages/CroppingPatternAnalysis';
import WellDepthAnalysis from './pages/WellDepthAnalysis';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.ui.darkMode);

  useEffect(() => {
    // Initialize dark mode from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    dispatch(setDarkMode(savedDarkMode));
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          {/* All feature pages require authentication */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/gis-map" element={
            <ProtectedRoute>
              <GISMap />
            </ProtectedRoute>
          } />
          <Route path="/weather" element={
            <ProtectedRoute>
              <Weather />
            </ProtectedRoute>
          } />
          <Route path="/market-prices" element={
            <ProtectedRoute>
              <MarketPrices />
            </ProtectedRoute>
          } />
          <Route path="/soil-health" element={
            <ProtectedRoute>
              <SoilHealthCalculator />
            </ProtectedRoute>
          } />
          <Route path="/smart-irrigation" element={
            <ProtectedRoute>
              <SmartIrrigation />
            </ProtectedRoute>
          } />
          <Route path="/land-holding-analysis" element={
            <ProtectedRoute>
              <LandHoldingAnalysis />
            </ProtectedRoute>
          } />
          <Route path="/irrigation-analysis" element={
            <ProtectedRoute>
              <IrrigationAnalysis />
            </ProtectedRoute>
          } />
          <Route path="/cropping-patterns" element={
            <ProtectedRoute>
              <CroppingPatternAnalysis />
            </ProtectedRoute>
          } />
          <Route path="/well-depth-analysis" element={
            <ProtectedRoute>
              <WellDepthAnalysis />
            </ProtectedRoute>
          } />
          <Route path="/ai-insights" element={
            <ProtectedRoute>
              <AIInsights />
            </ProtectedRoute>
          } />
          <Route path="/data-upload" element={
            <ProtectedRoute requiredRole="admin">
              <DataUpload />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
