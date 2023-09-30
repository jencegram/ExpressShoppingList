const request = require('supertest');
const app = require('./app'); 

beforeEach(() => { 
    global.items = [];
});

// Test for GET /items
test('Get all items', async () => {
    const response = await request(app).get('/items');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
});

// Test for POST /items
test('Add an item', async () => {
    const response = await request(app).post('/items').send({ name: 'banana', price: 0.75 });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ added: { name: 'banana', price: 0.75 } });
});

// Test for GET /items/:name
test('Get a single item by name', async () => {
    // First, add an item to work with
    await request(app).post('/items').send({ name: 'cereal', price: 3.50 });
    
    const response = await request(app).get('/items/cereal');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ name: 'cereal', price: 3.50 });
});

// Test for non-existent item
test('Get a non-existent item by name', async () => {
    const response = await request(app).get('/items/nonexistent');
    expect(response.statusCode).toBe(404);
});

// Test for PATCH 
test('Update an item by name', async () => {
    await request(app).post('/items').send({ name: 'cereal', price: 3.50 });

    const response = await request(app).patch('/items/cereal').send({ name: 'oats', price: 3.49 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ updated: { name: 'oats', price: 3.49 } });
});

// Test for DELETE 
test('Delete an item by name', async () => {
    await request(app).post('/items').send({ name: 'cereal', price: 3.50 });

    const response = await request(app).delete('/items/cereal');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Deleted" });
});

// Test delete for non-existent item
test('Try to delete a non-existent item', async () => {
    const response = await request(app).delete('/items/nonexistent');
    expect(response.statusCode).toBe(404);
});
