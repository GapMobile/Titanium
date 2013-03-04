//load dependencies
var Movie = require('model/Movie');

//bootstrap datastore
var saved = Ti.App.Properties.getString('db');
var datastore = (saved) ? JSON.parse(saved):[];

//implement service interface
exports.getList = function() {
	return datastore.slice(0);
};

//save a Todo object to our data store
exports.saveList = function(movie) {
	
	//if (movie.guid) {
		var exist = false;
		for (var i = 0, l = datastore.length; i<l; i++) {
			var current = datastore[i];
			if (current.guid === movie.guid) {
				datastore[i] = movie;
				exist = true;
			}
		}
		if (!exist) {
			datastore.push(movie);
		}
	/*}
	else {
		//movie.guid = new Date().getTime();
		datastore.push(movie);
	}*/
	Ti.App.Properties.setString('db',JSON.stringify(datastore));
};