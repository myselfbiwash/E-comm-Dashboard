const mongoose = require('mongoose');
MONG0_URI = process.env.MONG0_URI;

mongoose.connect(MONG0_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Failed to connect to MongoDB:', error));
