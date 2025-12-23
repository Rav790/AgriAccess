import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiTrendingUp, FiDownload, FiPieChart, FiBarChart2,
  FiCalendar, FiSun, FiCloudRain, FiAperture
} from 'react-icons/fi';

const CroppingPatternAnalysis = () => {
  const [selectedState, setSelectedState] = useState('bihar');
  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedSeason, setSelectedSeason] = useState('all'); // all, kharif, rabi, zaid
  const [viewMode, setViewMode] = useState('overview'); // overview, seasonal, district

  // Mock data - In production, fetch from backend API
  const croppingData = {
    bihar: {
      2023: {
        totalCroppedArea: 825000, // hectares
        totalCultivableArea: 786000,
        croppingIntensity: 104.96, // percentage
        diversityIndex: 0.68, // 0-1 scale (higher = more diverse)
        kharif: {
          area: 520000,
          crops: {
            rice: { area: 312000, production: 4368000, yield: 14.0, percentage: 60 },
            maize: { area: 93600, production: 280800, yield: 30.0, percentage: 18 },
            pulses: { area: 62400, production: 62400, yield: 10.0, percentage: 12 },
            oilseeds: { area: 31200, production: 31200, yield: 10.0, percentage: 6 },
            other: { area: 20800, production: 20800, yield: 10.0, percentage: 4 }
          }
        },
        rabi: {
          area: 280000,
          crops: {
            wheat: { area: 154000, production: 462000, yield: 30.0, percentage: 55 },
            pulses: { area: 61600, production: 61600, yield: 10.0, percentage: 22 },
            oilseeds: { area: 39200, production: 39200, yield: 10.0, percentage: 14 },
            potato: { area: 16800, production: 336000, yield: 200.0, percentage: 6 },
            other: { area: 8400, production: 8400, yield: 10.0, percentage: 3 }
          }
        },
        zaid: {
          area: 25000,
          crops: {
            vegetables: { area: 12500, production: 250000, yield: 200.0, percentage: 50 },
            pulses: { area: 7500, production: 7500, yield: 10.0, percentage: 30 },
            watermelon: { area: 5000, production: 100000, yield: 200.0, percentage: 20 }
          }
        }
      },
      2020: {
        totalCroppedArea: 785000,
        totalCultivableArea: 786000,
        croppingIntensity: 99.87,
        diversityIndex: 0.62,
        kharif: {
          area: 495000,
          crops: {
            rice: { area: 306900, production: 4145550, yield: 13.5, percentage: 62 },
            maize: { area: 84150, production: 252450, yield: 30.0, percentage: 17 },
            pulses: { area: 54450, production: 54450, yield: 10.0, percentage: 11 },
            oilseeds: { area: 29700, production: 29700, yield: 10.0, percentage: 6 },
            other: { area: 19800, production: 19800, yield: 10.0, percentage: 4 }
          }
        },
        rabi: {
          area: 265000,
          crops: {
            wheat: { area: 145750, production: 437250, yield: 30.0, percentage: 55 },
            pulses: { area: 58300, production: 58300, yield: 10.0, percentage: 22 },
            oilseeds: { area: 37100, production: 37100, yield: 10.0, percentage: 14 },
            potato: { area: 15900, production: 318000, yield: 200.0, percentage: 6 },
            other: { area: 7950, production: 7950, yield: 10.0, percentage: 3 }
          }
        },
        zaid: {
          area: 25000,
          crops: {
            vegetables: { area: 12500, production: 250000, yield: 200.0, percentage: 50 },
            pulses: { area: 7500, production: 7500, yield: 10.0, percentage: 30 },
            watermelon: { area: 5000, production: 100000, yield: 200.0, percentage: 20 }
          }
        }
      },
      2015: {
        totalCroppedArea: 715000,
        totalCultivableArea: 786000,
        croppingIntensity: 90.97,
        diversityIndex: 0.58,
        kharif: {
          area: 450000,
          crops: {
            rice: { area: 283500, production: 3685500, yield: 13.0, percentage: 63 },
            maize: { area: 76500, production: 229500, yield: 30.0, percentage: 17 },
            pulses: { area: 49500, production: 49500, yield: 10.0, percentage: 11 },
            oilseeds: { area: 22500, production: 22500, yield: 10.0, percentage: 5 },
            other: { area: 18000, production: 18000, yield: 10.0, percentage: 4 }
          }
        },
        rabi: {
          area: 240000,
          crops: {
            wheat: { area: 132000, production: 396000, yield: 30.0, percentage: 55 },
            pulses: { area: 52800, production: 52800, yield: 10.0, percentage: 22 },
            oilseeds: { area: 33600, production: 33600, yield: 10.0, percentage: 14 },
            potato: { area: 14400, production: 288000, yield: 200.0, percentage: 6 },
            other: { area: 7200, production: 7200, yield: 10.0, percentage: 3 }
          }
        },
        zaid: {
          area: 25000,
          crops: {
            vegetables: { area: 12500, production: 250000, yield: 200.0, percentage: 50 },
            pulses: { area: 7500, production: 7500, yield: 10.0, percentage: 30 },
            watermelon: { area: 5000, production: 100000, yield: 200.0, percentage: 20 }
          }
        }
      }
    },
    up: {
      2023: {
        totalCroppedArea: 2057000,
        totalCultivableArea: 1714000,
        croppingIntensity: 120.01,
        diversityIndex: 0.72,
        kharif: {
          area: 1028500,
          crops: {
            rice: { area: 514250, production: 7713750, yield: 15.0, percentage: 50 },
            sugarcane: { area: 205700, production: 14399000, yield: 700.0, percentage: 20 },
            pulses: { area: 123420, production: 123420, yield: 10.0, percentage: 12 },
            maize: { area: 102850, production: 308550, yield: 30.0, percentage: 10 },
            other: { area: 82280, production: 82280, yield: 10.0, percentage: 8 }
          }
        },
        rabi: {
          area: 942800,
          crops: {
            wheat: { area: 471400, production: 1414200, yield: 30.0, percentage: 50 },
            pulses: { area: 188560, production: 188560, yield: 10.0, percentage: 20 },
            potato: { area: 141420, production: 2828400, yield: 200.0, percentage: 15 },
            oilseeds: { area: 94280, production: 94280, yield: 10.0, percentage: 10 },
            other: { area: 47140, production: 47140, yield: 10.0, percentage: 5 }
          }
        },
        zaid: {
          area: 85700,
          crops: {
            vegetables: { area: 42850, production: 857000, yield: 200.0, percentage: 50 },
            pulses: { area: 25710, production: 25710, yield: 10.0, percentage: 30 },
            watermelon: { area: 17140, production: 342800, yield: 200.0, percentage: 20 }
          }
        }
      },
      2020: {
        totalCroppedArea: 1885400,
        totalCultivableArea: 1714000,
        croppingIntensity: 109.99,
        diversityIndex: 0.68,
        kharif: {
          area: 942700,
          crops: {
            rice: { area: 471350, production: 6599900, yield: 14.0, percentage: 50 },
            sugarcane: { area: 188540, production: 13197800, yield: 700.0, percentage: 20 },
            pulses: { area: 113124, production: 113124, yield: 10.0, percentage: 12 },
            maize: { area: 94270, production: 282810, yield: 30.0, percentage: 10 },
            other: { area: 75416, production: 75416, yield: 10.0, percentage: 8 }
          }
        },
        rabi: {
          area: 857100,
          crops: {
            wheat: { area: 428550, production: 1285650, yield: 30.0, percentage: 50 },
            pulses: { area: 171420, production: 171420, yield: 10.0, percentage: 20 },
            potato: { area: 128565, production: 2571300, yield: 200.0, percentage: 15 },
            oilseeds: { area: 85710, production: 85710, yield: 10.0, percentage: 10 },
            other: { area: 42855, production: 42855, yield: 10.0, percentage: 5 }
          }
        },
        zaid: {
          area: 85600,
          crops: {
            vegetables: { area: 42800, production: 856000, yield: 200.0, percentage: 50 },
            pulses: { area: 25680, production: 25680, yield: 10.0, percentage: 30 },
            watermelon: { area: 17120, production: 342400, yield: 200.0, percentage: 20 }
          }
        }
      },
      2015: {
        totalCroppedArea: 1685000,
        totalCultivableArea: 1714000,
        croppingIntensity: 98.31,
        diversityIndex: 0.64,
        kharif: {
          area: 842500,
          crops: {
            rice: { area: 421250, production: 5485250, yield: 13.0, percentage: 50 },
            sugarcane: { area: 168500, production: 11795000, yield: 700.0, percentage: 20 },
            pulses: { area: 101100, production: 101100, yield: 10.0, percentage: 12 },
            maize: { area: 84250, production: 252750, yield: 30.0, percentage: 10 },
            other: { area: 67400, production: 67400, yield: 10.0, percentage: 8 }
          }
        },
        rabi: {
          area: 757500,
          crops: {
            wheat: { area: 378750, production: 1136250, yield: 30.0, percentage: 50 },
            pulses: { area: 151500, production: 151500, yield: 10.0, percentage: 20 },
            potato: { area: 113625, production: 2272500, yield: 200.0, percentage: 15 },
            oilseeds: { area: 75750, production: 75750, yield: 10.0, percentage: 10 },
            other: { area: 37875, production: 37875, yield: 10.0, percentage: 5 }
          }
        },
        zaid: {
          area: 85000,
          crops: {
            vegetables: { area: 42500, production: 850000, yield: 200.0, percentage: 50 },
            pulses: { area: 25500, production: 25500, yield: 10.0, percentage: 30 },
            watermelon: { area: 17000, production: 340000, yield: 200.0, percentage: 20 }
          }
        }
      }
    },
    punjab: {
      2023: {
        totalCroppedArea: 7896000,
        totalCultivableArea: 4200000,
        croppingIntensity: 188.00,
        diversityIndex: 0.58,
        kharif: {
          area: 3948000,
          crops: {
            rice: { area: 3158400, production: 50534400, yield: 16.0, percentage: 80 },
            cotton: { area: 395000, production: 593400, yield: 15.0, percentage: 10 },
            maize: { area: 197400, production: 592200, yield: 30.0, percentage: 5 },
            pulses: { area: 118440, production: 118440, yield: 10.0, percentage: 3 },
            other: { area: 78960, production: 78960, yield: 10.0, percentage: 2 }
          }
        },
        rabi: {
          area: 3864000,
          crops: {
            wheat: { area: 3477600, production: 10432800, yield: 30.0, percentage: 90 },
            pulses: { area: 193200, production: 193200, yield: 10.0, percentage: 5 },
            oilseeds: { area: 115920, production: 115920, yield: 10.0, percentage: 3 },
            vegetables: { area: 77280, production: 1545600, yield: 200.0, percentage: 2 }
          }
        },
        zaid: {
          area: 84000,
          crops: {
            vegetables: { area: 50400, production: 1008000, yield: 200.0, percentage: 60 },
            pulses: { area: 25200, production: 25200, yield: 10.0, percentage: 30 },
            fodder: { area: 8400, production: 84000, yield: 100.0, percentage: 10 }
          }
        }
      },
      2020: {
        totalCroppedArea: 7644000,
        totalCultivableArea: 4088000,
        croppingIntensity: 187.00,
        diversityIndex: 0.55,
        kharif: {
          area: 3822000,
          crops: {
            rice: { area: 3093822, production: 46407330, yield: 15.0, percentage: 81 },
            cotton: { area: 382200, production: 573300, yield: 15.0, percentage: 10 },
            maize: { area: 191100, production: 573300, yield: 30.0, percentage: 5 },
            pulses: { area: 114660, production: 114660, yield: 10.0, percentage: 3 },
            other: { area: 40218, production: 40218, yield: 10.0, percentage: 1 }
          }
        },
        rabi: {
          area: 3740000,
          crops: {
            wheat: { area: 3366000, production: 10098000, yield: 30.0, percentage: 90 },
            pulses: { area: 187000, production: 187000, yield: 10.0, percentage: 5 },
            oilseeds: { area: 112200, production: 112200, yield: 10.0, percentage: 3 },
            vegetables: { area: 74800, production: 1496000, yield: 200.0, percentage: 2 }
          }
        },
        zaid: {
          area: 82000,
          crops: {
            vegetables: { area: 49200, production: 984000, yield: 200.0, percentage: 60 },
            pulses: { area: 24600, production: 24600, yield: 10.0, percentage: 30 },
            fodder: { area: 8200, production: 82000, yield: 100.0, percentage: 10 }
          }
        }
      },
      2015: {
        totalCroppedArea: 7254000,
        totalCultivableArea: 3904000,
        croppingIntensity: 185.80,
        diversityIndex: 0.52,
        kharif: {
          area: 3627000,
          crops: {
            rice: { area: 2974410, production: 41441740, yield: 13.9, percentage: 82 },
            cotton: { area: 362700, production: 544050, yield: 15.0, percentage: 10 },
            maize: { area: 181350, production: 544050, yield: 30.0, percentage: 5 },
            pulses: { area: 72540, production: 72540, yield: 10.0, percentage: 2 },
            other: { area: 36270, production: 36270, yield: 10.0, percentage: 1 }
          }
        },
        rabi: {
          area: 3547000,
          crops: {
            wheat: { area: 3192300, production: 9576900, yield: 30.0, percentage: 90 },
            pulses: { area: 177350, production: 177350, yield: 10.0, percentage: 5 },
            oilseeds: { area: 106410, production: 106410, yield: 10.0, percentage: 3 },
            vegetables: { area: 70940, production: 1418800, yield: 200.0, percentage: 2 }
          }
        },
        zaid: {
          area: 80000,
          crops: {
            vegetables: { area: 48000, production: 960000, yield: 200.0, percentage: 60 },
            pulses: { area: 24000, production: 24000, yield: 10.0, percentage: 30 },
            fodder: { area: 8000, production: 80000, yield: 100.0, percentage: 10 }
          }
        }
      }
    },
    haryana: {
      2023: {
        totalCroppedArea: 7290000,
        totalCultivableArea: 4045000,
        croppingIntensity: 180.22,
        diversityIndex: 0.62,
        kharif: {
          area: 3645000,
          crops: {
            rice: { area: 1457000, production: 21855000, yield: 15.0, percentage: 40 },
            cotton: { area: 729000, production: 1093500, yield: 15.0, percentage: 20 },
            bajra: { area: 547350, production: 547350, yield: 10.0, percentage: 15 },
            pulses: { area: 364500, production: 364500, yield: 10.0, percentage: 10 },
            sugarcane: { area: 218700, production: 15309000, yield: 700.0, percentage: 6 },
            other: { area: 328050, production: 328050, yield: 10.0, percentage: 9 }
          }
        },
        rabi: {
          area: 3564000,
          crops: {
            wheat: { area: 2850000, production: 8550000, yield: 30.0, percentage: 80 },
            oilseeds: { area: 356400, production: 356400, yield: 10.0, percentage: 10 },
            pulses: { area: 178200, production: 178200, yield: 10.0, percentage: 5 },
            vegetables: { area: 142560, production: 2851200, yield: 200.0, percentage: 4 },
            other: { area: 36840, production: 36840, yield: 10.0, percentage: 1 }
          }
        },
        zaid: {
          area: 81000,
          crops: {
            vegetables: { area: 48600, production: 972000, yield: 200.0, percentage: 60 },
            pulses: { area: 24300, production: 24300, yield: 10.0, percentage: 30 },
            fodder: { area: 8100, production: 81000, yield: 100.0, percentage: 10 }
          }
        }
      },
      2020: {
        totalCroppedArea: 6880000,
        totalCultivableArea: 4045000,
        croppingIntensity: 170.09,
        diversityIndex: 0.59,
        kharif: {
          area: 3440000,
          crops: {
            rice: { area: 1376000, production: 19264000, yield: 14.0, percentage: 40 },
            cotton: { area: 688000, production: 1032000, yield: 15.0, percentage: 20 },
            bajra: { area: 516000, production: 516000, yield: 10.0, percentage: 15 },
            pulses: { area: 344000, production: 344000, yield: 10.0, percentage: 10 },
            sugarcane: { area: 206400, production: 14448000, yield: 700.0, percentage: 6 },
            other: { area: 309600, production: 309600, yield: 10.0, percentage: 9 }
          }
        },
        rabi: {
          area: 3360000,
          crops: {
            wheat: { area: 2688000, production: 8064000, yield: 30.0, percentage: 80 },
            oilseeds: { area: 336000, production: 336000, yield: 10.0, percentage: 10 },
            pulses: { area: 168000, production: 168000, yield: 10.0, percentage: 5 },
            vegetables: { area: 134400, production: 2688000, yield: 200.0, percentage: 4 },
            other: { area: 33600, production: 33600, yield: 10.0, percentage: 1 }
          }
        },
        zaid: {
          area: 80000,
          crops: {
            vegetables: { area: 48000, production: 960000, yield: 200.0, percentage: 60 },
            pulses: { area: 24000, production: 24000, yield: 10.0, percentage: 30 },
            fodder: { area: 8000, production: 80000, yield: 100.0, percentage: 10 }
          }
        }
      },
      2015: {
        totalCroppedArea: 6272000,
        totalCultivableArea: 4045000,
        croppingIntensity: 155.06,
        diversityIndex: 0.56,
        kharif: {
          area: 3136000,
          crops: {
            rice: { area: 1254400, production: 16306200, yield: 13.0, percentage: 40 },
            cotton: { area: 627200, production: 940800, yield: 15.0, percentage: 20 },
            bajra: { area: 470400, production: 470400, yield: 10.0, percentage: 15 },
            pulses: { area: 313600, production: 313600, yield: 10.0, percentage: 10 },
            sugarcane: { area: 188160, production: 13171200, yield: 700.0, percentage: 6 },
            other: { area: 282240, production: 282240, yield: 10.0, percentage: 9 }
          }
        },
        rabi: {
          area: 3060000,
          crops: {
            wheat: { area: 2448000, production: 7344000, yield: 30.0, percentage: 80 },
            oilseeds: { area: 306000, production: 306000, yield: 10.0, percentage: 10 },
            pulses: { area: 153000, production: 153000, yield: 10.0, percentage: 5 },
            vegetables: { area: 122400, production: 2448000, yield: 200.0, percentage: 4 },
            other: { area: 30600, production: 30600, yield: 10.0, percentage: 1 }
          }
        },
        zaid: {
          area: 76000,
          crops: {
            vegetables: { area: 45600, production: 912000, yield: 200.0, percentage: 60 },
            pulses: { area: 22800, production: 22800, yield: 10.0, percentage: 30 },
            fodder: { area: 7600, production: 76000, yield: 100.0, percentage: 10 }
          }
        }
      }
    }
  };

  const districtData = {
    bihar: [
      { 
        name: 'Patna', 
        croppedArea: 195000,
        croppingIntensity: 108,
        diversityIndex: 0.72,
        majorCrops: ['Rice (55%)', 'Wheat (25%)', 'Vegetables (12%)'],
        riceYield: 15.5,
        wheatYield: 32.0,
        recommendation: 'Introduce pulses in rotation'
      },
      { 
        name: 'Gaya', 
        croppedArea: 178000,
        croppingIntensity: 102,
        diversityIndex: 0.65,
        majorCrops: ['Rice (60%)', 'Wheat (22%)', 'Pulses (10%)'],
        riceYield: 13.8,
        wheatYield: 28.5,
        recommendation: 'Improve irrigation for wheat'
      },
      { 
        name: 'Muzaffarpur', 
        croppedArea: 185000,
        croppingIntensity: 105,
        diversityIndex: 0.70,
        majorCrops: ['Rice (52%)', 'Wheat (28%)', 'Maize (12%)'],
        riceYield: 14.2,
        wheatYield: 30.5,
        recommendation: 'Expand vegetable cultivation'
      },
      { 
        name: 'Bhagalpur', 
        croppedArea: 162000,
        croppingIntensity: 98,
        diversityIndex: 0.62,
        majorCrops: ['Rice (58%)', 'Wheat (24%)', 'Pulses (9%)'],
        riceYield: 13.2,
        wheatYield: 27.0,
        recommendation: 'Diversify with oilseeds'
      },
      { 
        name: 'Darbhanga', 
        croppedArea: 172000,
        croppingIntensity: 103,
        diversityIndex: 0.67,
        majorCrops: ['Rice (57%)', 'Wheat (26%)', 'Maize (10%)'],
        riceYield: 14.0,
        wheatYield: 29.0,
        recommendation: 'Promote horticulture crops'
      },
      { 
        name: 'Samastipur', 
        croppedArea: 168000,
        croppingIntensity: 106,
        diversityIndex: 0.69,
        majorCrops: ['Rice (54%)', 'Wheat (27%)', 'Vegetables (11%)'],
        riceYield: 14.5,
        wheatYield: 30.0,
        recommendation: 'Introduce organic farming'
      }
    ],
    up: [
      { 
        name: 'Lucknow', 
        croppedArea: 385000,
        croppingIntensity: 125,
        diversityIndex: 0.75,
        majorCrops: ['Wheat (45%)', 'Rice (30%)', 'Vegetables (15%)'],
        riceYield: 16.0,
        wheatYield: 32.0,
        recommendation: 'Focus on high-value crops'
      },
      { 
        name: 'Varanasi', 
        croppedArea: 342000,
        croppingIntensity: 118,
        diversityIndex: 0.71,
        majorCrops: ['Rice (48%)', 'Wheat (35%)', 'Pulses (10%)'],
        riceYield: 15.2,
        wheatYield: 31.0,
        recommendation: 'Expand pulse cultivation'
      },
      { 
        name: 'Prayagraj', 
        croppedArea: 368000,
        croppingIntensity: 122,
        diversityIndex: 0.73,
        majorCrops: ['Wheat (42%)', 'Rice (32%)', 'Potato (12%)'],
        riceYield: 15.5,
        wheatYield: 31.5,
        recommendation: 'Promote oilseed cultivation'
      },
      { 
        name: 'Gorakhpur', 
        croppedArea: 325000,
        croppingIntensity: 115,
        diversityIndex: 0.69,
        majorCrops: ['Rice (50%)', 'Wheat (33%)', 'Sugarcane (10%)'],
        riceYield: 14.8,
        wheatYield: 30.0,
        recommendation: 'Diversify from rice-wheat'
      },
      { 
        name: 'Meerut', 
        croppedArea: 415000,
        croppingIntensity: 128,
        diversityIndex: 0.76,
        majorCrops: ['Wheat (40%)', 'Sugarcane (25%)', 'Rice (20%)'],
        riceYield: 16.5,
        wheatYield: 33.0,
        recommendation: 'Increase vegetable production'
      },
      { 
        name: 'Kanpur', 
        croppedArea: 398000,
        croppingIntensity: 124,
        diversityIndex: 0.74,
        majorCrops: ['Wheat (43%)', 'Rice (28%)', 'Pulses (15%)'],
        riceYield: 15.8,
        wheatYield: 32.5,
        recommendation: 'Promote organic wheat'
      }
    ],
    punjab: [
      { 
        name: 'Ludhiana', 
        croppedArea: 1458000,
        croppingIntensity: 192,
        diversityIndex: 0.60,
        majorCrops: ['Wheat (48%)', 'Rice (42%)', 'Cotton (6%)'],
        riceYield: 17.0,
        wheatYield: 35.0,
        recommendation: 'Shift to less water crops'
      },
      { 
        name: 'Amritsar', 
        croppedArea: 1285000,
        croppingIntensity: 189,
        diversityIndex: 0.58,
        majorCrops: ['Wheat (50%)', 'Rice (45%)', 'Vegetables (3%)'],
        riceYield: 16.5,
        wheatYield: 34.5,
        recommendation: 'Introduce crop diversification'
      },
      { 
        name: 'Jalandhar', 
        croppedArea: 1142000,
        croppingIntensity: 186,
        diversityIndex: 0.57,
        majorCrops: ['Wheat (49%)', 'Rice (44%)', 'Cotton (4%)'],
        riceYield: 16.2,
        wheatYield: 34.0,
        recommendation: 'Promote pulses'
      },
      { 
        name: 'Patiala', 
        croppedArea: 1325000,
        croppingIntensity: 190,
        diversityIndex: 0.59,
        majorCrops: ['Wheat (47%)', 'Rice (43%)', 'Cotton (5%)'],
        riceYield: 16.8,
        wheatYield: 34.8,
        recommendation: 'Reduce water-intensive crops'
      },
      { 
        name: 'Bathinda', 
        croppedArea: 1068000,
        croppingIntensity: 184,
        diversityIndex: 0.56,
        majorCrops: ['Wheat (51%)', 'Rice (40%)', 'Cotton (6%)'],
        riceYield: 15.8,
        wheatYield: 33.5,
        recommendation: 'Expand cotton cultivation'
      },
      { 
        name: 'Moga', 
        croppedArea: 985000,
        croppingIntensity: 182,
        diversityIndex: 0.55,
        majorCrops: ['Wheat (52%)', 'Rice (41%)', 'Vegetables (4%)'],
        riceYield: 15.5,
        wheatYield: 33.0,
        recommendation: 'Introduce oilseeds'
      }
    ],
    haryana: [
      { 
        name: 'Karnal', 
        croppedArea: 1285000,
        croppingIntensity: 185,
        diversityIndex: 0.64,
        majorCrops: ['Wheat (42%)', 'Rice (25%)', 'Sugarcane (12%)'],
        riceYield: 16.0,
        wheatYield: 32.0,
        recommendation: 'Promote vegetable farming'
      },
      { 
        name: 'Hisar', 
        croppedArea: 1142000,
        croppingIntensity: 178,
        diversityIndex: 0.61,
        majorCrops: ['Wheat (45%)', 'Cotton (20%)', 'Bajra (15%)'],
        riceYield: 14.5,
        wheatYield: 31.0,
        recommendation: 'Expand oilseed area'
      },
      { 
        name: 'Rohtak', 
        croppedArea: 1068000,
        croppingIntensity: 182,
        diversityIndex: 0.63,
        majorCrops: ['Wheat (43%)', 'Rice (22%)', 'Bajra (14%)'],
        riceYield: 15.2,
        wheatYield: 31.5,
        recommendation: 'Diversify with pulses'
      },
      { 
        name: 'Ambala', 
        croppedArea: 1225000,
        croppingIntensity: 183,
        diversityIndex: 0.65,
        majorCrops: ['Wheat (41%)', 'Rice (28%)', 'Vegetables (10%)'],
        riceYield: 15.8,
        wheatYield: 32.5,
        recommendation: 'Focus on horticulture'
      },
      { 
        name: 'Panipat', 
        croppedArea: 985000,
        croppingIntensity: 176,
        diversityIndex: 0.60,
        majorCrops: ['Wheat (46%)', 'Rice (24%)', 'Bajra (12%)'],
        riceYield: 14.8,
        wheatYield: 30.5,
        recommendation: 'Increase crop diversity'
      },
      { 
        name: 'Sirsa', 
        croppedArea: 1125000,
        croppingIntensity: 180,
        diversityIndex: 0.62,
        majorCrops: ['Wheat (44%)', 'Cotton (18%)', 'Rice (20%)'],
        riceYield: 15.0,
        wheatYield: 31.0,
        recommendation: 'Promote cotton cultivation'
      }
    ]
  };

  const currentData = croppingData[selectedState][selectedYear];
  const districts = districtData[selectedState] || [];

  const getDiversityColor = (index) => {
    if (index >= 0.7) return 'text-green-600';
    if (index >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDiversityLabel = (index) => {
    if (index >= 0.7) return 'High Diversity';
    if (index >= 0.6) return 'Moderate';
    return 'Low Diversity';
  };

  const getSeasonData = () => {
    if (selectedSeason === 'all') {
      return {
        kharif: currentData.kharif,
        rabi: currentData.rabi,
        zaid: currentData.zaid
      };
    }
    return { [selectedSeason]: currentData[selectedSeason] };
  };

  // Download Functions
  const downloadSeasonalReport = () => {
    const csvData = [
      ['Seasonal Cropping Report'],
      ['State:', selectedState.toUpperCase(), 'Year:', selectedYear + '-' + (selectedYear + 1).toString().slice(-2)],
      ['Generated on:', new Date().toLocaleDateString()],
      [],
      ['Season', 'Total Area (ha)', 'Crop', 'Area (ha)', 'Production (MT)', 'Yield (q/ha)', 'Percentage (%)'],
    ];

    const seasons = getSeasonData();
    Object.entries(seasons).forEach(([season, data]) => {
      let firstCrop = true;
      Object.entries(data.crops).forEach(([crop, cropData]) => {
        csvData.push([
          firstCrop ? season.charAt(0).toUpperCase() + season.slice(1) : '',
          firstCrop ? data.area : '',
          crop.charAt(0).toUpperCase() + crop.slice(1),
          cropData.area,
          (cropData.production / 100).toFixed(0),
          cropData.yield.toFixed(1),
          cropData.percentage
        ]);
        firstCrop = false;
      });
      csvData.push([]);
    });

    csvData.push(['Summary']);
    csvData.push(['Total Cropped Area:', (currentData.totalCroppedArea / 1000).toFixed(0) + 'K ha']);
    csvData.push(['Cropping Intensity:', currentData.croppingIntensity.toFixed(2) + '%']);
    csvData.push(['Diversity Index:', currentData.diversityIndex.toFixed(2)]);

    const csvContent = csvData.map(row => row.join(',')).join('\\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'cropping_seasonal_' + selectedState + '_' + selectedYear + '.csv';
    link.click();
  };

  const exportDistrictAnalysis = () => {
    let excelContent = 'District-wise Cropping Pattern Analysis\\n';
    excelContent += 'State: ' + selectedState.toUpperCase() + '\\tYear: ' + selectedYear + '-' + (selectedYear + 1).toString().slice(-2) + '\\n';
    excelContent += 'Generated on: ' + new Date().toLocaleDateString() + '\\n\\n';

    excelContent += 'STATE OVERVIEW\\n';
    excelContent += 'Total Cropped Area (ha)\\t' + currentData.totalCroppedArea.toLocaleString() + '\\n';
    excelContent += 'Total Cultivable Area (ha)\\t' + currentData.totalCultivableArea.toLocaleString() + '\\n';
    excelContent += 'Cropping Intensity (%)\\t' + currentData.croppingIntensity.toFixed(2) + '\\n';
    excelContent += 'Diversity Index\\t' + currentData.diversityIndex.toFixed(2) + '\\n\\n';

    excelContent += 'DISTRICT-WISE DATA\\n';
    excelContent += 'District\\tCropped Area (ha)\\tCropping Intensity (%)\\tDiversity Index\\tRice Yield (q/ha)\\tWheat Yield (q/ha)\\tMajor Crops\\tRecommendation\\n';
    districts.forEach(district => {
      excelContent += district.name + '\\t';
      excelContent += district.croppedArea.toLocaleString() + '\\t';
      excelContent += district.croppingIntensity + '\\t';
      excelContent += district.diversityIndex.toFixed(2) + '\\t';
      excelContent += district.riceYield.toFixed(1) + '\\t';
      excelContent += district.wheatYield.toFixed(1) + '\\t';
      excelContent += district.majorCrops.join('; ') + '\\t';
      excelContent += district.recommendation + '\\n';
    });

    excelContent += '\\nSEASONAL BREAKDOWN\\n';
    const seasons = getSeasonData();
    Object.entries(seasons).forEach(([season, data]) => {
      excelContent += '\\n' + season.toUpperCase() + ' SEASON (Area: ' + (data.area / 1000).toFixed(0) + 'K ha)\\n';
      excelContent += 'Crop\\tArea (ha)\\tProduction (MT)\\tYield (q/ha)\\tPercentage\\n';
      Object.entries(data.crops).forEach(([crop, cropData]) => {
        excelContent += crop.charAt(0).toUpperCase() + crop.slice(1) + '\\t';
        excelContent += cropData.area.toLocaleString() + '\\t';
        excelContent += (cropData.production / 100).toFixed(0) + '\\t';
        excelContent += cropData.yield.toFixed(1) + '\\t';
        excelContent += cropData.percentage + '%\\n';
      });
    });

    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'cropping_district_analysis_' + selectedState + '_' + selectedYear + '.xls';
    link.click();
  };

  const generateCropCalendar = () => {
    let htmlContent = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Crop Calendar</title><style>body { font-family: Arial, sans-serif; margin: 40px; color: #333; } h1 { color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px; } h2 { color: #1e40af; margin-top: 30px; border-left: 4px solid #3b82f6; padding-left: 10px; } table { width: 100%; border-collapse: collapse; margin: 20px 0; } th, td { border: 1px solid #ddd; padding: 12px; text-align: left; } th { background-color: #3b82f6; color: white; font-weight: bold; } tr:nth-child(even) { background-color: #f3f4f6; } .header { background-color: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 30px; } .season-kharif { background-color: #dcfce7; border-left: 4px solid #16a34a; padding: 15px; margin: 15px 0; } .season-rabi { background-color: #fef3c7; border-left: 4px solid #ca8a04; padding: 15px; margin: 15px 0; } .season-zaid { background-color: #fed7aa; border-left: 4px solid #ea580c; padding: 15px; margin: 15px 0; } .crop-item { margin: 8px 0; padding: 8px; background: white; border-radius: 4px; } .metric { display: inline-block; margin: 10px 20px 10px 0; } .metric-label { font-size: 14px; color: #6b7280; } .metric-value { font-size: 24px; font-weight: bold; color: #1e40af; }</style></head><body>';

    htmlContent += '<div class="header"><h1>🌾 Crop Calendar & Cultivation Timeline</h1><p><strong>State:</strong> ' + selectedState.toUpperCase() + ' | <strong>Agricultural Year:</strong> ' + selectedYear + '-' + (selectedYear + 1).toString().slice(-2) + ' | <strong>Generated:</strong> ' + new Date().toLocaleDateString() + '</p></div>';

    htmlContent += '<div><div class="metric"><div class="metric-label">Total Cropped Area</div><div class="metric-value">' + (currentData.totalCroppedArea / 1000).toFixed(0) + 'K ha</div></div>';
    htmlContent += '<div class="metric"><div class="metric-label">Cropping Intensity</div><div class="metric-value">' + currentData.croppingIntensity.toFixed(1) + '%</div></div>';
    htmlContent += '<div class="metric"><div class="metric-label">Diversity Index</div><div class="metric-value">' + currentData.diversityIndex.toFixed(2) + '</div></div></div>';

    const seasons = getSeasonData();
    const seasonInfo = {
      kharif: { icon: '🌧️', name: 'Kharif (Monsoon)', period: 'June - October', sowing: 'Jun-Jul', harvesting: 'Sep-Oct' },
      rabi: { icon: '☀️', name: 'Rabi (Winter)', period: 'November - March', sowing: 'Oct-Nov', harvesting: 'Mar-Apr' },
      zaid: { icon: '🌻', name: 'Zaid (Summer)', period: 'April - June', sowing: 'Mar-Apr', harvesting: 'May-Jun' }
    };

    Object.entries(seasons).forEach(([season, data]) => {
      const info = seasonInfo[season];
      htmlContent += '<div class="season-' + season + '"><h2>' + info.icon + ' ' + info.name + '</h2>';
      htmlContent += '<p><strong>Period:</strong> ' + info.period + ' | <strong>Total Area:</strong> ' + (data.area / 1000).toFixed(0) + 'K ha</p>';
      htmlContent += '<table><thead><tr><th>Crop</th><th>Area (ha)</th><th>% Share</th><th>Sowing Period</th><th>Harvesting Period</th><th>Expected Yield (q/ha)</th></tr></thead><tbody>';

      Object.entries(data.crops).forEach(([crop, cropData]) => {
        htmlContent += '<tr><td><strong>' + crop.charAt(0).toUpperCase() + crop.slice(1) + '</strong></td>';
        htmlContent += '<td>' + cropData.area.toLocaleString() + '</td>';
        htmlContent += '<td>' + cropData.percentage + '%</td>';
        htmlContent += '<td>' + info.sowing + '</td>';
        htmlContent += '<td>' + info.harvesting + '</td>';
        htmlContent += '<td>' + cropData.yield.toFixed(1) + '</td></tr>';
      });

      htmlContent += '</tbody></table></div>';
    });

    htmlContent += '<h2>📋 Key Recommendations</h2><table><thead><tr><th>District</th><th>Cropping Intensity</th><th>Diversity Index</th><th>Recommendation</th></tr></thead><tbody>';
    districts.slice(0, 6).forEach(district => {
      htmlContent += '<tr><td>' + district.name + '</td><td>' + district.croppingIntensity + '%</td><td>' + district.diversityIndex.toFixed(2) + '</td><td>' + district.recommendation + '</td></tr>';
    });
    htmlContent += '</tbody></table>';

    htmlContent += '<div style="margin-top: 40px; padding: 20px; background-color: #f0fdf4; border-radius: 8px;"><h3 style="color: #15803d;">💡 Best Practices</h3><ul><li>Follow recommended sowing windows for optimal yields</li><li>Practice crop rotation to maintain soil health</li><li>Use certified seeds and appropriate fertilizers</li><li>Monitor weather forecasts during critical crop stages</li><li>Adopt water-efficient irrigation practices</li></ul></div>';

    htmlContent += '</body></html>';

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'crop_calendar_' + selectedState + '_' + selectedYear + '.html';
    link.click();
  };

  const exportYieldData = () => {
    const seasons = getSeasonData();
    const jsonData = {
      metadata: {
        state: selectedState,
        year: selectedYear,
        agriculturalYear: selectedYear + '-' + (selectedYear + 1).toString().slice(-2),
        generatedOn: new Date().toISOString(),
        dataSource: 'AgriAssess Platform'
      },
      stateOverview: {
        totalCroppedArea: currentData.totalCroppedArea,
        totalCultivableArea: currentData.totalCultivableArea,
        croppingIntensity: currentData.croppingIntensity,
        diversityIndex: currentData.diversityIndex
      },
      seasonalData: {},
      districts: districts.map(d => ({
        name: d.name,
        croppedArea: d.croppedArea,
        croppingIntensity: d.croppingIntensity,
        diversityIndex: d.diversityIndex,
        majorCrops: d.majorCrops,
        yields: {
          rice: d.riceYield,
          wheat: d.wheatYield
        },
        recommendation: d.recommendation
      }))
    };

    Object.entries(seasons).forEach(([season, data]) => {
      jsonData.seasonalData[season] = {
        totalArea: data.area,
        crops: {}
      };
      Object.entries(data.crops).forEach(([crop, cropData]) => {
        jsonData.seasonalData[season].crops[crop] = {
          area: cropData.area,
          production: cropData.production,
          yield: cropData.yield,
          percentage: cropData.percentage,
          productionMT: (cropData.production / 100).toFixed(0)
        };
      });
    });

    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'yield_data_' + selectedState + '_' + selectedYear + '.json';
    link.click();
  };

  const exportMainReport = () => {
    // Use the crop calendar function for main export
    generateCropCalendar();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Cropping Pattern Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Seasonal crop distribution, diversity index & yield optimization insights
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={exportMainReport} className="btn-primary flex items-center space-x-2">
            <FiDownload />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="input-field"
            >
              <option value="bihar">Bihar</option>
              <option value="up">Uttar Pradesh</option>
              <option value="punjab">Punjab</option>
              <option value="haryana">Haryana</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Agricultural Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="input-field"
            >
              <option value="2023">2023-24</option>
              <option value="2020">2020-21</option>
              <option value="2015">2015-16</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Season
            </label>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="input-field"
            >
              <option value="all">All Seasons</option>
              <option value="kharif">Kharif (Jun-Oct)</option>
              <option value="rabi">Rabi (Nov-Mar)</option>
              <option value="zaid">Zaid (Apr-Jun)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              View Mode
            </label>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="input-field"
            >
              <option value="overview">Season Overview</option>
              <option value="seasonal">Seasonal Details</option>
              <option value="district">District Analysis</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Cropped Area</p>
          <p className="text-3xl font-bold text-green-600">
            {(currentData.totalCroppedArea / 1000).toFixed(0)}K ha
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            vs {(currentData.totalCultivableArea / 1000).toFixed(0)}K ha cultivable
          </p>
        </div>

        <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Cropping Intensity</p>
          <p className="text-3xl font-bold text-blue-600">
            {currentData.croppingIntensity.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {currentData.croppingIntensity > 100 ? 'Multi-cropping' : 'Single crop dominant'}
          </p>
        </div>

        <div className="card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Diversity Index</p>
          <p className={`text-3xl font-bold ${getDiversityColor(currentData.diversityIndex)}`}>
            {currentData.diversityIndex.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {getDiversityLabel(currentData.diversityIndex)}
          </p>
        </div>

        <div className="card bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Seasonal Split</p>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex-1">
              <p className="text-xs text-gray-600 dark:text-gray-400">K: {((currentData.kharif.area / currentData.totalCroppedArea) * 100).toFixed(0)}%</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                <div 
                  className="bg-green-500 h-1.5 rounded-full" 
                  style={{ width: `${(currentData.kharif.area / currentData.totalCroppedArea) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 dark:text-gray-400">R: {((currentData.rabi.area / currentData.totalCroppedArea) * 100).toFixed(0)}%</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                <div 
                  className="bg-yellow-500 h-1.5 rounded-full" 
                  style={{ width: `${(currentData.rabi.area / currentData.totalCroppedArea) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {viewMode === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Kharif Season */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <FiCloudRain className="text-green-500" />
              <span>Kharif (Monsoon)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Jun-Oct | {(currentData.kharif.area / 1000).toFixed(0)}K ha
            </p>
            <div className="space-y-3">
              {Object.entries(currentData.kharif.crops).map(([crop, data]) => (
                <div key={crop}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium capitalize">{crop}</span>
                    <span className="text-sm font-bold">{data.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${data.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {(data.area / 1000).toFixed(1)}K ha | Yield: {data.yield} q/ha
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Rabi Season */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <FiSun className="text-yellow-500" />
              <span>Rabi (Winter)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Nov-Mar | {(currentData.rabi.area / 1000).toFixed(0)}K ha
            </p>
            <div className="space-y-3">
              {Object.entries(currentData.rabi.crops).map(([crop, data]) => (
                <div key={crop}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium capitalize">{crop}</span>
                    <span className="text-sm font-bold">{data.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${data.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {(data.area / 1000).toFixed(1)}K ha | Yield: {data.yield} q/ha
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Zaid Season */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <FiAperture className="text-orange-500" />
              <span>Zaid (Summer)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Apr-Jun | {(currentData.zaid.area / 1000).toFixed(0)}K ha
            </p>
            <div className="space-y-3">
              {Object.entries(currentData.zaid.crops).map(([crop, data]) => (
                <div key={crop}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium capitalize">{crop}</span>
                    <span className="text-sm font-bold">{data.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full" 
                      style={{ width: `${data.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {(data.area / 1000).toFixed(1)}K ha | Yield: {data.yield} q/ha
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'district' && (
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <FiBarChart2 className="text-purple-500" />
            <span>District-Level Cropping Pattern</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">District</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Cropped Area</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Intensity %</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Diversity</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Major Crops</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Rice Yield</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Wheat Yield</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {districts.map((district, index) => (
                  <tr key={index} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{district.name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {(district.croppedArea / 1000).toFixed(0)}K ha
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${district.croppingIntensity >= 105 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {district.croppingIntensity}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${getDiversityColor(district.diversityIndex)}`}>
                        {district.diversityIndex.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        {district.majorCrops.map((crop, i) => (
                          <p key={i} className="text-xs text-gray-600 dark:text-gray-400">{crop}</p>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-green-600 font-semibold">{district.riceYield} q/ha</td>
                    <td className="px-4 py-3 text-yellow-600 font-semibold">{district.wheatYield} q/ha</td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
                        {district.recommendation}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Policy Recommendations */}
      <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-700">
        <h3 className="text-xl font-bold text-green-900 dark:text-green-200 mb-4">
          🌾 Crop Diversification & Yield Optimization Strategy
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
              <FiTrendingUp className="text-green-500" />
              <span>Key Insights</span>
            </h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>• Rice dominates Kharif with <strong>60%</strong> area (monoculture risk)</li>
              <li>• Wheat dominates Rabi with <strong>55%</strong> area</li>
              <li>• Diversity index <strong>{currentData.diversityIndex.toFixed(2)}</strong> - {getDiversityLabel(currentData.diversityIndex)}</li>
              <li>• Cropping intensity <strong>{currentData.croppingIntensity.toFixed(1)}%</strong> shows {currentData.croppingIntensity > 110 ? 'good' : 'moderate'} multi-cropping</li>
              <li>• Zaid season underutilized - only <strong>{((currentData.zaid.area / currentData.totalCroppedArea) * 100).toFixed(1)}%</strong> of total area</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
              <FiPieChart className="text-blue-500" />
              <span>Recommended Actions</span>
            </h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>• <strong>Diversify Kharif:</strong> Increase pulses/oilseeds from 18% to 25%</li>
              <li>• <strong>Expand Zaid crops:</strong> Target vegetable cultivation for better returns</li>
              <li>• <strong>Crop rotation:</strong> Rice-Wheat-Pulses to improve soil health</li>
              <li>• <strong>High-value crops:</strong> Promote horticulture in suitable districts</li>
              <li>• <strong>Yield improvement:</strong> Focus on low-yielding districts (Bhagalpur, Gaya)</li>
              <li>• <strong>Market linkage:</strong> MSP for pulses/oilseeds to encourage shift</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 bg-yellow-100 dark:bg-yellow-900/30 rounded p-3">
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            <strong>Target:</strong> Increase diversity index from <strong>{currentData.diversityIndex.toFixed(2)}</strong> to <strong>0.75</strong> 
            by shifting <strong>50K ha</strong> from rice to pulses/oilseeds. Expected benefit: Better soil health, reduced water usage, 
            improved farmer income by <strong>15-20%</strong>.
          </p>
        </div>
      </div>

      {/* Export Options */}
      <div className="card bg-gray-50 dark:bg-gray-800">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          📥 Export Cropping Pattern Data
        </h4>
        <div className="flex flex-wrap gap-3">
          <button onClick={downloadSeasonalReport} className="btn-secondary">
            <FiDownload className="inline mr-2" />
            Download Seasonal Report (CSV)
          </button>
          <button onClick={exportDistrictAnalysis} className="btn-secondary">
            <FiDownload className="inline mr-2" />
            Export District Analysis (Excel)
          </button>
          <button onClick={generateCropCalendar} className="btn-secondary">
            <FiDownload className="inline mr-2" />
            Generate Crop Calendar (PDF)
          </button>
          <button onClick={exportYieldData} className="btn-secondary">
            <FiDownload className="inline mr-2" />
            Export Yield Data (JSON)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CroppingPatternAnalysis;
