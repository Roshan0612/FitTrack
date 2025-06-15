import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/auth/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    if (filter === "all") return true;
    return filter === "subscribed"
      ? user.subscriptionTaken
      : !user.subscriptionTaken;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>👥 All Users</h2>
      <div>
        <label>Filter: </label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="subscribed">Subscribed</option>
          <option value="notsubscribed">Not Subscribed</option>
        </select>
      </div>
      <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Age</th><th>Gender</th><th>Subscription</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.subscriptionTaken ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
