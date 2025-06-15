import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth";
const API_URL = import.meta.env.VITE_API_URL;
const AdminUsersPage = () => {
  const [auth]=useAuth();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        console.error("No token found in localStorage.");
        
      }

      try {
        let url = `${API_URL}/api/v1/auth/admin/users`;
        if (filter === "subscribed") url += "?subscribed=true";
        else if (filter === "unsubscribed") url += "?subscribed=false";

        const res = await axios.get(url, {
          headers:{
                        "Authorization" : auth?.token
                    }
        });

        const userList = Array.isArray(res.data) ? res.data : res.data.users;
        setUsers(userList || []);
      } catch (error) {
        console.error("Error fetching users:", error.response?.data || error.message);
      }
    };

    fetchUsers();
  }, [filter, token]);

  const viewUserDetails = async (userId) => {
    if (!token) return;

    try {
      const res = await axios.get(`/api/v1/auth/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedUser(res.data);
    } catch (error) {
      console.error("Error fetching user details:", error.response?.data || error.message);
    }
  };

  return (
    <div style={{ display: "flex", padding: 20 }}>
      <div style={{ width: "50%" }}>
        <h2>Users</h2>
        <div>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("subscribed")}>Subscribed</button>
          <button onClick={() => setFilter("unsubscribed")}>Unsubscribed</button>
        </div>

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li
                key={user._id}
                onClick={() => viewUserDetails(user._id)}
                style={{ cursor: "pointer", margin: "10px 0" }}
              >
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ width: "50%", paddingLeft: 20 }}>
        {selectedUser && (
          <div>
            <h3>{selectedUser.name}'s Details</h3>
            <img
              src={selectedUser.profilePicture}
              alt="Profile"
              width="150"
              height="150"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Age:</strong> {selectedUser.age}</p>
            <p><strong>Gender:</strong> {selectedUser.gender}</p>
            <p><strong>Height:</strong> {selectedUser.height} cm</p>
            <p><strong>Weight:</strong> {selectedUser.weight} kg</p>
            <p><strong>Mobile:</strong> {selectedUser.mobile}</p>
            <p><strong>Address:</strong> {selectedUser.address}</p>
            <p><strong>Fitness Goal:</strong> {selectedUser.fitnessGoal}</p>
            <p><strong>Activity Level:</strong> {selectedUser.activityLevel}</p>
            <p><strong>Medical Conditions:</strong> {selectedUser.medicalConditions}</p>
            <p><strong>Subscription Taken:</strong> {selectedUser.subscriptionTaken ? "Yes" : "No"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;
