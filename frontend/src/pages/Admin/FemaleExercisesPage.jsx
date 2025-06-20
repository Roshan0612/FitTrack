import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminMenu from "./AdminMenu"; // adjust path if needed
import "../../styles/FemaleExercisesPage.css"; // you can reuse same CSS as male version
import "../../styles/AdminDashboard.css"; // for background or layout consistency

const API_URL = import.meta.env.VITE_API_URL;

const FemaleExercisesPage = () => {
  const { userId } = useParams();
  const [exercises, setExercises] = useState([]);
  const [assignedExercises, setAssignedExercises] = useState({});
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
          if (exId) assignedMap[exId] = true;
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
    <div className="admin-dashboard-bg">
      <div className="flex bg-overlay min-h-screen relative">
        {/* Mobile sidebar toggle */}
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
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Assign Female Exercises</h2>
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
      </div>
    </div>
  );
};

export default FemaleExercisesPage;
