class RatingManager {
    constructor() {
        this.ratings = JSON.parse(localStorage.getItem('productRatings')) || {};
    }

    setRating(productId, rating) {
        this.ratings[productId] = rating;
        localStorage.setItem('productRatings', JSON.stringify(this.ratings));
    }

    getRating(productId) {
        return this.ratings[productId] || 0;
    }

    hasRated(productId) {
        return productId in this.ratings;
    }
}

const ratingManager = new RatingManager();
export default ratingManager;