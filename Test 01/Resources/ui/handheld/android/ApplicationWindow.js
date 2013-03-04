//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var FirstView = require('ui/common/FirstView'),
		network = require('services/network'),
		datastore = require('services/datastore');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		navBarHidden:true,
		exitOnClose:true
	});
		
	//construct UI
	var firstView = new FirstView();
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

//make constructor function the public component interface
module.exports = ApplicationWindow;
