import React, { useState, useEffect } from 'react';
import { fetchData } from './api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {
  // All available countries
  const allCountries = [
    { code: 'KE', name: 'Kenya' },
    { code: 'UG', name: 'Uganda' },
    { code: 'TZ', name: 'Tanzania' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'BD', name: 'Bangladesh' },
    { code: 'SG', name: 'Singapore' }
  ];

  // State for selected countries and data
  const [selectedCountries, setSelectedCountries] = useState(['KE', 'UG']); // Default: Kenya & Uganda
  const [chartData, setChartData] = useState({ inflation: [], gdp: [] });
  const [loading, setLoading] = useState(false);

  // Fetch data whenever selection changes
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // 1. Fetch Inflation
      const infResult = await fetchData(selectedCountries, 'FP.CPI.TOTL.ZG', 2010, 2024);
      setChartData(prev => ({ ...prev, inflation: formatData(infResult) }));

      // 2. Fetch GDP
      const gdpResult = await fetchData(selectedCountries, 'NY.GDP.MKTP.KD.ZG', 2010, 2024);
      setChartData(prev => ({ ...prev, gdp: formatData(gdpResult) }));
      
      setLoading(false);
    };
    
    if (selectedCountries.length > 0) {
      loadData();
    }
  }, [selectedCountries]);

  // Helper to format data
  const formatData = (result) => {
    const formatted = result.map(item => ({
      year: item.date,
      country: item.country.value,
      value: item.value
    }));

    const grouped = {};
    formatted.forEach(item => {
      if (!grouped[item.year]) grouped[item.year] = { year: item.year };
      grouped[item.year][item.country] = item.value;
    });
    return Object.values(grouped);
  };

  // Handle checkbox click
  const handleCountryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCountries([...selectedCountries, value]);
    } else {
      setSelectedCountries(selectedCountries.filter(c => c !== value));
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>MonCompass Interactive Dashboard</h1>
      
      {/* Controls */}
      <div style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Select Countries to Compare:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {allCountries.map(c => (
            <label key={c.code} style={{ display: 'flex', alignItems: 'center' }}>
              <input 
                type="checkbox" 
                value={c.code} 
                checked={selectedCountries.includes(c.code)} 
                onChange={handleCountryChange}
                style={{ marginRight: '5px' }}
              />
              {c.name}
            </label>
          ))}
        </div>
      </div>

      {loading && <div>Loading data...</div>}

      {/* Charts */}
      {!loading && (
        <>
          <h2>Inflation (Consumer Prices %)</h2>
          <div style={{ width: '100%', height: 300, marginBottom: '40px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.inflation}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                {allCountries.filter(c => selectedCountries.includes(c.code)).map((c, i) => (
                  <Bar key={c.code} dataKey={c.name} fill={`hsl(${i * 40}, 70%, 50%)`} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>

          <h2>GDP Growth (Annual %)</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.gdp}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                {allCountries.filter(c => selectedCountries.includes(c.code)).map((c, i) => (
                  <Bar key={c.code} dataKey={c.name} fill={`hsl(${i * 40 + 20}, 70%, 50%)`} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default App;