import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/MaleExercisesPage.css";
import "../../styles/AdminDashboard.css"; 

import AdminMenu from "./AdminMenu";

const API_URL = import.meta.env.VITE_API_URL;

const MaleExercisesPage = () => {
  const { userId } = useParams();
  const [exercises, setExercises] = useState([]);
  const [assignedExercises, setAssignedExercises] = useState({});
<<<<<<< HEAD
  const [selectedDays, setSelectedDays] = useState({});
=======
  const [sidebarOpen, setSidebarOpen] = useState(false);
>>>>>>> bfd042d937b8893107a5a158c97c1ed0d8d9f1b8

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
<<<<<<< HEAD
          const day = item.day;
          if (exId && day) {
            assignedMap[`${exId}|${day}`] = true;
          }
=======
          if (exId) assignedMap[exId] = true;
>>>>>>> bfd042d937b8893107a5a158c97c1ed0d8d9f1b8
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
<<<<<<< HEAD
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
=======
    <div className="admin-dashboard-bg">
      <div className="flex bg-overlay min-h-screen relative">
        {/* Mobile toggle */}
        <button
          className="absolute top-4 left-4 z-20 md:hidden bg-white bg-opacity-20 text-white px-3 py-2 rounded backdrop-blur-sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        {/* Sidebar */}
        <div
          className={`fixed md:static z-10 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <AdminMenu />
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 md:p-10">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Assign Male Exercises</h2>
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
>>>>>>> bfd042d937b8893107a5a158c97c1ed0d8d9f1b8
      </div>
    </div>
  );
};

export default MaleExercisesPage;
