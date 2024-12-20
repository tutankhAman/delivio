class RewardManager {
    constructor() {
        this.activeReward = JSON.parse(localStorage.getItem('activeReward')) || null;
        this.claimedRewards = JSON.parse(localStorage.getItem('claimedRewards')) || [];
    }

    setActiveReward(reward) {
        this.activeReward = reward;
        localStorage.setItem('activeReward', JSON.stringify(reward));
    }

    getActiveReward() {
        return this.activeReward;
    }

    clearActiveReward() {
        this.activeReward = null;
        localStorage.setItem('activeReward', 'null');
    }

    hasClaimedReward(achievementName) {
        return this.claimedRewards.includes(achievementName);
    }

    claimReward(achievementName) {
        if (!this.hasClaimedReward(achievementName)) {
            this.claimedRewards.push(achievementName);
            localStorage.setItem('claimedRewards', JSON.stringify(this.claimedRewards));
            return true;
        }
        return false;
    }

    calculateDiscount(originalPrice) {
        if (!this.activeReward) return 0;
        
        if (this.activeReward.type === 'percentage') {
            return (originalPrice * this.activeReward.value) / 100;
        }
        return 0;
    }
}

const rewardManager = new RewardManager();
export default rewardManager; 