import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/auth/admin/users', {
        headers: {
          Authorization: localStorage.getItem('token') || '', // if using JWT
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const filteredUsers = users.filter(user => {
    if (filter === 'all') return true;
    if (filter === 'subscribed') return user.subscriptionTaken === true;
    if (filter === 'not-subscribed') return user.subscriptionTaken === false;
    return true;
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Management</h2>

      <div className="mb-4">
        <label className="mr-2">Filter by Subscription:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-2 py-1"
        >
          <option value="all">All</option>
          <option value="subscribed">Subscribed</option>
          <option value="not-subscribed">Not Subscribed</option>
        </select>
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Subscription</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {user.subscriptionTaken ? 'Yes' : 'No'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
