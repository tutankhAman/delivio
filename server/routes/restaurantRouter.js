const router = require("express").Router();
const restaurantCtrl = require("../controllers/restaurantCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.route('/restaurant')
    .get(restaurantCtrl.getRestaurants)
    .post(auth, authAdmin, restaurantCtrl.createRestaurant)

router.route('/restaurant/:id')
    .get(restaurantCtrl.getRestaurantById)
    .delete(auth, authAdmin, restaurantCtrl.deleteRestaurant)
    .put(auth, authAdmin, restaurantCtrl.updateRestaurant)

module.exports = router;