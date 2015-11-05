Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'pageNotFound',
});

Router.plugin('ensureSignedIn', {
    only: ['profile']
});

Router.route("/", function() {
    this.render("home");
}, {
    name: "home",
    data: function() {
        return Meteor.user();
    }
});

Router.route("/user/:_id", function() {
    this.render("profile");
}, {
    name: "profile"
});
