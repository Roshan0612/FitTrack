import React from 'react'
import { useAuth } from '../../context/Auth';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;
const AdminProtectedRoute = () => {
    const [ok,setOk]=useState(false);
        const [auth,setAuth]=useAuth();
        useEffect(()=>{
            const  authCheck= async() =>{
                const res = await axios.get(`${API_URL}/api/v1/auth/admin-auth`,{
                    headers:{
                        "Authorization" : auth?.token
                    }
                });
                console.log(res.data);
                if(res.data.ok){
                  setOk(true)
                }else{
                  setOk(false)
                }
            } ;
            if(auth?.token) authCheck();
            
        },[auth?.token]);
  return ok ? <Outlet /> : <div>Access Denied</div>;
}

export default AdminProtectedRoute