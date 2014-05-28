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
			def.log.creator('DB error', 'magenta', arguments);
		},

		dbFatal: function () { // when there is an error that should NEVER happen
			def.log.creator('DB fatal error', 'red', arguments);
		},

		dbInfo: function () { // logs info that may be nice to have
			def.log.creator('DB info', 'cyan', arguments);
		},

		debug: function () { // should only be used to help debug
			def.log.creator('debug', 'yellow', arguments);
		},

		fatal: function () { // used for general fatal bugs
			def.log.creator('fatal error', 'red', arguments);
		},

		error: function () { // used for general bugs
			def.log.creator('error', 'magenta', arguments);
		},

		ioInfo: function () { // socket.io info
			def.log.creator('IO info', 'cyan', arguments)
		},

		authError: function () { // any errors that have to do with auth
			def.log.creator('Auth error', 'magenta', arguments);
		},

		creator: function (tag, color, args) { // tryin to keep my logs dry
			console.log(('<' + tag + '>').bold.underline[color]);
			for (arg in args) {
				console.log(args[arg]);
			}
			console.log(('</' + tag + '>').italic[color]);
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
					data.created = r.now();
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