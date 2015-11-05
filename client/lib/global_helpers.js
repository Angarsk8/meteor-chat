Template.registerHelper("username", function() {
    var user = Meteor.user();
    if (user.profile) {
        return user.profile.name;
    } else {
        return user.username;
    }
});