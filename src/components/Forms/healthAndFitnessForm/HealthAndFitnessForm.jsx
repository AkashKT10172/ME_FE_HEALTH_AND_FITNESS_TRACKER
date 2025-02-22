import { useEffect, useState } from 'react';
import './HealthAndFitnessForm.css';

export default function HealthAndFitnessForm({ setIsOpen, healthList, setHealthList }) {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [calorieIntake, setCalorieIntake] = useState('');
  const [calorieBurned, setCalorieBurned] = useState('');

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newHnFData = {
      id: generateUniqueId(),
      calorieIntake,
      calorieBurned,
      description,
      date,
      timestamp: Date.now(),
    };

    setHealthList((prev) => [...prev, newHnFData]);
    console.log('Stats added:', newHnFData);

    setDescription('');
    setDate('');
    setCalorieBurned('');
    setCalorieIntake('');
    setIsOpen(false);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="form-title">How Much Net Calories did you take Today?</h3>

      <div className="form-group" style={{display : "flex", flexDirection :"column"}}>
        <p>Date:</p>
        <label className="form-label">
          <input
            type="date"
            className="form-input"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>

      <div className="form-group" style={{display : "flex", flexDirection :"column"}}>
        <p>Calorie Intake:</p>
        <label className="form-label"> 
          <input
            type="number"
            className="form-input"
            required
            placeholder="Enter Today's Calorie Intake"
            value={calorieIntake}
            onChange={(e) => setCalorieIntake(e.target.value)}
          />
        </label>
      </div>

      <div className="form-group" style={{display : "flex", flexDirection :"column"}}>
        <p>Calorie Burned:</p>
        <label className="form-label">
          <input
            type="number"
            className="form-input"
            required
            placeholder="Enter Today's Calorie Burned"
            value={calorieBurned}
            onChange={(e) => setCalorieBurned(e.target.value)}
          />
        </label>
      </div>

      <div className="form-group" style={{display : "flex", flexDirection :"column"}}>
        <p>Short Description:</p>
        <label className="form-label">
          <input
            type="text"
            className="form-input"
            required
            placeholder="Enter a short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>

      <button className="form-button" type="submit">Submit</button>
      <button
        type="button"
        className="cancel-button"
        onClick={() => setIsOpen(false)}
      >
        Cancel
      </button>
    </form>
  );
}
