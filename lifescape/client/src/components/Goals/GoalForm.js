import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGoal, updateGoal, fetchGoals } from '../../features/goals/goalsSlice';
import { useNavigate, useParams } from 'react-router-dom';

const GoalForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { goals } = useSelector((state) => state.goals);
  const editing = Boolean(id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editing && goals.length === 0) {
      dispatch(fetchGoals());
    }
    if (editing && goals.length > 0) {
      const goal = goals.find((g) => g._id === id);
      if (goal) {
        setTitle(goal.title);
        setDescription(goal.description);
      }
    }
  }, [editing, goals, id, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await dispatch(updateGoal({ id, updates: { title, description } }));
    } else {
      await dispatch(addGoal({ title, description }));
    }
    navigate('/dashboard');
  };

  return (
    <div className="goal-form-container">
      <h2>{editing ? 'Edit Goal' : 'Add Goal'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{editing ? 'Update' : 'Add'} Goal</button>
      </form>
    </div>
  );
};

export default GoalForm; 