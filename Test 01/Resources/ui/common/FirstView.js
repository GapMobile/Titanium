//FirstView Component Constructor
exports.FirstView = function (navController) {
	//load dependencies
	var datastore = require('services/datastore');
	
	var ImageView = require('ui/common/ImageView');
	//create object instance
	var self = Ti.UI.createTableView({
		data:[{title:'Loading Data...'}]
	});
	
	//state variable
	var movies = [];
	
	//add behavior
	function loadData() {
		var tableData = [];
		movies = datastore.getList();
		
		for (var i = 0, l = movies.length; i<l; i++) {
			var movie = movies[i];
			tableData.push({
				title:movie.title,
				movieObject:movie
			});
		}
		self.setData(tableData);
	}
		
	//reload data when we're told that it has changed
	self.addEventListener('moviesUpdated', loadData);
	Ti.App.addEventListener('moviesUpdated', function(data){
		loadData(data.message);
	});	
	
	
	//toggle done state of todo item on click
	self.addEventListener('click', function(e) {
		var Movie = movies[e.index];
		navController.open(new ImageView(Movie.imageData));
	});
		
	//initialize and return instance from constructor
	loadData();
	return self;
}
