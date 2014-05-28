module.exports = {
	"serverPort": 3000,
	"ioLogLevel": 1,
	"dbConnect": {
		"host": "10.225.10.7",
		"port": 28015, // default: 28015
		"db": 'test'
	},
	"dbSetup": {
		"tables": ['users', 'lists', 'updateStats']
	}
}