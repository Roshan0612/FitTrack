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
        // 1. Fetch all male exercises
        const exercisesRes = await axios.get(`${API_URL}/api/v1/exercises/male`);
        setExercises(exercisesRes.data.exercises || []);

        // 2. Fetch assigned exercises for this user
        const assignedRes = await axios.get(`${API_URL}/api/v1/exercises/assigned/${userId}`);
        const assignments = assignedRes.data.assignments || [];

        // 3. Convert to map for quick lookup
        const assignedMap = {};
        assignments.forEach((item) => {
          const exId = item.exerciseId?._id || item.exerciseId;
          if (exId) {
            assignedMap[exId] = true;
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
    const alreadyAssigned = assignedExercises[exerciseId];
    try {
      await axios.post(`${API_URL}/api/v1/exercises/assign`, {
        userId,
        exerciseId,
        action: alreadyAssigned ? "unassign" : "assign",
      });

      setAssignedExercises((prev) => ({
        ...prev,
        [exerciseId]: !alreadyAssigned,
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
              {assignedExercises[ex._id]
                ? "✅ Assigned (Click to Unassign)"
                : "❌ Not Assigned (Click to Assign)"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaleExercisesPage;
