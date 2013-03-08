//Application Window Component Constructor

exports.ApplicationWindow = function (navController) {
	//load component dependencies
	var FirstView = require('ui/common/FirstView').FirstView,
		network = require('services/network'),
		datastore = require('services/datastore');

	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	//construct UI
	var firstView = new FirstView(navController);
	self.add(firstView);
	
	//add behavior
	firstView.addEventListener('movieSaved', function() {
		movieList.fireEvent('moviesUpdated');
	});
	
	//bootstrap the datastore, if necessary
	if (!Ti.App.Properties.hasProperty('seeded')) {
		network.getList(function(movies) {
			for (var i = 0, l = movies.length; i<l; i++) {
				datastore.saveList(movies[i]);
			}
			movieList.fireEvent('moviesUpdated');
			Ti.App.Properties.setBool('seeded', true);
		});
	}	  
	
	return self;
}
