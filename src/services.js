const uniqid = require('uniqid');

const {
    loadUsers,
    saveUsers,
    loadAccounts,
    saveAccounts,
} = require('./fs-methods.js');


// ------------GET------------
const getAllUsers = () => {
    const allUsers = loadUsers();
    return allUsers;
}

const getUserById = (userId) => {
    const allUsers = loadUsers();
    const user = allUsers.find(user => user.userId === userId);
    if (!user) {
        return { message: "ID's user is not found" };
    }
    return user;
}

const getAllAccounts = () => {
    const allAccounts = loadAccounts();
    return allAccounts;
}

const getAccountById = (accountId) => {
    const allAccounts = loadAccounts();
    const account = allAccounts.find(account => account.accountId === accountId);
    if (!account) {
        return { message: "ID's account is not found" }
    }
    return account;
}


// ------------POST------------
const addNewUser = (userId, name, cash, credit) => {
    const allUsers = loadUsers();
    if (allUsers.some(user => user.userId === userId)) {
        return { message: "This ID is already exist" }
    }
    if (userId === "") {
        return { message: "This ID is not valid" }
    }
    if (name === "" || name === undefined) {
        return { message: "name is a required param" }
    }
    allUsers.push({ userId, name, accountsId: [], totalCash: 0 });
    saveUsers(allUsers);
    createNewAccountForUser(userId, cash, credit);
    return allUsers;
}

const createNewAccountForUser = (userId, cash = 0, credit = 0) => {
    const allUsers = loadUsers();
    const userIndex = allUsers.findIndex(user => user.userId === userId);
    if (userIndex === -1) {
        return { message: "ID's user is not found" };
    }
    const allAccounts = loadAccounts();
    const accountId = uniqid('account-')
    allAccounts.push({
        accountId: accountId,
        cash: cash,
        credit: credit,
        usersId: [userId]
    });
    saveAccounts(allAccounts);
    allUsers[userIndex].accountsId.push(accountId);
    allUsers[userIndex].totalCash += cash;
    saveUsers(allUsers);
    return allAccounts;
}


// ------------PUT------------
const depositOrWithdrawCashForAccount = (accountId, newCash) => {
    if (newCash === "" || newCash === undefined) {
        return { message: "newCash is a required param" }
    }
    const allAccounts = loadAccounts();
    const allUsers = loadUsers();
    const accountIndex = allAccounts.findIndex(account => account.accountId === accountId);
    if (accountIndex === -1) {
        return { message: `ID: ${accountId} account is not found` };
    }
    if (allAccounts[accountIndex].cash + allAccounts[accountIndex].credit + newCash < 0) {
        return { message: "The cash and the credit is run out" };
    }
    allAccounts[accountIndex].cash += newCash;
    allAccounts[accountIndex].usersId.forEach(__userId => {
        allUsers.forEach(user => {
            if (user.userId === __userId) {
                user.totalCash += newCash;
            }
        });
    });
    saveAccounts(allAccounts);
    saveUsers(allUsers);
    return allAccounts[accountIndex];
}

const updateCreditForAccount = (accountId, newCredit) => {
    if (newCredit === "" || newCredit === undefined) {
        return { message: "newCredit is a required param" }
    }
    const allAccounts = loadAccounts();
    const accountIndex = allAccounts.findIndex(account => account.accountId === accountId);
    if (accountIndex === -1) {
        return { message: "ID's account is not found" };
    }
    allAccounts[accountIndex].credit = newCredit;
    saveAccounts(allAccounts);
    return allAccounts[accountIndex];
}

const transferCash = (sourceAccountId, targetAccountId, cashToTransfer) => {
    if (cashToTransfer <= 0 || cashToTransfer === "" || cashToTransfer === undefined) {
        return { message: "param: cashToTransfer is not valid" };
    }
    if (sourceAccountId === targetAccountId) {
        return { message: "sourceAccountId and targetAccountId is a same" };
    }
    if (!loadAccounts().some(account => account.accountId === targetAccountId)) {
        return { message: `ID: ${targetAccountId} is not found` };
    }
    const sourceResult = depositOrWithdrawCashForAccount(sourceAccountId, cashToTransfer * -1);
    console.log(sourceResult)
    if (sourceResult.hasOwnProperty('message')) {
        return sourceResult;
    }
    const targetResult = depositOrWithdrawCashForAccount(targetAccountId, cashToTransfer);
    return [sourceResult, targetResult];
}

const addUserToAccount = (userId, accountId) => {
    const allUsers = loadUsers();
    const userIndex = allUsers.findIndex(user => user.userId === userId);
    if (userIndex === -1) {
        return { message: "ID's user is not found" };
    }
    const allAccounts = loadAccounts();
    const accountIndex = allAccounts.findIndex(account => account.accountId === accountId);
    if (accountIndex === -1) {
        return { message: "ID's account is not found" };
    }
    if (
        allUsers[userIndex].accountsId.includes(accountId)
        ||
        allAccounts[accountIndex].usersId.includes(userId)
    ) {
        return { message: "This user is already owner of this account" };
    }
    allUsers[userIndex].accountsId.push(accountId);
    allAccounts[accountIndex].usersId.push(userId);
    allUsers[userIndex].totalCash += allAccounts[accountIndex].cash;
    saveAccounts(allAccounts);
    saveUsers(allUsers);
    return { message: "User is added to the account" };
}

const removeUserFromAccount = (userId, accountId) => {
    const allUsers = loadUsers();
    const userIndex = allUsers.findIndex(user => user.userId === userId);
    if (userIndex === -1) {
        return { message: "ID's user is not found" };
    }
    const allAccounts = loadAccounts();
    const accountIndex = allAccounts.findIndex(account => account.accountId === accountId);
    if (accountIndex === -1) {
        return { message: "ID's account is not found" };
    }
    if (allUsers[userIndex].accountsId.length <= 1) {
        return { message: "User must account. First set some account for this user or just delete him" };
    }
    const indexAccountOfUser = allUsers[userIndex].accountsId.indexOf(accountId);
    const indexUserOfAccount = allAccounts[accountIndex].usersId.indexOf(userId);
    if (
        indexAccountOfUser === -1
        ||
        indexUserOfAccount === -1
    ) {
        return { message: "This user is already not the owner of this account" };
    }
    allUsers[userIndex].accountsId.splice(indexAccountOfUser, 1);
    allAccounts[accountIndex].usersId.splice(indexUserOfAccount, 1);
    allUsers[userIndex].totalCash -= allAccounts[accountIndex].cash;
    saveAccounts(allAccounts);
    saveUsers(allUsers);
    return { message: "User is removed from the account" };
}


// ------------DELETE------------
const removeUser = (userId) => {
    const allUsers = loadUsers();
    const userIndex = allUsers.findIndex(user => user.userId === userId);
    if (userIndex === -1) {
        return { message: "ID's user is not found" };
    }
    const allAccounts = loadAccounts();
    const indexesOfAccountsToDelete = [];
    allAccounts.forEach((account, idx) => {
        const index = account.usersId.indexOf(userId);
        console.log(account.usersId, index, userId)
        if (index !== -1) {
            account.usersId.splice(index, 1);
            if(index === 0){
                indexesOfAccountsToDelete.push(idx);
            }
        }
    });
    for(let index of indexesOfAccountsToDelete){
        allAccounts.splice(index, 1);
    }
    allUsers.splice(userIndex, 1);
    saveAccounts(allAccounts);
    saveUsers(allUsers);
    return allUsers;
}

const removeAccount = (accountId) => {
    const allAccounts = loadAccounts();
    const accountIndex = allAccounts.findIndex(account => account.accountId === accountId);
    if (accountIndex === -1) {
        return { message: "ID's account is not found" };
    }
    if(allAccounts[accountIndex].usersId.length > 0) {
        return { message: "You need first remove all users from this account" };
    }
    accountIndex.splice(accountIndex, 1);
    saveAccounts(allAccounts);
    return allAccounts;
}


// EXPORTS
module.exports = {
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
}