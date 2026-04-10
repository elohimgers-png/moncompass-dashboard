import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>MonCompass Dashboard v2 (Static Data)</h1>
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
