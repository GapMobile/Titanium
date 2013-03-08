exports.NavigationController = function() {
    this.windowStack = [];
};
 
exports.NavigationController.prototype.open = function(/*Ti.UI.Window*/windowToOpen) {
    //add the window to the stack of windows managed by the controller
    this.windowStack.push(windowToOpen);
    //grab a copy of the current nav controller for use in the callback
    var that = this;
    
    windowToOpen.addEventListener('close', function() {
    	that.windowStack.pop();
    });
    
    windowToOpen.navBarHidden = windowToOpen.navBarHidden || false;
    //This is the first window
    if(this.windowStack.length === 1) {
        if(Ti.Platform.osname === 'android') {
            windowToOpen.exitOnClose = true;
            windowToOpen.open();
        } else {
            this.navGroup = Ti.UI.iPhone.createNavigationGroup({
                window : windowToOpen
            });
            var containerWindow = Ti.UI.createWindow();
            containerWindow.add(this.navGroup);
            containerWindow.open();
        }
    }
    //All subsequent windows
    else {
        if(Ti.Platform.osname === 'android') {
            windowToOpen.open();
        } else {
            this.navGroup.open(windowToOpen);
        }
    }
    Ti.API.info('OPEN trigerred, there are ' + this.windowStack.length + ' windows in the stack');
};
//go back to the initial window of the NavigationController
exports.NavigationController.prototype.home = function() {
    //store a copy of all the current windows on the stack
    var windows = this.windowStack.concat([]);
    for(var i = 1, l = windows.length; i < l; i++) {
        (this.navGroup) ? this.navGroup.close(windows[i]) : windows[i].close();
        windows[i] = null;
    }
    this.windowStack = [this.windowStack[0]]; //reset stack
    Ti.API.info('HOME trigerred, there are ' + windows.length + ' windows in the stack');
};
exports.NavigationController.prototype.back = function() {
    //store a copy of all the current windows on the stack
    var windows = this.windowStack.pop();
    (this.navGroup) ? this.navGroup.close(windows) : windows.close();
    windows = null;
    Ti.API.info('BACK trigerred, there are ' + this.windowStack.length + ' windows in the stack');
};