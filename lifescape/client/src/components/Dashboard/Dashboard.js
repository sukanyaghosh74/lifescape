import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../features/user/userSlice';
import { fetchGoals } from '../../features/goals/goalsSlice';
import { Link } from 'react-router-dom';
import dashboardImg from '../../assets/dashboard_ui.png';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { goals, status } = useSelector((state) => state.goals);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchGoals());
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <img src={dashboardImg} alt="Dashboard UI" style={{ width: '100%', borderRadius: 12, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }} />
      <h2>Welcome, {user?.username || 'User'}!</h2>
      <Link to="/goals/new" style={{ marginBottom: 24, alignSelf: 'flex-end' }}>
        <button style={{ width: 'auto', padding: '8px 20px', marginBottom: 16 }}>+ Add New Goal</button>
      </Link>
      <h3 style={{ alignSelf: 'flex-start', marginBottom: 8 }}>Your Goals</h3>
      {status === 'loading' && <p>Loading goals...</p>}
      <ul style={{ width: '100%' }}>
        {goals.map((goal) => (
          <li key={goal._id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 12 }}>
            <Link to={`/goals/${goal._id}`} style={{ fontWeight: 600, fontSize: '1.1rem', color: '#1976d2' }}>{goal.title}</Link>
            <span style={{ fontSize: '0.95rem', color: '#555', marginTop: 2 }}>{goal.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard; 