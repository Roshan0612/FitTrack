import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import UserMenu from "./UserMenu";
import "../../styles/UserExercisePage.css";
import "../../styles/AdminDashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

const UserExercisePage = () => {
  const [auth] = useAuth();
  const [exercises, setExercises] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="user-dashboard-bg">
      <div className="user-overlay">
        <button
          className="mobile-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        <div
          className={`sidebar-wrapper ${
            sidebarOpen ? "open" : ""
          }`}
        >
          <UserMenu />
        </div>

        <div className="main-content">
          <h2 className="main-title">My Assigned Exercises</h2>

          {exercises.length === 0 ? (
            <p className="no-exercise">No exercises assigned yet.</p>
          ) : (
            <div className="exercise-grid">
              {exercises.map((ex) => (
                <div key={ex._id} className="exercise-card">
                  <img
                    src={ex?.gifUrl || "/placeholder.gif"}
                    alt={ex?.name || "Exercise GIF"}
                    className="exercise-gif"
                  />
                  <h3>{ex.name}</h3>
                  <p>{ex.description}</p>
                  <p><strong>Target Gender:</strong> {ex.targetGender}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserExercisePage;