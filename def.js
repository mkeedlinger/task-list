// definition file

var config = require('./config'),
	r = require('rethinkdb'),
	assert = require('assert'),
	color = require('colors');

module.exports = {
	dbConnect: function (callback) {
	    r.connect(config.dbConnect, function(err, connection) {
	        assert.ok(err === null, err);
	        connection['_id'] = Math.floor(Math.random() * 10001);
	        if (err) {
	        	def.log.dbFatal('dbConnect could not connect to db', err);
	        };
	        callback(err, connection);
	    });
	},

	checkUUID: function (uuid) { // checks to see if text is a UUID
		return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/
		.test(uuid);
	},

	log: { // defines useful logs
		dbError: function () { // when there is an error that isn't exactly fatal
			console.log('<DB error>'.bold.underline.magenta);
			for (arg in arguments) {
				console.log(arguments[arg]);
			}
			console.log('</DB error>'.italic.magenta);
		},

		dbFatal: function () { // when there is an error that should NEVER happen
			console.log('<DB fatal error>'.bold.underline.red);
			for (arg in arguments) {
				console.log(arguments[arg]);
			}
			console.log('</DB fatal error>'.italic.red);
		},

		dbInfo: function () { // logs info that may be nice to have
			console.log('<DB info>'.bold.underline.cyan);
			for (arg in arguments) {
				console.log(arguments[arg]);
			}
			console.log('</DB info>'.italic.cyan);
		},

		debug: function () { // should only be used to help debug
			console.log('<debug>'.bold.underline.yellow);
			for (arg in arguments) {
				console.log(arguments[arg]);
			}
			console.log('</debug>'.italic.yellow);
		},

		fatal: function () { // used for general fatal bugs
			console.log('<fatal error>'.bold.underline.red);
			for (arg in arguments) {
				console.log(arguments[arg]);
			}
			console.log('</DB fatal error>'.italic.red);
		},

		error: function () { // used for general bugs
			console.log('<error>'.bold.underline.magenta);
			for (arg in arguments) {
				console.log(arguments[arg]);
			}
			console.log('</error>'.italic.magenta);
		},

		ioInfo: function () { // socket.io info
			console.log('<IO info>'.bold.underline.cyan);
			for (arg in arguments) {
				console.log(arguments[arg]);
			}
			console.log('</IO info>'.italic.cyan);
		},

		authError: function () { // any errors that have to do with auth
			console.log('<Auth error>'.bold.underline.magenta);
			for (arg in arguments) {
				console.log(arguments[arg]);
			}
			console.log('</Auth error>'.italic.magenta);
		}
	},

	onLiveUpdater: function (data) {
		def.dbConnect(function (err, conn) {
			r.table('lists').get(data.id)
			.run(conn, function (err, result) {
				if (err) {
					def.log.dbFatal(err);
				} else if (result) {
					r.table('lists').get(data.id).update({list:data.list})
					.run(conn, function (err, result) {
						if (err) {
							def.log.dbFatal(err);
						};
						r.table('updateStats').insert(result)
						.run(conn, function (err, result) {
							if (err) {
								def.log.dbFatal(err);
							};
						})
					})
				} else {
					r.table('lists').insert(data)
					.run(conn, function (err, result) {
						if (err) {
							def.log.dbFatal(err);
						};
					})
				};
			})
		});
	},

	getTaskInfo: function (userid, listid) {
		def.dbConnect(function (err, conn) {
			r.table('users').get(userid)
			.run(conn, function (err, result) {
				if (err) {
					def.log.dbFatal(err);
				};
				def.log.debug(result);
			})
		})
	}
};

var def = module.exports;