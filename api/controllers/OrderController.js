const { allOrders, ordersById, ordersByUser, 
    createOrder, updateOrderStatus } = require('../modules/OrderModule');

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

const postOrder = async (req, res) => {
    try {
        const order = await createOrder(req.body);

        res.json(order);
    } catch (error) {
        res.status(400).json({ message: 'Error creating orders: ', error: error.message });
    }
};

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
}

module.exports = {
    getAllOrders,
    getOrderById,
    getOrderByUser,
    postOrder,
    patchOrderStatus
}