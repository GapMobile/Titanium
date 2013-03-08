//load dependencies
var Movie = require('model/Movie');

//implement service interface
exports.getList = function(callback) {
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		var data = JSON.parse(this.responseText).result,
			movies = [];
			
		for (var i = 0, l = data.length; i<l; i++) {
			var title = data[i].title;
			var year = data[i].year;
			var guid = data[i].guid;
			var imageData = null;
			if (data[i].images.length > 0) {
				imageData = data[i].images[0];
			}
			var movie = new Movie(title,year,guid, imageData);
			movies.push(movie);
		}
		
		//call callback function with an array of Movies
		Ti.App.fireEvent('moviesUpdated', {message:movies});
		callback.call(this,movies);
	};
	xhr.open('GET','http://gapmobile.fatfractal.com/MyBackend/ff/resources/Movies');
	xhr.send();
};
