import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWellDepths } from '../redux/slices/dataSlice';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Mock data for well depths when backend data is unavailable
const mockWellData = [
  // Bihar
  { lat: 25.5941, lng: 85.1376, depth: 8.5, district: 'Patna', state: 'Bihar' },
  { lat: 24.7955, lng: 84.9994, depth: 11.5, district: 'Gaya', state: 'Bihar' },
  { lat: 26.1209, lng: 85.3647, depth: 7.8, district: 'Muzaffarpur', state: 'Bihar' },
  { lat: 25.2425, lng: 87.0086, depth: 8.5, district: 'Bhagalpur', state: 'Bihar' },
  { lat: 26.1542, lng: 85.8974, depth: 8.2, district: 'Darbhanga', state: 'Bihar' },
  { lat: 25.8648, lng: 85.7827, depth: 10.2, district: 'Samastipur', state: 'Bihar' },
  
  // Uttar Pradesh
  { lat: 26.8467, lng: 80.9462, depth: 14.5, district: 'Lucknow', state: 'Uttar Pradesh' },
  { lat: 25.3176, lng: 82.9739, depth: 12.8, district: 'Varanasi', state: 'Uttar Pradesh' },
  { lat: 25.4358, lng: 81.8463, depth: 11.5, district: 'Prayagraj', state: 'Uttar Pradesh' },
  { lat: 26.7606, lng: 83.3732, depth: 10.8, district: 'Gorakhpur', state: 'Uttar Pradesh' },
  { lat: 28.9845, lng: 77.7064, depth: 16.2, district: 'Meerut', state: 'Uttar Pradesh' },
  { lat: 26.4499, lng: 80.3319, depth: 13.5, district: 'Kanpur', state: 'Uttar Pradesh' },
  
  // Punjab
  { lat: 30.9010, lng: 75.8573, depth: 22.5, district: 'Ludhiana', state: 'Punjab' },
  { lat: 31.6340, lng: 74.8723, depth: 18.8, district: 'Amritsar', state: 'Punjab' },
  { lat: 31.3260, lng: 75.5762, depth: 20.2, district: 'Jalandhar', state: 'Punjab' },
  { lat: 30.3398, lng: 76.3869, depth: 16.5, district: 'Patiala', state: 'Punjab' },
  { lat: 30.2110, lng: 74.9519, depth: 24.8, district: 'Bathinda', state: 'Punjab' },
  { lat: 30.8158, lng: 75.1705, depth: 19.5, district: 'Moga', state: 'Punjab' },
  
  // Haryana
  { lat: 29.6857, lng: 76.9905, depth: 14.8, district: 'Karnal', state: 'Haryana' },
  { lat: 29.1492, lng: 75.7238, depth: 18.5, district: 'Hisar', state: 'Haryana' },
  { lat: 28.8955, lng: 76.6066, depth: 16.2, district: 'Rohtak', state: 'Haryana' },
  { lat: 30.3783, lng: 76.7821, depth: 12.8, district: 'Ambala', state: 'Haryana' },
  { lat: 29.3909, lng: 76.9635, depth: 15.5, district: 'Panipat', state: 'Haryana' },
  { lat: 29.5341, lng: 75.0289, depth: 19.8, district: 'Sirsa', state: 'Haryana' },
];

const MapVisualization = ({ filters }) => {
  const dispatch = useDispatch();
  const { wellDepths, loading } = useSelector((state) => state.data);
  const [mapData, setMapData] = useState(mockWellData); // Initialize with mock data

  useEffect(() => {
    dispatch(fetchWellDepths(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    if (wellDepths && wellDepths.length > 0) {
      const data = wellDepths
        .filter(item => item.region?.latitude && item.region?.longitude)
        .map(item => ({
          lat: parseFloat(item.region.latitude),
          lng: parseFloat(item.region.longitude),
          depth: parseFloat(item.avg_depth_meters),
          district: item.region.district,
          state: item.region.state,
        }));
      setMapData(data);
    }
    // If wellDepths is empty or null, keep using mock data (already initialized)
  }, [wellDepths]);

  const getColor = (depth) => {
    if (depth < 20) return '#22c55e'; // Green - shallow
    if (depth < 40) return '#eab308'; // Yellow - medium
    if (depth < 60) return '#f97316'; // Orange - deep
    return '#ef4444'; // Red - very deep
  };

  // Log map data for debugging
  console.log('MapVisualization - mapData:', mapData.length, 'markers');

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Well Depth Heatmap
          <span className="text-sm font-normal text-gray-500 ml-2">
            ({mapData.length} locations)
          </span>
        </h3>
        <div className="h-96 rounded-lg overflow-hidden">
          <MapContainer
            center={[20.5937, 78.9629]} // India center
            zoom={5}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {mapData && mapData.length > 0 && mapData.map((point, index) => (
              <CircleMarker
                key={`marker-${index}-${point.district}`}
                center={[point.lat, point.lng]}
                radius={8}
                fillColor={getColor(point.depth)}
                color="#fff"
                weight={2}
                opacity={0.8}
                fillOpacity={0.6}
              >
                <Popup>
                  <div className="text-sm">
                    <strong>{point.district}, {point.state}</strong>
                    <br />
                    Well Depth: {point.depth.toFixed(2)} m
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-gray-600 dark:text-gray-400">&lt; 20m</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span className="text-gray-600 dark:text-gray-400">20-40m</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            <span className="text-gray-600 dark:text-gray-400">40-60m</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-gray-600 dark:text-gray-400">&gt; 60m</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapVisualization;
