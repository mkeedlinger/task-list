module.exports = {
	"serverPort": 3000,
	"ioLogLevel": 1,
	"dbConnect": {
		"host": "192.168.2.46",
		"port": 28015, // default: 28015
		"db": 'test'
	},
	"dbSetup": {
		"tables": ['users', 'lists', 'updateStats']
	}
}