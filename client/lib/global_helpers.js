Template.registerHelper("username", function() {
    var user = Meteor.user();
    if (user) 
        return user.username != null ? user.username : user.profile.name;
});