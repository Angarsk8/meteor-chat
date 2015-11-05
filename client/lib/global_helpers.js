Template.registerHelper("username", function() {
    var sessionUsername = Session.get("currentUsername");
    if (sessionUsername) {
        return sessionUsername
    } else {
        var current = Meteor.user().username;
        Session.set("currentUsername", current);
        sessionUsername = Session.get("currentUsername");
        return sessionUsername;
    }
});
