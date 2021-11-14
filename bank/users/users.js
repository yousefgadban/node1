const fs = require('fs');
const uniqid = require('uniqid');
const validator = require('validator');


const createUser = (name, email, password) => {

    return new Promise((resolve, reject) => {
        if (!validator.isEmail(email)) {
            console.log('email not valid');
            reject({ result: 'error', data: 'email not valid' })
        } else {

            const users = loadUsers();

            let userExist = users.find((user) => {
                return user.email === email;
            })

            if (!userExist) {

                let newUser = {
                    id: uniqid(),
                    name: name,
                    email: email,
                    password: password,
                    balance: 0,
                    isActive: true,
                    role: 'customer',
                    accountNumber: ''+randomIntFromInterval(),
                    avatar: ''
                }
                users.push(newUser)
                saveUsers(users)
                resolve({ result: 'success', data: newUser })
            } else {
                console.log('email alredy exists');
                reject({ result: 'error', data: 'email alredy exists' })
            }

        }
    })

}

const login = (email, password) => {

    return new Promise((resolve, reject) => {
        if (!validator.isEmail(email)) {
            console.log('email not valid');
            reject({ result: 'error', data: 'error' })
        } else {

            const users = loadUsers();

            let userExist = users.find((user) => {
                return (user.email === email && user.password === password);
            })

            console.log('userExist', userExist);

            if (userExist) {
                resolve({ result: 'success', data: userExist })
            } else {
                reject({ result: 'error', data: 'error' })
            }

        }
    })

}


const getUser = (id) => {
    return new Promise((resolve, reject) => {

        const users = loadUsers();

        let userExist = users.find((user) => {
            return (user.id === id);
        })

        console.log('userExist', userExist);

        if (userExist) {
            resolve({ result: 'success', data: userExist })
        } else {
            reject({ result: 'error', data: 'user not found' })
        }

    })
}

const getAllUsers = () => {
    return new Promise((resolve, reject) => {

        const users = loadUsers();
        resolve({ result: 'success', data: users })
    
    })
}

const getFilteredUsers = (filter, value) => {
    return new Promise((resolve, reject) => {

        const users = loadUsers();
        let filteredUsers = [];  

        if (filter === 'equal') {
            filteredUsers = users.filter((user) => {
                return (user.balance === value);
            })
        } else if (filter === 'greater') {
            filteredUsers = users.filter((user) => {
                return (user.balance >= value);
            })
        } else {
            filteredUsers = users.filter((user) => {
                return (user.balance <= value);
            })
        } 

        console.log('filteredUsers', filteredUsers);

        resolve({ result: 'success', data: filteredUsers })

    })
}


const getAllAction = (id) => {
    return new Promise((resolve, reject) => {

        const actions = loadUserActions();

        console.log(actions, id);

        let actionsList = actions.find((action) => {
            return (action.id === id);
        })

        console.log('actionsList', actionsList.actions);

        if (actionsList) {
            resolve({ result: 'success', data: actionsList.actions })
        } else {
            reject({ result: 'error', data: 'user not found' })
        }

    })
}

const addWithDrawal = (params) => {
    return new Promise((resolve, reject) => {

        const users = loadUsers();
        let userExist = users.find((user) => {
            return (user.id === params.userId);
        })

        if (userExist) {

            if (userExist.isActive) {
    
                const actions = loadUserActions();
                const newAction = {
                    id: uniqid(),
                    date: new Date(),
                    amount: params.amount, 
                    isWithDrawal: params.isWithDrawal, 
                    using: params.using 
                }
    
                const userActions = actions.find((action) => {
                    return action.id === params.userId;
                })
    
                userActions.actions.push(newAction)
    
                saveActions(actions);
    
                userExist.balance -= params.amount;
                saveUsers(users)

                resolve({ result: 'success', data: newAction })

            } else {
                reject({ result: 'error', data: 'unactive user' })
            }

        } else {
            reject({ result: 'error', data: 'user not found' })
        }

    })
} 


const transferFromManager = (params) => {
    return new Promise((resolve, reject) => {

        const users = loadUsers();
        let userExist = users.find((user) => {
            return (user.id === params.userId);
        })

        if (userExist) {
            if (userExist.isActive) {

                const actions = loadUserActions();
                const newAction = {
                    id: uniqid(),
                    date: new Date(),
                    amount: params.amount,
                    isWithDrawal: params.isWithDrawal, 
                    using: params.using 
                }
    
                const userActions = actions.find((action) => {
                    return action.id === params.userId;
                })
    
                userActions.actions.push(newAction)
    
                saveActions(actions);
    
                userExist.balance += params.amount;
                saveUsers(users)
    
                resolve({ result: 'success', data: newAction })

            } else {
                reject({ result: 'error', data: 'unactive user' })
            }
        } else {
            reject({ result: 'error', data: 'user not found' })
        }

    })
} 


const transferMoney = (params) => {
    return new Promise((resolve, reject) => {

        const users = loadUsers();

        let userExist = users.find((user) => {
            return (user.id === params.userId);
        })

        let recieverExist = users.find((user) => {
            return (user.accountNumber === params.toAccount);
        })

        if (userExist && recieverExist) {
            if (userExist.isActive && recieverExist.isActive) {

                const actions = loadUserActions();
                const newAction = {
                    id: uniqid(),
                    date: new Date(),
                    amount: params.amount, 
                    isWithDrawal: params.isWithDrawal, 
                    using: params.using 
                }
    
                const userActions = actions.find((action) => {
                    return action.id === params.userId;
                })
                userActions.actions.push(newAction)
    
    
                /////
                const recieveAction = {
                    id: uniqid(),
                    date: new Date(),
                    amount: params.amount, 
                    isWithDrawal: false, 
                    using: params.recieverMsg 
                }
    
                const recieverActions = actions.find((action) => {
                    return action.id === recieverExist.id;
                })
                recieverActions.actions.push(recieveAction)
    
    
                saveActions(actions);
    
                userExist.balance -= params.amount;
                recieverExist.balance += params.amount;
                saveUsers(users)
    
                resolve({ result: 'success', data: newAction })

            } else {
                reject({ result: 'error', data: 'unactive user' })
            }
          
        } else {
            reject({ result: 'error', data: 'user not found' })
        }

    })
} 


const deleteUser = (id) => {


    return new Promise((resolve, reject) => {
        const users = loadUsers();

        let remainUsers = users.filter((user) => {
            return user.id !== id;
        })

        if (remainUsers.length !== users.length) {
            saveUsers(remainUsers)
            resolve({ result: 'deleted' })
        } else {
            console.log('No such user');
            reject({ result: 'No such user' })
        }
    })

}

const updateUserStatus = (id) => {


    return new Promise((resolve, reject) => {
        const users = loadUsers();
        let userExist = users.find((user) => {
            return (user.id === id);
        })

        if (userExist) {
            userExist.isActive = !userExist.isActive;
            saveUsers(users);
            resolve({ result: 'success', data: userExist })
        } else {
            reject({ result: 'error', data: 'error' })
        }
    })

}


const saveUsers = (users) => {
    const dataJSON = JSON.stringify(users);
    fs.writeFileSync('./bank/users/usersData.json', dataJSON);
}

const saveActions = (actions) => {
    const dataJSON = JSON.stringify(actions);
    fs.writeFileSync('./bank/users/actions.json', dataJSON);
}


const loadUsers = () => {
    try {
        const dataBuffer = fs.readFileSync('./bank/users/usersData.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        console.log('error');
        return [];
    }
}

const loadUserActions = () => {
    try {
        const dataBuffer = fs.readFileSync('./bank/users/actions.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        console.log('error');
        return [];
    }
}

const randomIntFromInterval = () => { 
    return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
}



module.exports = {
    createUser: createUser,
    login: login,
    getUser: getUser,
    getAllAction: getAllAction,
    addWithDrawal: addWithDrawal,
    transferMoney: transferMoney,
    getAllUsers: getAllUsers,
    transferFromManager: transferFromManager,
    getFilteredUsers: getFilteredUsers,
    deleteUser: deleteUser,
    updateUserStatus: updateUserStatus
}