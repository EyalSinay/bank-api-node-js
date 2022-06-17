const {
    getAllUsers,
    getUserById,
    getAllAccounts,
    getAccountById,
    addNewUser,
    createNewAccountForUser,
    depositOrWithdrawCashForAccount,
    updateCreditForAccount,
    transferCash,
    addUserToAccount,
    removeUserFromAccount,
    removeUser,
    removeAccount
} = require('./services');


// ------------GET------------
const sendWelcomeMsg = (req, res) => {
    res.send({ message: "welcome to bank-api" });
}

const sendAllUsers = (req, res) => {
    res.send(getAllUsers());
}

const sendUser = (req, res) => {
    const userId = req.params.userId;
    res.send(getUserById(userId));
}

const sendAllAccounts = (req, res) => {
    res.send(getAllAccounts());
}

const sendAccount = (req, res) => {
    const accountId = req.params.accountId;
    res.send(getAccountById(accountId));
}


// ------------POST------------
const addNewUserAndSendAllUsers = (req, res) => {
    const { userId, name, cash, credit } = req.body;
    const newAllUsers = addNewUser(userId, name, cash, credit);
    res.send(newAllUsers);
}

const addNewAccountAndSendAllAccount = (req, res) => {
    const { userId, cash, credit } = req.body;
    const newAllAccounts = createNewAccountForUser(userId, cash, credit);
    res.send(newAllAccounts);
}


// ------------PUT------------
const depositOrWithdrawCashForAccountAndSendAccount = (req, res) => {
    const { accountId, newCash } = req.body;
    const updateAccount = depositOrWithdrawCashForAccount(accountId, newCash);
    res.send(updateAccount);
}

const updateCreditForAccountAndSendAccount = (req, res) => {
    const { accountId, newCredit } = req.body;
    const updateAccount = updateCreditForAccount(accountId, newCredit);
    res.send(updateAccount);
}

const transferCashAndSendTwoAccounts = (req, res) => {
    const { sourceAccountId, targetAccountId, cashToTransfer } = req.body;
    const twoAccounts = transferCash(sourceAccountId, targetAccountId, cashToTransfer);
    res.send(twoAccounts);
}

const addUserToAccountAndSendMsg = (req, res) => {
    const { userId, accountId } = req.body;
    const msg = addUserToAccount(userId, accountId);
    res.send(msg);
}

const removeUserToAccountAndSendMsg = (req, res) => {
    const { userId, accountId } = req.body;
    const msg = removeUserFromAccount(userId, accountId);
    res.send(msg);
}


// ------------DELETE------------
const deleteUserAndSendAllUsers = (req, res) => {
    const userId = req.params.userId;
    res.send(removeUser(userId));
}
const deleteAccountAndSendAllAccounts = (req, res) => {
    const accountId = req.params.accountId;
    res.send(removeAccount(accountId));
}


module.exports = {
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
}