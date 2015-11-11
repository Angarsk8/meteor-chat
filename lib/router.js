Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'pageNotFound'
});

Router.plugin('ensureSignedIn', {
    only: ['profile', 'chatRoom']
});

Router.route("/", function() {
    this.render("home");
}, {
    name: "home",
    data: function() {
        return Meteor.user();
    }
});

Router.route("/user/:_id", {
    name: "profile",
    data: function() {
        return Meteor.user();
    }
});

Router.route("/chat-room", function() {
    this.render("chatRoom");
}, {
    name: "chatRoom",
    subscriptions: function() {
        this.subscribe('allUsers').wait();
        this.subscribe('messages').wait();
    },
    data: function() {
        return Meteor.user();
    }
});
