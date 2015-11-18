Meteor.startup(function() {
    Tracker.autorun(function() {
        var unread = Session.get("unreadMessages");
        var routerTitle = "UserAccounts Module";
        if (unread) {
            document.title = "(" + unread + ") " + routerTitle;
        } else {
            document.title = routerTitle;
        }
    });
});
