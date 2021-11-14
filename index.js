const yargs = require('yargs');
const users = require('./users/users')



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


//"start": "nodemon start"