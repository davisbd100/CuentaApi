const express = require ('express');
const app = express();
const account = require('./cuenta/account.js')


var PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(account);

app.listen(PORT, () => {
    console.log('server running on port ', + PORT);
})