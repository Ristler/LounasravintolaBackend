/**
 * @module Routes/Orders
 * @description Routes for order-related operations.
 */

const express = require('express');
const router = express.Router();
const {
    getAllOrders,
    getOrderById,
    getOrderByUser,
    postOrder,
    patchOrderStatus
} = require('../controllers/OrderController');

/**
 * POST /
 * @summary Creates a new order.
 * @param {Object} req - The request object containing the order data in `req.body`.
 * @param {Object} res - The response object containing the created order or an error message.
 */
router.route('/').post(postOrder);

/**
 * GET /
 * @summary Fetches all orders.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object containing an array of all orders or an error message.
 */
router.route('/').get(getAllOrders);

/**
 * GET /:id
 * @summary Fetches an order by its ID.
 * @param {Object} req - The request object containing the order ID in `req.params.id`.
 * @param {Object} res - The response object containing the order or an error message.
 */
router.route('/:id').get(getOrderById);

/**
 * GET /user/:id
 * @summary Fetches orders by user ID.
 * @param {Object} req - The request object containing the user ID in `req.params.id`.
 * @param {Object} res - The response object containing an array of orders for the user or an error message.
 */
router.route('/user/:id').get(getOrderByUser);

/**
 * PATCH /:id/:status
 * @summary Updates the status of an order.
 * @param {Object} req - The request object containing the order ID in `req.params.id` and the new status in `req.params.status`.
 * @param {Object} res - The response object containing the updated order or an error message.
 */
router.route('/:id/:status').patch(patchOrderStatus);

module.exports = router;