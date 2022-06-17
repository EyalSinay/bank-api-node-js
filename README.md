# bank-api-node-js

BASE_URL = 'https://bank-api-appleseeds.herokuapp.com/'

## GET METHODS:
### To get all users:
BASE_URL + 'users'
### To get specific user by ID:
BASE_URL + 'users/' + :userId
### To get all accounts:
BASE_URL + 'accounts'
### To get specific account by ID:
BASE_URL + 'accounts/' + :accountId
## POST METHODS:
### To add a new user:
BASE_URL + 'users'
- body params:
    - userId*
    - name*
    - cash
    - credit
### To add a new account:
BASE_URL + 'accounts'
- body params:
    - userId* (user that is already exist to apply for this new account)
    - cash
    - credit
## PUT METHODS:
### To deposit or withdraw cash from account:
BASE_URL + '/accounts/deposit-withdraw'
- body params:
    - accountId*
    - newCash* (positive for deposit or negative for withdraw)
### To transfer a cash between two accounts:
BASE_URL + '/accounts/transfer-cash'
- body params:
    - sourceAccountId*
    - targetAccountId*
    - cashToTransfer* (only positive number)
### To update the credit of account:
BASE_URL + '/accounts/credit'
- body params:
    - accountId*
    - newCredit*
### To add user to exist account:
BASE_URL + '/add-user-to-account'
- body params:
    - userId*
    - accountId*
### To remove user from account:
BASE_URL + '/remove-user-from-account'
- body params:
    - userId*
    - accountId*
## DELETE METHODS:
## To delete user
BASE_URL + 'users/' + :userId
## To account
BASE_URL + 'accounts/' + :accountId