import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMap, FiLayers, FiDownload, FiFilter, 
  FiInfo, FiTrendingDown, FiTrendingUp, FiDroplet,
  FiBarChart2, FiAlertCircle
} from 'react-icons/fi';

const GISMap = () => {
  const [selectedState, setSelectedState] = useState('bihar');
  const [selectedDistrict, setSelectedDistrict] = useState('patna');
  const [activeLayer, setActiveLayer] = useState('irrigation');
  const [timeSlider, setTimeSlider] = useState(2023);
  const [language, setLanguage] = useState('english');

  // Mock data - In production, integrate with India-WRIS, CGWB, Agriculture Census APIs
  const statesData = {
    bihar: {
      name: 'Bihar',
      nameHindi: 'बिहार',
      districts: ['patna', 'gaya', 'muzaffarpur', 'bhagalpur'],
      totalArea: 9.416, // million hectares
      irrigatedArea: 6.2,
      rainfedArea: 3.2
    },
    up: {
      name: 'Uttar Pradesh',
      nameHindi: 'उत्तर प्रदेश',
      districts: ['lucknow', 'kanpur', 'varanasi', 'agra'],
      totalArea: 24.09,
      irrigatedArea: 18.5,
      rainfedArea: 5.59
    },
    punjab: {
      name: 'Punjab',
      nameHindi: 'पंजाब',
      districts: ['ludhiana', 'amritsar', 'patiala', 'jalandhar'],
      totalArea: 5.04,
      irrigatedArea: 4.2,
      rainfedArea: 0.84
    },
    maharashtra: {
      name: 'Maharashtra',
      nameHindi: 'महाराष्ट्र',
      districts: ['mumbai', 'pune', 'nagpur', 'nashik'],
      totalArea: 30.77,
      irrigatedArea: 12.5,
      rainfedArea: 18.27
    },
    karnataka: {
      name: 'Karnataka',
      nameHindi: 'कर्नाटक',
      districts: ['bangalore', 'mysore', 'belgaum', 'hubli'],
      totalArea: 19.18,
      irrigatedArea: 6.8,
      rainfedArea: 12.38
    },
    rajasthan: {
      name: 'Rajasthan',
      nameHindi: 'राजस्थान',
      districts: ['jaipur', 'jodhpur', 'udaipur', 'kota'],
      totalArea: 34.22,
      irrigatedArea: 8.9,
      rainfedArea: 25.32
    }
  };

  const districtData = {
    // Bihar Districts
    patna: {
      name: 'Patna',
      nameHindi: 'पटना',
      state: 'Bihar',
      basin: 'Ganga Basin',
      totalFarmers: 425000,
      landholding: {
        marginal: 72, // <1 ha
        small: 18, // 1-2 ha
        medium: 8, // 2-4 ha
        large: 2 // >4 ha
      },
      irrigationSource: {
        tubewell: 65,
        canal: 20,
        dug_well: 10,
        surface: 5
      },
      croppingPattern: {
        kharif: {
          rice: 60,
          maize: 15,
          pulses: 15,
          vegetables: 10
        },
        rabi: {
          wheat: 50,
          potato: 20,
          mustard: 15,
          vegetables: 15
        }
      },
      groundwater: {
        preMonsoon: 8.5,
        postMonsoon: 4.2,
        trend: 'declining',
        trendValue: -0.35,
        stage: 'safe'
      },
      jaldootWells: [
        { id: 'JD001', lat: 25.5941, lon: 85.1376, depth: 12, waterLevel: 8.5, quality: 'good', photo: true },
        { id: 'JD002', lat: 25.6093, lon: 85.1439, depth: 15, waterLevel: 9.2, quality: 'moderate', photo: true },
        { id: 'JD003', lat: 25.5820, lon: 85.1500, depth: 10, waterLevel: 7.8, quality: 'good', photo: false }
      ]
    },
    gaya: {
      name: 'Gaya',
      nameHindi: 'गया',
      state: 'Bihar',
      basin: 'Ganga Basin',
      totalFarmers: 380000,
      landholding: { marginal: 75, small: 16, medium: 7, large: 2 },
      irrigationSource: { tubewell: 55, canal: 15, dug_well: 20, surface: 10 },
      croppingPattern: {
        kharif: { rice: 55, maize: 20, pulses: 15, vegetables: 10 },
        rabi: { wheat: 45, gram: 25, mustard: 20, vegetables: 10 }
      },
      groundwater: { preMonsoon: 9.2, postMonsoon: 5.1, trend: 'declining', trendValue: -0.40, stage: 'safe' },
      jaldootWells: [
        { id: 'JD010', lat: 24.7955, lon: 85.0002, depth: 14, waterLevel: 9.5, quality: 'good', photo: true }
      ]
    },
    muzaffarpur: {
      name: 'Muzaffarpur',
      nameHindi: 'मुज़फ्फरपुर',
      state: 'Bihar',
      basin: 'Ganga Basin',
      totalFarmers: 450000,
      landholding: { marginal: 78, small: 15, medium: 6, large: 1 },
      irrigationSource: { tubewell: 70, canal: 15, dug_well: 10, surface: 5 },
      croppingPattern: {
        kharif: { rice: 65, maize: 10, sugarcane: 15, vegetables: 10 },
        rabi: { wheat: 55, potato: 20, mustard: 15, vegetables: 10 }
      },
      groundwater: { preMonsoon: 7.8, postMonsoon: 3.9, trend: 'stable', trendValue: -0.10, stage: 'safe' },
      jaldootWells: [
        { id: 'JD020', lat: 26.1209, lon: 85.3647, depth: 11, waterLevel: 7.2, quality: 'good', photo: true }
      ]
    },
    bhagalpur: {
      name: 'Bhagalpur',
      nameHindi: 'भागलपुर',
      state: 'Bihar',
      basin: 'Ganga Basin',
      totalFarmers: 350000,
      landholding: { marginal: 70, small: 20, medium: 8, large: 2 },
      irrigationSource: { tubewell: 60, canal: 25, dug_well: 10, surface: 5 },
      croppingPattern: {
        kharif: { rice: 58, maize: 18, pulses: 14, vegetables: 10 },
        rabi: { wheat: 48, gram: 22, mustard: 20, vegetables: 10 }
      },
      groundwater: { preMonsoon: 8.0, postMonsoon: 4.5, trend: 'declining', trendValue: -0.30, stage: 'safe' },
      jaldootWells: [
        { id: 'JD030', lat: 25.2425, lon: 86.9719, depth: 13, waterLevel: 8.2, quality: 'moderate', photo: false }
      ]
    },
    
    // Uttar Pradesh Districts
    lucknow: {
      name: 'Lucknow',
      nameHindi: 'लखनऊ',
      state: 'Uttar Pradesh',
      basin: 'Ganga Basin',
      totalFarmers: 520000,
      landholding: { marginal: 68, small: 22, medium: 8, large: 2 },
      irrigationSource: { tubewell: 75, canal: 15, dug_well: 7, surface: 3 },
      croppingPattern: {
        kharif: { rice: 45, sugarcane: 25, maize: 15, vegetables: 15 },
        rabi: { wheat: 60, potato: 15, mustard: 15, vegetables: 10 }
      },
      groundwater: { preMonsoon: 10.5, postMonsoon: 6.2, trend: 'declining', trendValue: -0.50, stage: 'semi-critical' },
      jaldootWells: [
        { id: 'JD100', lat: 26.8467, lon: 80.9462, depth: 16, waterLevel: 11.0, quality: 'moderate', photo: true }
      ]
    },
    kanpur: {
      name: 'Kanpur',
      nameHindi: 'कानपुर',
      state: 'Uttar Pradesh',
      basin: 'Ganga Basin',
      totalFarmers: 480000,
      landholding: { marginal: 65, small: 23, medium: 10, large: 2 },
      irrigationSource: { tubewell: 72, canal: 18, dug_well: 7, surface: 3 },
      croppingPattern: {
        kharif: { rice: 40, sugarcane: 30, maize: 15, vegetables: 15 },
        rabi: { wheat: 65, potato: 12, mustard: 13, vegetables: 10 }
      },
      groundwater: { preMonsoon: 11.2, postMonsoon: 7.0, trend: 'declining', trendValue: -0.55, stage: 'semi-critical' },
      jaldootWells: [
        { id: 'JD110', lat: 26.4499, lon: 80.3319, depth: 18, waterLevel: 12.5, quality: 'poor', photo: true }
      ]
    },
    varanasi: {
      name: 'Varanasi',
      nameHindi: 'वाराणसी',
      state: 'Uttar Pradesh',
      basin: 'Ganga Basin',
      totalFarmers: 400000,
      landholding: { marginal: 70, small: 20, medium: 8, large: 2 },
      irrigationSource: { tubewell: 68, canal: 20, dug_well: 9, surface: 3 },
      croppingPattern: {
        kharif: { rice: 55, maize: 20, pulses: 15, vegetables: 10 },
        rabi: { wheat: 58, gram: 18, mustard: 14, vegetables: 10 }
      },
      groundwater: { preMonsoon: 9.8, postMonsoon: 5.5, trend: 'declining', trendValue: -0.45, stage: 'safe' },
      jaldootWells: [
        { id: 'JD120', lat: 25.3176, lon: 82.9739, depth: 14, waterLevel: 10.0, quality: 'good', photo: true }
      ]
    },
    agra: {
      name: 'Agra',
      nameHindi: 'आगरा',
      state: 'Uttar Pradesh',
      basin: 'Yamuna Basin',
      totalFarmers: 460000,
      landholding: { marginal: 67, small: 23, medium: 8, large: 2 },
      irrigationSource: { tubewell: 78, canal: 12, dug_well: 8, surface: 2 },
      croppingPattern: {
        kharif: { bajra: 35, maize: 25, rice: 20, vegetables: 20 },
        rabi: { wheat: 62, mustard: 18, potato: 12, vegetables: 8 }
      },
      groundwater: { preMonsoon: 12.5, postMonsoon: 8.2, trend: 'declining', trendValue: -0.65, stage: 'critical' },
      jaldootWells: [
        { id: 'JD130', lat: 27.1767, lon: 78.0081, depth: 20, waterLevel: 14.5, quality: 'moderate', photo: false }
      ]
    },

    // Punjab Districts
    ludhiana: {
      name: 'Ludhiana',
      nameHindi: 'लुधियाना',
      state: 'Punjab',
      basin: 'Sutlej Basin',
      totalFarmers: 280000,
      landholding: { marginal: 45, small: 30, medium: 20, large: 5 },
      irrigationSource: { tubewell: 85, canal: 10, dug_well: 3, surface: 2 },
      croppingPattern: {
        kharif: { rice: 75, cotton: 15, maize: 8, vegetables: 2 },
        rabi: { wheat: 95, vegetables: 3, mustard: 2 }
      },
      groundwater: { preMonsoon: 15.5, postMonsoon: 10.2, trend: 'declining', trendValue: -0.85, stage: 'over-exploited' },
      jaldootWells: [
        { id: 'JD200', lat: 30.9010, lon: 75.8573, depth: 25, waterLevel: 17.0, quality: 'moderate', photo: true }
      ]
    },
    amritsar: {
      name: 'Amritsar',
      nameHindi: 'अमृतसर',
      state: 'Punjab',
      basin: 'Beas Basin',
      totalFarmers: 250000,
      landholding: { marginal: 42, small: 32, medium: 21, large: 5 },
      irrigationSource: { tubewell: 82, canal: 12, dug_well: 4, surface: 2 },
      croppingPattern: {
        kharif: { rice: 70, cotton: 18, maize: 10, vegetables: 2 },
        rabi: { wheat: 92, vegetables: 5, mustard: 3 }
      },
      groundwater: { preMonsoon: 14.8, postMonsoon: 9.5, trend: 'declining', trendValue: -0.80, stage: 'over-exploited' },
      jaldootWells: [
        { id: 'JD210', lat: 31.6340, lon: 74.8723, depth: 24, waterLevel: 16.2, quality: 'moderate', photo: true }
      ]
    },
    patiala: {
      name: 'Patiala',
      nameHindi: 'पटियाला',
      state: 'Punjab',
      basin: 'Ghaggar Basin',
      totalFarmers: 220000,
      landholding: { marginal: 48, small: 28, medium: 19, large: 5 },
      irrigationSource: { tubewell: 88, canal: 8, dug_well: 3, surface: 1 },
      croppingPattern: {
        kharif: { rice: 72, cotton: 12, maize: 14, vegetables: 2 },
        rabi: { wheat: 90, vegetables: 6, mustard: 4 }
      },
      groundwater: { preMonsoon: 16.2, postMonsoon: 11.0, trend: 'declining', trendValue: -0.90, stage: 'over-exploited' },
      jaldootWells: [
        { id: 'JD220', lat: 30.3398, lon: 76.3869, depth: 26, waterLevel: 18.5, quality: 'poor', photo: false }
      ]
    },
    jalandhar: {
      name: 'Jalandhar',
      nameHindi: 'जालंधर',
      state: 'Punjab',
      basin: 'Beas Basin',
      totalFarmers: 240000,
      landholding: { marginal: 46, small: 31, medium: 18, large: 5 },
      irrigationSource: { tubewell: 84, canal: 11, dug_well: 3, surface: 2 },
      croppingPattern: {
        kharif: { rice: 68, cotton: 20, maize: 10, vegetables: 2 },
        rabi: { wheat: 88, vegetables: 7, mustard: 5 }
      },
      groundwater: { preMonsoon: 15.0, postMonsoon: 9.8, trend: 'declining', trendValue: -0.82, stage: 'over-exploited' },
      jaldootWells: [
        { id: 'JD230', lat: 31.3260, lon: 75.5762, depth: 25, waterLevel: 16.8, quality: 'moderate', photo: true }
      ]
    },

    // Maharashtra Districts
    mumbai: {
      name: 'Mumbai',
      nameHindi: 'मुंबई',
      state: 'Maharashtra',
      basin: 'Coastal Basin',
      totalFarmers: 50000,
      landholding: { marginal: 80, small: 15, medium: 4, large: 1 },
      irrigationSource: { tubewell: 40, canal: 30, dug_well: 20, surface: 10 },
      croppingPattern: {
        kharif: { rice: 40, vegetables: 35, pulses: 15, other: 10 },
        rabi: { vegetables: 50, wheat: 20, gram: 20, other: 10 }
      },
      groundwater: { preMonsoon: 6.5, postMonsoon: 2.8, trend: 'stable', trendValue: -0.05, stage: 'safe' },
      jaldootWells: [
        { id: 'JD300', lat: 19.0760, lon: 72.8777, depth: 10, waterLevel: 6.0, quality: 'good', photo: true }
      ]
    },
    pune: {
      name: 'Pune',
      nameHindi: 'पुणे',
      state: 'Maharashtra',
      basin: 'Krishna Basin',
      totalFarmers: 420000,
      landholding: { marginal: 62, small: 25, medium: 11, large: 2 },
      irrigationSource: { tubewell: 45, canal: 30, dug_well: 20, surface: 5 },
      croppingPattern: {
        kharif: { sugarcane: 30, soybean: 25, cotton: 20, vegetables: 25 },
        rabi: { wheat: 40, gram: 30, vegetables: 20, other: 10 }
      },
      groundwater: { preMonsoon: 11.5, postMonsoon: 6.8, trend: 'declining', trendValue: -0.55, stage: 'semi-critical' },
      jaldootWells: [
        { id: 'JD310', lat: 18.5204, lon: 73.8567, depth: 18, waterLevel: 12.0, quality: 'good', photo: true }
      ]
    },
    nagpur: {
      name: 'Nagpur',
      nameHindi: 'नागपुर',
      state: 'Maharashtra',
      basin: 'Godavari Basin',
      totalFarmers: 380000,
      landholding: { marginal: 65, small: 23, medium: 10, large: 2 },
      irrigationSource: { tubewell: 50, canal: 25, dug_well: 18, surface: 7 },
      croppingPattern: {
        kharif: { cotton: 40, soybean: 30, rice: 15, pulses: 15 },
        rabi: { wheat: 35, gram: 35, vegetables: 20, other: 10 }
      },
      groundwater: { preMonsoon: 10.2, postMonsoon: 5.5, trend: 'declining', trendValue: -0.48, stage: 'safe' },
      jaldootWells: [
        { id: 'JD320', lat: 21.1458, lon: 79.0882, depth: 16, waterLevel: 10.5, quality: 'moderate', photo: true }
      ]
    },
    nashik: {
      name: 'Nashik',
      nameHindi: 'नाशिक',
      state: 'Maharashtra',
      basin: 'Godavari Basin',
      totalFarmers: 450000,
      landholding: { marginal: 60, small: 27, medium: 11, large: 2 },
      irrigationSource: { tubewell: 42, canal: 32, dug_well: 20, surface: 6 },
      croppingPattern: {
        kharif: { grapes: 25, sugarcane: 25, cotton: 20, vegetables: 30 },
        rabi: { wheat: 30, gram: 25, vegetables: 35, other: 10 }
      },
      groundwater: { preMonsoon: 9.8, postMonsoon: 5.2, trend: 'declining', trendValue: -0.42, stage: 'safe' },
      jaldootWells: [
        { id: 'JD330', lat: 19.9975, lon: 73.7898, depth: 15, waterLevel: 9.5, quality: 'good', photo: true }
      ]
    },

    // Karnataka Districts
    bangalore: {
      name: 'Bangalore',
      nameHindi: 'बेंगलुरु',
      state: 'Karnataka',
      basin: 'Cauvery Basin',
      totalFarmers: 180000,
      landholding: { marginal: 70, small: 20, medium: 8, large: 2 },
      irrigationSource: { tubewell: 55, canal: 25, dug_well: 15, surface: 5 },
      croppingPattern: {
        kharif: { ragi: 30, maize: 25, vegetables: 30, pulses: 15 },
        rabi: { vegetables: 40, maize: 25, pulses: 20, other: 15 }
      },
      groundwater: { preMonsoon: 12.8, postMonsoon: 7.5, trend: 'declining', trendValue: -0.70, stage: 'critical' },
      jaldootWells: [
        { id: 'JD400', lat: 12.9716, lon: 77.5946, depth: 20, waterLevel: 14.0, quality: 'moderate', photo: true }
      ]
    },
    mysore: {
      name: 'Mysore',
      nameHindi: 'मैसूर',
      state: 'Karnataka',
      basin: 'Cauvery Basin',
      totalFarmers: 320000,
      landholding: { marginal: 68, small: 22, medium: 8, large: 2 },
      irrigationSource: { tubewell: 48, canal: 35, dug_well: 12, surface: 5 },
      croppingPattern: {
        kharif: { rice: 40, ragi: 25, maize: 20, pulses: 15 },
        rabi: { sugarcane: 30, vegetables: 35, maize: 20, other: 15 }
      },
      groundwater: { preMonsoon: 10.5, postMonsoon: 6.0, trend: 'stable', trendValue: -0.20, stage: 'safe' },
      jaldootWells: [
        { id: 'JD410', lat: 12.2958, lon: 76.6394, depth: 16, waterLevel: 10.8, quality: 'good', photo: true }
      ]
    },
    belgaum: {
      name: 'Belgaum',
      nameHindi: 'बेलगाम',
      state: 'Karnataka',
      basin: 'Krishna Basin',
      totalFarmers: 380000,
      landholding: { marginal: 64, small: 24, medium: 10, large: 2 },
      irrigationSource: { tubewell: 50, canal: 30, dug_well: 15, surface: 5 },
      croppingPattern: {
        kharif: { sugarcane: 30, cotton: 25, soybean: 25, vegetables: 20 },
        rabi: { wheat: 35, gram: 30, vegetables: 25, other: 10 }
      },
      groundwater: { preMonsoon: 11.0, postMonsoon: 6.5, trend: 'declining', trendValue: -0.50, stage: 'semi-critical' },
      jaldootWells: [
        { id: 'JD420', lat: 15.8497, lon: 74.4977, depth: 17, waterLevel: 11.5, quality: 'good', photo: false }
      ]
    },
    hubli: {
      name: 'Hubli',
      nameHindi: 'हुबली',
      state: 'Karnataka',
      basin: 'Krishna Basin',
      totalFarmers: 340000,
      landholding: { marginal: 66, small: 23, medium: 9, large: 2 },
      irrigationSource: { tubewell: 52, canal: 28, dug_well: 15, surface: 5 },
      croppingPattern: {
        kharif: { cotton: 35, soybean: 30, maize: 20, vegetables: 15 },
        rabi: { wheat: 30, gram: 35, vegetables: 25, other: 10 }
      },
      groundwater: { preMonsoon: 10.8, postMonsoon: 6.2, trend: 'declining', trendValue: -0.52, stage: 'semi-critical' },
      jaldootWells: [
        { id: 'JD430', lat: 15.3647, lon: 75.1240, depth: 17, waterLevel: 11.0, quality: 'moderate', photo: true }
      ]
    },

    // Rajasthan Districts
    jaipur: {
      name: 'Jaipur',
      nameHindi: 'जयपुर',
      state: 'Rajasthan',
      basin: 'Luni Basin',
      totalFarmers: 420000,
      landholding: { marginal: 58, small: 27, medium: 12, large: 3 },
      irrigationSource: { tubewell: 68, canal: 15, dug_well: 12, surface: 5 },
      croppingPattern: {
        kharif: { bajra: 40, maize: 25, pulses: 20, vegetables: 15 },
        rabi: { wheat: 45, mustard: 30, gram: 15, vegetables: 10 }
      },
      groundwater: { preMonsoon: 18.5, postMonsoon: 12.0, trend: 'declining', trendValue: -0.95, stage: 'over-exploited' },
      jaldootWells: [
        { id: 'JD500', lat: 26.9124, lon: 75.7873, depth: 30, waterLevel: 22.0, quality: 'poor', photo: true }
      ]
    },
    jodhpur: {
      name: 'Jodhpur',
      nameHindi: 'जोधपुर',
      state: 'Rajasthan',
      basin: 'Luni Basin',
      totalFarmers: 350000,
      landholding: { marginal: 55, small: 28, medium: 14, large: 3 },
      irrigationSource: { tubewell: 60, canal: 10, dug_well: 22, surface: 8 },
      croppingPattern: {
        kharif: { bajra: 50, guar: 25, pulses: 15, vegetables: 10 },
        rabi: { wheat: 35, mustard: 35, gram: 20, vegetables: 10 }
      },
      groundwater: { preMonsoon: 22.5, postMonsoon: 15.8, trend: 'declining', trendValue: -1.10, stage: 'over-exploited' },
      jaldootWells: [
        { id: 'JD510', lat: 26.2389, lon: 73.0243, depth: 35, waterLevel: 25.0, quality: 'poor', photo: false }
      ]
    },
    udaipur: {
      name: 'Udaipur',
      nameHindi: 'उदयपुर',
      state: 'Rajasthan',
      basin: 'Mahi Basin',
      totalFarmers: 380000,
      landholding: { marginal: 60, small: 26, medium: 11, large: 3 },
      irrigationSource: { tubewell: 55, canal: 20, dug_well: 18, surface: 7 },
      croppingPattern: {
        kharif: { maize: 35, bajra: 30, pulses: 20, vegetables: 15 },
        rabi: { wheat: 40, mustard: 28, gram: 22, vegetables: 10 }
      },
      groundwater: { preMonsoon: 16.2, postMonsoon: 10.5, trend: 'declining', trendValue: -0.75, stage: 'critical' },
      jaldootWells: [
        { id: 'JD520', lat: 24.5854, lon: 73.7125, depth: 28, waterLevel: 18.5, quality: 'moderate', photo: true }
      ]
    },
    kota: {
      name: 'Kota',
      nameHindi: 'कोटा',
      state: 'Rajasthan',
      basin: 'Chambal Basin',
      totalFarmers: 360000,
      landholding: { marginal: 57, small: 28, medium: 12, large: 3 },
      irrigationSource: { tubewell: 62, canal: 25, dug_well: 10, surface: 3 },
      croppingPattern: {
        kharif: { soybean: 35, maize: 30, cotton: 20, vegetables: 15 },
        rabi: { wheat: 50, mustard: 25, gram: 15, vegetables: 10 }
      },
      groundwater: { preMonsoon: 14.8, postMonsoon: 9.2, trend: 'declining', trendValue: -0.68, stage: 'semi-critical' },
      jaldootWells: [
        { id: 'JD530', lat: 25.2138, lon: 75.8648, depth: 24, waterLevel: 16.0, quality: 'moderate', photo: true }
      ]
    }
  };

  const layers = [
    { id: 'irrigation', name: 'Irrigation Sources', icon: FiDroplet, color: 'blue' },
    { id: 'landholding', name: 'Land Holding Pattern', icon: FiBarChart2, color: 'green' },
    { id: 'cropping', name: 'Cropping Pattern', icon: FiLayers, color: 'yellow' },
    { id: 'groundwater', name: 'Groundwater Levels', icon: FiTrendingDown, color: 'red' }
  ];

  // Update district when state changes
  useEffect(() => {
    if (statesData[selectedState] && statesData[selectedState].districts.length > 0) {
      setSelectedDistrict(statesData[selectedState].districts[0]);
    }
  }, [selectedState]);

  const downloadReport = (type) => {
    // Generate actual report with current data
    const district = districtData[selectedDistrict];
    const reportData = {
      type,
      district: district.name,
      state: district.state,
      basin: district.basin,
      timestamp: new Date().toISOString(),
      data: district
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_${district.name}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportData = (format) => {
    const district = districtData[selectedDistrict];
    let data, mimeType, extension;

    if (format === 'CSV') {
      // Convert district data to CSV
      const headers = ['Category', 'Subcategory', 'Value'];
      const rows = [
        headers.join(','),
        // Landholding data
        `Landholding,Marginal (<1 ha),${district.landholding.marginal}%`,
        `Landholding,Small (1-2 ha),${district.landholding.small}%`,
        `Landholding,Medium (2-4 ha),${district.landholding.medium}%`,
        `Landholding,Large (>4 ha),${district.landholding.large}%`,
        // Irrigation data
        `Irrigation,Tubewell,${district.irrigationSource.tubewell}%`,
        `Irrigation,Canal,${district.irrigationSource.canal}%`,
        `Irrigation,Dug Well,${district.irrigationSource.dug_well}%`,
        `Irrigation,Surface,${district.irrigationSource.surface}%`,
        // Groundwater data
        `Groundwater,Pre-Monsoon Level,${district.groundwater.preMonsoon} m`,
        `Groundwater,Post-Monsoon Level,${district.groundwater.postMonsoon} m`,
        `Groundwater,Trend,${district.groundwater.trend}`,
        `Groundwater,Stage,${district.groundwater.stage}`
      ];
      data = rows.join('\n');
      mimeType = 'text/csv';
      extension = 'csv';
    } else if (format === 'GeoJSON') {
      // Convert to GeoJSON format
      const geoJSON = {
        type: 'FeatureCollection',
        features: district.jaldootWells.map(well => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [well.lon, well.lat]
          },
          properties: {
            id: well.id,
            depth: well.depth,
            waterLevel: well.waterLevel,
            quality: well.quality,
            photo: well.photo,
            district: district.name,
            state: district.state
          }
        }))
      };
      data = JSON.stringify(geoJSON, null, 2);
      mimeType = 'application/json';
      extension = 'geojson';
    } else if (format === 'Shapefile') {
      // For shapefile, export as JSON with shapefile metadata
      const shapeData = {
        metadata: {
          format: 'Shapefile Components',
          note: 'Use QGIS or ArcGIS to convert this to actual .shp format',
          district: district.name,
          state: district.state,
          basin: district.basin
        },
        features: district.jaldootWells.map(well => ({
          id: well.id,
          lat: well.lat,
          lon: well.lon,
          depth: well.depth,
          waterLevel: well.waterLevel,
          quality: well.quality
        })),
        attributes: district
      };
      data = JSON.stringify(shapeData, null, 2);
      mimeType = 'application/json';
      extension = 'json';
    }

    // Create and download file
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${district.name}_${activeLayer}_${new Date().toISOString().split('T')[0]}.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            India Agricultural GIS Portal
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Interactive WebGIS with India-WRIS, Agriculture Census & CGWB Data
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="input-field"
          >
            <option value="english">English</option>
            <option value="hindi">हिंदी</option>
            <option value="bengali">বাংলা</option>
            <option value="marathi">मराठी</option>
          </select>
        </div>
      </div>

      {/* Controls Panel */}
      <div className="card">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              State / राज्य
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="input-field"
            >
              {Object.entries(statesData).map(([key, state]) => (
                <option key={key} value={key}>
                  {language === 'hindi' ? state.nameHindi : state.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              District / जिला
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="input-field"
            >
              {statesData[selectedState]?.districts.map((districtKey) => {
                const district = districtData[districtKey];
                return (
                  <option key={districtKey} value={districtKey}>
                    {district.name} / {district.nameHindi}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Active Layer / सक्रिय परत
            </label>
            <select
              value={activeLayer}
              onChange={(e) => setActiveLayer(e.target.value)}
              className="input-field"
            >
              {layers.map(layer => (
                <option key={layer.id} value={layer.id}>{layer.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Census Year / जनगणना वर्ष
            </label>
            <input
              type="range"
              min="2015"
              max="2023"
              value={timeSlider}
              onChange={(e) => setTimeSlider(e.target.value)}
              className="w-full"
            />
            <p className="text-center font-bold text-primary-600">{timeSlider}</p>
          </div>
        </div>
      </div>

      {/* Map Placeholder + Layer Controls */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Map Canvas */}
        <div className="lg:col-span-3">
          <div className="card h-[600px] bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <FiMap size={80} className="text-primary-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Interactive Map (Bhuvan Base Layer)
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Showing: <strong>{districtData[selectedDistrict]?.name} District</strong>
                  <br />
                  State: <strong>{districtData[selectedDistrict]?.state}</strong>
                  <br />
                  Layer: <strong>{layers.find(l => l.id === activeLayer)?.name}</strong>
                  <br />
                  Basin: <strong>{districtData[selectedDistrict]?.basin}</strong>
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Production Integration:</strong>
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Bhuvan WMS Layers (ISRO)</li>
                    <li>• India-WRIS River Basins</li>
                    <li>• CGWB Monitoring Wells</li>
                    <li>• JALDOOT Geo-tagged Wells</li>
                    <li>• Agriculture Census Boundaries</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer Legend */}
        <div className="space-y-4">
          <div className="card">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Map Layers</h4>
            {layers.map(layer => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
                  activeLayer === layer.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <layer.icon size={20} />
                <span className="text-sm">{layer.name}</span>
              </button>
            ))}
          </div>

          <div className="card bg-yellow-50 dark:bg-yellow-900/20">
            <div className="flex items-start space-x-2">
              <FiInfo className="text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-200">
                  Data Sources
                </p>
                <ul className="text-xs text-yellow-800 dark:text-yellow-300 mt-2 space-y-1">
                  <li>• Agriculture Census 2020-21</li>
                  <li>• 6th MI Census</li>
                  <li>• CGWB Monitoring (2023)</li>
                  <li>• JALDOOT App Data</li>
                  <li>• LUS 2022-23</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* District Dashboard Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Landholding Card */}
        <div className="card">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
            <FiBarChart2 className="text-green-500" />
            <span>Landholding Pattern</span>
          </h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Marginal (&lt;1 ha)</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {districtData[selectedDistrict].landholding.marginal}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: `${districtData[selectedDistrict].landholding.marginal}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Small (1-2 ha)</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {districtData[selectedDistrict].landholding.small}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${districtData[selectedDistrict].landholding.small}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Medium (2-4 ha)</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {districtData[selectedDistrict].landholding.medium}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${districtData[selectedDistrict].landholding.medium}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              90% farmers have &lt;2 hectares
            </p>
          </div>
        </div>

        {/* Irrigation Profile Card */}
        <div className="card">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
            <FiDroplet className="text-blue-500" />
            <span>Irrigation Sources</span>
          </h4>
          <div className="space-y-3">
            {Object.entries(districtData[selectedDistrict].irrigationSource).map(([source, percent]) => (
              <div key={source}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400 capitalize">
                    {source.replace('_', ' ')}
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">{percent}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="bg-red-50 dark:bg-red-900/20 rounded p-2 mt-3">
              <p className="text-xs text-red-800 dark:text-red-300 flex items-center space-x-1">
                <FiAlertCircle size={12} />
                <span>High groundwater dependence (65%)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Cropping Pattern Card */}
        <div className="card">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
            <FiLayers className="text-green-500" />
            <span>Cropping Pattern (Kharif)</span>
          </h4>
          <div className="space-y-2">
            {Object.entries(districtData[selectedDistrict].croppingPattern.kharif).map(([crop, percent]) => (
              <div key={crop} className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{crop}</span>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-900 dark:text-white">{percent}%</span>
                  {crop === 'rice' && (
                    <FiTrendingUp className="text-green-500" size={14} title="Area increasing" />
                  )}
                </div>
              </div>
            ))}
            <div className="bg-green-50 dark:bg-green-900/20 rounded p-2 mt-3">
              <p className="text-xs text-green-800 dark:text-green-300">
                Rabi: Wheat (50%), Potato (20%)
              </p>
            </div>
          </div>
        </div>

        {/* Groundwater Status Card */}
        <div className="card">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
            <FiTrendingDown className="text-red-500" />
            <span>Groundwater Status</span>
          </h4>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Pre-Monsoon (May)</p>
              <p className="text-2xl font-bold text-red-600">
                {districtData[selectedDistrict].groundwater.preMonsoon} m bgl
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Post-Monsoon (Nov)</p>
              <p className="text-2xl font-bold text-blue-600">
                {districtData[selectedDistrict].groundwater.postMonsoon} m bgl
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded p-2">
              <p className="text-xs font-semibold text-yellow-900 dark:text-yellow-200 mb-1">
                Long-term Trend (10 yr)
              </p>
              <p className="text-sm text-yellow-800 dark:text-yellow-300 flex items-center space-x-1">
                <FiTrendingDown size={14} />
                <span>{Math.abs(districtData[selectedDistrict].groundwater.trendValue)} m/year decline</span>
              </p>
            </div>
            <div className={`rounded p-2 ${
              districtData[selectedDistrict].groundwater.stage === 'safe' 
                ? 'bg-green-50 dark:bg-green-900/20' 
                : 'bg-red-50 dark:bg-red-900/20'
            }`}>
              <p className="text-xs font-bold uppercase">
                Stage: {districtData[selectedDistrict].groundwater.stage}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* JALDOOT Wells Panel */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          JALDOOT Geo-tagged Wells (Village Level)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Well ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Location</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Depth (m)</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Water Level (m)</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Quality</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Photo</th>
              </tr>
            </thead>
            <tbody>
              {districtData[selectedDistrict].jaldootWells.map(well => (
                <tr key={well.id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-mono">{well.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {well.lat.toFixed(4)}, {well.lon.toFixed(4)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{well.depth}</td>
                  <td className="px-4 py-3 text-sm font-bold text-blue-600">{well.waterLevel}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      well.quality === 'good' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {well.quality}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {well.photo ? (
                      <button className="text-primary-500 hover:text-primary-700 text-sm">
                        View Photo
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">No photo</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actionable Workflows */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* GPDP Report */}
        <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-2">
            📄 GPDP-Ready Report
          </h4>
          <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">
            Generate PDF brief for Gram Panchayat Development Plan with local well levels, irrigation assets & crop mix.
          </p>
          <button 
            onClick={() => downloadReport('GPDP')}
            className="btn-primary w-full text-sm"
          >
            <FiDownload className="inline mr-2" />
            Generate GPDP Report
          </button>
        </div>

        {/* More Crop Per Drop */}
        <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <h4 className="font-bold text-green-900 dark:text-green-200 mb-2">
            💧 More Crop Per Drop
          </h4>
          <p className="text-sm text-green-800 dark:text-green-300 mb-3">
            Analyze water productivity & get crop diversification recommendations to reduce groundwater stress.
          </p>
          <button 
            onClick={() => downloadReport('water-productivity')}
            className="btn-primary w-full text-sm"
          >
            <FiTrendingUp className="inline mr-2" />
            View Insights
          </button>
        </div>

        {/* DPR Template */}
        <div className="card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <h4 className="font-bold text-purple-900 dark:text-purple-200 mb-2">
            📊 Basin DPR Template
          </h4>
          <p className="text-sm text-purple-800 dark:text-purple-300 mb-3">
            Pre-built dashboard aligned with India-WRIS basin layers for departmental reviews & project reports.
          </p>
          <button 
            onClick={() => downloadReport('DPR')}
            className="btn-primary w-full text-sm"
          >
            <FiDownload className="inline mr-2" />
            Download Template
          </button>
        </div>
      </div>

      {/* Open Data & API Access */}
      <div className="card bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          🌐 Open Data Platform (OGD India Compliant)
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Download Center</h4>
            <div className="space-y-2">
              <button 
                onClick={() => exportData('CSV')}
                className="w-full btn-secondary text-sm justify-start"
              >
                <FiDownload className="mr-2" />
                Export as CSV
              </button>
              <button 
                onClick={() => exportData('GeoJSON')}
                className="w-full btn-secondary text-sm justify-start"
              >
                <FiDownload className="mr-2" />
                Export as GeoJSON
              </button>
              <button 
                onClick={() => exportData('Shapefile')}
                className="w-full btn-secondary text-sm justify-start"
              >
                <FiDownload className="mr-2" />
                Export as Shapefile
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">API Access</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs">
              <p className="mb-2"># REST Endpoint Example</p>
              <p>GET /api/v1/districts/patna</p>
              <p className="mt-2">?filters=irrigation,groundwater</p>
              <p className="mt-2">&year=2023</p>
              <p className="mt-2">&format=json</p>
            </div>
            <button className="mt-3 btn-primary text-sm w-full">
              View API Documentation
            </button>
          </div>
        </div>
      </div>

      {/* Methodology & Data Provenance */}
      <div className="card border-l-4 border-blue-500">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          📚 Data Sources & Methodology
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Official Statistics</h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• <strong>Agriculture Census 2020-21</strong> - Ministry of Agriculture</li>
              <li>• <strong>6th MI Census</strong> - Department of Land Resources</li>
              <li>• <strong>LUS 2022-23</strong> - Directorate of Economics & Statistics</li>
              <li>• <strong>CGWB Monitoring</strong> - Central Ground Water Board</li>
              <li>• <strong>JALDOOT App</strong> - Ministry of Jal Shakti</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Remote Sensing Layers</h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• <strong>FASAL/NADAMS</strong> - Crop type mapping</li>
              <li>• <strong>Bhuvan WMS</strong> - Base map layers (ISRO)</li>
              <li>• <strong>India-WRIS</strong> - River basin boundaries</li>
              <li>• <strong>Sentinel-2</strong> - NDVI & vegetation indices</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded p-3">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Update Frequency:</strong> Census data updated every 5 years. CGWB monitoring quarterly. 
            JALDOOT real-time. Remote sensing monthly during crop season.
          </p>
        </div>
      </div>

      {/* GIGW 3.0 & Accessibility Notice */}
      <div className="card bg-gray-50 dark:bg-gray-800">
        <div className="flex items-start space-x-3">
          <FiInfo className="text-blue-600 flex-shrink-0 mt-1" size={24} />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Accessibility & Compliance
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              This portal is compliant with <strong>GIGW 3.0</strong> (Guidelines for Indian Government Websites) 
              and <strong>WCAG 2.2</strong> accessibility standards. Available in 12 Indian languages. 
              All data follows <strong>OGD India</strong> open data principles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GISMap;
