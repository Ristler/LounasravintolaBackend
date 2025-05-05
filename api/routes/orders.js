const express = require('express');
const router = express.Router();
const {getAllOrders, getOrderById, 
    getOrderByUser, postOrder, patchOrderStatus} = require('../controllers/OrderController');

router.route('/').post(postOrder);
router.route('/').get(getAllOrders);
router.route('/:id').get(getOrderById);
router.route('/user/:id').get(getOrderByUser);
router.route('/:id/:status').patch(patchOrderStatus);

module.exports = router;