import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoals, deleteGoal } from '../../features/goals/goalsSlice';
import { useParams, useNavigate, Link } from 'react-router-dom';

const GoalDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { goals } = useSelector((state) => state.goals);
  const goal = goals.find((g) => g._id === id);

  useEffect(() => {
    if (!goal) dispatch(fetchGoals());
  }, [goal, dispatch]);

  const handleDelete = async () => {
    await dispatch(deleteGoal(id));
    navigate('/dashboard');
  };

  if (!goal) return <div>Loading...</div>;

  return (
    <div className="goal-detail-container">
      <h2>{goal.title}</h2>
      <p>{goal.description}</p>
      <p>Status: {goal.status}</p>
      <Link to={`/goals/${id}/edit`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default GoalDetail; 