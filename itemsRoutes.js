// Import modules
const express = require('express');
const router = new express.Router();
const items = require('./fakeDb');

// Route to handle GET request for all items
router.get('/items', (req, res) => {
    return res.json(items);
});

// Route to handle POST request to add new item
router.post('/items', (req, res) => {
    const newItem = { name: req.body.name, price: req.body.price };
    items.push(newItem);
    return res.status(201).json({ added: newItem });
});

// Route to handle GET request to retrieve specific item by name
router.get('/items/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if (foundItem) return res.json(foundItem);
    return res.sendStatus(404);
});

// Route for PATCH request to update specific item
router.patch('/items/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if (!foundItem) return res.sendStatus(404);

    foundItem.name = req.body.name || foundItem.name;
    foundItem.price = req.body.price || foundItem.price;

    return res.json({ updated: foundItem });
});

// Route to DELETE request to remove specific item
router.delete('/items/:name', (req, res) => {
    const itemIndex = items.findIndex(item => item.name === req.params.name);
    if (itemIndex === -1) return res.sendStatus(404);

    items.splice(itemIndex, 1);
    return res.json({ message: "Deleted" });
});

module.exports = router;
