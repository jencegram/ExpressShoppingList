// Importing necessary modules
const express = require('express');
const itemsRoutes = require('./itemsRoutes');

// Initializing express application
const app = express();

// Middleware
app.use(express.json());
app.use(itemsRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Exporting app for testing
module.exports = app; 
