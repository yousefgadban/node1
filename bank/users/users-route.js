const express = require('express')
const router = express.Router()
const users = require('./users.js');

module.exports = router

 router.get('/test', (req, res) => {
     users.test();
 })

router.post('/createUser', (req, res) => {

    const {name, email, password} = req.body;

    console.log('createUser', name, email, password);

    users.createUser(name, email, password).then((data) => {

        console.log('createUser', data);
        res.status(201).json(data)
    }).catch((e) => {
        console.log(e);
        res.status(200).json(e)
    })

})

router.get('/login/:email/:password', (req, res) => {

    const {email, password} = req.params;

    console.log('login', email, password);

    users.login(email, password).then((data) => {
        res.status(200).json(data);
    }).catch((e) => {
        res.status(200).json(e)
    })

})

router.get('/getUserData/:id', (req, res) => {

    const {id} = req.params;

    console.log('getUserData', id);

    users.getUser(id).then((data) => {
        res.status(200).json(data);
    }).catch((e) => {
        res.status(200).json(e)
    })

})

router.get('/getAllAction/:id', (req, res) => {

    const {id} = req.params;

    console.log('getAllAction', id);

    users.getAllAction(id).then((data) => {
        res.status(200).json(data);
    }).catch((e) => {
        res.status(200).json(e)
    })

})


router.post('/addWithDrawal', (req, res) => {

    //const {id} = req.params;

    console.log('addWithDrawal', req.body);

    users.addWithDrawal(req.body).then((data) => {
        res.status(201).json(data);
    }).catch((e) => {
        res.status(200).json(e)
    })

})

router.post('/TranferMoney', (req, res) => {

    //const {id} = req.params;

    console.log('TranferMoney', req.body);

    users.transferMoney(req.body).then((data) => {
        res.status(201).json(data);
    }).catch((e) => {
        res.status(200).json(e)
    })

})


router.get('/getAllUsers', (req, res) => {

    console.log('getAllUsers');

    users.getAllUsers().then((data) => {
        res.status(200).json(data);
    }).catch((e) => {
        res.status(200).json(e)
    })

})

router.post('/transferFromManager', (req, res) => {

    console.log('transferFromManager', req.body);

    users.transferFromManager(req.body).then((data) => {
        res.status(201).json(data);
    }).catch((e) => {
        res.status(200).json(e)
    })

})

router.get('/getFilteredUsers/:filter/:filterValue', (req, res) => {

    console.log('getFilteredUsers', req.params.filter, req.params.filterValue);

    users.getFilteredUsers(req.params.filter, +req.params.filterValue).then((data) => {
        res.status(200).json(data);
    }).catch((e) => {
        res.status(200).json(e)
    })

})


router.delete('/deleteUsers/:id', (req, res) => {

    console.log('deleteUsers', req.params.id);

    users.deleteUser(req.params.id).then((data) => {
        res.status(200).json(data);
    }).catch((e) => {
        res.status(200).json(e)
    })

})

router.put('/updateUserStatus/:id', (req, res) => {

    console.log('updateUserStatus ', req.params.id);

    users.updateUserStatus(req.params.id).then((data) => {
        res.status(200).json(data);
    }).catch((e) => {
        res.status(404).json(e)
    })

})



 




