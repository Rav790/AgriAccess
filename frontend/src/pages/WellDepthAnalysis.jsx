import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiDroplet, FiTrendingDown, FiAlertTriangle, FiDownload,
  FiActivity, FiMapPin, FiCalendar, FiBarChart2
} from 'react-icons/fi';

const WellDepthAnalysis = () => {
  const [selectedState, setSelectedState] = useState('bihar');
  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedSeason, setSelectedSeason] = useState('post_monsoon'); // pre_monsoon, post_monsoon, annual
  const [viewMode, setViewMode] = useState('overview'); // overview, district, trends

  // Mock data - In production, fetch from CGWB API
  const wellData = {
    bihar: {
      2023: {
        pre_monsoon: {
          avgDepth: 8.5, // meters below ground level (mbgl)
          waterTableLevel: 8.5,
          depthRanges: {
            shallow: { count: 4200, percentage: 35, range: '0-5m' },
            medium: { count: 5040, percentage: 42, range: '5-10m' },
            deep: { count: 2160, percentage: 18, range: '10-20m' },
            veryDeep: { count: 600, percentage: 5, range: '>20m' }
          },
          totalWells: 12000,
          depletionRate: 0.45 // m/year
        },
        post_monsoon: {
          avgDepth: 6.2,
          waterTableLevel: 6.2,
          depthRanges: {
            shallow: { count: 6000, percentage: 50, range: '0-5m' },
            medium: { count: 4320, percentage: 36, range: '5-10m' },
            deep: { count: 1440, percentage: 12, range: '10-20m' },
            veryDeep: { count: 240, percentage: 2, range: '>20m' }
          },
          totalWells: 12000,
          depletionRate: 0.45
        },
        rechargeRate: 2.3, // meters (post - pre)
        rechargeEfficiency: 65, // percentage
        criticalZones: 4, // number of districts
        overExploited: 2 // number of blocks
      },
      2020: {
        pre_monsoon: {
          avgDepth: 7.8,
          waterTableLevel: 7.8,
          depthRanges: {
            shallow: { count: 4680, percentage: 39, range: '0-5m' },
            medium: { count: 4920, percentage: 41, range: '5-10m' },
            deep: { count: 1920, percentage: 16, range: '10-20m' },
            veryDeep: { count: 480, percentage: 4, range: '>20m' }
          },
          totalWells: 12000,
          depletionRate: 0.38
        },
        post_monsoon: {
          avgDepth: 5.5,
          waterTableLevel: 5.5,
          depthRanges: {
            shallow: { count: 6600, percentage: 55, range: '0-5m' },
            medium: { count: 4080, percentage: 34, range: '5-10m' },
            deep: { count: 1080, percentage: 9, range: '10-20m' },
            veryDeep: { count: 240, percentage: 2, range: '>20m' }
          },
          totalWells: 12000,
          depletionRate: 0.38
        },
        rechargeRate: 2.3,
        rechargeEfficiency: 70,
        criticalZones: 3,
        overExploited: 1
      }
    },
    up: {
      2023: {
        pre_monsoon: {
          avgDepth: 12.5,
          waterTableLevel: 12.5,
          depthRanges: {
            shallow: { count: 7500, percentage: 25, range: '0-5m' },
            medium: { count: 10500, percentage: 35, range: '5-10m' },
            deep: { count: 9000, percentage: 30, range: '10-20m' },
            veryDeep: { count: 3000, percentage: 10, range: '>20m' }
          },
          totalWells: 30000,
          depletionRate: 0.65
        },
        post_monsoon: {
          avgDepth: 9.8,
          waterTableLevel: 9.8,
          depthRanges: {
            shallow: { count: 12000, percentage: 40, range: '0-5m' },
            medium: { count: 10500, percentage: 35, range: '5-10m' },
            deep: { count: 6000, percentage: 20, range: '10-20m' },
            veryDeep: { count: 1500, percentage: 5, range: '>20m' }
          },
          totalWells: 30000,
          depletionRate: 0.65
        },
        rechargeRate: 2.7,
        rechargeEfficiency: 58,
        criticalZones: 12,
        overExploited: 8
      },
      2020: {
        pre_monsoon: {
          avgDepth: 11.2,
          waterTableLevel: 11.2,
          depthRanges: {
            shallow: { count: 8100, percentage: 27, range: '0-5m' },
            medium: { count: 10800, percentage: 36, range: '5-10m' },
            deep: { count: 8400, percentage: 28, range: '10-20m' },
            veryDeep: { count: 2700, percentage: 9, range: '>20m' }
          },
          totalWells: 30000,
          depletionRate: 0.58
        },
        post_monsoon: {
          avgDepth: 8.5,
          waterTableLevel: 8.5,
          depthRanges: {
            shallow: { count: 13500, percentage: 45, range: '0-5m' },
            medium: { count: 10200, percentage: 34, range: '5-10m' },
            deep: { count: 5100, percentage: 17, range: '10-20m' },
            veryDeep: { count: 1200, percentage: 4, range: '>20m' }
          },
          totalWells: 30000,
          depletionRate: 0.58
        },
        rechargeRate: 2.7,
        rechargeEfficiency: 62,
        criticalZones: 10,
        overExploited: 6
      },
      2015: {
        pre_monsoon: {
          avgDepth: 9.8,
          waterTableLevel: 9.8,
          depthRanges: {
            shallow: { count: 9300, percentage: 31, range: '0-5m' },
            medium: { count: 10500, percentage: 35, range: '5-10m' },
            deep: { count: 7500, percentage: 25, range: '10-20m' },
            veryDeep: { count: 2700, percentage: 9, range: '>20m' }
          },
          totalWells: 30000,
          depletionRate: 0.48
        },
        post_monsoon: {
          avgDepth: 7.2,
          waterTableLevel: 7.2,
          depthRanges: {
            shallow: { count: 15000, percentage: 50, range: '0-5m' },
            medium: { count: 9900, percentage: 33, range: '5-10m' },
            deep: { count: 4200, percentage: 14, range: '10-20m' },
            veryDeep: { count: 900, percentage: 3, range: '>20m' }
          },
          totalWells: 30000,
          depletionRate: 0.48
        },
        rechargeRate: 2.6,
        rechargeEfficiency: 68,
        criticalZones: 8,
        overExploited: 4
      }
    },
    punjab: {
      2023: {
        pre_monsoon: {
          avgDepth: 18.5,
          waterTableLevel: 18.5,
          depthRanges: {
            shallow: { count: 3500, percentage: 14, range: '0-5m' },
            medium: { count: 6250, percentage: 25, range: '5-10m' },
            deep: { count: 10000, percentage: 40, range: '10-20m' },
            veryDeep: { count: 5250, percentage: 21, range: '>20m' }
          },
          totalWells: 25000,
          depletionRate: 0.85
        },
        post_monsoon: {
          avgDepth: 15.2,
          waterTableLevel: 15.2,
          depthRanges: {
            shallow: { count: 6250, percentage: 25, range: '0-5m' },
            medium: { count: 8750, percentage: 35, range: '5-10m' },
            deep: { count: 8000, percentage: 32, range: '10-20m' },
            veryDeep: { count: 2000, percentage: 8, range: '>20m' }
          },
          totalWells: 25000,
          depletionRate: 0.85
        },
        rechargeRate: 3.3,
        rechargeEfficiency: 52,
        criticalZones: 15,
        overExploited: 12
      },
      2020: {
        pre_monsoon: {
          avgDepth: 16.8,
          waterTableLevel: 16.8,
          depthRanges: {
            shallow: { count: 4000, percentage: 16, range: '0-5m' },
            medium: { count: 7000, percentage: 28, range: '5-10m' },
            deep: { count: 9500, percentage: 38, range: '10-20m' },
            veryDeep: { count: 4500, percentage: 18, range: '>20m' }
          },
          totalWells: 25000,
          depletionRate: 0.78
        },
        post_monsoon: {
          avgDepth: 13.5,
          waterTableLevel: 13.5,
          depthRanges: {
            shallow: { count: 7000, percentage: 28, range: '0-5m' },
            medium: { count: 9000, percentage: 36, range: '5-10m' },
            deep: { count: 7500, percentage: 30, range: '10-20m' },
            veryDeep: { count: 1500, percentage: 6, range: '>20m' }
          },
          totalWells: 25000,
          depletionRate: 0.78
        },
        rechargeRate: 3.3,
        rechargeEfficiency: 55,
        criticalZones: 13,
        overExploited: 10
      },
      2015: {
        pre_monsoon: {
          avgDepth: 14.2,
          waterTableLevel: 14.2,
          depthRanges: {
            shallow: { count: 5000, percentage: 20, range: '0-5m' },
            medium: { count: 8000, percentage: 32, range: '5-10m' },
            deep: { count: 8750, percentage: 35, range: '10-20m' },
            veryDeep: { count: 3250, percentage: 13, range: '>20m' }
          },
          totalWells: 25000,
          depletionRate: 0.68
        },
        post_monsoon: {
          avgDepth: 11.0,
          waterTableLevel: 11.0,
          depthRanges: {
            shallow: { count: 8750, percentage: 35, range: '0-5m' },
            medium: { count: 9500, percentage: 38, range: '5-10m' },
            deep: { count: 5750, percentage: 23, range: '10-20m' },
            veryDeep: { count: 1000, percentage: 4, range: '>20m' }
          },
          totalWells: 25000,
          depletionRate: 0.68
        },
        rechargeRate: 3.2,
        rechargeEfficiency: 60,
        criticalZones: 10,
        overExploited: 7
      }
    },
    haryana: {
      2023: {
        pre_monsoon: {
          avgDepth: 16.2,
          waterTableLevel: 16.2,
          depthRanges: {
            shallow: { count: 3600, percentage: 18, range: '0-5m' },
            medium: { count: 6000, percentage: 30, range: '5-10m' },
            deep: { count: 7600, percentage: 38, range: '10-20m' },
            veryDeep: { count: 2800, percentage: 14, range: '>20m' }
          },
          totalWells: 20000,
          depletionRate: 0.72
        },
        post_monsoon: {
          avgDepth: 13.5,
          waterTableLevel: 13.5,
          depthRanges: {
            shallow: { count: 5600, percentage: 28, range: '0-5m' },
            medium: { count: 7200, percentage: 36, range: '5-10m' },
            deep: { count: 5800, percentage: 29, range: '10-20m' },
            veryDeep: { count: 1400, percentage: 7, range: '>20m' }
          },
          totalWells: 20000,
          depletionRate: 0.72
        },
        rechargeRate: 2.7,
        rechargeEfficiency: 55,
        criticalZones: 10,
        overExploited: 7
      },
      2020: {
        pre_monsoon: {
          avgDepth: 14.8,
          waterTableLevel: 14.8,
          depthRanges: {
            shallow: { count: 4200, percentage: 21, range: '0-5m' },
            medium: { count: 6400, percentage: 32, range: '5-10m' },
            deep: { count: 7000, percentage: 35, range: '10-20m' },
            veryDeep: { count: 2400, percentage: 12, range: '>20m' }
          },
          totalWells: 20000,
          depletionRate: 0.65
        },
        post_monsoon: {
          avgDepth: 12.0,
          waterTableLevel: 12.0,
          depthRanges: {
            shallow: { count: 6200, percentage: 31, range: '0-5m' },
            medium: { count: 7400, percentage: 37, range: '5-10m' },
            deep: { count: 5200, percentage: 26, range: '10-20m' },
            veryDeep: { count: 1200, percentage: 6, range: '>20m' }
          },
          totalWells: 20000,
          depletionRate: 0.65
        },
        rechargeRate: 2.8,
        rechargeEfficiency: 58,
        criticalZones: 8,
        overExploited: 5
      },
      2015: {
        pre_monsoon: {
          avgDepth: 12.5,
          waterTableLevel: 12.5,
          depthRanges: {
            shallow: { count: 5400, percentage: 27, range: '0-5m' },
            medium: { count: 7000, percentage: 35, range: '5-10m' },
            deep: { count: 6000, percentage: 30, range: '10-20m' },
            veryDeep: { count: 1600, percentage: 8, range: '>20m' }
          },
          totalWells: 20000,
          depletionRate: 0.55
        },
        post_monsoon: {
          avgDepth: 9.8,
          waterTableLevel: 9.8,
          depthRanges: {
            shallow: { count: 7400, percentage: 37, range: '0-5m' },
            medium: { count: 7800, percentage: 39, range: '5-10m' },
            deep: { count: 4000, percentage: 20, range: '10-20m' },
            veryDeep: { count: 800, percentage: 4, range: '>20m' }
          },
          totalWells: 20000,
          depletionRate: 0.55
        },
        rechargeRate: 2.7,
        rechargeEfficiency: 62,
        criticalZones: 6,
        overExploited: 3
      }
    }
  };

  const districtData = {
    bihar: [
      { 
        name: 'Patna', 
        preMonsoon: 9.2,
        postMonsoon: 6.5,
        recharge: 2.7,
        depletionRate: 0.52,
        status: 'semi-critical',
        wells: 3200,
        recommendation: 'Enhance recharge structures'
      },
      { 
        name: 'Gaya', 
        preMonsoon: 11.5,
        postMonsoon: 8.8,
        recharge: 2.7,
        depletionRate: 0.68,
        status: 'critical',
        wells: 2800,
        recommendation: 'Urgent: Regulate extraction'
      },
      { 
        name: 'Muzaffarpur', 
        preMonsoon: 7.8,
        postMonsoon: 5.2,
        recharge: 2.6,
        depletionRate: 0.38,
        status: 'safe',
        wells: 3500,
        recommendation: 'Maintain current practices'
      },
      { 
        name: 'Bhagalpur', 
        preMonsoon: 8.5,
        postMonsoon: 6.0,
        recharge: 2.5,
        depletionRate: 0.42,
        status: 'safe',
        wells: 2500,
        recommendation: 'Monitor seasonal variation'
      },
      { 
        name: 'Darbhanga', 
        preMonsoon: 8.2,
        postMonsoon: 5.8,
        recharge: 2.4,
        depletionRate: 0.48,
        status: 'safe',
        wells: 3600,
        recommendation: 'Promote drip irrigation in agriculture'
      },
      { 
        name: 'Samastipur', 
        preMonsoon: 10.2,
        postMonsoon: 7.5,
        recharge: 2.7,
        depletionRate: 0.58,
        status: 'semi-critical',
        wells: 3200,
        recommendation: 'Implement water conservation measures'
      }
    ],
    up: [
      { 
        name: 'Lucknow', 
        preMonsoon: 14.5,
        postMonsoon: 11.2,
        recharge: 3.3,
        depletionRate: 0.75,
        status: 'critical',
        wells: 4500,
        recommendation: 'Enforce groundwater regulation, promote surface water use'
      },
      { 
        name: 'Varanasi', 
        preMonsoon: 12.8,
        postMonsoon: 9.5,
        recharge: 3.3,
        depletionRate: 0.68,
        status: 'semi-critical',
        wells: 3800,
        recommendation: 'Increase recharge structures, regulate bore-well depth'
      },
      { 
        name: 'Prayagraj', 
        preMonsoon: 11.5,
        postMonsoon: 8.2,
        recharge: 3.3,
        depletionRate: 0.62,
        status: 'semi-critical',
        wells: 4200,
        recommendation: 'Promote conjunctive use of surface and groundwater'
      },
      { 
        name: 'Gorakhpur', 
        preMonsoon: 10.8,
        postMonsoon: 7.8,
        recharge: 3.0,
        depletionRate: 0.55,
        status: 'safe',
        wells: 3900,
        recommendation: 'Monitor water quality, maintain extraction levels'
      },
      { 
        name: 'Meerut', 
        preMonsoon: 16.2,
        postMonsoon: 12.8,
        recharge: 3.4,
        depletionRate: 0.82,
        status: 'over-exploited',
        wells: 5200,
        recommendation: 'Immediate restriction on new bore-wells, mandatory recharge'
      },
      { 
        name: 'Kanpur', 
        preMonsoon: 13.5,
        postMonsoon: 10.2,
        recharge: 3.3,
        depletionRate: 0.72,
        status: 'critical',
        wells: 4800,
        recommendation: 'Shift to surface water sources, implement MAR techniques'
      }
    ],
    punjab: [
      { 
        name: 'Ludhiana', 
        preMonsoon: 22.5,
        postMonsoon: 18.2,
        recharge: 4.3,
        depletionRate: 1.05,
        status: 'over-exploited',
        wells: 6500,
        recommendation: 'Critical - Ban new bore-wells, crop diversification required'
      },
      { 
        name: 'Amritsar', 
        preMonsoon: 18.8,
        postMonsoon: 14.5,
        recharge: 4.3,
        depletionRate: 0.92,
        status: 'over-exploited',
        wells: 5800,
        recommendation: 'Reduce paddy cultivation, adopt water-efficient crops'
      },
      { 
        name: 'Jalandhar', 
        preMonsoon: 20.2,
        postMonsoon: 16.8,
        recharge: 3.4,
        depletionRate: 0.98,
        status: 'over-exploited',
        wells: 6200,
        recommendation: 'Mandatory drip irrigation for all new farms'
      },
      { 
        name: 'Patiala', 
        preMonsoon: 16.5,
        postMonsoon: 12.8,
        recharge: 3.7,
        depletionRate: 0.78,
        status: 'critical',
        wells: 4800,
        recommendation: 'Regulate extraction, promote canal irrigation'
      },
      { 
        name: 'Bathinda', 
        preMonsoon: 24.8,
        postMonsoon: 20.5,
        recharge: 4.3,
        depletionRate: 1.15,
        status: 'over-exploited',
        wells: 7200,
        recommendation: 'Emergency measures - Halt all new groundwater connections'
      },
      { 
        name: 'Moga', 
        preMonsoon: 19.5,
        postMonsoon: 15.2,
        recharge: 4.3,
        depletionRate: 0.88,
        status: 'critical',
        wells: 5500,
        recommendation: 'Shift to water-saving technologies, reduce rice area'
      }
    ],
    haryana: [
      { 
        name: 'Karnal', 
        preMonsoon: 14.8,
        postMonsoon: 11.5,
        recharge: 3.3,
        depletionRate: 0.72,
        status: 'critical',
        wells: 4200,
        recommendation: 'Promote sprinkler irrigation, regulate tube-well installation'
      },
      { 
        name: 'Hisar', 
        preMonsoon: 18.5,
        postMonsoon: 15.2,
        recharge: 3.3,
        depletionRate: 0.88,
        status: 'over-exploited',
        wells: 5800,
        recommendation: 'Critical zone - Immediate conservation measures needed'
      },
      { 
        name: 'Rohtak', 
        preMonsoon: 16.2,
        postMonsoon: 13.0,
        recharge: 3.2,
        depletionRate: 0.78,
        status: 'critical',
        wells: 4800,
        recommendation: 'Implement water budget approach, restrict paddy cultivation'
      },
      { 
        name: 'Ambala', 
        preMonsoon: 12.8,
        postMonsoon: 9.5,
        recharge: 3.3,
        depletionRate: 0.62,
        status: 'semi-critical',
        wells: 3600,
        recommendation: 'Monitor extraction closely, promote recharge pits'
      },
      { 
        name: 'Panipat', 
        preMonsoon: 15.5,
        postMonsoon: 12.2,
        recharge: 3.3,
        depletionRate: 0.75,
        status: 'critical',
        wells: 4500,
        recommendation: 'Restrict industrial groundwater use, augment recharge'
      },
      { 
        name: 'Sirsa', 
        preMonsoon: 19.8,
        postMonsoon: 16.5,
        recharge: 3.3,
        depletionRate: 0.92,
        status: 'over-exploited',
        wells: 6200,
        recommendation: 'Ban deep bore-wells, shift to canal water where available'
      }
    ]
  };

  const currentData = wellData[selectedState][selectedYear];
  const seasonData = currentData[selectedSeason] || currentData.post_monsoon;
  const districts = districtData[selectedState] || [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'safe': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'semi-critical': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'critical': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'over-exploited': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDepthColor = (depth) => {
    if (depth <= 5) return 'text-green-600';
    if (depth <= 10) return 'text-yellow-600';
    if (depth <= 20) return 'text-orange-600';
    return 'text-red-600';
  };

  // Download Functions
  const downloadDistrictReport = () => {
    const csvData = [
      ['CGWB District Water Table Report - Well Depth & Groundwater Analysis'],
      ['State:', selectedState.toUpperCase(), 'Year:', selectedYear, 'Season:', selectedSeason.replace('_', ' ').toUpperCase()],
      ['Generated on:', new Date().toLocaleDateString(), 'Time:', new Date().toLocaleTimeString()],
      [],
      ['District', 'Pre-Monsoon Depth (m)', 'Post-Monsoon Depth (m)', 'Recharge (m)', 'Depletion Rate (m/yr)', 'Status', 'Total Wells', 'Recommendation'],
    ];

    districts.forEach(d => {
      csvData.push([
        d.name, 
        d.preMonsoon.toFixed(2), 
        d.postMonsoon.toFixed(2), 
        d.recharge.toFixed(2), 
        d.depletionRate.toFixed(2), 
        d.status.toUpperCase(), 
        d.wells, 
        d.recommendation
      ]);
    });

    csvData.push([]);
    csvData.push(['Summary Statistics']);
    csvData.push(['Total Districts:', districts.length]);
    csvData.push(['Safe:', districts.filter(d => d.status === 'safe').length]);
    csvData.push(['Semi-Critical:', districts.filter(d => d.status === 'semi-critical').length]);
    csvData.push(['Critical:', districts.filter(d => d.status === 'critical').length]);
    csvData.push(['Over-Exploited:', districts.filter(d => d.status === 'over-exploited').length]);
    csvData.push(['Average Depletion Rate:', (districts.reduce((sum, d) => sum + d.depletionRate, 0) / districts.length).toFixed(2), 'm/year']);

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `cgwb_district_report_${selectedState}_${selectedYear}.csv`;
    link.click();
  };

  const exportDepthAnalysis = () => {
    let excelContent = `CGWB Well Depth Analysis - State: ${selectedState.toUpperCase()}\tYear: ${selectedYear}\n`;
    excelContent += `Generated: ${new Date().toLocaleString()}\n\n`;

    excelContent += `DEPTH RANGE DISTRIBUTION (${selectedSeason.replace('_', ' ').toUpperCase()})\n`;
    excelContent += `Range\tWells Count\tPercentage\tCategory\n`;
    excelContent += `0-5m (Shallow)\t${seasonData.depthRanges.shallow.count}\t${seasonData.depthRanges.shallow.percentage}%\tGood recharge potential\n`;
    excelContent += `5-10m (Medium)\t${seasonData.depthRanges.medium.count}\t${seasonData.depthRanges.medium.percentage}%\tModerate stress\n`;
    excelContent += `10-20m (Deep)\t${seasonData.depthRanges.deep.count}\t${seasonData.depthRanges.deep.percentage}%\tHigh stress\n`;
    excelContent += `>20m (Very Deep)\t${seasonData.depthRanges.veryDeep.count}\t${seasonData.depthRanges.veryDeep.percentage}%\tCritical zone\n\n`;

    excelContent += `SEASONAL COMPARISON\n`;
    excelContent += `Season\tAvg Depth (m)\tWater Table Level (m)\tTotal Wells\tDepletion Rate (m/yr)\n`;
    excelContent += `Pre-Monsoon (May)\t${currentData.pre_monsoon.avgDepth}\t${currentData.pre_monsoon.waterTableLevel}\t${currentData.pre_monsoon.totalWells}\t${currentData.pre_monsoon.depletionRate}\n`;
    excelContent += `Post-Monsoon (Nov)\t${currentData.post_monsoon.avgDepth}\t${currentData.post_monsoon.waterTableLevel}\t${currentData.post_monsoon.totalWells}\t${currentData.post_monsoon.depletionRate}\n`;
    excelContent += `Seasonal Fluctuation\t${(currentData.pre_monsoon.avgDepth - currentData.post_monsoon.avgDepth).toFixed(2)} m\t-\t-\t-\n\n`;

    excelContent += `STATE-LEVEL INDICATORS\n`;
    excelContent += `Indicator\tValue\tStatus\n`;
    excelContent += `Recharge Rate\t${currentData.rechargeRate} m/year\t${currentData.rechargeRate > 3.0 ? 'Good' : 'Moderate'}\n`;
    excelContent += `Recharge Efficiency\t${currentData.rechargeEfficiency}%\t${currentData.rechargeEfficiency > 60 ? 'Effective' : 'Needs Improvement'}\n`;
    excelContent += `Critical Zones\t${currentData.criticalZones}\t${currentData.criticalZones > 10 ? 'High Alert' : 'Manageable'}\n`;
    excelContent += `Over-Exploited Blocks\t${currentData.overExploited}\t${currentData.overExploited > 8 ? 'Critical' : 'Moderate'}\n\n`;

    excelContent += `DISTRICT-WISE ANALYSIS\n`;
    excelContent += `District\tPre-Monsoon\tPost-Monsoon\tRecharge\tDepletion\tStatus\tWells\n`;
    districts.forEach(d => {
      excelContent += `${d.name}\t${d.preMonsoon}m\t${d.postMonsoon}m\t${d.recharge}m\t${d.depletionRate}m/yr\t${d.status}\t${d.wells}\n`;
    });

    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `cgwb_depth_analysis_${selectedState}_${selectedYear}.xls`;
    link.click();
  };

  const generateCGWBSummary = () => {
    let htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>CGWB Groundwater Report - ${selectedState.toUpperCase()} ${selectedYear}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; background: #f5f5f5; }
    .header { text-align: center; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; }
    .header h1 { margin: 0; font-size: 28px; }
    .header p { margin: 5px 0; opacity: 0.9; }
    .section { background: white; padding: 25px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .section h2 { color: #1e3a8a; border-bottom: 3px solid #3b82f6; padding-bottom: 10px; margin-top: 0; }
    .metrics { display: flex; flex-wrap: wrap; gap: 15px; margin: 20px 0; }
    .metric-card { flex: 1; min-width: 200px; background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 5px; }
    .metric-card h3 { margin: 0 0 5px 0; color: #1e40af; font-size: 14px; }
    .metric-card .value { font-size: 24px; font-weight: bold; color: #1e3a8a; }
    .metric-card .unit { font-size: 12px; color: #64748b; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    th { background: #1e3a8a; color: white; padding: 12px; text-align: left; font-weight: 600; }
    td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; }
    tr:nth-child(even) { background: #f8fafc; }
    .status-safe { background: #d1fae5; color: #065f46; padding: 4px 8px; border-radius: 4px; font-weight: 600; }
    .status-semi-critical { background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 4px; font-weight: 600; }
    .status-critical { background: #fed7aa; color: #9a3412; padding: 4px 8px; border-radius: 4px; font-weight: 600; }
    .status-over-exploited { background: #fecaca; color: #991b1b; padding: 4px 8px; border-radius: 4px; font-weight: 600; }
    .alert { background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 15px 0; border-radius: 5px; }
    .alert h4 { color: #dc2626; margin: 0 0 10px 0; }
    .recommendation { background: #f0fdf4; border-left: 4px solid #16a34a; padding: 15px; margin: 10px 0; border-radius: 5px; }
    .footer { text-align: center; margin-top: 30px; padding: 20px; color: #64748b; font-size: 12px; }
    .depth-bar { height: 20px; background: linear-gradient(90deg, #10b981 0%, #fbbf24 33%, #f97316 66%, #dc2626 100%); border-radius: 10px; margin: 10px 0; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🌊 Central Ground Water Board (CGWB)</h1>
    <h2>Groundwater Monitoring & Assessment Report</h2>
    <p>State: ${selectedState.toUpperCase()} | Year: ${selectedYear} | Season: ${selectedSeason.replace('_', ' ').toUpperCase()}</p>
    <p>Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
  </div>

  <div class="section">
    <h2>📊 State-Level Water Table Overview</h2>
    <div class="metrics">
      <div class="metric-card">
        <h3>Average Depth (${selectedSeason === 'pre_monsoon' ? 'Pre-Monsoon' : 'Post-Monsoon'})</h3>
        <div class="value">${seasonData.avgDepth}<span class="unit">m bgl</span></div>
      </div>
      <div class="metric-card">
        <h3>Total Wells Monitored</h3>
        <div class="value">${seasonData.totalWells.toLocaleString()}</div>
      </div>
      <div class="metric-card">
        <h3>Depletion Rate</h3>
        <div class="value">${seasonData.depletionRate}<span class="unit">m/year</span></div>
      </div>
      <div class="metric-card">
        <h3>Recharge Efficiency</h3>
        <div class="value">${currentData.rechargeEfficiency}<span class="unit">%</span></div>
      </div>
    </div>

    <h3>Depth Range Distribution</h3>
    <div class="depth-bar"></div>
    <table>
      <tr>
        <th>Depth Category</th>
        <th>Range</th>
        <th>Wells Count</th>
        <th>Percentage</th>
        <th>Interpretation</th>
      </tr>
      <tr>
        <td><strong>Shallow</strong></td>
        <td>0-5 m</td>
        <td>${seasonData.depthRanges.shallow.count.toLocaleString()}</td>
        <td>${seasonData.depthRanges.shallow.percentage}%</td>
        <td style="color: #059669;">Good recharge potential</td>
      </tr>
      <tr>
        <td><strong>Medium</strong></td>
        <td>5-10 m</td>
        <td>${seasonData.depthRanges.medium.count.toLocaleString()}</td>
        <td>${seasonData.depthRanges.medium.percentage}%</td>
        <td style="color: #d97706;">Moderate stress</td>
      </tr>
      <tr>
        <td><strong>Deep</strong></td>
        <td>10-20 m</td>
        <td>${seasonData.depthRanges.deep.count.toLocaleString()}</td>
        <td>${seasonData.depthRanges.deep.percentage}%</td>
        <td style="color: #ea580c;">High extraction stress</td>
      </tr>
      <tr>
        <td><strong>Very Deep</strong></td>
        <td>&gt;20 m</td>
        <td>${seasonData.depthRanges.veryDeep.count.toLocaleString()}</td>
        <td>${seasonData.depthRanges.veryDeep.percentage}%</td>
        <td style="color: #dc2626;">Critical over-exploitation</td>
      </tr>
    </table>
  </div>

  <div class="section">
    <h2>🔄 Seasonal Fluctuation Analysis</h2>
    <table>
      <tr>
        <th>Parameter</th>
        <th>Pre-Monsoon (May)</th>
        <th>Post-Monsoon (Nov)</th>
        <th>Fluctuation</th>
      </tr>
      <tr>
        <td><strong>Average Depth</strong></td>
        <td>${currentData.pre_monsoon.avgDepth} m</td>
        <td>${currentData.post_monsoon.avgDepth} m</td>
        <td style="color: ${currentData.pre_monsoon.avgDepth > currentData.post_monsoon.avgDepth ? '#059669' : '#dc2626'};">
          ${(currentData.pre_monsoon.avgDepth - currentData.post_monsoon.avgDepth).toFixed(2)} m
        </td>
      </tr>
      <tr>
        <td><strong>Shallow Wells (&lt;5m)</strong></td>
        <td>${currentData.pre_monsoon.depthRanges.shallow.percentage}%</td>
        <td>${currentData.post_monsoon.depthRanges.shallow.percentage}%</td>
        <td>${currentData.post_monsoon.depthRanges.shallow.percentage - currentData.pre_monsoon.depthRanges.shallow.percentage}%</td>
      </tr>
      <tr>
        <td><strong>Recharge Rate</strong></td>
        <td colspan="2" style="text-align: center;">${currentData.rechargeRate} m/year</td>
        <td>${currentData.rechargeEfficiency}% efficiency</td>
      </tr>
    </table>
  </div>

  ${currentData.criticalZones > 10 || currentData.overExploited > 5 ? `
  <div class="alert">
    <h4>⚠️ Critical Alert</h4>
    <p><strong>Critical Zones:</strong> ${currentData.criticalZones} blocks identified with severe groundwater depletion</p>
    <p><strong>Over-Exploited Blocks:</strong> ${currentData.overExploited} blocks exceeding safe extraction limits</p>
    <p><strong>Action Required:</strong> Immediate regulatory intervention needed to prevent irreversible damage</p>
  </div>
  ` : ''}

  <div class="section">
    <h2>📍 District-Wise Groundwater Status</h2>
    <table>
      <tr>
        <th>District</th>
        <th>Pre-Monsoon (m)</th>
        <th>Post-Monsoon (m)</th>
        <th>Recharge (m)</th>
        <th>Depletion (m/yr)</th>
        <th>Status</th>
        <th>Wells</th>
      </tr>
      ${districts.map(d => `
        <tr>
          <td><strong>${d.name}</strong></td>
          <td>${d.preMonsoon}</td>
          <td>${d.postMonsoon}</td>
          <td>${d.recharge}</td>
          <td style="color: ${d.depletionRate > 0.8 ? '#dc2626' : d.depletionRate > 0.6 ? '#ea580c' : '#059669'};">
            ${d.depletionRate}
          </td>
          <td><span class="status-${d.status.replace(' ', '-')}">${d.status.toUpperCase()}</span></td>
          <td>${d.wells.toLocaleString()}</td>
        </tr>
      `).join('')}
    </table>
  </div>

  <div class="section">
    <h2>💡 Policy Recommendations</h2>
    ${districts.filter(d => d.status === 'critical' || d.status === 'over-exploited').length > 0 ? `
    <div class="alert">
      <h4>High Priority Districts</h4>
      <ul>
        ${districts.filter(d => d.status === 'critical' || d.status === 'over-exploited').map(d => `
          <li><strong>${d.name}:</strong> ${d.recommendation}</li>
        `).join('')}
      </ul>
    </div>
    ` : ''}

    <div class="recommendation">
      <h4>✅ General Recommendations</h4>
      <ul>
        <li><strong>Artificial Recharge:</strong> Construct check dams, percolation tanks, and recharge shafts in deficit areas</li>
        <li><strong>Rainwater Harvesting:</strong> Mandate rooftop RWH in urban areas and farm ponds in rural regions</li>
        <li><strong>Crop Planning:</strong> Promote less water-intensive crops in over-exploited zones</li>
        <li><strong>Micro-Irrigation:</strong> Subsidize drip and sprinkler systems to improve water use efficiency</li>
        <li><strong>Monitoring:</strong> Establish real-time groundwater monitoring network with telemetry</li>
        <li><strong>Regulation:</strong> Strictly enforce groundwater extraction permits based on scientific assessment</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <h2>📈 Trend Analysis & Future Outlook</h2>
    <p><strong>Current Trajectory:</strong> ${seasonData.depletionRate > 0.7 ? 
      'Groundwater levels declining at an alarming rate. Without intervention, water table may become uneconomical for extraction within 10-15 years.' : 
      seasonData.depletionRate > 0.5 ? 
      'Moderate depletion observed. Sustainable management practices can stabilize water levels.' :
      'Groundwater extraction appears sustainable under current conditions. Continue monitoring.'
    }</p>
    <p><strong>Recharge Potential:</strong> ${currentData.rechargeEfficiency > 60 ? 
      'Good natural recharge observed. Artificial recharge structures can further enhance groundwater availability.' :
      'Recharge efficiency is suboptimal. Priority should be given to watershed development and aquifer recharge programs.'
    }</p>
  </div>

  <div class="footer">
    <p><strong>Report prepared by: Central Ground Water Board (CGWB)</strong></p>
    <p>Ministry of Jal Shakti, Department of Water Resources, Government of India</p>
    <p>This report is based on CGWB monitoring data and should be used for planning and policy decisions</p>
    <p>For technical queries, contact: cgwb@nic.in | www.cgwb.gov.in</p>
  </div>
</body>
</html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `cgwb_summary_${selectedState}_${selectedYear}.html`;
    link.click();
  };

  const exportGeoJSON = () => {
    // District coordinates (approximate central points)
    const coordinates = {
      // Bihar
      'Patna': [85.1376, 25.5941],
      'Gaya': [84.9994, 24.7955],
      'Muzaffarpur': [85.3647, 26.1209],
      'Bhagalpur': [87.0086, 25.2425],
      'Darbhanga': [85.8974, 26.1542],
      'Samastipur': [85.7827, 25.8648],
      // UP
      'Lucknow': [80.9462, 26.8467],
      'Varanasi': [82.9739, 25.3176],
      'Prayagraj': [81.8463, 25.4358],
      'Gorakhpur': [83.3732, 26.7606],
      'Meerut': [77.7064, 28.9845],
      'Kanpur': [80.3319, 26.4499],
      // Punjab
      'Ludhiana': [75.8573, 30.9010],
      'Amritsar': [74.8723, 31.6340],
      'Jalandhar': [75.5762, 31.3260],
      'Patiala': [76.3869, 30.3398],
      'Bathinda': [74.9519, 30.2110],
      'Moga': [75.1705, 30.8158],
      // Haryana
      'Karnal': [76.9905, 29.6857],
      'Hisar': [75.7238, 29.1492],
      'Rohtak': [76.6066, 28.8955],
      'Ambala': [76.7821, 30.3783],
      'Panipat': [76.9635, 29.3909],
      'Sirsa': [75.0289, 29.5341]
    };

    const features = districts.map(d => ({
      type: 'Feature',
      properties: {
        district: d.name,
        state: selectedState.toUpperCase(),
        year: selectedYear,
        preMonsoonDepth: d.preMonsoon,
        postMonsoonDepth: d.postMonsoon,
        recharge: d.recharge,
        depletionRate: d.depletionRate,
        status: d.status,
        totalWells: d.wells,
        recommendation: d.recommendation,
        criticalityScore: d.depletionRate > 0.8 ? 'High' : d.depletionRate > 0.6 ? 'Medium' : 'Low'
      },
      geometry: {
        type: 'Point',
        coordinates: coordinates[d.name] || [0, 0]
      }
    }));

    const geoJSON = {
      type: 'FeatureCollection',
      metadata: {
        title: 'CGWB Groundwater Monitoring Data',
        description: `District-wise groundwater depth and status for ${selectedState.toUpperCase()}, ${selectedYear}`,
        generatedAt: new Date().toISOString(),
        source: 'Central Ground Water Board (CGWB)',
        crs: 'EPSG:4326 (WGS 84)'
      },
      features: features
    };

    const blob = new Blob([JSON.stringify(geoJSON, null, 2)], { type: 'application/geo+json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `cgwb_groundwater_${selectedState}_${selectedYear}.geojson`;
    link.click();
  };

  const generateMainReport = () => {
    generateCGWBSummary();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Well Depth & Groundwater Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Water table monitoring, depletion trends & recharge zone identification
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="btn-primary flex items-center space-x-2" onClick={generateMainReport}>
            <FiDownload />
            <span>CGWB Report</span>
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
              Year (CGWB Data)
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="input-field"
            >
              <option value="2023">2023</option>
              <option value="2020">2020</option>
              <option value="2015">2015</option>
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
              <option value="pre_monsoon">Pre-Monsoon (May)</option>
              <option value="post_monsoon">Post-Monsoon (Nov)</option>
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
              <option value="overview">State Overview</option>
              <option value="district">District Analysis</option>
              <option value="trends">Depletion Trends</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center space-x-1">
            <FiDroplet size={14} />
            <span>Avg Water Table Depth</span>
          </p>
          <p className={`text-3xl font-bold ${getDepthColor(seasonData.avgDepth)}`}>
            {seasonData.avgDepth.toFixed(1)} m
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {selectedSeason === 'pre_monsoon' ? 'Before monsoon' : 'After monsoon'}
          </p>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monsoon Recharge</p>
          <p className="text-3xl font-bold text-green-600">
            {currentData.rechargeRate.toFixed(1)} m
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Efficiency: {currentData.rechargeEfficiency}%
          </p>
        </div>

        <div className="card bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center space-x-1">
            <FiTrendingDown size={14} />
            <span>Annual Depletion Rate</span>
          </p>
          <p className="text-3xl font-bold text-red-600">
            {seasonData.depletionRate.toFixed(2)} m/yr
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Unsustainable trend ⚠️
          </p>
        </div>

        <div className="card bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center space-x-1">
            <FiAlertTriangle size={14} />
            <span>Critical/Over-exploited</span>
          </p>
          <p className="text-3xl font-bold text-yellow-600">
            {currentData.criticalZones + currentData.overExploited}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {currentData.criticalZones} critical, {currentData.overExploited} over-exploited
          </p>
        </div>
      </div>

      {viewMode === 'overview' && (
        <>
          {/* Well Depth Distribution */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <FiBarChart2 className="text-blue-500" />
                <span>Well Depth Distribution</span>
              </h3>
              <div className="space-y-4">
                {Object.entries(seasonData.depthRanges).map(([range, data]) => (
                  <div key={range}>
                    <div className="flex justify-between mb-2">
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white capitalize">
                          {range.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <p className="text-xs text-gray-500">
                          {data.range} | {data.count.toLocaleString()} wells
                        </p>
                      </div>
                      <span className="text-2xl font-bold text-primary-600">
                        {data.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          range === 'shallow' ? 'bg-green-500' :
                          range === 'medium' ? 'bg-yellow-500' :
                          range === 'deep' ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${data.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Seasonal Comparison */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <FiActivity className="text-green-500" />
                <span>Pre vs Post Monsoon</span>
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="font-semibold text-gray-900 dark:text-white">Pre-Monsoon (May)</span>
                    <span className="text-2xl font-bold text-red-600">
                      {currentData.pre_monsoon.avgDepth.toFixed(1)} m
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                    <div 
                      className="bg-red-500 h-6 rounded-full flex items-center justify-end pr-3" 
                      style={{ width: `${(currentData.pre_monsoon.avgDepth / 20) * 100}%` }}
                    >
                      <span className="text-white font-bold text-sm">
                        {currentData.pre_monsoon.avgDepth.toFixed(1)}m
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Peak stress period | Lowest water table
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <span className="font-semibold text-gray-900 dark:text-white">Post-Monsoon (Nov)</span>
                    <span className="text-2xl font-bold text-green-600">
                      {currentData.post_monsoon.avgDepth.toFixed(1)} m
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                    <div 
                      className="bg-green-500 h-6 rounded-full flex items-center justify-end pr-3" 
                      style={{ width: `${(currentData.post_monsoon.avgDepth / 20) * 100}%` }}
                    >
                      <span className="text-white font-bold text-sm">
                        {currentData.post_monsoon.avgDepth.toFixed(1)}m
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    After monsoon recharge | Best water availability
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start space-x-2">
                    <FiDroplet className="text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-blue-900 dark:text-blue-200 text-sm">
                        Monsoon Recharge: {currentData.rechargeRate.toFixed(1)} meters
                      </p>
                      <p className="text-xs text-blue-800 dark:text-blue-300 mt-1">
                        Recharge efficiency at {currentData.rechargeEfficiency}%. 
                        Water table rises by {currentData.rechargeRate.toFixed(1)}m during monsoon season.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {viewMode === 'district' && (
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <FiMapPin className="text-purple-500" />
            <span>District-Level Water Table Analysis</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">District</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Pre-Monsoon</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Post-Monsoon</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Recharge</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Depletion Rate</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Wells</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {districts.map((district, index) => (
                  <tr key={index} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{district.name}</td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${getDepthColor(district.preMonsoon)}`}>
                        {district.preMonsoon.toFixed(1)} m
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${getDepthColor(district.postMonsoon)}`}>
                        {district.postMonsoon.toFixed(1)} m
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-green-600">
                        +{district.recharge.toFixed(1)} m
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-red-600">
                        -{district.depletionRate.toFixed(2)} m/yr
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(district.status)}`}>
                        {district.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {district.wells.toLocaleString()}
                    </td>
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

      {viewMode === 'trends' && (
        <div className="space-y-6">
          {/* Temporal Trends */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <FiTrendingDown className="text-red-500" />
              <span>Water Table Depletion Trend (2020 vs 2023)</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Pre-Monsoon Depth</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">2020</span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {wellData[selectedState][2020].pre_monsoon.avgDepth.toFixed(1)} m
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-yellow-500 h-3 rounded-full" 
                        style={{ width: `${(wellData[selectedState][2020].pre_monsoon.avgDepth / 20) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">2023</span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {wellData[selectedState][2023].pre_monsoon.avgDepth.toFixed(1)} m
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-red-500 h-3 rounded-full" 
                        style={{ width: `${(wellData[selectedState][2023].pre_monsoon.avgDepth / 20) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded p-2">
                    <p className="text-sm text-red-800 dark:text-red-300">
                      <strong>Decline:</strong> {(wellData[selectedState][2023].pre_monsoon.avgDepth - wellData[selectedState][2020].pre_monsoon.avgDepth).toFixed(1)}m 
                      deeper in 3 years (depletion accelerating)
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Critical Zone Expansion</h4>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">2020</span>
                      <span className="text-2xl font-bold text-yellow-600">
                        {wellData[selectedState][2020].criticalZones + wellData[selectedState][2020].overExploited}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {wellData[selectedState][2020].criticalZones} critical + {wellData[selectedState][2020].overExploited} over-exploited
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">2023</span>
                      <span className="text-2xl font-bold text-red-600">
                        {wellData[selectedState][2023].criticalZones + wellData[selectedState][2023].overExploited}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {wellData[selectedState][2023].criticalZones} critical + {wellData[selectedState][2023].overExploited} over-exploited
                    </div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded p-2">
                    <p className="text-sm text-red-800 dark:text-red-300">
                      <strong>Alert:</strong> +{(wellData[selectedState][2023].criticalZones + wellData[selectedState][2023].overExploited) - (wellData[selectedState][2020].criticalZones + wellData[selectedState][2020].overExploited)} 
                      more zones became critical/over-exploited
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Policy Recommendations */}
      <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-300 dark:border-blue-700">
        <h3 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-4">
          💧 Groundwater Management & Recharge Strategy
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
              <FiAlertTriangle className="text-red-500" />
              <span>Critical Issues</span>
            </h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>• Water table declining at <strong>{seasonData.depletionRate.toFixed(2)} m/year</strong></li>
              <li>• Pre-monsoon depth reached <strong>{currentData.pre_monsoon.avgDepth.toFixed(1)}m</strong> (stress level)</li>
              <li>• <strong>{currentData.criticalZones}</strong> districts in critical zone</li>
              <li>• <strong>{currentData.overExploited}</strong> blocks over-exploited</li>
              <li>• Recharge efficiency only <strong>{currentData.rechargeEfficiency}%</strong></li>
              <li>• <strong>{seasonData.depthRanges.veryDeep.percentage}%</strong> wells deeper than 20m</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
              <FiDroplet className="text-blue-500" />
              <span>Recommended Actions</span>
            </h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>• <strong>Artificial recharge:</strong> Build check dams, percolation tanks</li>
              <li>• <strong>Rainwater harvesting:</strong> Mandatory for all buildings</li>
              <li>• <strong>Regulate extraction:</strong> No new tubewells in critical zones</li>
              <li>• <strong>Micro-irrigation:</strong> Shift to drip/sprinkler to save water</li>
              <li>• <strong>Crop pattern change:</strong> Reduce water-intensive crops</li>
              <li>• <strong>Monitor network:</strong> Install piezometers in all blocks</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 bg-green-100 dark:bg-green-900/30 rounded p-3">
          <p className="text-sm text-green-800 dark:text-green-300">
            <strong>Target:</strong> Improve recharge efficiency from <strong>{currentData.rechargeEfficiency}%</strong> to <strong>75%</strong> 
            through artificial recharge structures. This can save <strong>{(currentData.rechargeRate * 0.1).toFixed(1)}m</strong> additional water table rise, 
            offsetting <strong>{((currentData.rechargeRate * 0.1) / seasonData.depletionRate * 100).toFixed(0)}%</strong> of annual depletion.
          </p>
        </div>
      </div>

      {/* Export Options */}
      <div className="card bg-gray-50 dark:bg-gray-800">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          📥 Export Well Depth Data
        </h4>
        <div className="flex flex-wrap gap-3">
          <button className="btn-secondary" onClick={downloadDistrictReport}>
            <FiDownload className="inline mr-2" />
            Download District Report (CSV)
          </button>
          <button className="btn-secondary" onClick={exportDepthAnalysis}>
            <FiDownload className="inline mr-2" />
            Export Depth Analysis (Excel)
          </button>
          <button className="btn-secondary" onClick={generateCGWBSummary}>
            <FiDownload className="inline mr-2" />
            Generate CGWB Summary (PDF)
          </button>
          <button className="btn-secondary" onClick={exportGeoJSON}>
            <FiDownload className="inline mr-2" />
            Export GeoJSON (Spatial Data)
          </button>
        </div>
      </div>
    </div>
  );
};

export default WellDepthAnalysis;
