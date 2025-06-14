import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Dashboard</h1>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '30px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '300px',
    margin: '0 auto',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default AdminDashboard;
