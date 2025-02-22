import { useEffect, useState } from "react";
import "./editHealthAndFitnessForm.css";

export default function EditHealthAndFitnessForm({
  healthList,
  setHealthList,
  editId,
  setIsOpen,
}) {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [calorieIntake, setCalorieIntake] = useState("");
  const [calorieBurned, setCalorieBurned] = useState("");

  useEffect(() => {
    if (editId) {
      const healthToEdit = healthList.find((health) => health.id === editId);
      if (healthToEdit) {
        setCalorieIntake(healthToEdit.calorieIntake);
        setCalorieBurned(healthToEdit.calorieBurned);
        setDescription(healthToEdit.description);
        setDate(healthToEdit.date);
      }
    }
  }, [editId, healthList]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedHealth = {
      id: editId,
      calorieIntake,
      calorieBurned,
      description,
      date,
      timestamp: Date.now(),
    };

    // Update the existing habit
    setHealthList((prev) =>
      prev.map((health) => (health.id === editId ? updatedHealth : health))
    );

    console.log("Health updated:", updatedHealth);
    setIsOpen(false);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="form-title">Let's see what you want to change!</h3>

      <div className="form-group">
        <label className="form-label">
          Date:
          <input
            type="date"
            className="form-input"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          Calorie Intake
          <input
            type="text"
            className="form-input"
            required
            placeholder="Enter Today's Calorie Intake"
            value={calorieIntake}
            onChange={(e) => setCalorieIntake(e.target.value)}
          />
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          Calorie Burned
          <input
            type="text"
            className="form-input"
            required
            placeholder="Enter Today's Calorie Burned"
            value={calorieBurned}
            onChange={(e) => setCalorieBurned(e.target.value)}
          />
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          Short Description:
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

      <button className="form-button" type="submit">
        Submit
      </button>
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
