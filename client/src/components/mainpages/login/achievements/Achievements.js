import React, { useState, useEffect } from 'react';
import orderCounter from '../../cart/orderCounter';
import { FaCheckCircle } from 'react-icons/fa';
import './achievements.css';

const Achievements = () => {
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    setOrderCount(orderCounter.getCount());
  }, []);

  const achievements = [
    {
      name: "First Steps",
      description: "Place your first order",
      requirement: 1,
      reward: "5% off on next order",
      icon: "🎯"
    },
    {
      name: "Regular Customer",
      description: "Place 5 orders",
      requirement: 5,
      reward: "10% off on next order",
      icon: "⭐"
    },
    {
      name: "Food Explorer",
      description: "Place 10 orders",
      requirement: 10,
      reward: "Free delivery on next order",
      icon: "🌟"
    },
    {
      name: "Gourmet Enthusiast",
      description: "Place 15 orders",
      requirement: 15,
      reward: "15% off on next order",
      icon: "🏆"
    },
    {
      name: "Culinary Master",
      description: "Place 25 orders",
      requirement: 25,
      reward: "20% off on next order",
      icon: "👑"
    },
    {
      name: "Food Connoisseur",
      description: "Place 50 orders",
      requirement: 50,
      reward: "Free premium dish",
      icon: "🎖️"
    },
    {
      name: "Dining Legend",
      description: "Place 75 orders",
      requirement: 75,
      reward: "25% off on next order",
      icon: "💫"
    },
    {
      name: "Epicurean Elite",
      description: "Place 100 orders",
      requirement: 100,
      reward: "VIP status + 30% off",
      icon: "🌠"
    },
    {
      name: "Gastronomy God",
      description: "Place 150 orders",
      requirement: 150,
      reward: "Free monthly premium dish",
      icon: "⚡"
    },
    {
      name: "Ultimate Foodie",
      description: "Place 200 orders",
      requirement: 200,
      reward: "Lifetime VIP status",
      icon: "🎪"
    }
  ];

  const calculateProgress = (requirement) => {
    const progress = (orderCount / requirement) * 100;
    return Math.min(progress, 100);
  };

  return (
    <div className="achievements-container">
      <h1>Your Achievements</h1>
      <p className="total-orders">Total Orders Completed: {orderCount}</p>
      
      <div className="achievements-grid">
        {achievements.map((achievement, index) => {
          const isCompleted = calculateProgress(achievement.requirement) === 100;
          return (
            <div 
              key={index} 
              className={`achievement-card ${isCompleted ? 'completed' : ''}`}
            >
              {isCompleted && (
                <div className="completion-badge">
                  <FaCheckCircle />
                  <span>Completed!</span>
                </div>
              )}
              <div className="achievement-icon">{achievement.icon}</div>
              <h2>{achievement.name}</h2>
              <p className="description">{achievement.description}</p>
              
              <div className="progress-container">
                <div 
                  className="progress-bar" 
                  style={{ width: `${calculateProgress(achievement.requirement)}%` }}
                >
                  <div className="progress-glow"></div>
                </div>
                <span className="progress-text">
                  {orderCount}/{achievement.requirement}
                </span>
              </div>
              
              <div className="reward">
                <span className="reward-label">Reward:</span>
                <span className="reward-text">{achievement.reward}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
