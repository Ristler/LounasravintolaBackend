const express = require('express');
const router = express.Router();
const {getAllOrders, getOrderById, 
    getOrderByUser, postOrder} = require('../controllers/OrderController');

router.route('/').get(getAllOrders);
router.route('/byId/:id').get(getOrderById);
router.route('/byUser/:id').get(getOrderByUser);
router.route('/order').post(postOrder);

module.exports = router;