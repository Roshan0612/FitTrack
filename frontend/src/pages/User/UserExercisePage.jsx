import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import UserMenu from "./UserMenu";
import "../../styles/UserExercisePage.css";

const API_URL = import.meta.env.VITE_API_URL;

const UserExercisePage = () => {
  const [auth] = useAuth();
  const [groupedExercises, setGroupedExercises] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchAssignedExercises = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/exercises/assigned/${auth.user._id}`, {
          headers: { Authorization: auth.token },
        });

        const assignments = res.data.assignments || [];
        const grouped = {};

        assignments.forEach((a) => {
          const day = a.day?.toLowerCase() || "unspecified";
          const ex = a.exerciseId;

          if (ex && ex._id) {
            if (!grouped[day]) grouped[day] = [];
            grouped[day].push(ex);
          }
        });

        setGroupedExercises(grouped);
      } catch (err) {
        console.error("Error fetching assigned exercises", err);
      }
    };

    fetchAssignedExercises();
  }, [auth]);

  const dayOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  return (
    <div className="user-dashboard-bg">
      <div className="user-overlay">
        {/* Hamburger Button */}
        <button className="mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </button>

        {/* Sidebar */}
        <div className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
          <UserMenu />
        </div>

        {/* Main Content */}
        <div className="main-content">
          <h2 className="main-title">My Assigned Exercises</h2>

          {Object.keys(groupedExercises).length === 0 ? (
            <p className="no-exercise">No exercises assigned yet.</p>
          ) : (
            dayOrder.map((day) =>
              groupedExercises[day]?.length ? (
                <div key={day}>
                  <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
                  <div className="exercise-grid">
                    {groupedExercises[day].map((ex) => (
                      <div key={ex._id} className="exercise-card">
                        {ex?.gifUrl?.endsWith(".mp4") ? (
                          <video
                            className="exercise-gif"
                            autoPlay
                            loop
                            muted
                            playsInline
                          >
                            <source src={ex.gifUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img
                            src={ex?.gifUrl || "/placeholder.gif"}
                            alt={ex?.name || "Exercise"}
                            className="exercise-gif"
                          />
                        )}
                        <h3 className="exercise-name">{ex.name}</h3>
                        <p>{ex.description}</p>
                        <p><strong>Target Gender:</strong> {ex.targetGender}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default UserExercisePage;
