import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import UserMenu from "./UserMenu";


const API_URL = import.meta.env.VITE_API_URL;

const UserExercisePage = () => {
  const [auth] = useAuth();
  const [groupedExercises, setGroupedExercises] = useState({});

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

        // Group exercises by day
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
    <div className="exercise-layout">
      <aside className="sidebar">
        <UserMenu />
      </aside>

      <main className="exercise-main">
        <h2 className="exercise-title">My Assigned Exercises (Day-wise)</h2>
        {Object.keys(groupedExercises).length === 0 ? (
          <p>No exercises assigned yet.</p>
        ) : (
          <div className="exercise-weekly">
            {dayOrder.map((day) =>
              groupedExercises[day]?.length ? (
                <div key={day} className="exercise-day-block">
                  <h3 className="day-heading">📅 {day.toUpperCase()}</h3>
                  <div className="exercise-grid">
                    {groupedExercises[day].map((ex) => (
                      <div key={ex._id} className="exercise-card">
                        <img
                          src={ex.gifUrl || "/placeholder.gif"}
                          alt={ex.name}
                          className="exercise-gif"
                        />
                        <h3 className="exercise-name">{ex.name}</h3>
                        <p>{ex.description}</p>
                        <p><strong>Target Gender:</strong> {ex.targetGender}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserExercisePage;
