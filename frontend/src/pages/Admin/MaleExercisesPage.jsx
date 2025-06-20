import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const MaleExercisesPage = () => {
  const { userId } = useParams();
  const [exercises, setExercises] = useState([]);
  const [assignedExercises, setAssignedExercises] = useState({});
  const [selectedDays, setSelectedDays] = useState({});

  useEffect(() => {
    const fetchExercisesAndAssignments = async () => {
      try {
        const exercisesRes = await axios.get(`${API_URL}/api/v1/exercises/male`);
        setExercises(exercisesRes.data.exercises || []);

        const assignedRes = await axios.get(`${API_URL}/api/v1/exercises/assigned/${userId}`);
        const assignments = assignedRes.data.assignments || [];

        const assignedMap = {};
        assignments.forEach((item) => {
          const exId = item.exerciseId?._id || item.exerciseId;
          const day = item.day;
          if (exId && day) {
            assignedMap[`${exId}|${day}`] = true;
          }
        });

        setAssignedExercises(assignedMap);
      } catch (err) {
        console.error("Failed to fetch exercises or assignments", err);
      }
    };

    fetchExercisesAndAssignments();
  }, [userId]);

  const handleToggleAssign = async (exerciseId) => {
    const day = selectedDays[exerciseId];
    if (!day) {
      alert("Please select a day before assigning.");
      return;
    }

    const key = `${exerciseId}|${day}`;
    const alreadyAssigned = assignedExercises[key];

    try {
      await axios.post(`${API_URL}/api/v1/exercises/assign`, {
        userId,
        exerciseId,
        day,
        action: alreadyAssigned ? "unassign" : "assign",
      });

      setAssignedExercises((prev) => ({
        ...prev,
        [key]: !alreadyAssigned,
      }));
    } catch (err) {
      console.error("Assignment error", err);
      alert("Failed to assign/unassign exercise.");
    }
  };

  return (
    <div className="exercise-page">
      <h2>Assign Male Exercises</h2>
      <div className="exercise-grid">
        {exercises.map((ex) => {
          const selectedDay = selectedDays[ex._id] || "";
          const assignedKey = `${ex._id}|${selectedDay}`;
          const isAssigned = assignedExercises[assignedKey];

          return (
            <div key={ex._id} className="exercise-card">
              <img src={ex.gifUrl} alt={ex.name} className="exercise-gif" />
              <h3>{ex.name}</h3>
              <p>{ex.description}</p>
              <p><strong>Target Gender:</strong> {ex.targetGender}</p>

              <select
                value={selectedDay}
                onChange={(e) =>
                  setSelectedDays((prev) => ({
                    ...prev,
                    [ex._id]: e.target.value,
                  }))
                }
              >
                <option value="">Select Day</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
              </select>

              <button
                onClick={() => handleToggleAssign(ex._id)}
                className={`toggle-btn ${isAssigned ? "assigned" : "unassigned"}`}
              >
                {isAssigned
                  ? `✅ Assigned to ${selectedDay} (Click to Unassign)`
                  : `❌ Not Assigned (Click to Assign to ${selectedDay || "?"})`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MaleExercisesPage;
