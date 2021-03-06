const express = require('express');
const cors = require("cors");
const {
    sendWelcomeMsg,
    sendAllUsers,
    sendUser,
    sendAllAccounts,
    sendAccount,
    addNewUserAndSendAllUsers,
    addNewAccountAndSendAllAccount,
    depositOrWithdrawCashForAccountAndSendAccount,
    updateCreditForAccountAndSendAccount,
    transferCashAndSendTwoAccounts,
    addUserToAccountAndSendMsg,
    removeUserToAccountAndSendMsg,
    deleteUserAndSendAllUsers,
    deleteAccountAndSendAllAccounts
} = require('./src/controllers.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// ------------GET------------
app.get('/', sendWelcomeMsg);
app.get('/users', sendAllUsers);
app.get('/users/:userId', sendUser);
app.get('/accounts', sendAllAccounts);
app.get('/accounts/:accountId', sendAccount);

// ------------POST------------
app.post('/users', addNewUserAndSendAllUsers);
app.post('/accounts', addNewAccountAndSendAllAccount);

// ------------PUT------------
app.put('/accounts/deposit-withdraw',depositOrWithdrawCashForAccountAndSendAccount);
app.put('/accounts/transfer-cash',transferCashAndSendTwoAccounts);
app.put('/accounts/credit',updateCreditForAccountAndSendAccount);
app.put('/add-user-to-account',addUserToAccountAndSendMsg);
app.put('/remove-user-from-account',removeUserToAccountAndSendMsg);

// ------------DELETE------------
app.delete('/users/:userId', deleteUserAndSendAllUsers);
app.delete('/accounts/:accountId', deleteAccountAndSendAllAccounts);


// Listen:
app.listen(PORT, () => {
    console.log(`LISTEN ON PORT ${PORT}`);
});