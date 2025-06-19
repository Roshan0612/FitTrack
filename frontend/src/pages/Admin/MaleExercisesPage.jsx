import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const MaleExercisesPage = () => {
  const { userId } = useParams();
  const [exercises, setExercises] = useState([]);
  const [assignedExercises, setAssignedExercises] = useState({});

  useEffect(() => {
    const fetchExercisesAndAssignments = async () => {
      try {
        const exercisesRes = await axios.get(`${API_URL}/api/v1/exercises/male`);
        setExercises(exercisesRes.data.exercises || []);

        const assignedRes = await axios.get(`${API_URL}/api/v1/exercises/assigned/${userId}`);
        const assignedMap = {};
        assignedRes.data.exercises.forEach((exercise) => {
        if (exercise && exercise._id) {
          assignedMap[exercise._id] = true;
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
    try {
      await axios.post(`${API_URL}/api/v1/exercises/assign`, {
        userId,
        exerciseId,
      });

      setAssignedExercises((prev) => ({
        ...prev,
        [exerciseId]: !prev[exerciseId],
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
        {exercises.map((ex) => (
          <div key={ex._id} className="exercise-card">
            <img src={ex.gifUrl} alt={ex.name} className="exercise-gif" />
            <h3>{ex.name}</h3>
            <p>{ex.description}</p>
            <p><strong>Target Gender:</strong> {ex.targetGender}</p>
            <button
              onClick={() => handleToggleAssign(ex._id)}
              className={`toggle-btn ${assignedExercises[ex._id] ? "assigned" : "unassigned"}`}
            >
              {assignedExercises[ex._id] ? "✅ Assigned (Click to Unassign)" : "❌ Not Assigned (Click to Assign)"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaleExercisesPage;
