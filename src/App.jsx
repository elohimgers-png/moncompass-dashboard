import React, { useState, useRef } from 'react'; // 1. ADDED useRef
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toPng } from 'html-to-image'; // 2. ADDED html-to-image import
import './App.css';

function App() {
  const staticData = {
    inflation: [
      { year: '2010', Kenya: 4.1, Uganda: 4.0, Tanzania: 6.5, Singapore: 2.8, Malaysia: 1.7, 'South Africa': 4.3, Indonesia: 5.1, Bangladesh: 8.1 },
      { year: '2011', Kenya: 5.4, Uganda: 5.0, Tanzania: 6.2, Singapore: 5.2, Malaysia: 3.2, 'South Africa': 5.0, Indonesia: 5.4, Bangladesh: 10.7 },
      { year: '2012', Kenya: 9.4, Uganda: 14.0, Tanzania: 10.0, Singapore: 4.6, Malaysia: 1.7, 'South Africa': 5.7, Indonesia: 4.3, Bangladesh: 8.2 },
      { year: '2013', Kenya: 5.7, Uganda: 5.4, Tanzania: 7.9, Singapore: 2.4, Malaysia: 2.1, 'South Africa': 5.8, Indonesia: 4.4, Bangladesh: 7.5 },
      { year: '2014', Kenya: 6.9, Uganda: 4.3, Tanzania: 6.2, Singapore: 1.0, Malaysia: 3.1, 'South Africa': 6.1, Indonesia: 4.5, Bangladesh: 7.4 },
      { year: '2015', Kenya: 6.8, Uganda: 7.2, Tanzania: 5.6, Singapore: -0.5, Malaysia: 2.1, 'South Africa': 4.6, Indonesia: 3.5, Bangladesh: 6.2 },
      { year: '2016', Kenya: 6.3, Uganda: 5.3, Tanzania: 5.2, Singapore: -0.5, Malaysia: 2.1, 'South Africa': 6.3, Indonesia: 3.5, Bangladesh: 5.5 },
      { year: '2017', Kenya: 8.0, Uganda: 3.4, Tanzania: 5.2, Singapore: 0.6, Malaysia: 3.8, 'South Africa': 5.2, Indonesia: 3.8, Bangladesh: 5.4 },
      { year: '2018', Kenya: 4.7, Uganda: 2.2, Tanzania: 3.5, Singapore: 0.5, Malaysia: 1.0, 'South Africa': 4.6, Indonesia: 3.2, Bangladesh: 5.5 },
      { year: '2019', Kenya: 5.2, Uganda: 2.9, Tanzania: 3.5, Singapore: 0.6, Malaysia: 0.7, 'South Africa': 4.1, Indonesia: 2.8, Bangladesh: 5.5 },
      { year: '2020', Kenya: 5.4, Uganda: 3.2, Tanzania: 3.3, Singapore: -0.2, Malaysia: -1.1, 'South Africa': 3.4, Indonesia: 2.1, Bangladesh: 5.6 },
      { year: '2021', Kenya: 6.1, Uganda: 2.1, Tanzania: 3.7, Singapore: 2.3, Malaysia: 2.5, 'South Africa': 4.5, Indonesia: 2.2, Bangladesh: 5.6 },
      { year: '2022', Kenya: 7.6, Uganda: 5.4, Tanzania: 4.4, Singapore: 6.5, Malaysia: 3.4, 'South Africa': 6.9, Indonesia: 4.2, Bangladesh: 6.2 },
      { year: '2023', Kenya: 6.9, Uganda: 2.8, Tanzania: 3.0, Singapore: 4.8, Malaysia: 2.5, 'South Africa': 6.0, Indonesia: 3.7, Bangladesh: 9.7 },
      { year: '2024', Kenya: 5.2, Uganda: 3.0, Tanzania: 3.8, Singapore: 2.7, Malaysia: 2.0, 'South Africa': 5.1, Indonesia: 2.8, Bangladesh: 9.9 },
      { year: '2025', Kenya: 5.0, Uganda: 3.2, Tanzania: 4.0, Singapore: 2.5, Malaysia: 2.2, 'South Africa': 4.8, Indonesia: 3.0, Bangladesh: 8.5 }
    ],
    gdp: [
      { year: '2010', Kenya: 8.4, Uganda: 6.5, Tanzania: 6.4, Singapore: 15.2, Malaysia: 7.4, 'South Africa': 3.0, Indonesia: 6.2, Bangladesh: 6.1 },
      { year: '2011', Kenya: 6.1, Uganda: 5.1, Tanzania: 7.0, Singapore: 6.3, Malaysia: 5.3, 'South Africa': 3.3, Indonesia: 6.2, Bangladesh: 6.5 },
      { year: '2012', Kenya: 4.6, Uganda: 1.5, Tanzania: 6.9, Singapore: 3.6, Malaysia: 5.5, 'South Africa': 2.2, Indonesia: 6.0, Bangladesh: 6.2 },
      { year: '2013', Kenya: 5.7, Uganda: 4.4, Tanzania: 7.5, Singapore: 4.4, Malaysia: 4.7, 'South Africa': 2.5, Indonesia: 5.6, Bangladesh: 6.0 },
      { year: '2014', Kenya: 6.2, Uganda: 5.2, Tanzania: 7.0, Singapore: 4.4, Malaysia: 6.0, 'South Africa': 1.8, Indonesia: 5.0, Bangladesh: 6.1 },
      { year: '2015', Kenya: 5.6, Uganda: 6.0, Tanzania: 6.9, Singapore: 3.0, Malaysia: 5.0, 'South Africa': 1.3, Indonesia: 4.9, Bangladesh: 6.6 },
      { year: '2016', Kenya: 6.0, Uganda: 3.9, Tanzania: 6.9, Singapore: 3.6, Malaysia: 4.4, 'South Africa': 0.2, Indonesia: 5.0, Bangladesh: 7.1 },
      { year: '2017', Kenya: 5.9, Uganda: 5.0, Tanzania: 6.8, Singapore: 4.4, Malaysia: 5.9, 'South Africa': 1.5, Indonesia: 5.1, Bangladesh: 7.3 },
      { year: '2018', Kenya: 6.3, Uganda: 6.1, Tanzania: 5.4, Singapore: 3.5, Malaysia: 4.9, 'South Africa': 0.9, Indonesia: 5.2, Bangladesh: 7.9 },
      { year: '2019', Kenya: 5.4, Uganda: 6.5, Tanzania: 5.8, Singapore: 1.1, Malaysia: 4.4, 'South Africa': 0.2, Indonesia: 5.0, Bangladesh: 8.2 },
      { year: '2020', Kenya: 0.3, Uganda: 3.0, Tanzania: 4.8, Singapore: -2.8, Malaysia: -5.9, 'South Africa': -6.0, Indonesia: -2.1, Bangladesh: 3.4 },
      { year: '2021', Kenya: 7.6, Uganda: 6.7, Tanzania: 4.9, Singapore: 8.9, Malaysia: 3.1, 'South Africa': 4.7, Indonesia: 3.7, Bangladesh: 6.9 },
      { year: '2022', Kenya: 4.8, Uganda: 4.6, Tanzania: 4.6, Singapore: 3.8, Malaysia: 8.7, 'South Africa': 1.9, Indonesia: 5.3, Bangladesh: 7.1 },
      { year: '2023', Kenya: 5.0, Uganda: 5.3, Tanzania: 5.2, Singapore: 1.1, Malaysia: 3.6, 'South Africa': 0.6, Indonesia: 5.0, Bangladesh: 5.8 },
      { year: '2024', Kenya: 5.2, Uganda: 6.0, Tanzania: 5.5, Singapore: 3.0, Malaysia: 4.5, 'South Africa': 1.0, Indonesia: 5.1, Bangladesh: 5.8 },
      { year: '2025', Kenya: 5.5, Uganda: 6.2, Tanzania: 6.0, Singapore: 2.5, Malaysia: 4.8, 'South Africa': 1.5, Indonesia: 5.2, Bangladesh: 6.5 }
    ],
    population: [
      { year: '2010', Kenya: 40.9, Uganda: 33.8, Tanzania: 49.3, Singapore: 5.1, Malaysia: 28.3, 'South Africa': 51.0, Indonesia: 242.5, Bangladesh: 149.6 },
      { year: '2011', Kenya: 42.7, Uganda: 35.0, Tanzania: 50.1, Singapore: 5.2, Malaysia: 28.9, 'South Africa': 51.6, Indonesia: 245.8, Bangladesh: 152.4 },
      { year: '2012', Kenya: 44.4, Uganda: 36.3, Tanzania: 51.0, Singapore: 5.3, Malaysia: 29.4, 'South Africa': 52.3, Indonesia: 249.0, Bangladesh: 155.2 },
      { year: '2013', Kenya: 46.1, Uganda: 37.7, Tanzania: 51.8, Singapore: 5.4, Malaysia: 29.9, 'South Africa': 53.0, Indonesia: 252.2, Bangladesh: 158.1 },
      { year: '2014', Kenya: 47.8, Uganda: 39.1, Tanzania: 52.6, Singapore: 5.5, Malaysia: 30.4, 'South Africa': 53.7, Indonesia: 255.5, Bangladesh: 161.0 },
      { year: '2015', Kenya: 49.4, Uganda: 40.5, Tanzania: 53.5, Singapore: 5.5, Malaysia: 31.0, 'South Africa': 54.5, Indonesia: 258.7, Bangladesh: 163.9 },
      { year: '2016', Kenya: 51.0, Uganda: 41.9, Tanzania: 54.3, Singapore: 5.6, Malaysia: 31.6, 'South Africa': 55.4, Indonesia: 261.9, Bangladesh: 166.8 },
      { year: '2017', Kenya: 52.5, Uganda: 43.3, Tanzania: 55.2, Singapore: 5.7, Malaysia: 32.2, 'South Africa': 56.2, Indonesia: 265.2, Bangladesh: 169.7 },
      { year: '2018', Kenya: 54.0, Uganda: 44.7, Tanzania: 56.0, Singapore: 5.6, Malaysia: 32.8, 'South Africa': 57.0, Indonesia: 268.5, Bangladesh: 172.6 },
      { year: '2019', Kenya: 55.5, Uganda: 46.1, Tanzania: 56.8, Singapore: 5.7, Malaysia: 33.4, 'South Africa': 57.8, Indonesia: 271.7, Bangladesh: 175.5 },
      { year: '2020', Kenya: 56.9, Uganda: 47.1, Tanzania: 57.7, Singapore: 5.7, Malaysia: 33.8, 'South Africa': 58.9, Indonesia: 273.8, Bangladesh: 178.3 },
      { year: '2021', Kenya: 58.3, Uganda: 48.2, Tanzania: 58.6, Singapore: 5.5, Malaysia: 34.2, 'South Africa': 59.9, Indonesia: 275.7, Bangladesh: 181.0 },
      { year: '2022', Kenya: 59.7, Uganda: 49.3, Tanzania: 59.5, Singapore: 6.5, Malaysia: 34.6, 'South Africa': 60.0, Indonesia: 277.5, Bangladesh: 183.6 },
      { year: '2023', Kenya: 61.0, Uganda: 50.4, Tanzania: 60.4, Singapore: 5.9, Malaysia: 35.0, 'South Africa': 60.1, Indonesia: 279.1, Bangladesh: 186.2 },
      { year: '2024', Kenya: 62.2, Uganda: 51.5, Tanzania: 61.2, Singapore: 6.0, Malaysia: 35.4, 'South Africa': 60.5, Indonesia: 281.0, Bangladesh: 188.8 },
      { year: '2025', Kenya: 63.4, Uganda: 52.6, Tanzania: 62.0, Singapore: 6.1, Malaysia: 35.8, 'South Africa': 61.0, Indonesia: 282.8, Bangladesh: 191.4 }
    ],
    exchange: [
      { year: '2010', Kenya: 79.3, Uganda: 2350, Tanzania: 1500, Singapore: 1.3, Malaysia: 3.2, 'South Africa': 7.3, Indonesia: 9000, Bangladesh: 70 },
      { year: '2011', Kenya: 86.5, Uganda: 2450, Tanzania: 1550, Singapore: 1.3, Malaysia: 3.0, 'South Africa': 7.3, Indonesia: 8800, Bangladesh: 75 },
      { year: '2012', Kenya: 85.5, Uganda: 2550, Tanzania: 1600, Singapore: 1.2, Malaysia: 3.1, 'South Africa': 8.2, Indonesia: 9600, Bangladesh: 80 },
      { year: '2013', Kenya: 87.5, Uganda: 2650, Tanzania: 1650, Singapore: 1.3, Malaysia: 3.0, 'South Africa': 9.6, Indonesia: 12000, Bangladesh: 78 },
      { year: '2014', Kenya: 90.0, Uganda: 2750, Tanzania: 1700, Singapore: 1.3, Malaysia: 3.3, 'South Africa': 11.5, Indonesia: 13000, Bangladesh: 77 },
      { year: '2015', Kenya: 103.0, Uganda: 3500, Tanzania: 2100, Singapore: 1.4, Malaysia: 4.1, 'South Africa': 13.5, Indonesia: 14000, Bangladesh: 78 },
      { year: '2016', Kenya: 102.0, Uganda: 3400, Tanzania: 2200, Singapore: 1.4, Malaysia: 4.2, 'South Africa': 14.5, Indonesia: 13000, Bangladesh: 80 },
      { year: '2017', Kenya: 103.0, Uganda: 3600, Tanzania: 2250, Singapore: 1.4, Malaysia: 4.3, 'South Africa': 13.5, Indonesia: 13500, Bangladesh: 84 },
      { year: '2018', Kenya: 100.0, Uganda: 3700, Tanzania: 2300, Singapore: 1.4, Malaysia: 4.1, 'South Africa': 14.5, Indonesia: 14500, Bangladesh: 85 },
      { year: '2019', Kenya: 101.0, Uganda: 3800, Tanzania: 2300, Singapore: 1.4, Malaysia: 4.1, 'South Africa': 15.5, Indonesia: 14000, Bangladesh: 85 },
      { year: '2020', Kenya: 108.0, Uganda: 3800, Tanzania: 2300, Singapore: 1.4, Malaysia: 4.1, 'South Africa': 16.5, Indonesia: 14000, Bangladesh: 85 },
      { year: '2021', Kenya: 110.0, Uganda: 3600, Tanzania: 2300, Singapore: 1.4, Malaysia: 4.2, 'South Africa': 15.0, Indonesia: 14300, Bangladesh: 86 },
      { year: '2022', Kenya: 123.0, Uganda: 3800, Tanzania: 2400, Singapore: 1.4, Malaysia: 4.5, 'South Africa': 17.8, Indonesia: 15500, Bangladesh: 105 },
      { year: '2023', Kenya: 153.0, Uganda: 3900, Tanzania: 2500, Singapore: 1.3, Malaysia: 4.6, 'South Africa': 19.0, Indonesia: 16000, Bangladesh: 110 },
      { year: '2024', Kenya: 165.0, Uganda: 4000, Tanzania: 2600, Singapore: 1.3, Malaysia: 4.7, 'South Africa': 19.5, Indonesia: 16500, Bangladesh: 117 },
      { year: '2025', Kenya: 170.0, Uganda: 4100, Tanzania: 2700, Singapore: 1.3, Malaysia: 4.8, 'South Africa': 20.0, Indonesia: 17000, Bangladesh: 120 }
    ]
  };

  const allCountries = [
    { code: 'KE', name: 'Kenya' },
    { code: 'UG', name: 'Uganda' },
    { code: 'TZ', name: 'Tanzania' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'SG', name: 'Singapore' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'BD', name: 'Bangladesh' }
  ];

  const [selectedCountries, setSelectedCountries] = useState(['KE', 'UG', 'SG']);
  const [darkMode, setDarkMode] = useState(false);

  // 3. CREATED REFS FOR EACH CHART
  const inflationChartRef = useRef(null);
  const gdpChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const populationChartRef = useRef(null);
  const exchangeChartRef = useRef(null);

  // 4. NEW FUNCTION TO DOWNLOAD CHART
  const downloadChartImage = (ref, fileName) => {
    if (ref.current === null) return;
    
    // Small delay to ensure rendering is complete
    setTimeout(() => {
      toPng(ref.current, { cacheBust: true, pixelRatio: 2 })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `${fileName}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error('Error downloading image:', err);
        });
    }, 100);
  };

  const handleCountryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCountries([...selectedCountries, value]);
    } else {
      setSelectedCountries(selectedCountries.filter(c => c !== value));
    }
  };

  const getFilteredData = (data) => {
    return data.map(item => {
      const newItem = { year: item.year };
      allCountries.forEach(c => {
        if (selectedCountries.includes(c.code)) {
          newItem[c.name] = item[c.name];
        }
      });
      return newItem;
    });
  };

  const downloadCSV = (data, filename) => {
    if (!data.length) return;
    const headers = ['year', ...allCountries.map(c => c.name)];
    const csvRows = [
      headers.join(','),
      ...data.map(row => headers.map(fieldName => JSON.stringify(row[fieldName] !== undefined ? row[fieldName] : '')).join(','))
    ];
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- STATISTICAL HELPERS ---
  const calculateMean = (data) => {
    if (!data || data.length === 0) return 0;
    const sum = data.reduce((acc, val) => acc + val, 0);
    return (sum / data.length).toFixed(2);
  };

  const calculateVariance = (data) => {
    if (!data || data.length === 0) return 0;
    const mean = calculateMean(data);
    const sumSquaredDiff = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSquaredDiff / data.length).toFixed(2);
  };

  const calculateStdDev = (data) => {
    if (!data || data.length === 0) return 0;
    const variance = calculateVariance(data);
    return Math.sqrt(variance).toFixed(2);
  };

  const calculateCorrelation = (xData, yData) => {
    if (xData.length !== yData.length || xData.length === 0) return "N/A";
    const n = xData.length;
    const sumX = xData.reduce((a, b) => a + b, 0);
    const sumY = yData.reduce((a, b) => a + b, 0);
    const sumXY = xData.reduce((sum, xi, i) => sum + (xi * yData[i]), 0);
    const sumX2 = xData.reduce((sum, xi) => sum + (xi * xi), 0);
    const sumY2 = yData.reduce((sum, yi) => sum + (yi * yi), 0);
    const numerator = (n * sumXY) - (sumX * sumY);
    const denominator = Math.sqrt(((n * sumX2) - (sumX * sumX)) * ((n * sumY2) - (sumY * sumY)));
    if (denominator === 0) return "N/A";
    return (numerator / denominator).toFixed(2);
  };

  const getStats = (datasetKey) => {
    const data = staticData[datasetKey];
    const stats = {};
    const gdpData = staticData.gdp;
    allCountries.forEach(country => {
      if (selectedCountries.includes(country.code)) {
        const values = data.map(d => d[country.name]);
        const gdpValues = gdpData.map(d => d[country.name]);
        stats[country.name] = {
          mean: calculateMean(values),
          variance: calculateVariance(values),
          stdDev: calculateStdDev(values),
          correlation: datasetKey === 'inflation' ? calculateCorrelation(values, gdpValues) : 'N/A'
        };
      }
    });
    return stats;
  };

  return (
    <div className={darkMode ? 'app-container dark-mode' : 'app-container'}>
      <header className="app-header">
        <h1>Global Economic Indicators Dashboard</h1>
        <div className="controls">
          <button onClick={() => setDarkMode(!darkMode)} className="toggle-btn">
            {darkMode ? '☀ Light Mode' : '☾ Dark Mode'}
          </button>
          <button 
            onClick={() => downloadCSV(getFilteredData(staticData.inflation), 'inflation_data.csv')}
            className="download-btn"
          >
            Download Inflation Data (CSV)
          </button>
        </div>
      </header>

      <div className="controls-section">
        <h3>Select Countries:</h3>
        <div className="checkbox-group">
          {allCountries.map((country) => (
            <label key={country.code} className="checkbox-label">
              <input
                type="checkbox"
                value={country.code}
                checked={selectedCountries.includes(country.code)}
                onChange={handleCountryChange}
              />
              {country.name}
            </label>
          ))}
        </div>
      </div>

      <div className="stats-section">
        <h3>Statistical Summary (Inflation & GDP Correlation)</h3>
        <table className="stats-table">
          <thead>
            <tr>
              <th>Country</th>
              <th>Mean (Inf %)</th>
              <th>Variance</th>
              <th>Std Dev</th>
              <th>Correlation <br/><span style={{fontSize:'0.8em', fontWeight:'normal'}}>(Inf vs GDP)</span></th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(getStats('inflation')).map(([countryName, stats]) => (
              <tr key={countryName}>
                <td>{countryName}</td>
                <td>{stats.mean}</td>
                <td>{stats.variance}</td>
                <td>{stats.stdDev}</td>
                <td style={{ fontWeight: 'bold', color: stats.correlation > 0 ? '#d32f2f' : '#388e3c' }}>
                  {stats.correlation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '10px' }}>
          * Positive correlation (Red) suggests inflation tends to rise with GDP growth. <br/>
          * Negative correlation (Green) suggests inflation tends to fall when GDP rises.
        </p>
      </div>

      {/* 5. UPDATED CHART SECTIONS WITH REFS AND BUTTONS */}
      
      <div className="chart-section">
        <div className="chart-header">
            <h2>Inflation (Consumer Prices %)</h2>
            <button className="icon-btn" onClick={() => downloadChartImage(inflationChartRef, 'inflation-chart')}>📷 Download Chart</button>
        </div>
        <div className="chart-container" ref={inflationChartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getFilteredData(staticData.inflation)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              {allCountries.filter(c => selectedCountries.includes(c.code)).map((c, i) => (
                <Bar key={c.code} dataKey={c.name} fill={`hsl(${i * 50}, 70%, 50%)`} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-section">
        <div className="chart-header">
            <h2>GDP Growth (Annual %)</h2>
            <button className="icon-btn" onClick={() => downloadChartImage(gdpChartRef, 'gdp-chart')}>📷 Download Chart</button>
        </div>
        <div className="chart-container" ref={gdpChartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getFilteredData(staticData.gdp)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              {allCountries.filter(c => selectedCountries.includes(c.code)).map((c, i) => (
                <Bar key={c.code} dataKey={c.name} fill={`hsl(${i * 50 + 180}, 70%, 50%)`} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-section">
        <div className="chart-header">
            <h2>Inflation Trend (Line Chart)</h2>
            <button className="icon-btn" onClick={() => downloadChartImage(lineChartRef, 'inflation-trend-chart')}>📷 Download Chart</button>
        </div>
        <div className="chart-container" ref={lineChartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getFilteredData(staticData.inflation)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              {allCountries.filter(c => selectedCountries.includes(c.code)).map((c, i) => (
                <Line type="monotone" key={c.code} dataKey={c.name} stroke={`hsl(${i * 60}, 70%, 50%)`} strokeWidth={2} dot={{ r: 4 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-section">
        <div className="chart-header">
            <h2>Population (Millions)</h2>
            <button className="icon-btn" onClick={() => downloadChartImage(populationChartRef, 'population-chart')}>📷 Download Chart</button>
        </div>
        <div className="chart-container" ref={populationChartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getFilteredData(staticData.population)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              {allCountries.filter(c => selectedCountries.includes(c.code)).map((c, i) => (
                <Bar key={c.code} dataKey={c.name} fill={`hsl(${i * 40 + 60}, 70%, 50%)`} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-section">
        <div className="chart-header">
            <h2>Exchange Rate (LCU per USD)</h2>
            <button className="icon-btn" onClick={() => downloadChartImage(exchangeChartRef, 'exchange-chart')}>📷 Download Chart</button>
        </div>
        <div className="chart-container" ref={exchangeChartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getFilteredData(staticData.exchange)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              {allCountries.filter(c => selectedCountries.includes(c.code)).map((c, i) => (
                <Bar key={c.code} dataKey={c.name} fill={`hsl(${i * 40 + 90}, 70%, 50%)`} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <footer className="app-footer">
        <p className="footer-credit">
          This web app was conceptualised and designed by Eng. Dr. Gerson Japhet Fumbuka, a DBA Scholar at INTI International University and Colleges, Nilai, Malaysia
        </p>
        <p className="footer-guidance">
          with close guidance from engineers and developers from <a href="https://huggingface.co/zai-org" target="_blank" rel="noopener noreferrer">huggingface.co/zai-org</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
