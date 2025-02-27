require('dotenv/config');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Importing Routers
const indexRouter = require("./routers/index"); // Updated file name
const findRouter = require("./routers/search");
const loginRouter = require("./routers/login"); // New unified login route
const signupBankRouter = require("./routers/register_hospital");
const signupDonorRouter = require("./routers/register_donor");
const dashboardRouter = require("./routers/dashboard");

// Using Routes
app.use('/', indexRouter);
app.use('/find-donor', findRouter);
app.use('/login', loginRouter);
app.use('/register-hospital', signupBankRouter);
app.use('/register-donor', signupDonorRouter);
app.use('/dashboard', dashboardRouter);

// Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
