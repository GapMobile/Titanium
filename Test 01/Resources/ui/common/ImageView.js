function ImageView(imageData) {
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
	var image = Ti.UI.createImageView({
		image:imageData
	});
	self.add(image);
	//return instance from constructor
	return self;
}
 
module.exports = ImageView;