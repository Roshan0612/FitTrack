import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import UserMenu from "./UserMenu"; // Adjust path if needed
import "../../styles/UserExercisePage.css";   // Import external CSS

const API_URL = import.meta.env.VITE_API_URL;

const UserExercisePage = () => {
  const [auth] = useAuth();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchAssignedExercises = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/v1/exercises/assigned/${auth.user._id}`,
          {
            headers: { Authorization: auth.token },
          }
        );

        const assignments = res.data.assignments || [];

        const validExercises = assignments
          .map((a) => a.exerciseId)
          .filter((ex) => ex && ex._id);

        setExercises(validExercises);
      } catch (err) {
        console.error("Error fetching assigned exercises", err);
      }
    };

    fetchAssignedExercises();
  }, [auth]);

  return (
    <div className="exercise-layout">
      <aside className="sidebar">
        <UserMenu />
      </aside>

      <main className="exercise-main">
        <h2 className="exercise-title">My Assigned Exercises</h2>
        {exercises.length === 0 ? (
          <p>No exercises assigned yet.</p>
        ) : (
          <div className="exercise-grid">
            {exercises.map((ex) => (
              <div key={ex._id} className="exercise-card">
                <img
                  src={ex?.gifUrl || "/placeholder.gif"}
                  alt={ex?.name || "Exercise GIF"}
                  className="exercise-gif"
                />
                <h3 className="exercise-name">{ex.name}</h3>
                <p>{ex.description}</p>
                <p><strong>Target Gender:</strong> {ex.targetGender}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserExercisePage;
