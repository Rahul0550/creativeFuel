// TestTypesTable.js
import React from 'react';
import './TestTypesTable.css';

export default function TestTypesTable({ tests }) {
  const uniqueTestTypes = [...new Set(tests.map(test => test.testType))];

  return (
    <div>
      <h2>Test Types Table</h2>
      <table className='test'> 
        <thead>
          <tr>
            <th>Type Id</th>
            <th>Test Type</th>
          </tr>
        </thead>
        <tbody>
          {uniqueTestTypes.map((type, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
