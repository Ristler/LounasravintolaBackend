/**
 * @module Controllers/OrderController
 */

const { allOrders, ordersById, ordersByUser,
    createOrder, updateOrderStatus } = require('../modules/OrderModule');

/**
 * Fetches all orders.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Array>} - An array of all orders or an error response.
 */
const getAllOrders = async (req, res) => {
    try {
        const order = await allOrders();

        // Checks if the document is empty
        if (order.length === 0){
            return res.status(404).json({ message: 'Orders not found!' });
        };

        res.json(order);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching all orders: ', error: error.message})
    }
};

/**
 * Fetches an order by its ID.
 * @param {Object} req - The request object containing the order ID in `req.params.id`.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - The order or an error response.
 */
const getOrderById = async (req, res) => {
    try {
        const order = await ordersById(req.params.id);

        // Checks if the document is empty
        if (order.length === 0){
            return res.status(404).json({ message: 'Order not found!' });
        };

        res.json(order);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching orders by orderId: ', error: error.message});
    }
};

/**
 * Fetches orders by user ID.
 * @param {Object} req - The request object containing the user ID in `req.params.id`.
 * @param {Object} res - The response object.
 * @returns {Promise<Array>} - An array of orders for the user or an error response.
 */
const getOrderByUser = async (req, res) => {
    try {
        const order = await ordersByUser(req.params.id);

        // Checks if the document is empty
        if (order.length === 0){
            return res.status(404).json({ message: 'User orders not found!' })
        };

        res.json(order);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching orders by userId: ', error: error.message });
    }
};

/**
 * Creates a new order.
 * @param {Object} req - The request object containing the order data in `req.body`.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - The created order or an error response.
 */
const postOrder = async (req, res) => {
    try {
        const order = await createOrder(req.body);

        res.json(order);
    } catch (error) {
        res.status(400).json({ message: 'Error creating orders: ', error: error.message });
    }
};

/**
 * Updates the status of an order.
 * @param {Object} req - The request object containing the order ID in `req.params.id` and the new status in `req.params.status`.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - The updated order or an error response.
 */
const patchOrderStatus = async (req, res) => {
    try {
        const order = await updateOrderStatus(req.params.id, req.params.status)

        if (order.length === 0){
            return res.status(404).json({ message: 'Order not found!' });
        }

        res.json(order);
    } catch (error) {
        res.status(400).json({ message: 'Error updating order: ', error: error.message })
    }
};

/**
 * @type {{getAllOrders: ((function(*, *): Promise<void>)|*), getOrderById: ((function(*, *): Promise<void>)|*), getOrderByUser: ((function(*, *): Promise<void>)|*), postOrder: ((function(*, *): Promise<void>)|*), patchOrderStatus: ((function(*, *): Promise<void>)|*)}}
 */
module.exports = {
    getAllOrders,
    getOrderById,
    getOrderByUser,
    postOrder,
    patchOrderStatus
};