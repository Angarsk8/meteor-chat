redirectAfterAuthentication = function() {
    var user = Meteor.user();
    if (user)
        Router.go('/user/' + user._id);
}