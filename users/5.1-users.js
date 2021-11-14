const yargs = require('yargs');
const users = require('./users')
const express = require('express');
const bodyParser = require('body-parser');

var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware

    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});


yargs.command({
    command: 'addUser',
    describe: 'add new user',
    builder: {
        name: {
            describe: 'user name',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'user email',
            demandOption: true,
            type: 'string'
        },
    },
    handler: function (argv) {
        console.log('name ' + argv.name);
        console.log('email ' + argv.email);
        users.addUser(argv.name, argv.email);
    }
});

yargs.command({
    command: 'getUserById',
    describe: 'getUserById',
    builder: {
        id: {
            describe: 'user id',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        console.log('id ' + argv.id);
        users.getUser(argv.id);
    }
});

yargs.command({
    command: 'updateUser',
    describe: 'update user',
    builder: {
        id: {
            describe: 'user id',
            demandOption: true,
            type: 'string'
        },
        name: {
            describe: 'user name',
            demandOption: false,
            type: 'string'
        },
        email: {
            describe: 'user email',
            demandOption: false,
            type: 'string'
        },
    },
    handler: function (argv) {
        users.updateUser(argv.id, argv.name, argv.email);
    }
});

yargs.command({
    command: 'removeUser',
    describe: 'delete user',
    builder: {
        id: {
            describe: 'user id',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        console.log('id ' + argv.id);
        users.removeUser(argv.id);
    }
});

yargs.command({
    command: 'createPassword',
    describe: 'createPassword',
    builder: {
        id: {
            describe: 'user id',
            demandOption: true,
            type: 'string'
        },
        password: {
            describe: 'password',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        users.createPassword(argv.id, argv.password);
    }
});

yargs.command({
    command: 'updatePassword',
    describe: 'updatePassword',
    builder: {
        id: {
            describe: 'user id',
            demandOption: true,
            type: 'string'
        },
        password: {
            describe: 'password',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        users.createPassword(argv.id, argv.password);
    }
});

yargs.parse();

app.get('/getAllUsers', (req, res) => {

    users.getAllUsers().then((data) => {

        console.log('getAllUsers', data);
        res.status(200).json(data)
    });
})

app.post('/createUser', (req, res) => {

    console.log('createUser', req.body.name, req.body.email);
    users.createUser(req.body.name, req.body.email).then((data) => {

        console.log('createUser', data);
        res.status(201).json(data)
    }).catch((e) => {
        console.log(e);
        res.status(200).json(e)
    })

})


app.delete('/deleteUser', (req, res) => {

    console.log('deleteUser', req.query.id);
    users.deleteUser(req.query.id).then((data) => {
        console.log('deleteUser', data);
        res.status(200).json(data)
    }).catch((e) => {
        console.log(e);
        res.status(200).json(e)
    })

})


app.delete('/deleteUser1/:id', (req, res) => {

    console.log('deleteUser1', req.params.id);
    users.deleteUser(req.query.id).then((data) => {
        console.log('deleteUser1', data);
        res.status(200).json(data)
    }).catch((e) => {
        console.log(e);
        res.status(200).json(e)
    })

})

app.listen(4000)


//"start": "nodemon start"