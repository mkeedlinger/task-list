// 'command' file


/*
################
Depends
################
*/
var express = require('express'),
    socketio = require('socket.io'),
    http = require('http'),
    r = require('rethinkdb'),
    config = require('./config'),
    def = require('./def'),
    colors = require('colors');

/*
################
'Meat'
################
*/
var app = express(),
    server = http.createServer(app),
    io = socketio.listen(server);

app.use(express.static(__dirname + '/public'));

io.set('log level', config.ioLogLevel);
server.listen(config.serverPort);

io.sockets.on('connection', function(socket) { // defines socket actions
    socket.on('liveUpdater', function(data) {
        def.onLiveUpdater(data);
    });
    def.dbConnect(function (err, conn) { // get the info from db, make client init
    	r.table('lists').get(testList.id).run(conn, function (err, result) {
    		if (err) {
    			def.log.dbFatal('io.sockets, def.dbConnect, if err', err);
    		} else {
    			socket.emit('createInitList', result);
    		};
    	})
    });
});

/*
################
Nice testing crap
################
*/
(function() { // sets up the database if needed
    r.connect(config.dbConnect, function(err, conn) {
        r.dbCreate(config.dbConnect.db).run(conn, function(err, result) {
            if (err) {
                def.log.dbError(err);
            } else {
                def.log.dbInfo('db "' + config.dbConnect.db + '" created');
            };

            for (var table in config.dbSetup.tables) {
                (function(tbl) {
                    r.tableCreate(config.dbSetup.tables[tbl])
                        .run(conn, function(err, result) {
                            if (err) {
                                def.log.dbError(err);
                            } else {
                                def.log.dbInfo('created table ' + config.dbSetup.tables[tbl]);
                            };
                        })
                })(table);
            }
        })
        conn.close();
    })
});

(function() { // sets up the db with some default data
    def.dbConnect(function(err, conn) {
        r.db(config.dbConnect.db).table('users').insert(testUser)
            .run(conn, function(err, result) {
                if (err) {
                    def.log.dbError('problem populating users table', err);
                } else {
                    def.log.dbInfo('populated users')
                };
            })
        r.db(config.dbConnect.db).table('lists').insert(testList)
            .run(conn, function(err, result) {
                if (err) {
                    def.log.dbError('problem populating lists table', err);
                } else {
                    def.log.dbInfo('populated lists');
                };
            })
    })
});

var testUser = {
	id: '1b0bfea2-31d4-4cec-9d0a-a848c8e1014b',
    username: 'mkeedlinger',
    password: 'iliketotest',
    lists: ['fb03210a-a39b-45ce-8e3d-a5a95b9661ce']
	},
    testTaskData = [{
        "order": 0,
        "uuid": "fb03310a-a39b-45ce-8e3d-a5a95b9661ce",
        "task": "just a default",
        "checked": false
    }, {
        "order": 1,
        "uuid": "d9d4d798-6d71-46fa-85a3-23b084f1204d",
        "task": "task",
        "checked": true
    }, {
        "order": 2,
        "uuid": "bd14d4a7-d54e-4ac4-891d-49a474eac823",
        "task": "list",
        "checked": false
    }],
    testList = {
        id: 'fb03210a-a39b-45ce-8e3d-a5a95b9661ce',
        list: testTaskData,
        name: "testerasdfasf"
    };