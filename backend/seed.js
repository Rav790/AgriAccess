require('dotenv').config();
const { sequelize } = require('./src/config/postgres');
const connectMongoDB = require('./src/config/mongodb');
const Region = require('./src/models/Region');
const LandHolding = require('./src/models/LandHolding');
const IrrigationSource = require('./src/models/IrrigationSource');
const CroppingPattern = require('./src/models/CroppingPattern');
const WellDepth = require('./src/models/WellDepth');
const User = require('./src/models/User');

// Sample data for 10 Indian states
const sampleData = {
  regions: [
    // Punjab
    { state: 'Punjab', district: 'Amritsar', latitude: 31.6340, longitude: 74.8723, area_sq_km: 5075, population: 2490891 },
    { state: 'Punjab', district: 'Ludhiana', latitude: 30.9010, longitude: 75.8573, area_sq_km: 3767, population: 3498739 },
    { state: 'Punjab', district: 'Patiala', latitude: 30.3398, longitude: 76.3869, area_sq_km: 3212, population: 1895686 },
    
    // Haryana
    { state: 'Haryana', district: 'Karnal', latitude: 29.6857, longitude: 76.9905, area_sq_km: 2520, population: 1505456 },
    { state: 'Haryana', district: 'Ambala', latitude: 30.3782, longitude: 76.7767, area_sq_km: 1574, population: 1128350 },
    
    // Uttar Pradesh
    { state: 'Uttar Pradesh', district: 'Lucknow', latitude: 26.8467, longitude: 80.9462, area_sq_km: 2528, population: 4589838 },
    { state: 'Uttar Pradesh', district: 'Kanpur', latitude: 26.4499, longitude: 80.3319, area_sq_km: 3155, population: 4581268 },
    { state: 'Uttar Pradesh', district: 'Varanasi', latitude: 25.3176, longitude: 82.9739, area_sq_km: 1535, population: 3682194 },
    
    // Maharashtra
    { state: 'Maharashtra', district: 'Pune', latitude: 18.5204, longitude: 73.8567, area_sq_km: 15643, population: 9429408 },
    { state: 'Maharashtra', district: 'Nashik', latitude: 19.9975, longitude: 73.7898, area_sq_km: 15582, population: 6107187 },
    { state: 'Maharashtra', district: 'Nagpur', latitude: 21.1458, longitude: 79.0882, area_sq_km: 9892, population: 4653570 },
    
    // Gujarat
    { state: 'Gujarat', district: 'Ahmedabad', latitude: 23.0225, longitude: 72.5714, area_sq_km: 8707, population: 7214225 },
    { state: 'Gujarat', district: 'Surat', latitude: 21.1702, longitude: 72.8311, area_sq_km: 4549, population: 6081322 },
    
    // Rajasthan
    { state: 'Rajasthan', district: 'Jaipur', latitude: 26.9124, longitude: 75.7873, area_sq_km: 14068, population: 6626178 },
    { state: 'Rajasthan', district: 'Jodhpur', latitude: 26.2389, longitude: 73.0243, area_sq_km: 22850, population: 3687165 },
    { state: 'Rajasthan', district: 'Bikaner', latitude: 28.0229, longitude: 73.3119, area_sq_km: 27244, population: 2363937 },
    
    // Kerala
    { state: 'Kerala', district: 'Thiruvananthapuram', latitude: 8.5241, longitude: 76.9366, area_sq_km: 2192, population: 3301427 },
    { state: 'Kerala', district: 'Kochi', latitude: 9.9312, longitude: 76.2673, area_sq_km: 3068, population: 3282388 },
    
    // Tamil Nadu
    { state: 'Tamil Nadu', district: 'Chennai', latitude: 13.0827, longitude: 80.2707, area_sq_km: 426, population: 7088000 },
    { state: 'Tamil Nadu', district: 'Coimbatore', latitude: 11.0168, longitude: 76.9558, area_sq_km: 7469, population: 3458045 },
    { state: 'Tamil Nadu', district: 'Madurai', latitude: 9.9252, longitude: 78.1198, area_sq_km: 3741, population: 3038252 },
    
    // Karnataka
    { state: 'Karnataka', district: 'Bangalore', latitude: 12.9716, longitude: 77.5946, area_sq_km: 2190, population: 9621551 },
    { state: 'Karnataka', district: 'Mysore', latitude: 12.2958, longitude: 76.6394, area_sq_km: 6854, population: 3001127 },
    
    // West Bengal
    { state: 'West Bengal', district: 'Kolkata', latitude: 22.5726, longitude: 88.3639, area_sq_km: 185, population: 4496694 },
    { state: 'West Bengal', district: 'Howrah', latitude: 22.5958, longitude: 88.2636, area_sq_km: 1467, population: 4850029 },
    { state: 'West Bengal', district: 'North 24 Parganas', latitude: 22.6157, longitude: 88.4005, area_sq_km: 4094, population: 10009781 }
  ]
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Connect to databases
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected');
    
    await connectMongoDB();
    console.log('✅ MongoDB connected');

    // Sync models (recreate tables)
    await sequelize.sync({ force: true });
    console.log('✅ Tables created');

    // Insert regions
    console.log('📍 Seeding regions...');
    const regions = await Region.bulkCreate(sampleData.regions);
    console.log(`✅ Created ${regions.length} regions`);

    // Generate sample data for each region
    console.log('🌾 Seeding agricultural data...');
    
    const landHoldings = [];
    const irrigationSources = [];
    const croppingPatterns = [];
    const wellDepths = [];

    const crops = {
      Punjab: ['wheat', 'rice', 'cotton', 'sugarcane'],
      Haryana: ['wheat', 'rice', 'bajra', 'sugarcane'],
      'Uttar Pradesh': ['wheat', 'rice', 'sugarcane', 'potato'],
      Maharashtra: ['cotton', 'soybean', 'sugarcane', 'jowar'],
      Gujarat: ['cotton', 'groundnut', 'tobacco', 'wheat'],
      Rajasthan: ['bajra', 'wheat', 'mustard', 'barley'],
      Kerala: ['rice', 'coconut', 'rubber', 'spices'],
      'Tamil Nadu': ['rice', 'sugarcane', 'cotton', 'groundnut'],
      Karnataka: ['rice', 'ragi', 'jowar', 'sugarcane'],
      'West Bengal': ['rice', 'jute', 'potato', 'wheat']
    };

    for (const region of regions) {
      const years = [2020, 2021, 2022, 2023, 2024];
      
      for (const year of years) {
        // Land holdings
        const sizeCategories = ['marginal', 'small', 'medium', 'large'];
        const baseSizes = { marginal: 0.5, small: 1.5, medium: 3, large: 6 };
        
        sizeCategories.forEach(category => {
          landHoldings.push({
            region_id: region.id,
            year,
            size_category: category,
            avg_size_ha: baseSizes[category] + (Math.random() - 0.5),
            num_holdings: Math.floor(Math.random() * 10000) + 1000,
            percentage: Math.random() * 30 + 10
          });
        });

        // Irrigation sources - vary by state
        const irrigationTypes = ['canal', 'well', 'tubewell', 'tank', 'rainfed'];
        let isPunjabHaryana = ['Punjab', 'Haryana'].includes(region.state);
        let isKerala = region.state === 'Kerala';
        let isRajasthan = region.state === 'Rajasthan';
        
        irrigationTypes.forEach(source => {
          let percentage;
          if (source === 'canal' && isPunjabHaryana) percentage = 40 + Math.random() * 10;
          else if (source === 'well' && isPunjabHaryana) percentage = 30 + Math.random() * 10;
          else if (source === 'rainfed' && isKerala) percentage = 50 + Math.random() * 20;
          else if (source === 'well' && isRajasthan) percentage = 35 + Math.random() * 15;
          else percentage = Math.random() * 20;
          
          irrigationSources.push({
            region_id: region.id,
            year,
            source,
            percentage,
            area_irrigated_ha: Math.floor(Math.random() * 50000) + 10000
          });
        });

        // Cropping patterns
        const stateCrops = crops[region.state] || ['rice', 'wheat', 'maize'];
        const seasons = ['kharif', 'rabi'];
        
        stateCrops.forEach(crop => {
          seasons.forEach(season => {
            const isRightSeason = (season === 'rabi' && ['wheat', 'mustard', 'barley', 'potato'].includes(crop)) ||
                                 (season === 'kharif' && ['rice', 'cotton', 'bajra', 'jowar', 'sugarcane'].includes(crop));
            
            if (isRightSeason || Math.random() > 0.7) {
              const yield_tonnes_ha = crop === 'rice' ? 3 + Math.random() * 2 :
                                     crop === 'wheat' ? 3.5 + Math.random() * 1.5 :
                                     crop === 'cotton' ? 2 + Math.random() * 1 :
                                     2.5 + Math.random() * 2;
              
              const area = Math.floor(Math.random() * 30000) + 5000;
              
              croppingPatterns.push({
                region_id: region.id,
                year,
                crop_type: crop,
                season,
                area_cultivated_ha: area,
                yield_tonnes_ha,
                production_tonnes: area * yield_tonnes_ha
              });
            }
          });
        });

        // Well depths - deeper in Rajasthan, shallower in Kerala
        const baseDepth = isRajasthan ? 80 : isKerala ? 20 : 40;
        const wellTypes = ['dug_well', 'borewell', 'tubewell'];
        
        wellTypes.forEach(wellType => {
          wellDepths.push({
            region_id: region.id,
            year,
            avg_depth_meters: baseDepth + (Math.random() - 0.5) * 20,
            water_table_level_meters: baseDepth * 0.7 + (Math.random() - 0.5) * 10,
            num_wells_sampled: Math.floor(Math.random() * 500) + 50,
            well_type: wellType
          });
        });
      }
    }

    await LandHolding.bulkCreate(landHoldings);
    console.log(`✅ Created ${landHoldings.length} land holding records`);

    await IrrigationSource.bulkCreate(irrigationSources);
    console.log(`✅ Created ${irrigationSources.length} irrigation source records`);

    await CroppingPattern.bulkCreate(croppingPatterns);
    console.log(`✅ Created ${croppingPatterns.length} cropping pattern records`);

    await WellDepth.bulkCreate(wellDepths);
    console.log(`✅ Created ${wellDepths.length} well depth records`);

    // Create sample users
    console.log('👥 Creating sample users...');
    const users = await User.bulkCreate([
      {
        name: 'Admin User',
        email: 'admin@agriassess.com',
        password: 'admin123',
        role: 'admin',
        organization: 'AgriAssess Platform',
        is_verified: true
      },
      {
        name: 'John Researcher',
        email: 'researcher@agriassess.com',
        password: 'researcher123',
        role: 'researcher',
        organization: 'Agricultural Research Institute',
        is_verified: true
      },
      {
        name: 'Farmer User',
        email: 'farmer@example.com',
        password: 'farmer123',
        role: 'user',
        organization: 'Punjab Farmers Association',
        is_verified: true
      }
    ], {
      individualHooks: true // This ensures beforeCreate hook runs for each user
    });
    console.log(`✅ Created ${users.length} sample users`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Sample Users:');
    console.log('  Admin: admin@agriassess.com / admin123');
    console.log('  Researcher: researcher@agriassess.com / researcher123');
    console.log('  Farmer: farmer@example.com / farmer123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
