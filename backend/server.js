const express = require('express');
const cors = require('cors');

// express app
const app = express();
app.use(cors());
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const ordersRoutes = require('./routes/orders');
const formRoutes = require('./routes/form');

// middleware - code that executes b/w us sending a req on the server and us sending a response
app.use(express.json());

// routes
app.use('/api/orders', ordersRoutes);

app.use('/api/form', formRoutes);

// connect to MongoDB(it's async)
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    
    // listen for requests
    app.listen(process.env.PORT, () => {
        console.log('Connected to db, listening to port ', process.env.PORT);
    });
})
.catch((error) => {
    console.log(error);
});
