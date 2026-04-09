import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {
  // Hard-coded data to ensure it works on Vercel (Static Data)
  const staticData = {
    inflation: [
      { year: '2020', Kenya: 5.4, Uganda: 3.2, Tanzania: 3.3, Singapore: -0.2, Malaysia: -1.1 },
      { year: '2021', Kenya: 6.1, Uganda: 2.1, Tanzania: 3.7, Singapore: 2.3, Malaysia: 2.5 },
      { year: '2022', Kenya: 7.6, Uganda: 5.4, Tanzania: 4.4, Singapore: 6.5, Malaysia: 3.4 },
      { year: '2023', Kenya: 6.9, Uganda: 2.8, Tanzania: 3.0, Singapore: 4.8, Malaysia: 2.5 },
    ],
    gdp: [
      { year: '2020', Kenya: 0.3, Uganda: 3.0, Tanzania: 4.8, Singapore: -2.8, Malaysia: -5.9 },
      { year: '2021', Kenya: 7.6, Uganda: 6.7, Tanzania: 4.9, Singapore: 8.9, Malaysia: 3.1 },
      { year: '2022', Kenya: 4.8, Uganda: 4.6, Tanzania: 4.6, Singapore: 3.8, Malaysia: 8.7 },
      { year: '2023', Kenya: 5.0, Uganda: 5.3, Tanzania: 5.2, Singapore: 1.1, Malaysia: 3.6 },
    ]
  };

  const allCountries = [
    { code: 'KE', name: 'Kenya' },
    { code: 'UG', name: 'Uganda' },
    { code: 'TZ', name: 'Tanzania' },
    { code: 'SG', name: 'Singapore' },
    { code: 'MY', name: 'Malaysia' }
  ];

  const [selectedCountries, setSelectedCountries] = useState(['KE', 'UG', 'SG']); // Default selection

  const handleCountryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCountries([...selectedCountries, value]);
    } else {
      setSelectedCountries(selectedCountries.filter(c => c !== value));
    }
  };

  // Filter data based on selection
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

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>MonCompass Dashboard (Static Data)</h1>
      <p>Comparing Sub-Saharan Africa vs Southeast Asia (2020-2023)</p>
      
      <div style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Select Countries to Compare:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
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

      <h2>Inflation (Consumer Prices %)</h2>
      <div style={{ width: '100%', height: 300, marginBottom: '40px' }}>
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

      <h2>GDP Growth (Annual %)</h2>
      <div style={{ width: '100%', height: 300 }}>
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
  );
}

export default App;