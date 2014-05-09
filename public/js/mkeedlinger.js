var mke = {};
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

mke.print = function (text) {
	console.log('MKEEDLINGER:', text);
}