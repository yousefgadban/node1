const fs = require('fs');
const uniqid = require('uniqid');
const validator = require('validator');

const userModel = require('./user.model').userModel;
const actionModel = require('./action.model').actionModel;


const test = async () => {
    console.log('test');
    // userModel.findById('6196799fcc7df52e8679f065', function(err, data) {
    //     console.log(data);
    // });

    try {
        const user = await userModel.findById('6196799fcc7df52e8679f0655');
        console.log(user);
    } catch(err) {
        console.log(err);
    }
}

const createUser = (name, email, password) => {

    return new Promise((resolve, reject) => {
        if (!validator.isEmail(email)) {
            console.log('email not valid');
            reject({ result: 'error', data: 'email not valid' })
        } else {

            loadUsers().then((data)=> {
                const users = data;
                console.log('users',users);
                let userExist = users.find((user) => {
                    return user.email === email;
                })
    
                if (!userExist) {
    
                    const newUser = new userModel({ 
                        name: name,
                        email: email, 
                        password: password,
                        balance: 0,
                        isActive: true,
                        role: 'customer',
                        accountNumber: ''+randomIntFromInterval(),
                        avatar: 'https://www.seekpng.com/png/detail/110-1100707_person-avatar-placeholder.png'
                    });
                    newUser.save(function(err,result){
                        if (err){
                            console.log(err);
                        }
                        else{
                            console.log('result',result.id);
                            const newAction = new actionModel({ 
                                _id: result.id,
                                userID: result.id,
                                actions: []
                            });
                            newAction.save(function(err,result){ 
                                if (err) {
                                    console.log(err);
                                }
                                else{
                                    resolve({ result: 'success', data: newUser });
                                }
                            }); 
                        }
                    });
                } else {
                    console.log('email alredy exists');
                    reject({ result: 'error', data: 'email alredy exists' })
                }
            });

        }
    })

}

const login = (email, password) => {

    return new Promise((resolve, reject) => {
        if (!validator.isEmail(email)) {
            console.log('email not valid');
            reject({ result: 'error', data: 'error' })
        } else {

            loadUsers().then((data)=> {
                const users = data;
                let userExist = users.find((user) => {
                    return (user.email === email && user.password === password);
                })
    
                console.log('userExist', userExist);
    
                if (userExist) {
                    resolve({ result: 'success', data: userExist })
                } else {
                    reject({ result: 'error', data: 'error' })
                }
            });

        }
    })

}


const getUser = (id) => {
    return new Promise((resolve, reject) => {

        userModel.findById(id, function(err, data) {
            if (err) {
                reject({ result: 'error', data: 'user not found' })
            } else {
                resolve({ result: 'success', data: data })
            }
        })

        // loadUsers().then((data)=> {
        //     const users = data;
        //     let userExist = users.find((user) => {
        //         return (user.id === id);
        //     })
    
        //     console.log('getUser userExist', userExist);
    
        //     if (userExist) {
        //         resolve({ result: 'success', data: userExist })
        //     } else {
        //         reject({ result: 'error', data: 'user not found' })
        //     }
        // });

    })
}

const getAllUsers = () => {
    return new Promise((resolve, reject) => {

        loadUsers().then((data)=> {
            const users = data;
            resolve({ result: 'success', data: users });
        });
    
    })
}

const getFilteredUsers = (filter, value) => {
    return new Promise((resolve, reject) => {

        loadUsers().then((data)=> {
            const users = data;
            console.log('users', value,  users);
            let filteredUsers = [];  

            if (filter === 'equal') {
                filteredUsers = users.filter((user) => {
                    return (user.balance === value);
                })
            } else if (filter === 'greater') {
                filteredUsers = users.filter((user) => {
                    console.log('greater', user.balance); 
                    return (user.balance >= value);
                })
            } else {
                filteredUsers = users.filter((user) => {
                    return (user.balance <= value);
                })
            } 

            console.log('filteredUsers', filteredUsers);

            resolve({ result: 'success', data: filteredUsers })    
        });
        
    })
}


const getAllAction = (id) => {
    return new Promise((resolve, reject) => {

        loadUserActions(id).then((data) => {
            const actions = data;
            console.log('actionsList', id, actions);

            resolve({ result: 'success', data: actions.actions }) 

            // let actionsList = actions.find((action) => {
            //     return (action.id === id);
            // })

            // console.log('actionsList', actionsList.actions);

            // if (actionsList) {
            //     resolve({ result: 'success', data: actionsList.actions })
            // } else {
            //     reject({ result: 'error', data: 'user not found' })
            // }
        });

        

    })
}

const addWithDrawal = (params) => {
    return new Promise((resolve, reject) => {

        console.log(params.userId);

        userModel.findById(params.userId, function(err, data) {

            const userExist = data;
            if (userExist) {
    
                if (userExist.isActive) {
  
                    loadUserActions(params.userId).then((actionsData)=> {

                        const newAction = {
                            id: uniqid(),
                            date: new Date(),
                            amount: params.amount, 
                            isWithDrawal: params.isWithDrawal, 
                            using: params.using 
                        }

                        const query = {'_id': userExist.id};
                        const updatedData = { $push: { actions: newAction } }
                        
                        actionModel.findOneAndUpdate(query, updatedData, function(err, data) {
                            if (err) {
                                reject({ result: 'error', data: 'unactive user' })
                            } else {
                                const balanceQuery = {'_id': userExist._id};
                                const balanceUpdatedData = { $inc: { balance: -params.amount }};
                                
                                userModel.findOneAndUpdate(balanceQuery, balanceUpdatedData, {new: true},  function(err, data) {
                                    if (err) {
                                        reject({ result: 'error', data: 'unactive user' })
                                    } else {
                                        console.log('balance', data);
                                        resolve({ result: 'success', data: newAction })
                                    }
                                });
                            }
                        });

                    });
                    
    
                } else {
                    reject({ result: 'error', data: 'unactive user' })
                }
    
            } else {
                reject({ result: 'error', data: 'user not found' })
            }
        });

    })
} 

const transferFromManager = (params) => {
    return new Promise(async (resolve, reject) => {

        try {
            const user = await userModel.findById(params.userId);
            console.log('user', user);
            if (user.isActive) {
 
                const newAction = {
                    id: uniqid(),
                    amount: params.amount,
                    isWithDrawal: params.isWithDrawal, 
                    using: params.using 
                }

                const query = {'_id': params.userId};
                const updatedData = { $push: { actions: newAction } }
                await actionModel.findOneAndUpdate(query, updatedData)

                const balanceQuery = {'_id': params.userId};
                const balanceUpdatedData = { $inc: { balance: params.amount }};
                await userModel.findOneAndUpdate(balanceQuery, balanceUpdatedData, {new: true});
    
                resolve({ result: 'success', data: newAction })

            } else {
                reject({ result: 'error', data: 'unactive user' })
            }

        } catch (err) {
            reject({ result: 'error', data: 'user not found' })
        }

    })
} 

// const transferFromManager = (params) => {
//     return new Promise((resolve, reject) => {

//         loadUsers().then((data)=> {
//             const users = data;

//             let userExist = users.find((user) => {
//                 return (user.id === params.userId);
//             })

//             if (userExist) {
//                 if (userExist.isActive) {

//                     const actions = loadUserActions();
//                     const newAction = {
//                         id: uniqid(),
//                         date: new Date(),
//                         amount: params.amount,
//                         isWithDrawal: params.isWithDrawal, 
//                         using: params.using 
//                     }
        
//                     const userActions = actions.find((action) => {
//                         return action.id === params.userId;
//                     })
        
//                     userActions.actions.push(newAction)
        
//                     saveActions(actions);
        
//                     userExist.balance += params.amount;
//                     saveUsers(users)
        
//                     resolve({ result: 'success', data: newAction })

//                 } else {
//                     reject({ result: 'error', data: 'unactive user' })
//                 }
//             } else {
//                 reject({ result: 'error', data: 'user not found' })
//             }
//         });

//     })
// } 


const transferMoney = (params) => {
    return new Promise(async (resolve, reject) => {

        try {
            const user = await userModel.findById(params.userId);
            const reciever = await userModel.find({accountNumber: params.toAccount});
            console.log(user, reciever[0]);

            if (user && reciever[0]) {
                if (user.isActive && reciever[0].isActive) {

                    const newAction = {
                        date: new Date(),
                        amount: params.amount, 
                        isWithDrawal: params.isWithDrawal, 
                        using: params.using 
                    }

                    const query = {'_id': user._id};
                    const updatedData = { $push: { actions: newAction } }
                    await actionModel.findOneAndUpdate(query, updatedData)

                    const balanceQuery = {'_id': user._id};
                    const balanceUpdatedData = { $inc: { balance: -params.amount }};
                    await userModel.findOneAndUpdate(balanceQuery, balanceUpdatedData, {new: true});

                    const recieverAction = {
                        date: new Date(),
                        amount: params.amount, 
                        isWithDrawal: false, 
                        using: params.using 
                    }

                    const recieverQuery = {'_id': reciever[0]._id}; 
                    const recieverUpdatedData = { $push: { actions: recieverAction } }
                    await actionModel.findOneAndUpdate(recieverQuery, recieverUpdatedData)

                    const recieverBalanceQuery = {'_id': reciever[0]._id};
                    const recieverBalanceUpdatedData = { $inc: { balance: params.amount }};
                    await userModel.findOneAndUpdate(recieverBalanceQuery, recieverBalanceUpdatedData, {new: true});
        
                    resolve({ result: 'success', data: newAction })

                } else {
                    reject({ result: 'error', data: 'unactive user' })
                }
            
            } else {
                reject({ result: 'error', data: 'user not found' })
            }

        } catch(err) {
            console.log(err);
        }

    })
} 


const deleteUser = (id) => {

    return new Promise(async (resolve, reject) => {

        try {
            await userModel.findByIdAndDelete(id);
            await actionModel.findByIdAndDelete(id);
            resolve({ result: 'deleted' })
        } catch (err) {
            reject({ result: 'No such user' })
        }
        
        // loadUsers().then((data)=> {
        //     const users = data;
        //     let remainUsers = users.filter((user) => {
        //         return user.id !== id;
        //     })

        //     if (remainUsers.length !== users.length) {
        //         saveUsers(remainUsers)
        //         resolve({ result: 'deleted' })
        //     } else {
        //         console.log('No such user');
        //         reject({ result: 'No such user' })
        //     }
        // })
    })

}

const updateUserStatus = (id) => {

    return new Promise(async (resolve, reject) => {

        try {

            let user = await userModel.findOne({'_id': id});
            user.isActive = !user.isActive;
            const updatedUser = await user.save();

            // const balanceQuery = {'_id': id};
            // const balanceUpdatedData = { $inc: { balance: -params.amount }};
            // await userModel.findOneAndUpdate(balanceQuery, balanceUpdatedData, {new: true});

            resolve({ result: 'success', data: updatedUser })
        } catch (err) {
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
    return new Promise((resolve, reject) => {
        try {
            userModel.find({}).lean().exec(function(err, data) {
                if (err) throw err;
                resolve(data);
            });
        } catch (e) {
            console.log('errorr');
            resolve([]);
        }
    });
}


// const loadUsers = () => {
//     try {
//         const dataBuffer = fs.readFileSync('./bank/users/usersData.json');
//         const dataJSON = dataBuffer.toString();
//         return JSON.parse(dataJSON);
//     } catch (e) {
//         console.log('error');
//         return [];
//     }
// }

const loadUserActions = (id) => {
    return new Promise((resolve, reject) => {
        try {
            actionModel.find({_id: id}).lean().exec(function(err, data) {
                if (err) throw err;
                resolve(data[0]);
            });
        } catch (e) {
            console.log('errorr');
            resolve([]);
        }
    });
}


// const loadUserActions = () => {
//     try {
//         const dataBuffer = fs.readFileSync('./bank/users/actions.json');
//         const dataJSON = dataBuffer.toString();
//         return JSON.parse(dataJSON);
//     } catch (e) {
//         console.log('error');
//         return [];
//     }
// }

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
    updateUserStatus: updateUserStatus,
    test: test
}