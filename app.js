require('dotenv/config');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const homeRouter = require("./routers/home");
const findRouter = require("./routers/find");
const loginBankRouter = require("./routers/login_bank");
const loginDonorRouter = require("./routers/login_donor");
const signupBankRouter = require("./routers/signup_bank");
const signupDonorRouter = require("./routers/signup_donor");
const dashboardRouter = require("./routers/dashboard");


app.use('/', homeRouter);
app.use('/find-donor', findRouter);
app.use('/login-bank', loginBankRouter);
app.use('/login-donor', loginDonorRouter);
app.use('/signup-bank', signupBankRouter);
app.use('/signup-donor', signupDonorRouter);
app.use('/dashboard', dashboardRouter);


app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
