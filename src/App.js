import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
const BASE_URL = 'http://localhost:9876/numbers/e'; 
export default function App() {
  const [typeNum, setTypenum] = useState('p');
  const [prevState, setPrevState] = useState([]);
  const [currState, setCurrState] = useState([]);
  const [fetching, setFetching] = useState([]);
  const [avg, setAvg] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTypeNumChange = (event) => {
    setTypenum(event.target.value);
  };
  const fetchAverage = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(BASE_URL + typeNum);
      setPrevState(response.data.prevState);
      setCurrState(response.data.currState);
      setFetching(response.data.numbers);
      setAvg(response.data.avg);
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAverage();
  }, [typeNum]); // Re-fetch data on number type change

  const renderResultsTable = () => {
    if (prevState.length === 0) {
      return null; 
    }

    return (
      <div className='navee'>
      <table className='container flex flex-col bg-primary'>
        <thead>
          <tr>
            <th>Previous Window</th>
            <th>Current Window</th>
            <th>Fetched Numbers</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{prevState.join(', ')}</td>
            <td>{currState.join(', ')}</td>
            <td>{fetching.join(', ')}</td>
            <td>{avg}</td>
          </tr>
        </tbody>
      </table>
      </div>
    );
  };

  return (
    <div className="average-calculator" style={{alignContent:'center',justifyContent:'center'}}>
      <h1 style={{display:'flex',justifyContent:"center"}}>Average Calculator</h1>
      <select value={typeNum} onChange={handleTypeNumChange} style={{borderRadius:"5px",display:'flex',alignContent:'center'}} >
        <option value="p">Prime numbers</option>
        <option value="f">Fibonacci numbers</option>
        <option value="e">Even numbers</option>
        <option value="r">Random numbers</option>
      </select>
      <button onClick={fetchAverage} disabled={loading}>
        {loading ? 'Please wait for a moment...' : 'Calculate  Avg'}
      </button>
      {error && <p className="error">{error}</p>}
      {renderResultsTable()}
    </div>
  );
}

