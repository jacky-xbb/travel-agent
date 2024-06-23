import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TravellerCounter from '../components/TravellerCounter';

function Plan() {
  const navigate = useNavigate();
  const [flyingFrom, setFlyingFrom] = useState('Shanghai');
  const [flyingTo, setFlyingTo] = useState('Tokyo');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 4);
    return date;
  });
  const [budget, setBudget] = useState(1000);
  const [travelers, setTravelers] = useState(1); // State for travelers
  const [errors, setErrors] = useState({ flyingFrom: '', flyingTo: '', fromDate: '', toDate: '', budget: '' });

  const validateCity = (city) => /^[a-zA-Z\s]+$/.test(city);
  const validateBudget = (budget) => !isNaN(budget) && budget > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidFlyingFrom = validateCity(flyingFrom);
    const isValidFlyingTo = validateCity(flyingTo);
    const isValidBudget = validateBudget(budget);
    const isValidDates = fromDate <= toDate;

    if (isValidFlyingFrom && isValidFlyingTo && isValidBudget && isValidDates) {
      navigate('/suggestion', {
        state: { flyingFrom, flyingTo, fromDate, toDate, budget, travelers } // Pass travelers to state
      });
    } else {
      setErrors({
        flyingFrom: isValidFlyingFrom ? '' : 'Invalid city name',
        flyingTo: isValidFlyingTo ? '' : 'Invalid city name',
        fromDate: isValidDates ? '' : 'From Date should be less than or equal to To Date',
        toDate: isValidDates ? '' : 'To Date should be greater than or equal to From Date',
        budget: isValidBudget ? '' : 'Invalid budget amount',
      });
    }
  };

  return (
    <div className="flex flex-col items-center py-8 mx-auto max-w-md">
      <h1 className="mb-4 text-2xl font-bold text-center">Travel Agent</h1>
      <form className="w-full" onSubmit={handleSubmit} noValidate>
        <TravellerCounter count={travelers} setCount={setTravelers} /> {/* Pass state and setter */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Flying from</label>
          <input
            type="text"
            value={flyingFrom}
            onChange={(e) => setFlyingFrom(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.flyingFrom && <p className="mt-1 text-red-500">{errors.flyingFrom}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Flying to</label>
          <input
            type="text"
            value={flyingTo}
            onChange={(e) => setFlyingTo(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.flyingTo && <p className="mt-1 text-red-500">{errors.flyingTo}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">From Date</label>
          <DatePicker selected={fromDate} onChange={(date) => setFromDate(date)} className="w-full px-3 py-2 border rounded-md" />
          {errors.fromDate && <p className="mt-1 text-red-500">{errors.fromDate}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">To Date</label>
          <DatePicker selected={toDate} onChange={(date) => setToDate(date)} className="w-full px-3 py-2 border rounded-md" />
          {errors.toDate && <p className="mt-1 text-red-500">{errors.toDate}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Budget ($)</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.budget && <p className="mt-1 text-red-500">{errors.budget}</p>}
        </div>
        <button type="submit" className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-700">
          Plan my Trip!
        </button>
      </form>
    </div>
  );
}

export default Plan;
