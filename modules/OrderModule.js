const orders = require("../models/order");

const allOrders = async () => {
    const order = await orders.find();
    return order;
}

const ordersById = async (id) => {
    const order = orders.find({_id: id});
    return order;
};

const ordersByUser = async (id) => {
    const order = orders.find({userId: id});
    return order;
}

const createOrder = async (body) => {
    const { userId, items, totalPrice, orderScore } = body;

    const order = new orders({ 
        userId, 
        items, 
        totalPrice, 
        orderScore });

    await order.save();

    return order;
}

const updateOrderStatus = async (id, ready) => {
    const order = await orders.updateOne(
        {_id: id},
        {$set: { ready } },
    );

    return order;
}

module.exports = {
    allOrders,
    ordersById,
    ordersByUser,
    createOrder,
    updateOrderStatus
}