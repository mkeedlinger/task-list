// mkeedlinger's personal helper file


var mke = {};


/*
######################
"Settings"
######################
*/
mke.settings = {
	verbose: true,
};

/*
######################
Settings scripts
######################
*/
if (mke.settings.verbose === false) {
	mke.info = function() {;};
	console.info('Verbose enabled');
} else if (typeof mke.settings.verbose != typeof true) {
	throw Error('Type of settings.verbose must == boolean')
};


/*
######################
Functions
######################
*/
mke.UUID = function () {
	/*returns UUID like this:
	"349645a6-d3da-4ca5-8dc9-29d197042219"
	from here: http://stackoverflow.com/a/2117523 */
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
	function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
	});
}

mke.info = function (text) {
	console.info(text);
}