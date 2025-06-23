import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/Auth';

const API_URL = import.meta.env.VITE_API_URL;

const UserProtectedRoute = () => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/auth/user-auth`, {
          headers: {
            "Authorization": auth?.token,
          },
        });
        console.log(res.data);
        setOk(res.data.ok);
      } catch (err) {
        setOk(false);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setLoading(false);
    }
  }, [auth?.token]);

  if (loading) return <div>Loading...</div>;

  return ok ? <Outlet /> : <div> Unauthorized</div>;
};

export default UserProtectedRoute;
