const fs = require('fs');
const PATH_USERS = __dirname + '/json-data/users.json';
const PATH_ACCOUNTS = __dirname + '/json-data/accounts.json';


// ---Users---
const loadUsers = () => {
    try {
        const usersJSON = fs.readFileSync(PATH_USERS, 'utf-8');
        return JSON.parse(usersJSON);
    } catch (err) {
        return [];
    }
}

const saveUsers = (users) => {
    const usersJSON = JSON.stringify(users);
    fs.writeFileSync(PATH_USERS, usersJSON, 'utf-8');
}


// ---Accounts---
const loadAccounts = () => {
    const users = [];
    try {
        const usersJSON = fs.readFileSync(PATH_ACCOUNTS, 'utf-8');
        return JSON.parse(usersJSON);
    } catch (err) {
        return [];
    }
}

const saveAccounts = (users) => {
    const usersJSON = JSON.stringify(users);
    fs.writeFileSync(PATH_ACCOUNTS, usersJSON, 'utf-8');
}


module.exports = {
    loadUsers: loadUsers,
    saveUsers: saveUsers,
    loadAccounts: loadAccounts,
    saveAccounts: saveAccounts,
}