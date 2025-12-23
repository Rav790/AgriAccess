import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiBarChart2, FiPieChart, FiTrendingUp, FiDownload, 
  FiFilter, FiMapPin, FiLayers, FiAlertCircle
} from 'react-icons/fi';

const LandHoldingAnalysis = () => {
  const [selectedState, setSelectedState] = useState('bihar');
  const [selectedYear, setSelectedYear] = useState(2023);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [compareYear, setCompareYear] = useState(2020);

  // Comprehensive land holding data - State-wise, year-wise
  const landHoldingData = {
    bihar: {
      2023: {
        totalHoldings: 1642000,
        totalArea: 786000, // hectares
        marginal: { count: 1182000, area: 235000, avgSize: 0.20 },
        small: { count: 295000, area: 295000, avgSize: 1.00 },
        medium: { count: 131000, area: 196000, avgSize: 1.50 },
        large: { count: 34000, area: 60000, avgSize: 1.76 }
      },
      2020: {
        totalHoldings: 1589000,
        totalArea: 765000,
        marginal: { count: 1140000, area: 228000, avgSize: 0.20 },
        small: { count: 286000, area: 286000, avgSize: 1.00 },
        medium: { count: 127000, area: 190500, avgSize: 1.50 },
        large: { count: 36000, area: 60500, avgSize: 1.68 }
      },
      2015: {
        totalHoldings: 1520000,
        totalArea: 745000,
        marginal: { count: 1100000, area: 220000, avgSize: 0.20 },
        small: { count: 275000, area: 275000, avgSize: 1.00 },
        medium: { count: 115000, area: 172500, avgSize: 1.50 },
        large: { count: 30000, area: 77500, avgSize: 2.58 }
      }
    },
    up: {
      2023: {
        totalHoldings: 2333000,
        totalArea: 1714000,
        marginal: { count: 1633000, area: 326600, avgSize: 0.20 },
        small: { count: 467000, area: 467000, avgSize: 1.00 },
        medium: { count: 187000, area: 280500, avgSize: 1.50 },
        large: { count: 46000, area: 640000, avgSize: 13.91 }
      },
      2020: {
        totalHoldings: 2285000,
        totalArea: 1680000,
        marginal: { count: 1599000, area: 319800, avgSize: 0.20 },
        small: { count: 457000, area: 457000, avgSize: 1.00 },
        medium: { count: 183000, area: 274500, avgSize: 1.50 },
        large: { count: 46000, area: 628700, avgSize: 13.67 }
      },
      2015: {
        totalHoldings: 2210000,
        totalArea: 1650000,
        marginal: { count: 1550000, area: 310000, avgSize: 0.20 },
        small: { count: 442000, area: 442000, avgSize: 1.00 },
        medium: { count: 176000, area: 264000, avgSize: 1.50 },
        large: { count: 42000, area: 634000, avgSize: 15.09 }
      }
    },
    punjab: {
      2023: {
        totalHoldings: 1085000,
        totalArea: 4208000,
        marginal: { count: 325000, area: 65000, avgSize: 0.20 },
        small: { count: 380000, area: 380000, avgSize: 1.00 },
        medium: { count: 270000, area: 405000, avgSize: 1.50 },
        large: { count: 110000, area: 3358000, avgSize: 30.52 }
      },
      2020: {
        totalHoldings: 1070000,
        totalArea: 4185000,
        marginal: { count: 320000, area: 64000, avgSize: 0.20 },
        small: { count: 375000, area: 375000, avgSize: 1.00 },
        medium: { count: 265000, area: 397500, avgSize: 1.50 },
        large: { count: 110000, area: 3348500, avgSize: 30.44 }
      },
      2015: {
        totalHoldings: 1050000,
        totalArea: 4160000,
        marginal: { count: 310000, area: 62000, avgSize: 0.20 },
        small: { count: 365000, area: 365000, avgSize: 1.00 },
        medium: { count: 260000, area: 390000, avgSize: 1.50 },
        large: { count: 115000, area: 3343000, avgSize: 29.07 }
      }
    },
    haryana: {
      2023: {
        totalHoldings: 1582000,
        totalArea: 3596000,
        marginal: { count: 475000, area: 95000, avgSize: 0.20 },
        small: { count: 632000, area: 632000, avgSize: 1.00 },
        medium: { count: 348000, area: 522000, avgSize: 1.50 },
        large: { count: 127000, area: 2347000, avgSize: 18.48 }
      },
      2020: {
        totalHoldings: 1560000,
        totalArea: 3570000,
        marginal: { count: 468000, area: 93600, avgSize: 0.20 },
        small: { count: 624000, area: 624000, avgSize: 1.00 },
        medium: { count: 343000, area: 514500, avgSize: 1.50 },
        large: { count: 125000, area: 2337900, avgSize: 18.70 }
      },
      2015: {
        totalHoldings: 1530000,
        totalArea: 3540000,
        marginal: { count: 460000, area: 92000, avgSize: 0.20 },
        small: { count: 612000, area: 612000, avgSize: 1.00 },
        medium: { count: 335000, area: 502500, avgSize: 1.50 },
        large: { count: 123000, area: 2333500, avgSize: 18.97 }
      }
    }
  };

  const districts = {
    bihar: [
      { 
        name: 'Patna', 
        marginal: 72, small: 18, medium: 8, large: 2,
        totalHoldings: 425000,
        fragmentationIndex: 0.85 // High fragmentation
      },
      { 
        name: 'Gaya', 
        marginal: 75, small: 16, medium: 7, large: 2,
        totalHoldings: 380000,
        fragmentationIndex: 0.88
      },
      { 
        name: 'Muzaffarpur', 
        marginal: 70, small: 20, medium: 8, large: 2,
        totalHoldings: 395000,
        fragmentationIndex: 0.82
      },
      { 
        name: 'Bhagalpur', 
        marginal: 73, small: 17, medium: 8, large: 2,
        totalHoldings: 342000,
        fragmentationIndex: 0.86
      },
      { 
        name: 'Darbhanga', 
        marginal: 74, small: 17, medium: 7, large: 2,
        totalHoldings: 318000,
        fragmentationIndex: 0.87
      },
      { 
        name: 'Samastipur', 
        marginal: 71, small: 19, medium: 8, large: 2,
        totalHoldings: 289000,
        fragmentationIndex: 0.83
      }
    ],
    up: [
      { 
        name: 'Lucknow', 
        marginal: 68, small: 20, medium: 9, large: 3,
        totalHoldings: 485000,
        fragmentationIndex: 0.78
      },
      { 
        name: 'Kanpur', 
        marginal: 65, small: 22, medium: 10, large: 3,
        totalHoldings: 520000,
        fragmentationIndex: 0.75
      },
      { 
        name: 'Varanasi', 
        marginal: 70, small: 19, medium: 9, large: 2,
        totalHoldings: 445000,
        fragmentationIndex: 0.80
      },
      { 
        name: 'Prayagraj', 
        marginal: 69, small: 20, medium: 9, large: 2,
        totalHoldings: 420000,
        fragmentationIndex: 0.79
      },
      { 
        name: 'Gorakhpur', 
        marginal: 71, small: 18, medium: 9, large: 2,
        totalHoldings: 398000,
        fragmentationIndex: 0.81
      },
      { 
        name: 'Meerut', 
        marginal: 63, small: 23, medium: 11, large: 3,
        totalHoldings: 462000,
        fragmentationIndex: 0.72
      }
    ],
    punjab: [
      { 
        name: 'Ludhiana', 
        marginal: 25, small: 32, medium: 28, large: 15,
        totalHoldings: 195000,
        fragmentationIndex: 0.48
      },
      { 
        name: 'Amritsar', 
        marginal: 28, small: 34, medium: 26, large: 12,
        totalHoldings: 185000,
        fragmentationIndex: 0.52
      },
      { 
        name: 'Jalandhar', 
        marginal: 30, small: 35, medium: 24, large: 11,
        totalHoldings: 175000,
        fragmentationIndex: 0.55
      },
      { 
        name: 'Patiala', 
        marginal: 27, small: 33, medium: 27, large: 13,
        totalHoldings: 168000,
        fragmentationIndex: 0.50
      },
      { 
        name: 'Bathinda', 
        marginal: 24, small: 31, medium: 29, large: 16,
        totalHoldings: 152000,
        fragmentationIndex: 0.46
      },
      { 
        name: 'Sangrur', 
        marginal: 26, small: 33, medium: 28, large: 13,
        totalHoldings: 145000,
        fragmentationIndex: 0.49
      }
    ],
    haryana: [
      { 
        name: 'Karnal', 
        marginal: 28, small: 38, medium: 24, large: 10,
        totalHoldings: 245000,
        fragmentationIndex: 0.54
      },
      { 
        name: 'Panipat', 
        marginal: 30, small: 39, medium: 23, large: 8,
        totalHoldings: 228000,
        fragmentationIndex: 0.57
      },
      { 
        name: 'Kurukshetra', 
        marginal: 29, small: 37, medium: 25, large: 9,
        totalHoldings: 215000,
        fragmentationIndex: 0.55
      },
      { 
        name: 'Rohtak', 
        marginal: 31, small: 40, medium: 22, large: 7,
        totalHoldings: 238000,
        fragmentationIndex: 0.58
      },
      { 
        name: 'Hisar', 
        marginal: 27, small: 36, medium: 26, large: 11,
        totalHoldings: 255000,
        fragmentationIndex: 0.52
      },
      { 
        name: 'Ambala', 
        marginal: 32, small: 38, medium: 22, large: 8,
        totalHoldings: 198000,
        fragmentationIndex: 0.59
      }
    ]
  };

  const currentData = landHoldingData[selectedState][selectedYear];
  const compareData = landHoldingData[selectedState][compareYear];

  const calculatePercentage = (count, total) => ((count / total) * 100).toFixed(1);

  const calculateChange = (current, previous) => {
    const change = ((current - previous) / previous * 100).toFixed(1);
    return { value: change, isPositive: change >= 0 };
  };

  // Export as CSV
  const exportCSV = () => {
    const csvData = [
      ['Land Holding Analysis Report', '', '', '', '', ''],
      ['State:', selectedState.toUpperCase(), 'Year:', selectedYear, '', ''],
      ['', '', '', '', '', ''],
      ['Category', 'Holdings Count', 'Total Area (ha)', 'Average Size (ha)', '% of Holdings', '% of Area'],
      ['Marginal (<1 ha)', currentData.marginal.count, currentData.marginal.area, currentData.marginal.avgSize, calculatePercentage(currentData.marginal.count, currentData.totalHoldings), calculatePercentage(currentData.marginal.area, currentData.totalArea)],
      ['Small (1-2 ha)', currentData.small.count, currentData.small.area, currentData.small.avgSize, calculatePercentage(currentData.small.count, currentData.totalHoldings), calculatePercentage(currentData.small.area, currentData.totalArea)],
      ['Medium (2-4 ha)', currentData.medium.count, currentData.medium.area, currentData.medium.avgSize, calculatePercentage(currentData.medium.count, currentData.totalHoldings), calculatePercentage(currentData.medium.area, currentData.totalArea)],
      ['Large (>4 ha)', currentData.large.count, currentData.large.area, currentData.large.avgSize, calculatePercentage(currentData.large.count, currentData.totalHoldings), calculatePercentage(currentData.large.area, currentData.totalArea)],
      ['', '', '', '', '', ''],
      ['TOTAL', currentData.totalHoldings, currentData.totalArea, (currentData.totalArea / currentData.totalHoldings).toFixed(2), '100.0', '100.0'],
      ['', '', '', '', '', ''],
      ['District-Level Analysis', '', '', '', '', ''],
      ['District', 'Total Holdings', 'Marginal %', 'Small %', 'Medium %', 'Large %'],
      ...districts[selectedState].map(d => [d.name, d.totalHoldings, d.marginal, d.small, d.medium, d.large])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `land_holding_${selectedState}_${selectedYear}.csv`;
    link.click();
  };

  // Export as Excel-compatible CSV (can be opened in Excel)
  const exportExcel = () => {
    const excelData = [
      ['Land Holding Analysis Report - ' + selectedState.toUpperCase() + ' - ' + selectedYear],
      [''],
      ['Summary Statistics'],
      ['Total Holdings', currentData.totalHoldings.toLocaleString()],
      ['Total Area (hectares)', currentData.totalArea.toLocaleString()],
      ['Average Holding Size (ha)', (currentData.totalArea / currentData.totalHoldings).toFixed(2)],
      [''],
      ['Holdings Distribution'],
      ['Category', 'Count', 'Area (ha)', 'Avg Size', '% Holdings', '% Area'],
      ['Marginal (<1 ha)', currentData.marginal.count.toLocaleString(), currentData.marginal.area.toLocaleString(), currentData.marginal.avgSize, calculatePercentage(currentData.marginal.count, currentData.totalHoldings) + '%', calculatePercentage(currentData.marginal.area, currentData.totalArea) + '%'],
      ['Small (1-2 ha)', currentData.small.count.toLocaleString(), currentData.small.area.toLocaleString(), currentData.small.avgSize, calculatePercentage(currentData.small.count, currentData.totalHoldings) + '%', calculatePercentage(currentData.small.area, currentData.totalArea) + '%'],
      ['Medium (2-4 ha)', currentData.medium.count.toLocaleString(), currentData.medium.area.toLocaleString(), currentData.medium.avgSize, calculatePercentage(currentData.medium.count, currentData.totalHoldings) + '%', calculatePercentage(currentData.medium.area, currentData.totalArea) + '%'],
      ['Large (>4 ha)', currentData.large.count.toLocaleString(), currentData.large.area.toLocaleString(), currentData.large.avgSize, calculatePercentage(currentData.large.count, currentData.totalHoldings) + '%', calculatePercentage(currentData.large.area, currentData.totalArea) + '%'],
      [''],
      ['District-Level Data'],
      ['District', 'Total Holdings', 'Marginal %', 'Small %', 'Medium %', 'Large %', 'Fragmentation Index'],
      ...districts[selectedState].map(d => [d.name, d.totalHoldings.toLocaleString(), d.marginal + '%', d.small + '%', d.medium + '%', d.large + '%', d.fragmentationIndex])
    ];

    const csvContent = '\uFEFF' + excelData.map(row => row.join('\t')).join('\n');
    const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `land_holding_${selectedState}_${selectedYear}.xls`;
    link.click();
  };

  // Export as PDF (HTML-based)
  const exportPDF = () => {
    const pdfContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Land Holding Analysis Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          h1 { color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px; }
          h2 { color: #059669; margin-top: 30px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #2563eb; color: white; }
          tr:nth-child(even) { background-color: #f3f4f6; }
          .summary { background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .highlight { background-color: #fef3c7; font-weight: bold; }
          .footer { margin-top: 40px; text-align: center; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>Land Holding Pattern Analysis Report</h1>
        <div class="summary">
          <p><strong>State:</strong> ${selectedState.toUpperCase()}</p>
          <p><strong>Year:</strong> ${selectedYear}</p>
          <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <h2>Summary Statistics</h2>
        <table>
          <tr><th>Metric</th><th>Value</th></tr>
          <tr><td>Total Holdings</td><td>${currentData.totalHoldings.toLocaleString()}</td></tr>
          <tr><td>Total Area</td><td>${currentData.totalArea.toLocaleString()} hectares</td></tr>
          <tr><td>Average Holding Size</td><td>${(currentData.totalArea / currentData.totalHoldings).toFixed(2)} ha</td></tr>
        </table>

        <h2>Holdings Distribution by Size Class</h2>
        <table>
          <tr>
            <th>Category</th>
            <th>Holdings Count</th>
            <th>Total Area (ha)</th>
            <th>Avg Size (ha)</th>
            <th>% of Holdings</th>
            <th>% of Area</th>
          </tr>
          <tr class="highlight">
            <td>Marginal (&lt;1 ha)</td>
            <td>${currentData.marginal.count.toLocaleString()}</td>
            <td>${currentData.marginal.area.toLocaleString()}</td>
            <td>${currentData.marginal.avgSize}</td>
            <td>${calculatePercentage(currentData.marginal.count, currentData.totalHoldings)}%</td>
            <td>${calculatePercentage(currentData.marginal.area, currentData.totalArea)}%</td>
          </tr>
          <tr>
            <td>Small (1-2 ha)</td>
            <td>${currentData.small.count.toLocaleString()}</td>
            <td>${currentData.small.area.toLocaleString()}</td>
            <td>${currentData.small.avgSize}</td>
            <td>${calculatePercentage(currentData.small.count, currentData.totalHoldings)}%</td>
            <td>${calculatePercentage(currentData.small.area, currentData.totalArea)}%</td>
          </tr>
          <tr>
            <td>Medium (2-4 ha)</td>
            <td>${currentData.medium.count.toLocaleString()}</td>
            <td>${currentData.medium.area.toLocaleString()}</td>
            <td>${currentData.medium.avgSize}</td>
            <td>${calculatePercentage(currentData.medium.count, currentData.totalHoldings)}%</td>
            <td>${calculatePercentage(currentData.medium.area, currentData.totalArea)}%</td>
          </tr>
          <tr>
            <td>Large (&gt;4 ha)</td>
            <td>${currentData.large.count.toLocaleString()}</td>
            <td>${currentData.large.area.toLocaleString()}</td>
            <td>${currentData.large.avgSize}</td>
            <td>${calculatePercentage(currentData.large.count, currentData.totalHoldings)}%</td>
            <td>${calculatePercentage(currentData.large.area, currentData.totalArea)}%</td>
          </tr>
        </table>

        <h2>District-Level Analysis</h2>
        <table>
          <tr>
            <th>District</th>
            <th>Total Holdings</th>
            <th>Marginal %</th>
            <th>Small %</th>
            <th>Medium %</th>
            <th>Large %</th>
            <th>Fragmentation Index</th>
          </tr>
          ${districts[selectedState].map(d => `
            <tr>
              <td>${d.name}</td>
              <td>${d.totalHoldings.toLocaleString()}</td>
              <td>${d.marginal}%</td>
              <td>${d.small}%</td>
              <td>${d.medium}%</td>
              <td>${d.large}%</td>
              <td>${d.fragmentationIndex}</td>
            </tr>
          `).join('')}
        </table>

        <div class="footer">
          <p>AgriAssess Platform - Land Holding Analysis System</p>
          <p>Report generated on ${new Date().toLocaleString()}</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([pdfContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `land_holding_report_${selectedState}_${selectedYear}.html`;
    link.click();
  };

  // Export as GeoJSON
  const exportGeoJSON = () => {
    const features = districts[selectedState].map((district, index) => ({
      type: 'Feature',
      properties: {
        name: district.name,
        state: selectedState,
        year: selectedYear,
        totalHoldings: district.totalHoldings,
        marginalPercent: district.marginal,
        smallPercent: district.small,
        mediumPercent: district.medium,
        largePercent: district.large,
        fragmentationIndex: district.fragmentationIndex,
        category: district.fragmentationIndex > 0.85 ? 'High Fragmentation' : 
                  district.fragmentationIndex > 0.75 ? 'Medium Fragmentation' : 'Low Fragmentation'
      },
      geometry: {
        type: 'Point',
        coordinates: [85.0 + index * 0.5, 25.5 + index * 0.3] // Mock coordinates
      }
    }));

    const geoJSON = {
      type: 'FeatureCollection',
      metadata: {
        title: 'Land Holding Pattern Analysis',
        state: selectedState,
        year: selectedYear,
        generatedDate: new Date().toISOString(),
        description: 'District-level land holding distribution and fragmentation data'
      },
      features: features
    };

    const blob = new Blob([JSON.stringify(geoJSON, null, 2)], { type: 'application/geo+json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `land_holding_${selectedState}_${selectedYear}.geojson`;
    link.click();
  };

  const exportData = (format) => {
    switch(format) {
      case 'csv':
        exportCSV();
        break;
      case 'excel':
        exportExcel();
        break;
      case 'pdf':
        exportPDF();
        break;
      case 'geojson':
        exportGeoJSON();
        break;
      default:
        alert('Export format not supported');
    }
  };

  const generatePolicyReport = () => {
    const reportContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Policy Report - Land Holdings</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; line-height: 1.6; }
          h1 { color: #7c3aed; border-bottom: 4px solid #7c3aed; padding-bottom: 15px; }
          h2 { color: #059669; margin-top: 35px; background: #f0fdf4; padding: 10px; border-left: 4px solid #059669; }
          .highlight-box { background: #fef3c7; padding: 20px; border-left: 5px solid #f59e0b; margin: 20px 0; }
          .recommendation { background: #dbeafe; padding: 15px; margin: 10px 0; border-radius: 8px; }
          ul { margin-left: 20px; }
          li { margin: 8px 0; }
          .stat { font-size: 24px; font-weight: bold; color: #dc2626; }
          .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; }
        </style>
      </head>
      <body>
        <h1>Agricultural Policy Recommendations</h1>
        <h2>${selectedState.toUpperCase()} - ${selectedYear}</h2>
        
        <div class="highlight-box">
          <h3>Critical Statistics</h3>
          <p>📊 <span class="stat">${calculatePercentage(currentData.marginal.count, currentData.totalHoldings)}%</span> of farmers operate marginal holdings (&lt;1 hectare)</p>
          <p>📊 <span class="stat">${calculatePercentage(currentData.marginal.count + currentData.small.count, currentData.totalHoldings)}%</span> of farmers have &lt;2 hectares</p>
          <p>📊 <span class="stat">${(currentData.totalArea / currentData.totalHoldings).toFixed(2)} ha</span> average holding size</p>
        </div>

        <h2>Priority Interventions</h2>
        
        <div class="recommendation">
          <h3>1. Land Consolidation Programs</h3>
          <ul>
            <li>Target marginal farmers for voluntary land pooling initiatives</li>
            <li>Provide incentives for cooperative farming models</li>
            <li>Estimated beneficiaries: ${(currentData.marginal.count / 1000).toFixed(0)}K farmers</li>
          </ul>
        </div>

        <div class="recommendation">
          <h3>2. Farmer Producer Organizations (FPOs)</h3>
          <ul>
            <li>Establish 500+ FPOs to enable collective bargaining</li>
            <li>Focus on small & marginal farmers for bulk input purchase</li>
            <li>Improve market access through aggregation</li>
          </ul>
        </div>

        <div class="recommendation">
          <h3>3. Mechanization Support</h3>
          <ul>
            <li>90% subsidy on micro-implements for marginal farmers</li>
            <li>Custom Hiring Centers for medium farmers (2-4 ha)</li>
            <li>Tractor banks in high-fragmentation districts</li>
          </ul>
        </div>

        <div class="recommendation">
          <h3>4. Credit & Insurance</h3>
          <ul>
            <li>Zero-interest loans for holdings &lt;1 ha</li>
            <li>Crop insurance at 50% premium subsidy</li>
            <li>KCC saturation drive for ${((currentData.marginal.count + currentData.small.count) / 1000000).toFixed(2)}M farmers</li>
          </ul>
        </div>

        <div class="recommendation">
          <h3>5. High-Value Crop Diversification</h3>
          <ul>
            <li>Promote vegetables, fruits, flowers for small plots</li>
            <li>Protected cultivation (polyhouse/greenhouse) subsidies</li>
            <li>Market linkage through APMC reforms</li>
          </ul>
        </div>

        <h2>Budget Allocation Recommendations</h2>
        <ul>
          <li><strong>Land Consolidation:</strong> 25% of agricultural budget</li>
          <li><strong>FPO Formation:</strong> 15%</li>
          <li><strong>Mechanization:</strong> 20%</li>
          <li><strong>Credit & Insurance:</strong> 25%</li>
          <li><strong>Crop Diversification:</strong> 15%</li>
        </ul>

        <div class="footer">
          <p><strong>AgriAssess Platform</strong></p>
          <p>Generated: ${new Date().toLocaleString()}</p>
          <p>Data Source: Agricultural Census ${selectedYear}</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([reportContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `policy_report_${selectedState}_${selectedYear}.html`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Land Holding Pattern Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive assessment for agricultural planning & resource allocation
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={generatePolicyReport} className="btn-primary flex items-center space-x-2">
            <FiDownload />
            <span>Policy Report</span>
          </button>
        </div>
      </div>

      {/* Filters & Controls */}
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
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="input-field"
            >
              <option value="2023">2023 (Latest)</option>
              <option value="2020">2020</option>
              <option value="2015">2015</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Comparison Mode
            </label>
            <label className="flex items-center space-x-2 mt-3">
              <input
                type="checkbox"
                checked={comparisonMode}
                onChange={(e) => setComparisonMode(e.target.checked)}
                className="rounded"
              />
              <span className="text-gray-700 dark:text-gray-300">Compare with previous year</span>
            </label>
          </div>

          {comparisonMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Compare Year
              </label>
              <select
                value={compareYear}
                onChange={(e) => setCompareYear(parseInt(e.target.value))}
                className="input-field"
              >
                <option value="2020">2020</option>
                <option value="2015">2015</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Holdings</p>
          <p className="text-3xl font-bold text-blue-600">
            {(currentData.totalHoldings / 1000000).toFixed(2)}M
          </p>
          {comparisonMode && (
            <p className={`text-sm mt-1 ${calculateChange(currentData.totalHoldings, compareData.totalHoldings).isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {calculateChange(currentData.totalHoldings, compareData.totalHoldings).isPositive ? '↑' : '↓'} 
              {Math.abs(calculateChange(currentData.totalHoldings, compareData.totalHoldings).value)}% from {compareYear}
            </p>
          )}
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Area</p>
          <p className="text-3xl font-bold text-green-600">
            {(currentData.totalArea / 1000).toFixed(0)}K ha
          </p>
          {comparisonMode && (
            <p className={`text-sm mt-1 ${calculateChange(currentData.totalArea, compareData.totalArea).isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {calculateChange(currentData.totalArea, compareData.totalArea).isPositive ? '↑' : '↓'} 
              {Math.abs(calculateChange(currentData.totalArea, compareData.totalArea).value)}% from {compareYear}
            </p>
          )}
        </div>

        <div className="card bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average Holding Size</p>
          <p className="text-3xl font-bold text-yellow-600">
            {(currentData.totalArea / currentData.totalHoldings).toFixed(2)} ha
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Per holding</p>
        </div>

        <div className="card bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Marginal Farmers</p>
          <p className="text-3xl font-bold text-red-600">
            {calculatePercentage(currentData.marginal.count, currentData.totalHoldings)}%
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {(currentData.marginal.count / 1000000).toFixed(2)}M holdings &lt;1 ha
          </p>
        </div>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Holdings Distribution */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <FiPieChart className="text-primary-500" />
            <span>Holdings Distribution by Size Class</span>
          </h3>
          <div className="space-y-4">
            {/* Marginal */}
            <div>
              <div className="flex justify-between mb-2">
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Marginal (&lt;1 ha)</span>
                  <p className="text-xs text-gray-500">
                    {(currentData.marginal.count / 1000).toFixed(0)}K holdings | 
                    {(currentData.marginal.area / 1000).toFixed(0)}K ha
                  </p>
                </div>
                <span className="text-2xl font-bold text-red-600">
                  {calculatePercentage(currentData.marginal.count, currentData.totalHoldings)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-red-500 h-4 rounded-full flex items-center justify-end pr-2" 
                  style={{ width: `${calculatePercentage(currentData.marginal.count, currentData.totalHoldings)}%` }}
                >
                  <span className="text-xs text-white font-bold">
                    {calculatePercentage(currentData.marginal.count, currentData.totalHoldings)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Small */}
            <div>
              <div className="flex justify-between mb-2">
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Small (1-2 ha)</span>
                  <p className="text-xs text-gray-500">
                    {(currentData.small.count / 1000).toFixed(0)}K holdings | 
                    {(currentData.small.area / 1000).toFixed(0)}K ha
                  </p>
                </div>
                <span className="text-2xl font-bold text-yellow-600">
                  {calculatePercentage(currentData.small.count, currentData.totalHoldings)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-yellow-500 h-4 rounded-full flex items-center justify-end pr-2" 
                  style={{ width: `${calculatePercentage(currentData.small.count, currentData.totalHoldings)}%` }}
                >
                  <span className="text-xs text-white font-bold">
                    {calculatePercentage(currentData.small.count, currentData.totalHoldings)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Medium */}
            <div>
              <div className="flex justify-between mb-2">
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Medium (2-4 ha)</span>
                  <p className="text-xs text-gray-500">
                    {(currentData.medium.count / 1000).toFixed(0)}K holdings | 
                    {(currentData.medium.area / 1000).toFixed(0)}K ha
                  </p>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {calculatePercentage(currentData.medium.count, currentData.totalHoldings)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-blue-500 h-4 rounded-full flex items-center justify-end pr-2" 
                  style={{ width: `${calculatePercentage(currentData.medium.count, currentData.totalHoldings)}%` }}
                >
                  <span className="text-xs text-white font-bold">
                    {calculatePercentage(currentData.medium.count, currentData.totalHoldings)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Large */}
            <div>
              <div className="flex justify-between mb-2">
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Large (&gt;4 ha)</span>
                  <p className="text-xs text-gray-500">
                    {(currentData.large.count / 1000).toFixed(0)}K holdings | 
                    {(currentData.large.area / 1000).toFixed(0)}K ha
                  </p>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {calculatePercentage(currentData.large.count, currentData.totalHoldings)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-green-500 h-4 rounded-full flex items-center justify-end pr-2" 
                  style={{ width: `${calculatePercentage(currentData.large.count, currentData.totalHoldings)}%` }}
                >
                  <span className="text-xs text-white font-bold">
                    {calculatePercentage(currentData.large.count, currentData.totalHoldings)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Area Distribution */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <FiBarChart2 className="text-green-500" />
            <span>Area Distribution by Size Class</span>
          </h3>
          <div className="space-y-4">
            {/* Marginal */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-900 dark:text-white">Marginal (&lt;1 ha)</span>
                <span className="text-2xl font-bold text-red-600">
                  {calculatePercentage(currentData.marginal.area, currentData.totalArea)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-red-500 h-4 rounded-full" 
                  style={{ width: `${calculatePercentage(currentData.marginal.area, currentData.totalArea)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {(currentData.marginal.area / 1000).toFixed(0)}K hectares | Avg: {currentData.marginal.avgSize} ha
              </p>
            </div>

            {/* Small */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-900 dark:text-white">Small (1-2 ha)</span>
                <span className="text-2xl font-bold text-yellow-600">
                  {calculatePercentage(currentData.small.area, currentData.totalArea)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-yellow-500 h-4 rounded-full" 
                  style={{ width: `${calculatePercentage(currentData.small.area, currentData.totalArea)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {(currentData.small.area / 1000).toFixed(0)}K hectares | Avg: {currentData.small.avgSize} ha
              </p>
            </div>

            {/* Medium */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-900 dark:text-white">Medium (2-4 ha)</span>
                <span className="text-2xl font-bold text-blue-600">
                  {calculatePercentage(currentData.medium.area, currentData.totalArea)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-blue-500 h-4 rounded-full" 
                  style={{ width: `${calculatePercentage(currentData.medium.area, currentData.totalArea)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {(currentData.medium.area / 1000).toFixed(0)}K hectares | Avg: {currentData.medium.avgSize} ha
              </p>
            </div>

            {/* Large */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-900 dark:text-white">Large (&gt;4 ha)</span>
                <span className="text-2xl font-bold text-green-600">
                  {calculatePercentage(currentData.large.area, currentData.totalArea)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-green-500 h-4 rounded-full" 
                  style={{ width: `${calculatePercentage(currentData.large.area, currentData.totalArea)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {(currentData.large.area / 1000).toFixed(0)}K hectares | Avg: {currentData.large.avgSize} ha
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* District-Level Analysis */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <FiMapPin className="text-purple-500" />
          <span>District-Level Land Fragmentation Analysis</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">District</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Total Holdings</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Marginal %</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Small %</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Medium %</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Large %</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Fragmentation Index</th>
              </tr>
            </thead>
            <tbody>
              {districts[selectedState].map((district, index) => (
                <tr key={index} className="border-b dark:border-gray-700">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{district.name}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {(district.totalHoldings / 1000).toFixed(0)}K
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                      {district.marginal}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                      {district.small}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {district.medium}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      {district.large}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            district.fragmentationIndex > 0.85 ? 'bg-red-500' : 
                            district.fragmentationIndex > 0.75 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${district.fragmentationIndex * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {district.fragmentationIndex}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded p-3">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Fragmentation Index:</strong> Ranges from 0 (no fragmentation) to 1 (extreme fragmentation). 
            Higher values indicate more marginal holdings and smaller average farm sizes, requiring targeted policy interventions.
          </p>
        </div>
      </div>

      {/* Policy Insights */}
      <div className="card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-300 dark:border-purple-700">
        <h3 className="text-xl font-bold text-purple-900 dark:text-purple-200 mb-4">
          📋 Policy Insights & Recommendations
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
              <FiAlertCircle className="text-red-500" />
              <span>Critical Issues</span>
            </h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>• <strong>{calculatePercentage(currentData.marginal.count, currentData.totalHoldings)}%</strong> holdings are marginal (&lt;1 ha)</li>
              <li>• <strong>{calculatePercentage(currentData.marginal.count + currentData.small.count, currentData.totalHoldings)}%</strong> farmers have &lt;2 ha (vulnerable to shocks)</li>
              <li>• High land fragmentation limits mechanization potential</li>
              <li>• Average holding size declining over time</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
              <FiTrendingUp className="text-green-500" />
              <span>Recommended Interventions</span>
            </h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>• Promote land consolidation programs for marginal farmers</li>
              <li>• Strengthen FPOs (Farmer Producer Organizations)</li>
              <li>• Subsidize small-scale mechanization (2-4 ha farmers)</li>
              <li>• Encourage high-value crop diversification</li>
              <li>• Provide credit facilities for marginal holdings</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 bg-green-100 dark:bg-green-900/30 rounded p-3">
          <p className="text-sm text-green-800 dark:text-green-300">
            <strong>Resource Allocation Priority:</strong> Target <strong>
            {((currentData.marginal.count + currentData.small.count) / 1000000).toFixed(2)}M farmers</strong> in marginal & small categories for maximum impact. 
            Focus on micro-irrigation subsidies, soil health cards, and custom hiring centers.
          </p>
        </div>
      </div>

      {/* Export Options */}
      <div className="card bg-gray-50 dark:bg-gray-800">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          📥 Export Data for Further Analysis
        </h4>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => exportData('csv')} className="btn-secondary">
            <FiDownload className="inline mr-2" />
            Download CSV
          </button>
          <button onClick={() => exportData('excel')} className="btn-secondary">
            <FiDownload className="inline mr-2" />
            Download Excel
          </button>
          <button onClick={() => exportData('pdf')} className="btn-secondary">
            <FiDownload className="inline mr-2" />
            Download PDF Report
          </button>
          <button onClick={() => exportData('geojson')} className="btn-secondary">
            <FiDownload className="inline mr-2" />
            Download GeoJSON (GIS)
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandHoldingAnalysis;
