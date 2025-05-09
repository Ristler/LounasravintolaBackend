/**
 * @module Modules/OrderModule
 */

const orders = require("../../models/order");

/**
 * Fetches all orders.
 * @returns {Promise<Array>} - An array of all orders.
 */
const allOrders = async () => {
    const order = await orders.find();
    return order;
};

/**
 * Fetches an order by its ID.
 * @param {string} id - The ID of the order.
 * @returns {Promise<Object>} - The order or an empty result if not found.
 */
const ordersById = async (id) => {
    const order = orders.find({_id: id});
    return order;
};

/**
 * Fetches orders by user ID.
 * @param {string} id - The ID of the user.
 * @returns {Promise<Array>} - An array of orders for the user.
 */
const ordersByUser = async (id) => {
    const order = orders.find({userId: id});
    return order;
};

/**
 * Creates a new order.
 * @param {Object} body - The order data.
 * @param {string} body.userId - The ID of the user placing the order.
 * @param {Array<Object>} body.items - The items in the order.
 * @param {number} body.totalPrice - The total price of the order.
 * @param {number} body.orderScore - The score of the order.
 * @returns {Promise<Object>} - The created order.
 */
const createOrder = async (body) => {
    const { userId, items, totalPrice, orderScore } = body;

    const order = new orders({
        userId,
        items,
        totalPrice,
        orderScore
    });

    await order.save();

    return order;
};

/**
 * Updates the status of an order.
 * @param {string} id - The ID of the order.
 * @param {string} status - The new status of the order.
 * @returns {Promise<Object>} - The updated order.
 */
const updateOrderStatus = async (id, status) => {
    const order = await orders.updateOne(
        {_id: id},
        {$set: { status }},
    );

    return order;
};

module.exports = {
    allOrders,
    ordersById,
    ordersByUser,
    createOrder,
    updateOrderStatus
};