//FirstView Component Constructor
function FirstView() {
	//load dependencies
	var datastore = require('services/datastore');
	
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
	//initialize and return instance from constructor
	loadData();
	return self;
}

module.exports = FirstView;
