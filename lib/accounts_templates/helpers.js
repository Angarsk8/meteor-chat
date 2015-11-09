redirectAfterAuthentication = function() {
    var user = Meteor.user();
    if (user) {
        Router.go("profile", {
            _id: user._id
        });
    }
};
