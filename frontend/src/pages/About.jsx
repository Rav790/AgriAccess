import { GiWheat } from 'react-icons/gi';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full mb-4">
          <GiWheat className="text-white text-3xl" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">About AgriAssess</h1>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          AgriAssess Dashboard is an interactive, AI-powered agricultural data assessment platform designed to help farmers, 
          researchers, and policymakers make data-driven decisions.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          We provide comprehensive insights into land holding patterns, irrigation sources, cropping systems, and groundwater 
          levels across India, powered by advanced AI technology from Google Gemini.
        </p>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Interactive data visualization with charts and maps</li>
          <li>AI-powered insights and predictions using Google Gemini</li>
          <li>Multi-database architecture (PostgreSQL + MongoDB)</li>
          <li>Real-time collaboration with Socket.io</li>
          <li>Export capabilities (PNG, PDF, CSV)</li>
          <li>Mobile-first responsive design</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Frontend</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>React.js with Vite</li>
              <li>Redux Toolkit</li>
              <li>Tailwind CSS</li>
              <li>Chart.js & Recharts</li>
              <li>React-Leaflet</li>
              <li>Framer Motion</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Backend</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>Node.js + Express.js</li>
              <li>PostgreSQL (Sequelize)</li>
              <li>MongoDB (Mongoose)</li>
              <li>JWT Authentication</li>
              <li>Google Gemini AI API</li>
              <li>Socket.io</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card bg-primary-50 dark:bg-primary-900/20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Sources</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Our data is sourced from public agricultural datasets and government portals including:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mt-2">
          <li>Ministry of Agriculture & Farmers Welfare, India</li>
          <li>State Agricultural Departments</li>
          <li>National Remote Sensing Centre</li>
          <li>Central Ground Water Board</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
