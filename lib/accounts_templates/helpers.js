redirectAfterAuthentication = function() {
    var user = Meteor.user();
    if (user) {
        Router.go("profile", {
            _id: user._id
        });
    }
};
redirectAfterSignIn = function() {
    var user = Meteor.user();
    if (user) {
    	// Meteor.logoutOtherClients(function (err) {
    	// 	if (err) {
    	// 		console.error(err.reason)
    	// 	}
    	// });
        Router.go("profile", {
            _id: user._id
        });
    }
};
