const request = require('supertest');
const app = require('../app'); // Import your Express app

let server;

beforeAll((done) => {
    // Start the server before running tests
    server = app.listen(() => {
        done();
    });
});

afterAll((done) => {
    // Close the server after tests are done
    server.close(done);
});

describe('Orders API End-to-End Tests', () => {
    it('should fetch all orders', async () => {
        const response = await request(app).get('/orders');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should fetch an order by ID', async () => {
        const orderId = '6810ac82f313b6046721c770'; // Replace with a valid ID
        const response = await request(app).get(`/orders/${orderId}`);
        console.log(response.body[0]);

        if (response.status === 404) {
            expect(response.body.message).toBe('Order not found!');
        } else {
            expect(response.status).toBe(200);
            expect(response.body[0]).toHaveProperty('_id', orderId);
        }
    });

    it('should create a new order', async () => {
        const newOrder = {
            userId: '68187004da6a51862876493c',
            items: [{ foodid: '680a158d825b37c212a3fb7a', quantity: 2, price: 10.5 }],
            totalPrice: 21,
            orderScore: 5
        };

        const response = await request(app).post('/orders').send(newOrder);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.userId).toBe(newOrder.userId);
    });

    it('should update an order status', async () => {
        const orderId = '6810ac82f313b6046721c770'; // Replace with a valid ID
        const newStatus = 'Completed';

        const response = await request(app).patch(`/orders/${orderId}/${newStatus}`);
        if (response.status === 404) {
            expect(response.body.message).toBe('Order not found!');
        } else {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('modifiedCount', 1);
        }
    });
});