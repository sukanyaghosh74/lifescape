// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LifeScapeGoals {
    struct Goal {
        string title;
        string description;
        bool completed;
    }

    mapping(address => Goal[]) private userGoals;

    event GoalAdded(address indexed user, uint goalId, string title);
    event GoalUpdated(address indexed user, uint goalId, string title, bool completed);
    event GoalDeleted(address indexed user, uint goalId);

    function addGoal(string memory title, string memory description) public {
        userGoals[msg.sender].push(Goal(title, description, false));
        emit GoalAdded(msg.sender, userGoals[msg.sender].length - 1, title);
    }

    function updateGoal(uint goalId, string memory title, string memory description, bool completed) public {
        require(goalId < userGoals[msg.sender].length, "Invalid goalId");
        Goal storage goal = userGoals[msg.sender][goalId];
        goal.title = title;
        goal.description = description;
        goal.completed = completed;
        emit GoalUpdated(msg.sender, goalId, title, completed);
    }

    function deleteGoal(uint goalId) public {
        require(goalId < userGoals[msg.sender].length, "Invalid goalId");
        uint lastIndex = userGoals[msg.sender].length - 1;
        if (goalId != lastIndex) {
            userGoals[msg.sender][goalId] = userGoals[msg.sender][lastIndex];
        }
        userGoals[msg.sender].pop();
        emit GoalDeleted(msg.sender, goalId);
    }

    function getGoals() public view returns (Goal[] memory) {
        return userGoals[msg.sender];
    }
} 