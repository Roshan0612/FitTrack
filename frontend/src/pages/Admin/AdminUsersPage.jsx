import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import AdminMenu from "./AdminMenu";
import "../../styles/AdminUserPageStyles.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminUsersPage = () => {
  const [auth] = useAuth();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let url = `${API_URL}/api/v1/auth/admin/users`;

        if (filter === "subscribed") url += "?subscribed=true";
        else if (filter === "unsubscribed") url += "?subscribed=false";

        const res = await axios.get(url, {
          headers: {
            Authorization: auth?.token,
          },
        });

        const userList = Array.isArray(res.data) ? res.data : res.data.users;
        setUsers(userList || []);
      } catch (error) {
        console.error("Error fetching users:", error.response?.data || error.message);
      }
    };

    fetchUsers();
  }, [filter, auth?.token]);

  return (
    <div className="admin-users-container">
      <div className="sidebar desktop-only">
        <AdminMenu />
      </div>

      <div className="mobile-menu">
        <button onClick={() => setShowMenu(!showMenu)} className="menu-button">
          ☰ Menu
        </button>
        {showMenu && <AdminMenu />}
      </div>

      <div className="main-content">
        <h2 className="page-title">Users</h2>

        <div className="filter-buttons">
          <button onClick={() => setFilter("all")} className="filter-button">All</button>
          <button onClick={() => setFilter("subscribed")} className="filter-button subscribed">Subscribed</button>
          <button onClick={() => setFilter("unsubscribed")} className="filter-button unsubscribed">Unsubscribed</button>
        </div>

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="users-grid">
            {users.map((user) => (
              <Link
                to={`/admin/dashboard/user/${user._id}`}
                key={user._id}
                className="user-card"
              >
                <img
                  src={user.profilePicture || "https://via.placeholder.com/150"}
                  alt={user.name}
                  className="user-image"
                />
                <h3 className="user-name">{user.name}</h3>
                <p className="user-email">{user.email}</p>
                <p className={`user-status ${user.subscriptionTaken ? "subscribed" : "unsubscribed"}`}>
                  {user.subscriptionTaken ? "Subscribed" : "Unsubscribed"}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;
