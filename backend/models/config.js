const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://biwash10:biwash20@cluster0.m1wcyog.mongodb.net/EcomDashboard")
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Failed to connect to MongoDB:', error));
