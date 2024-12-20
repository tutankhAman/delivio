class OrderCounter {
    constructor() {
        // Initialize from localStorage or start at 0
        this.count = parseInt(localStorage.getItem('orderCount')) || 0;
    }

    // Get current count
    getCount() {
        return this.count;
    }

    // Increment count and save to localStorage
    increment() {
        this.count++;
        localStorage.setItem('orderCount', this.count.toString());
        return this.count;
    }

    // Reset count
    reset() {
        this.count = 0;
        localStorage.setItem('orderCount', '0');
    }
}

// Create a singleton instance
const orderCounter = new OrderCounter();

export default orderCounter; 