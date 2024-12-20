import React, { useState, useEffect } from 'react';
import orderCounter from '../cart/orderCounter';
import rewardManager from '../../../utils/rewardManager';
import { FaCheckCircle, FaGift } from 'react-icons/fa';
import './achievements.css';

const Achievements = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [activeReward, setActiveReward] = useState(rewardManager.getActiveReward());
  const [, forceUpdate] = useState();

  useEffect(() => {
    setOrderCount(orderCounter.getCount());
  }, []);

  const achievements = [
    {
      name: "First Steps",
      description: "Place your first order",
      requirement: 1,
      reward: { type: 'percentage', value: 5, description: "5% off on next order" },
      icon: "🎯"
    },
    {
      name: "Regular Customer",
      description: "Place 5 orders",
      requirement: 5,
      reward: { type: 'percentage', value: 10, description: "10% off on next order" },
      icon: "⭐"
    },
    {
      name: "Food Explorer",
      description: "Place 10 orders",
      requirement: 10,
      reward: { type: 'freeDelivery', description: "Free delivery on next order" },
      icon: "🌟"
    },
    {
      name: "Gourmet Enthusiast",
      description: "Place 15 orders",
      requirement: 15,
      reward: { type: 'percentage', value: 15, description: "15% off on next order" },
      icon: "🏆"
    },
    {
      name: "Culinary Master",
      description: "Place 25 orders",
      requirement: 25,
      reward: { type: 'percentage', value: 20, description: "20% off on next order" },
      icon: "👑"
    },
    {
      name: "Food Connoisseur",
      description: "Place 50 orders",
      requirement: 50,
      reward: { type: 'freeDish', description: "Free premium dish" },
      icon: "🎖️"
    },
    {
      name: "Dining Legend",
      description: "Place 75 orders",
      requirement: 75,
      reward: { type: 'percentage', value: 25, description: "25% off on next order" },
      icon: "💫"
    },
    {
      name: "Epicurean Elite",
      description: "Place 100 orders",
      requirement: 100,
      reward: { type: 'vipStatus', description: "VIP status + 30% off" },
      icon: "🌠"
    },
    {
      name: "Gastronomy God",
      description: "Place 150 orders",
      requirement: 150,
      reward: { type: 'freeDish', description: "Free monthly premium dish" },
      icon: "⚡"
    },
    {
      name: "Ultimate Foodie",
      description: "Place 200 orders",
      requirement: 200,
      reward: { type: 'lifetimeVip', description: "Lifetime VIP status" },
      icon: "🎪"
    }
  ];

  const handleClaimReward = (achievement) => {
    console.log('Claiming reward for:', achievement.name);
    
    if (rewardManager.claimReward(achievement.name)) {
      console.log('Reward claimed successfully');
      
      rewardManager.setActiveReward({
        ...achievement.reward,
        achievementName: achievement.name
      });
      
      setActiveReward(rewardManager.getActiveReward());
      forceUpdate({});
    } else {
      console.log('Reward already claimed');
    }
  };

  const calculateProgress = (requirement) => {
    const progress = (orderCount / requirement) * 100;
    return Math.min(progress, 100);
  };

  return (
    <div className="achievements-container">
      <h1>Your Achievements</h1>
      <p className="total-orders">Total Orders Completed: {orderCount}</p>
      
      {activeReward && (
        <div className="active-reward-banner">
          <FaGift />
          <span>Active Reward: {activeReward.description}</span>
        </div>
      )}
      
      <div className="achievements-grid">
        {achievements.map((achievement, index) => {
          const isCompleted = calculateProgress(achievement.requirement) === 100;
          const isRewardClaimed = rewardManager.hasClaimedReward(achievement.name);
          
          return (
            <div 
              key={index} 
              className={`achievement-card ${isCompleted ? 'completed' : ''} ${isRewardClaimed ? 'claimed' : ''}`}
            >
              {isCompleted && !isRewardClaimed && (
                <button 
                  className="claim-reward-btn"
                  onClick={() => handleClaimReward(achievement)}
                >
                  <FaGift /> Claim Reward
                </button>
              )}
              {isCompleted && isRewardClaimed && (
                <div className="completion-badge">
                  <FaCheckCircle />
                  <span>Claimed!</span>
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
                <span className="reward-text">{achievement.reward.description}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
