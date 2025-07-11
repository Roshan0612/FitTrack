import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminMenu from "./AdminMenu";
import "../../styles/FemaleExercisesPage.css";
import "../../styles/AdminDashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

const FemaleExercisesPage = () => {
  const { userId } = useParams();
  const [exercises, setExercises] = useState([]);
  const [assignedExercises, setAssignedExercises] = useState({});
  const [selectedDays, setSelectedDays] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchExercisesAndAssignments = async () => {
      try {
        const exercisesRes = await axios.get(`${API_URL}/api/v1/exercises/female`);
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
    const selectedDay = selectedDays[exerciseId];
    if (!selectedDay) {
      return alert("Please select a day before assigning.");
    }

    const key = `${exerciseId}|${selectedDay}`;
    const alreadyAssigned = assignedExercises[key];

    try {
      await axios.post(`${API_URL}/api/v1/exercises/assign`, {
        userId,
        exerciseId,
        day: selectedDay,
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
    <div className="admin-dashboard-bg">
      <div className="flex bg-overlay min-h-screen relative">
        <button
          className="absolute top-4 left-4 z-20 md:hidden bg-white bg-opacity-20 text-white px-3 py-2 rounded backdrop-blur-sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        <div
          className={`fixed md:static z-10 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <AdminMenu />
        </div>

        <div className="flex-1 p-4 md:p-10">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Assign Female Exercises</h2>

          <div className="exercise-grid text-black">
            {exercises.map((ex) => {
              const selectedDay = selectedDays[ex._id] || "";
              const assignedKey = `${ex._id}|${selectedDay}`;
              const isAssigned = assignedExercises[assignedKey];

              return (
                <div key={ex._id} className="exercise-card">
                  {ex?.gifUrl?.endsWith(".mp4") ? (
                    <video className="exercise-gif" autoPlay loop muted playsInline>
                      <source src={ex.gifUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img src={ex.gifUrl} alt={ex.name} className="exercise-gif" />
                  )}

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
                    <option value="" className="text-black">Select Day</option>
                    <option value="monday" className="text-black">Monday</option>
                    <option value="tuesday" className="text-black">Tuesday</option>
                    <option value="wednesday" className="text-black">Wednesday</option>
                    <option value="thursday" className="text-black">Thursday</option>
                    <option value="friday" className="text-black">Friday</option>
                    <option value="saturday" className="text-black">Saturday</option>
                    <option value="sunday" className="text-black">Sunday</option>
                  </select>

                  <button
                    onClick={() => handleToggleAssign(ex._id)}
                    className={`toggle-btn ${isAssigned ? "assigned" : "unassigned"}`}
                  >
                    {isAssigned
                      ? `Assigned to ${selectedDay} (Click to Unassign)`
                      : `Assign to ${selectedDay || "?"}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FemaleExercisesPage;
