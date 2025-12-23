import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiDroplet, FiTrendingUp, FiAlertTriangle, FiDownload,
  FiPieChart, FiBarChart, FiMapPin, FiActivity
} from 'react-icons/fi';

const IrrigationAnalysis = () => {
  const [selectedState, setSelectedState] = useState('bihar');
  const [selectedYear, setSelectedYear] = useState(2023);
  const [viewMode, setViewMode] = useState('overview'); // overview, district, trends

  // Mock data - In production, fetch from backend API
  const irrigationData = {
    bihar: {
      2023: {
        totalIrrigatedArea: 520000, // hectares
        totalCultivableArea: 786000,
        irrigationCoverage: 66.2, // percentage
        sources: {
          canal: { area: 104000, percentage: 20.0, schemes: 245 },
          tubewell: { area: 338000, percentage: 65.0, schemes: 125000 },
          dugWell: { area: 52000, percentage: 10.0, schemes: 45000 },
          tank: { area: 15600, percentage: 3.0, schemes: 1200 },
          other: { area: 10400, percentage: 2.0, schemes: 850 }
        },
        groundwaterDependence: 75.0, // tubewell + dug well
        surfaceWater: 23.0, // canal + tank
        rainfed: 33.8 // percentage of uncultivated area
      },
      2020: {
        totalIrrigatedArea: 495000,
        totalCultivableArea: 786000,
        irrigationCoverage: 63.0,
        sources: {
          canal: { area: 99000, percentage: 20.0, schemes: 240 },
          tubewell: { area: 316800, percentage: 64.0, schemes: 118000 },
          dugWell: { area: 54450, percentage: 11.0, schemes: 47000 },
          tank: { area: 14850, percentage: 3.0, schemes: 1150 },
          other: { area: 9900, percentage: 2.0, schemes: 800 }
        },
        groundwaterDependence: 75.0,
        surfaceWater: 23.0,
        rainfed: 37.0
      },
      2015: {
        totalIrrigatedArea: 458000,
        totalCultivableArea: 786000,
        irrigationCoverage: 58.3,
        sources: {
          canal: { area: 91600, percentage: 20.0, schemes: 225 },
          tubewell: { area: 288360, percentage: 63.0, schemes: 108000 },
          dugWell: { area: 59540, percentage: 13.0, schemes: 52000 },
          tank: { area: 13740, percentage: 3.0, schemes: 1050 },
          other: { area: 4580, percentage: 1.0, schemes: 700 }
        },
        groundwaterDependence: 76.0,
        surfaceWater: 23.0,
        rainfed: 41.7
      }
    },
    up: {
      2023: {
        totalIrrigatedArea: 1285000,
        totalCultivableArea: 1714000,
        irrigationCoverage: 75.0,
        sources: {
          canal: { area: 514000, percentage: 40.0, schemes: 850 },
          tubewell: { area: 578250, percentage: 45.0, schemes: 185000 },
          dugWell: { area: 128500, percentage: 10.0, schemes: 62000 },
          tank: { area: 38550, percentage: 3.0, schemes: 2100 },
          other: { area: 25700, percentage: 2.0, schemes: 1500 }
        },
        groundwaterDependence: 55.0,
        surfaceWater: 43.0,
        rainfed: 25.0
      },
      2020: {
        totalIrrigatedArea: 1234000,
        totalCultivableArea: 1714000,
        irrigationCoverage: 72.0,
        sources: {
          canal: { area: 493600, percentage: 40.0, schemes: 825 },
          tubewell: { area: 543900, percentage: 44.0, schemes: 178000 },
          dugWell: { area: 135740, percentage: 11.0, schemes: 64000 },
          tank: { area: 37020, percentage: 3.0, schemes: 2050 },
          other: { area: 24680, percentage: 2.0, schemes: 1450 }
        },
        groundwaterDependence: 55.0,
        surfaceWater: 43.0,
        rainfed: 28.0
      },
      2015: {
        totalIrrigatedArea: 1142000,
        totalCultivableArea: 1714000,
        irrigationCoverage: 66.6,
        sources: {
          canal: { area: 456800, percentage: 40.0, schemes: 780 },
          tubewell: { area: 525220, percentage: 46.0, schemes: 165000 },
          dugWell: { area: 114200, percentage: 10.0, schemes: 58000 },
          tank: { area: 34260, percentage: 3.0, schemes: 1950 },
          other: { area: 11420, percentage: 1.0, schemes: 1300 }
        },
        groundwaterDependence: 56.0,
        surfaceWater: 43.0,
        rainfed: 33.4
      }
    },
    punjab: {
      2023: {
        totalIrrigatedArea: 4123000,
        totalCultivableArea: 4200000,
        irrigationCoverage: 98.2,
        sources: {
          canal: { area: 1059591, percentage: 25.7, schemes: 142 },
          tubewell: { area: 2883390, percentage: 69.9, schemes: 185000 },
          dugWell: { area: 119571, percentage: 2.9, schemes: 4500 },
          tank: { area: 20615, percentage: 0.5, schemes: 78 },
          other: { area: 41230, percentage: 1.0, schemes: 156 }
        },
        groundwaterDependence: 72.8,
        surfaceWater: 26.2,
        rainfed: 1.8
      },
      2020: {
        totalIrrigatedArea: 3985000,
        totalCultivableArea: 4088000,
        irrigationCoverage: 97.5,
        sources: {
          canal: { area: 968555, percentage: 24.3, schemes: 135 },
          tubewell: { area: 2829700, percentage: 71.0, schemes: 178000 },
          dugWell: { area: 127520, percentage: 3.2, schemes: 4850 },
          tank: { area: 39850, percentage: 1.0, schemes: 92 },
          other: { area: 19925, percentage: 0.5, schemes: 124 }
        },
        groundwaterDependence: 74.2,
        surfaceWater: 25.3,
        rainfed: 2.5
      },
      2015: {
        totalIrrigatedArea: 3756000,
        totalCultivableArea: 3904000,
        irrigationCoverage: 96.2,
        sources: {
          canal: { area: 830076, percentage: 22.1, schemes: 118 },
          tubewell: { area: 2782920, percentage: 74.1, schemes: 168000 },
          dugWell: { area: 101412, percentage: 2.7, schemes: 4200 },
          tank: { area: 37560, percentage: 1.0, schemes: 85 },
          other: { area: 3756, percentage: 0.1, schemes: 98 }
        },
        groundwaterDependence: 76.8,
        surfaceWater: 23.1,
        rainfed: 3.8
      }
    },
    haryana: {
      2023: {
        totalIrrigatedArea: 3456000,
        totalCultivableArea: 4045000,
        irrigationCoverage: 85.4,
        sources: {
          canal: { area: 1029888, percentage: 29.8, schemes: 178 },
          tubewell: { area: 2195520, percentage: 63.5, schemes: 125000 },
          dugWell: { area: 172800, percentage: 5.0, schemes: 7800 },
          tank: { area: 34560, percentage: 1.0, schemes: 142 },
          other: { area: 24192, percentage: 0.7, schemes: 95 }
        },
        groundwaterDependence: 68.5,
        surfaceWater: 30.8,
        rainfed: 14.6
      },
      2020: {
        totalIrrigatedArea: 3298000,
        totalCultivableArea: 4045000,
        irrigationCoverage: 81.5,
        sources: {
          canal: { area: 933334, percentage: 28.3, schemes: 165 },
          tubewell: { area: 2145260, percentage: 65.0, schemes: 118000 },
          dugWell: { area: 171492, percentage: 5.2, schemes: 7550 },
          tank: { area: 32980, percentage: 1.0, schemes: 128 },
          other: { area: 16490, percentage: 0.5, schemes: 82 }
        },
        groundwaterDependence: 70.2,
        surfaceWater: 29.3,
        rainfed: 18.5
      },
      2015: {
        totalIrrigatedArea: 2987000,
        totalCultivableArea: 4045000,
        irrigationCoverage: 73.8,
        sources: {
          canal: { area: 782594, percentage: 26.2, schemes: 145 },
          tubewell: { area: 1970330, percentage: 66.0, schemes: 105000 },
          dugWell: { area: 194141, percentage: 6.5, schemes: 6800 },
          tank: { area: 29870, percentage: 1.0, schemes: 112 },
          other: { area: 8961, percentage: 0.3, schemes: 65 }
        },
        groundwaterDependence: 72.5,
        surfaceWater: 27.2,
        rainfed: 26.2
      }
    }
  };

  const districtData = {
    bihar: [
      { 
        name: 'Patna', 
        irrigatedArea: 125000,
        coverage: 68,
        canal: 25, tubewell: 60, dugWell: 10, tank: 3, other: 2,
        gwStress: 'high',
        potentialCreated: 135000,
        potentialUtilized: 125000,
        utilizationRate: 92.6
      },
      { 
        name: 'Gaya', 
        irrigatedArea: 98000,
        coverage: 62,
        canal: 18, tubewell: 68, dugWell: 9, tank: 3, other: 2,
        gwStress: 'critical',
        potentialCreated: 110000,
        potentialUtilized: 98000,
        utilizationRate: 89.1
      },
      { 
        name: 'Muzaffarpur', 
        irrigatedArea: 115000,
        coverage: 70,
        canal: 22, tubewell: 63, dugWell: 11, tank: 2, other: 2,
        gwStress: 'high',
        potentialCreated: 125000,
        potentialUtilized: 115000,
        utilizationRate: 92.0
      },
      { 
        name: 'Bhagalpur', 
        irrigatedArea: 85000,
        coverage: 58,
        canal: 20, tubewell: 65, dugWell: 10, tank: 3, other: 2,
        gwStress: 'high',
        potentialCreated: 95000,
        potentialUtilized: 85000,
        utilizationRate: 89.5
      },
      { 
        name: 'Darbhanga', 
        irrigatedArea: 92000,
        coverage: 64,
        canal: 19, tubewell: 66, dugWell: 10, tank: 3, other: 2,
        gwStress: 'critical',
        potentialCreated: 102000,
        potentialUtilized: 92000,
        utilizationRate: 90.2
      },
      { 
        name: 'Samastipur', 
        irrigatedArea: 105000,
        coverage: 67,
        canal: 21, tubewell: 64, dugWell: 11, tank: 2, other: 2,
        gwStress: 'high',
        potentialCreated: 115000,
        potentialUtilized: 105000,
        utilizationRate: 91.3
      }
    ],
    up: [
      { 
        name: 'Lucknow', 
        irrigatedArea: 185000,
        coverage: 72,
        canal: 38, tubewell: 46, dugWell: 11, tank: 3, other: 2,
        gwStress: 'semi-critical',
        potentialCreated: 202000,
        potentialUtilized: 185000,
        utilizationRate: 91.6
      },
      { 
        name: 'Varanasi', 
        irrigatedArea: 168000,
        coverage: 70,
        canal: 40, tubewell: 44, dugWell: 11, tank: 3, other: 2,
        gwStress: 'semi-critical',
        potentialCreated: 182000,
        potentialUtilized: 168000,
        utilizationRate: 92.3
      },
      { 
        name: 'Prayagraj', 
        irrigatedArea: 195000,
        coverage: 75,
        canal: 42, tubewell: 43, dugWell: 10, tank: 3, other: 2,
        gwStress: 'safe',
        potentialCreated: 215000,
        potentialUtilized: 195000,
        utilizationRate: 90.7
      },
      { 
        name: 'Gorakhpur', 
        irrigatedArea: 175000,
        coverage: 73,
        canal: 39, tubewell: 45, dugWell: 11, tank: 3, other: 2,
        gwStress: 'semi-critical',
        potentialCreated: 192000,
        potentialUtilized: 175000,
        utilizationRate: 91.1
      },
      { 
        name: 'Meerut', 
        irrigatedArea: 235000,
        coverage: 80,
        canal: 41, tubewell: 44, dugWell: 10, tank: 3, other: 2,
        gwStress: 'safe',
        potentialCreated: 258000,
        potentialUtilized: 235000,
        utilizationRate: 91.1
      },
      { 
        name: 'Kanpur', 
        irrigatedArea: 215000,
        coverage: 78,
        canal: 40, tubewell: 45, dugWell: 10, tank: 3, other: 2,
        gwStress: 'semi-critical',
        potentialCreated: 235000,
        potentialUtilized: 215000,
        utilizationRate: 91.5
      }
    ],
    punjab: [
      { 
        name: 'Ludhiana', 
        irrigatedArea: 825000,
        coverage: 99,
        canal: 28, tubewell: 68, dugWell: 3, tank: 0, other: 1,
        gwStress: 'critical',
        potentialCreated: 840000,
        potentialUtilized: 825000,
        utilizationRate: 98.2
      },
      { 
        name: 'Amritsar', 
        irrigatedArea: 735000,
        coverage: 98,
        canal: 26, tubewell: 70, dugWell: 3, tank: 0, other: 1,
        gwStress: 'critical',
        potentialCreated: 752000,
        potentialUtilized: 735000,
        utilizationRate: 97.7
      },
      { 
        name: 'Jalandhar', 
        irrigatedArea: 625000,
        coverage: 98,
        canal: 27, tubewell: 69, dugWell: 3, tank: 0, other: 1,
        gwStress: 'critical',
        potentialCreated: 642000,
        potentialUtilized: 625000,
        utilizationRate: 97.4
      },
      { 
        name: 'Patiala', 
        irrigatedArea: 685000,
        coverage: 97,
        canal: 25, tubewell: 70, dugWell: 4, tank: 0, other: 1,
        gwStress: 'critical',
        potentialCreated: 705000,
        potentialUtilized: 685000,
        utilizationRate: 97.2
      },
      { 
        name: 'Bathinda', 
        irrigatedArea: 545000,
        coverage: 96,
        canal: 24, tubewell: 71, dugWell: 4, tank: 0, other: 1,
        gwStress: 'critical',
        potentialCreated: 568000,
        potentialUtilized: 545000,
        utilizationRate: 96.0
      },
      { 
        name: 'Moga', 
        irrigatedArea: 485000,
        coverage: 97,
        canal: 26, tubewell: 70, dugWell: 3, tank: 0, other: 1,
        gwStress: 'critical',
        potentialCreated: 502000,
        potentialUtilized: 485000,
        utilizationRate: 96.6
      }
    ],
    haryana: [
      { 
        name: 'Karnal', 
        irrigatedArea: 625000,
        coverage: 88,
        canal: 32, tubewell: 62, dugWell: 5, tank: 0, other: 1,
        gwStress: 'high',
        potentialCreated: 652000,
        potentialUtilized: 625000,
        utilizationRate: 95.9
      },
      { 
        name: 'Hisar', 
        irrigatedArea: 545000,
        coverage: 82,
        canal: 28, tubewell: 66, dugWell: 5, tank: 0, other: 1,
        gwStress: 'critical',
        potentialCreated: 572000,
        potentialUtilized: 545000,
        utilizationRate: 95.3
      },
      { 
        name: 'Rohtak', 
        irrigatedArea: 485000,
        coverage: 85,
        canal: 30, tubewell: 64, dugWell: 5, tank: 0, other: 1,
        gwStress: 'high',
        potentialCreated: 508000,
        potentialUtilized: 485000,
        utilizationRate: 95.5
      },
      { 
        name: 'Ambala', 
        irrigatedArea: 565000,
        coverage: 86,
        canal: 31, tubewell: 63, dugWell: 5, tank: 0, other: 1,
        gwStress: 'semi-critical',
        potentialCreated: 592000,
        potentialUtilized: 565000,
        utilizationRate: 95.4
      },
      { 
        name: 'Panipat', 
        irrigatedArea: 425000,
        coverage: 84,
        canal: 29, tubewell: 65, dugWell: 5, tank: 0, other: 1,
        gwStress: 'high',
        potentialCreated: 448000,
        potentialUtilized: 425000,
        utilizationRate: 94.9
      },
      { 
        name: 'Sirsa', 
        irrigatedArea: 505000,
        coverage: 83,
        canal: 30, tubewell: 64, dugWell: 5, tank: 1, other: 0,
        gwStress: 'high',
        potentialCreated: 528000,
        potentialUtilized: 505000,
        utilizationRate: 95.6
      }
    ]
  };

  const currentData = irrigationData[selectedState][selectedYear];
  const districts = districtData[selectedState] || [];

  const getStressColor = (stress) => {
    switch (stress) {
      case 'safe': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'semi-critical': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Download Functions
  const exportDistrictCSV = () => {
    const csvData = [
      ['District-Level Irrigation Report'],
      ['State:', selectedState.toUpperCase(), 'Year:', selectedYear],
      ['Generated on:', new Date().toLocaleDateString()],
      [],
      ['District', 'Irrigated Area (ha)', 'Coverage %', 'Canal %', 'Tubewell %', 'Dug Well %', 'Tank %', 'Other %', 'GW Stress', 'Potential Created (ha)', 'Potential Utilized (ha)', 'Utilization Rate %'],
    ];

    districts.forEach(district => {
      csvData.push([
        district.name,
        district.irrigatedArea,
        district.coverage,
        district.canal,
        district.tubewell,
        district.dugWell,
        district.tank || 0,
        district.other || 0,
        district.gwStress.toUpperCase(),
        district.potentialCreated,
        district.potentialUtilized,
        district.utilizationRate.toFixed(1)
      ]);
    });

    csvData.push([]);
    csvData.push(['Summary Statistics']);
    csvData.push(['Total Irrigated Area:', currentData.totalIrrigatedArea.toLocaleString() + ' ha']);
    csvData.push(['Irrigation Coverage:', currentData.irrigationCoverage + '%']);
    csvData.push(['Groundwater Dependence:', currentData.groundwaterDependence + '%']);
    csvData.push(['Surface Water Usage:', currentData.surfaceWater + '%']);

    const csvContent = csvData.map(row => row.join(',')).join('\\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'irrigation_district_' + selectedState + '_' + selectedYear + '.csv';
    link.click();
  };

  const exportSourceExcel = () => {
    let excelContent = 'Irrigation Source Analysis\\n';
    excelContent = excelContent + 'State: ' + selectedState.toUpperCase() + '\\tYear: ' + selectedYear + '\\n';
    excelContent = excelContent + 'Generated on: ' + new Date().toLocaleDateString() + '\\n\\n';

    excelContent = excelContent + 'OVERVIEW\\n';
    excelContent = excelContent + 'Metric\\tValue\\n';
    excelContent = excelContent + 'Total Irrigated Area (ha)\\t' + currentData.totalIrrigatedArea.toLocaleString() + '\\n';
    excelContent = excelContent + 'Irrigation Coverage (%)\\t' + currentData.irrigationCoverage + '\\n';
    excelContent = excelContent + 'Groundwater Dependence (%)\\t' + currentData.groundwaterDependence + '\\n';
    excelContent = excelContent + 'Surface Water Usage (%)\\t' + currentData.surfaceWater + '\\n';
    excelContent = excelContent + 'Rainfed Area (%)\\t' + currentData.rainfed + '\\n\\n';

    excelContent = excelContent + 'SOURCE-WISE BREAKDOWN\\n';
    excelContent = excelContent + 'Source\\tArea (ha)\\tPercentage\\tNo. of Schemes\\n';
    Object.entries(currentData.sources).forEach(([source, data]) => {
      excelContent = excelContent + source.charAt(0).toUpperCase() + source.slice(1).replace('_', ' ') + '\\t';
      excelContent = excelContent + data.area + '\\t' + data.percentage + '%\\t' + data.schemes.toLocaleString() + '\\n';
    });

    excelContent = excelContent + '\\nDISTRICT-WISE ANALYSIS\\n';
    excelContent = excelContent + 'District\\tIrrigated Area (ha)\\tCoverage %\\tCanal %\\tTubewell %\\tDug Well %\\tGW Stress\\tUtilization %\\n';
    districts.forEach(district => {
      excelContent = excelContent + district.name + '\\t';
      excelContent = excelContent + district.irrigatedArea + '\\t';
      excelContent = excelContent + district.coverage + '\\t';
      excelContent = excelContent + district.canal + '\\t';
      excelContent = excelContent + district.tubewell + '\\t';
      excelContent = excelContent + district.dugWell + '\\t';
      excelContent = excelContent + district.gwStress.toUpperCase() + '\\t';
      excelContent = excelContent + district.utilizationRate.toFixed(1) + '\\n';
    });

    excelContent = excelContent + '\\nGROUNDWATER STRESS ZONES\\n';
    const stressZones = { critical: 0, high: 0, 'semi-critical': 0, safe: 0 };
    districts.forEach(d => stressZones[d.gwStress] = (stressZones[d.gwStress] || 0) + 1);
    excelContent = excelContent + 'Stress Level\\tNumber of Districts\\n';
    Object.entries(stressZones).forEach(([stress, count]) => {
      excelContent = excelContent + stress.charAt(0).toUpperCase() + stress.slice(1) + '\\t' + count + '\\n';
    });

    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'irrigation_source_analysis_' + selectedState + '_' + selectedYear + '.xls';
    link.click();
  };

  const generateMICensusPDF = () => {
    let htmlContent = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>MI Census Summary</title><style>body { font-family: Arial, sans-serif; margin: 40px; color: #333; } h1 { color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px; } h2 { color: #1e40af; margin-top: 30px; border-left: 4px solid #3b82f6; padding-left: 10px; } table { width: 100%; border-collapse: collapse; margin: 20px 0; } th, td { border: 1px solid #ddd; padding: 12px; text-align: left; } th { background-color: #3b82f6; color: white; font-weight: bold; } tr:nth-child(even) { background-color: #f3f4f6; } .header { background-color: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 30px; } .metric { display: inline-block; margin: 10px 20px 10px 0; } .metric-label { font-size: 14px; color: #6b7280; } .metric-value { font-size: 24px; font-weight: bold; color: #1e40af; } .alert { background-color: #fee2e2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0; } .alert-title { font-weight: bold; color: #991b1b; margin-bottom: 5px; } .recommendation { background-color: #d1fae5; border-left: 4px solid #10b981; padding: 15px; margin: 10px 0; } ul { line-height: 1.8; } .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; font-size: 12px; color: #6b7280; text-align: center; }</style></head><body><div class="header"><h1>Minor Irrigation Census Summary Report</h1><p><strong>State:</strong> ' + selectedState.toUpperCase() + ' | <strong>Census Year:</strong> ' + selectedYear + ' | <strong>Generated:</strong> ' + new Date().toLocaleDateString() + '</p></div><h2>State-Level Overview</h2><div><div class="metric"><div class="metric-label">Total Irrigated Area</div><div class="metric-value">' + (currentData.totalIrrigatedArea / 1000).toFixed(0) + 'K ha</div></div><div class="metric"><div class="metric-label">Irrigation Coverage</div><div class="metric-value">' + currentData.irrigationCoverage.toFixed(1) + '%</div></div><div class="metric"><div class="metric-label">GW Dependence</div><div class="metric-value">' + currentData.groundwaterDependence.toFixed(1) + '%</div></div><div class="metric"><div class="metric-label">Surface Water</div><div class="metric-value">' + currentData.surfaceWater.toFixed(1) + '%</div></div></div><h2>Irrigation Sources Distribution</h2><table><thead><tr><th>Source</th><th>Area (ha)</th><th>Percentage</th><th>No. of Schemes</th></tr></thead><tbody>';

    Object.entries(currentData.sources).forEach(([source, data]) => {
      htmlContent = htmlContent + '<tr><td>' + source.charAt(0).toUpperCase() + source.slice(1).replace('_', ' ') + '</td><td>' + data.area.toLocaleString() + '</td><td>' + data.percentage + '%</td><td>' + data.schemes.toLocaleString() + '</td></tr>';
    });

    htmlContent = htmlContent + '</tbody></table><h2>District-Level Analysis</h2><table><thead><tr><th>District</th><th>Coverage %</th><th>Canal %</th><th>Tubewell %</th><th>GW Stress</th><th>Utilization %</th></tr></thead><tbody>';

    districts.forEach(district => {
      htmlContent = htmlContent + '<tr><td>' + district.name + '</td><td>' + district.coverage + '%</td><td>' + district.canal + '%</td><td>' + district.tubewell + '%</td><td>' + district.gwStress.toUpperCase() + '</td><td>' + district.utilizationRate.toFixed(1) + '%</td></tr>';
    });

    htmlContent = htmlContent + '</tbody></table>';

    if (currentData.groundwaterDependence > 65) {
      htmlContent = htmlContent + '<div class="alert"><div class="alert-title">⚠️ Critical Alert: High Groundwater Dependence</div><p>The state shows ' + currentData.groundwaterDependence.toFixed(1) + '% dependence on groundwater sources (tubewell + dug well), which is unsustainable and poses serious risks to agricultural productivity and water security.</p></div>';
    }

    htmlContent = htmlContent + '<h2>Policy Recommendations</h2><div class="recommendation"><strong>✓ Expand Surface Water Irrigation</strong><ul><li>Modernize and expand canal networks to increase coverage from ' + currentData.surfaceWater.toFixed(1) + '% to at least 40%</li><li>Rehabilitate existing canal systems to improve water use efficiency</li><li>Promote participatory irrigation management (PIM) for better utilization</li></ul></div><div class="recommendation"><strong>✓ Promote Micro-Irrigation</strong><ul><li>Subsidize drip and sprinkler systems to achieve 30-40% water savings</li><li>Target high groundwater stress districts for priority implementation</li><li>Link schemes to PMKSY (Pradhan Mantri Krishi Sinchayee Yojana) for funding</li></ul></div><div class="recommendation"><strong>✓ Groundwater Management</strong><ul><li>Regulate tubewell boring in critical/semi-critical blocks</li><li>Promote aquifer recharge through check dams and recharge wells</li><li>Implement water budgeting and participatory groundwater management</li></ul></div><div class="recommendation"><strong>✓ Revive Traditional Water Bodies</strong><ul><li>Restore tanks and ponds for rainwater harvesting</li><li>Increase tank irrigation from ' + currentData.sources.tank.percentage + '% to at least 5%</li><li>Community-led tank management for sustainability</li></ul></div><h2>Priority Action Matrix</h2><table><thead><tr><th>Priority Level</th><th>Districts</th><th>Recommended Actions</th></tr></thead><tbody>';

    const criticalDistricts = districts.filter(d => d.gwStress === 'critical').map(d => d.name).join(', ') || 'None';
    const highDistricts = districts.filter(d => d.gwStress === 'high').map(d => d.name).join(', ') || 'None';

    htmlContent = htmlContent + '<tr><td><strong>HIGH</strong></td><td>' + criticalDistricts + '</td><td>Immediate restrictions on new tubewells, fast-track canal expansion, mandatory micro-irrigation for new schemes</td></tr><tr><td><strong>MEDIUM</strong></td><td>' + highDistricts + '</td><td>Promote surface water shift, aquifer recharge programs, crop diversification to less water-intensive crops</td></tr></tbody></table>';

    htmlContent = htmlContent + '<div class="footer"><p>This report is generated based on Minor Irrigation Census data and is intended for policy planning purposes.</p><p><strong>Data Source:</strong> Minor Irrigation Census ' + selectedYear + ' | <strong>Report Date:</strong> ' + new Date().toLocaleDateString() + '</p></div></body></html>';

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'MI_Census_Summary_' + selectedState + '_' + selectedYear + '.html';
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Irrigation Sources Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive assessment of irrigation infrastructure & groundwater dependence
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={generateMICensusPDF} className="btn-primary flex items-center space-x-2">
            <FiDownload />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid md:grid-cols-3 gap-4">
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
              Year (MI Census)
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="input-field"
            >
              <option value="2023">6th MI Census (2023)</option>
              <option value="2020">5th MI Census (2020)</option>
              <option value="2015">4th MI Census (2015)</option>
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
              <option value="trends">Trends & Gaps</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Irrigation Coverage</p>
          <p className="text-3xl font-bold text-blue-600">
            {currentData.irrigationCoverage.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {(currentData.totalIrrigatedArea / 1000).toFixed(0)}K ha irrigated
          </p>
        </div>

        <div className="card bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center space-x-1">
            <FiAlertTriangle size={14} />
            <span>Groundwater Dependence</span>
          </p>
          <p className="text-3xl font-bold text-red-600">
            {currentData.groundwaterDependence.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Tubewell + Dug Well
          </p>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Surface Water</p>
          <p className="text-3xl font-bold text-green-600">
            {currentData.surfaceWater.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Canal + Tank
          </p>
        </div>

        <div className="card bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Rainfed Area</p>
          <p className="text-3xl font-bold text-yellow-600">
            {currentData.rainfed.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Expansion potential
          </p>
        </div>
      </div>

      {viewMode === 'overview' && (
        <>
          {/* Irrigation Sources Breakdown */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Source-wise Distribution */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <FiPieChart className="text-primary-500" />
                <span>Irrigation Sources Distribution</span>
              </h3>
              <div className="space-y-4">
                {Object.entries(currentData.sources).map(([source, data]) => (
                  <div key={source}>
                    <div className="flex justify-between mb-2">
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white capitalize">
                          {source.replace('_', ' ')}
                        </span>
                        <p className="text-xs text-gray-500">
                          {(data.area / 1000).toFixed(0)}K ha | {data.schemes.toLocaleString()} schemes
                        </p>
                      </div>
                      <span className="text-2xl font-bold text-primary-600">
                        {data.percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          source === 'tubewell' ? 'bg-red-500' :
                          source === 'canal' ? 'bg-blue-500' :
                          source === 'dugWell' ? 'bg-orange-500' :
                          source === 'tank' ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                        style={{ width: `${data.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Groundwater vs Surface Water */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <FiActivity className="text-blue-500" />
                <span>Water Source Dependency</span>
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="font-semibold text-gray-900 dark:text-white">Groundwater</span>
                    <span className="text-3xl font-bold text-red-600">
                      {currentData.groundwaterDependence.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                    <div 
                      className="bg-red-500 h-6 rounded-full flex items-center justify-center" 
                      style={{ width: `${currentData.groundwaterDependence}%` }}
                    >
                      <span className="text-white font-bold text-sm">
                        {currentData.groundwaterDependence.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Includes: {currentData.sources.tubewell.percentage}% Tubewell + {currentData.sources.dugWell.percentage}% Dug Well
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <span className="font-semibold text-gray-900 dark:text-white">Surface Water</span>
                    <span className="text-3xl font-bold text-blue-600">
                      {currentData.surfaceWater.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                    <div 
                      className="bg-blue-500 h-6 rounded-full flex items-center justify-center" 
                      style={{ width: `${currentData.surfaceWater}%` }}
                    >
                      <span className="text-white font-bold text-sm">
                        {currentData.surfaceWater.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Includes: {currentData.sources.canal.percentage}% Canal + {currentData.sources.tank.percentage}% Tank
                  </p>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 rounded p-3 border border-red-200 dark:border-red-800">
                  <div className="flex items-start space-x-2">
                    <FiAlertTriangle className="text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-red-900 dark:text-red-200 text-sm">
                        High Groundwater Stress Alert!
                      </p>
                      <p className="text-xs text-red-800 dark:text-red-300 mt-1">
                        {currentData.groundwaterDependence}% dependence on groundwater is unsustainable. 
                        Urgent need to shift to surface water irrigation and improve canal systems.
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
            <span>District-Level Irrigation Analysis</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">District</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Irrigated Area</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Coverage %</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Canal</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Tubewell</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Dug Well</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">GW Stress</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Utilization</th>
                </tr>
              </thead>
              <tbody>
                {districts.map((district, index) => (
                  <tr key={index} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{district.name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {(district.irrigatedArea / 1000).toFixed(0)}K ha
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[80px]">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${district.coverage}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold">{district.coverage}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-blue-600 font-semibold">{district.canal}%</td>
                    <td className="px-4 py-3 text-red-600 font-semibold">{district.tubewell}%</td>
                    <td className="px-4 py-3 text-orange-600 font-semibold">{district.dugWell}%</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStressColor(district.gwStress)}`}>
                        {district.gwStress}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {district.utilizationRate.toFixed(1)}%
                        </span>
                        <p className="text-xs text-gray-500">
                          {(district.potentialUtilized / 1000).toFixed(0)}K / {(district.potentialCreated / 1000).toFixed(0)}K ha
                        </p>
                      </div>
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
          {/* Irrigation Potential Gap Analysis */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <FiTrendingUp className="text-green-500" />
              <span>Irrigation Potential: Created vs Utilized</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {districts.map((district, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{district.name}</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Potential Created</span>
                        <span className="font-bold">{(district.potentialCreated / 1000).toFixed(0)}K ha</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-300 h-2 rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Potential Utilized</span>
                        <span className="font-bold">{(district.potentialUtilized / 1000).toFixed(0)}K ha</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${district.utilizationRate}%` }}
                        />
                      </div>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded p-2">
                      <p className="text-xs text-yellow-800 dark:text-yellow-300">
                        <strong>Gap:</strong> {((district.potentialCreated - district.potentialUtilized) / 1000).toFixed(1)}K ha unutilized
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Temporal Trends */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              📈 Irrigation Trends (2020 vs 2023)
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Coverage Improvement</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">2020</span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {irrigationData[selectedState][2020].irrigationCoverage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-yellow-500 h-3 rounded-full" 
                        style={{ width: `${irrigationData[selectedState][2020].irrigationCoverage}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">2023</span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {irrigationData[selectedState][2023].irrigationCoverage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-full" 
                        style={{ width: `${irrigationData[selectedState][2023].irrigationCoverage}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                    <p className="text-sm text-green-800 dark:text-green-300">
                      <strong>Improvement:</strong> +{(irrigationData[selectedState][2023].irrigationCoverage - irrigationData[selectedState][2020].irrigationCoverage).toFixed(1)}% 
                      ({((irrigationData[selectedState][2023].totalIrrigatedArea - irrigationData[selectedState][2020].totalIrrigatedArea) / 1000).toFixed(0)}K ha added)
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Source-wise Change</h4>
                <div className="space-y-2">
                  {Object.keys(currentData.sources).map(source => {
                    const change = currentData.sources[source].area - irrigationData[selectedState][2020].sources[source].area;
                    const percentChange = ((change / irrigationData[selectedState][2020].sources[source].area) * 100).toFixed(1);
                    return (
                      <div key={source} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 rounded p-2">
                        <span className="text-sm font-medium capitalize">{source.replace('_', ' ')}</span>
                        <div className="text-right">
                          <span className={`text-sm font-bold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {change >= 0 ? '+' : ''}{(change / 1000).toFixed(1)}K ha
                          </span>
                          <p className="text-xs text-gray-500">
                            ({change >= 0 ? '+' : ''}{percentChange}%)
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Policy Recommendations */}
      <div className="card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-300 dark:border-purple-700">
        <h3 className="text-xl font-bold text-purple-900 dark:text-purple-200 mb-4">
          📋 Policy Recommendations for Sustainable Irrigation
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
              <FiAlertTriangle className="text-red-500" />
              <span>Critical Issues</span>
            </h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>• <strong>{currentData.groundwaterDependence}%</strong> groundwater dependence (unsustainable)</li>
              <li>• Only <strong>{currentData.surfaceWater}%</strong> utilizing surface water</li>
              <li>• <strong>{currentData.rainfed}%</strong> area still rainfed (vulnerable)</li>
              <li>• High tubewell density causing water table decline</li>
              <li>• Unutilized irrigation potential in several districts</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
              <FiTrendingUp className="text-green-500" />
              <span>Recommended Actions</span>
            </h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>• <strong>Expand canal networks</strong> to reduce GW dependency</li>
              <li>• <strong>Promote micro-irrigation</strong> (drip/sprinkler) for water efficiency</li>
              <li>• <strong>Revive traditional tanks</strong> for rainwater harvesting</li>
              <li>• <strong>Regulate tubewell boring</strong> in critical GW areas</li>
              <li>• <strong>Modernize canal systems</strong> to improve utilization rates</li>
              <li>• <strong>Link schemes to PMKSY</strong> for funding support</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 bg-green-100 dark:bg-green-900/30 rounded p-3">
          <p className="text-sm text-green-800 dark:text-green-300">
            <strong>Priority Districts:</strong> Focus on districts with &gt;65% tubewell dependence and &lt;90% potential utilization. 
            Target <strong>{((currentData.totalIrrigatedArea * currentData.groundwaterDependence / 100) / 1000).toFixed(0)}K ha</strong> for 
            surface water conversion to achieve sustainable irrigation.
          </p>
        </div>
      </div>

      {/* Export Options */}
      <div className="card bg-gray-50 dark:bg-gray-800">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          📥 Export Irrigation Data
        </h4>
        <div className="flex flex-wrap gap-3">
          <button onClick={exportDistrictCSV} className="btn-secondary">
            <FiDownload className="inline mr-2" />
            Download District Report (CSV)
          </button>
          <button onClick={exportSourceExcel} className="btn-secondary">
            <FiDownload className="inline mr-2" />
            Export Source Analysis (Excel)
          </button>
          <button onClick={generateMICensusPDF} className="btn-secondary">
            <FiDownload className="inline mr-2" />
            Generate MI Census Summary (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default IrrigationAnalysis;
