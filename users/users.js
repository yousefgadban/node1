const fs = require('fs');
const uniqid = require('uniqid');
const validator = require('validator');

const addUser = (name, email) => {

    if (!validator.isEmail(email)) {
        console.log('email not valid');
    } else {

        const users = loadUsers();

        let userExist = users.find((user) => {
            return user.email === email;
        })
    
        if (!userExist) {
            users.push({
                id: uniqid(),
                name: name,
                email: email
            })
            saveUsers(users)
        } else {
            console.log('email alredy exists');
        }

    }
    
}

const getUser = (id) => {
    const users = loadUsers();

    let userExist = users.find((user) => {
        return user.id === id;
    })

    if (userExist) {
        console.log(userExist);
    } else {
        console.log('No such user');
    }
}



const updateUser = (id, name, email) => {
    console.log('update user', id, name, email);

    const users = loadUsers();

    let userExist = users.find((user) => {
        return user.id === id;
    })

    let validData = true;

    if (userExist) {
        console.log(userExist);

        if (name === undefined && email === undefined) {
            console.log('can not update user');
        } else if (email === undefined) {
            userExist.name = name;
        } else if (name === undefined) {
            if (!validator.isEmail(email)) {
                validData = false;
                console.log('email not valid');
            } else {
                userExist.email = email;
            }
        }

        if (validData) {
            saveUsers(users)
        }
    } else {
        console.log('No such user');
    }
}

const removeUser = (id) => {
    const users = loadUsers();

    let remainUsers = users.filter((user) => {
        return user.id !== id;
    })

    if (remainUsers.length !== 0) {
        saveUsers(remainUsers)
    } else {
        console.log('No such user');
    }
}

const createPassword = (id, password) => {

    console.log('createPassword', id, password);

    const users = loadUsers();
    console.log(users);

    let userExist = users.find((user) => {
        return user.id === id;
    })


    if (userExist) {
        if (password.length > 7) {
            userExist.password = password;
            saveUsers(users);
        } else {
            console.log('Short password');
        }
    } else {
        console.log('No such user');
    }
    
}


const updatePassword = (id, password) => {

    console.log('updatePassword', id, password);

    const users = loadUsers();

    let userExist = users.find((user) => {
        return user.id === id;
    })


    if (userExist && userExist.password) {
        userExist.password = password;
        saveUsers(users);
    } else {
        console.log('No such user');
    }
    
}


const getAllUsers = async () => {
    const users = await loadAllUsers();
    console.log('users', users);
    return users
}

const loadUsers = () => {
    try{
        const dataBuffer = fs.readFileSync('../users.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        console.log('error');
        return [];
    }
}

const loadAllUsers = () => {

    return new Promise((resolve, reject) => {
        try{
            const dataBuffer = fs.readFileSync('../users.json', 'utf8');
            const dataJSON = dataBuffer.toString();
            console.log('yousef', dataJSON);
            resolve(JSON.parse(dataJSON));
        } catch (e) {
            console.log('youseffff');
            resolve([]);
        }
    })
   
}

const createUser = (name, email) => {

    return new Promise((resolve, reject) => {
        if (!validator.isEmail(email)) {
            console.log('email not valid');
            reject({result: 'email not valid'})
        } else {
    
            const users = loadUsers();
    
            let userExist = users.find((user) => {
                return user.email === email;
            })
        
            if (!userExist) {
                users.push({
                    id: uniqid(),
                    name: name,
                    email: email
                })
                saveUsers(users)
                resolve({
                    id: uniqid(),
                    name: name,
                    email: email
                })
            } else {
                console.log('email alredy exists');
                reject({result: 'email alredy exists'})
            }
    
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
            resolve({result: 'deleted'})
        } else {
            console.log('No such user');
            reject({result: 'No such user'})
        }
    })
    
}


const saveUsers = (users) => {
    const dataJSON = JSON.stringify(users);
    fs.writeFileSync('../users.json', dataJSON);
}

module.exports = {
    addUser: addUser,
    updateUser: updateUser,
    removeUser: removeUser,
    getUser: getUser,
    getAllUsers: getAllUsers,
    createPassword: createPassword,
    updatePassword: updatePassword,
    createUser: createUser,
    deleteUser: deleteUser
}