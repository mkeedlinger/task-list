module.exports = {
	"serverPort": 3000,
	"ioLogLevel": 1,
	"dbConnect": {
		"host": "localhost",
		"port": 28015, // default: 28015
		"db": 'test'
	},
	"dbSetup": {
		"tables": ['users', 'lists', 'updateStats']
	}
}