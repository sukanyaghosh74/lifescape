import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../features/user/userSlice';
import { fetchGoals } from '../../features/goals/goalsSlice';
import { Link } from 'react-router-dom';

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
      <h2>Welcome, {user?.username || 'User'}!</h2>
      <Link to="/goals/new">Add New Goal</Link>
      <h3>Your Goals</h3>
      {status === 'loading' && <p>Loading goals...</p>}
      <ul>
        {goals.map((goal) => (
          <li key={goal._id}>
            <Link to={`/goals/${goal._id}`}>{goal.title}</Link> - {goal.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard; 