Meteor.methods({
    insertMessage: function(messageAttributes) {
        check(Meteor.userId(), String);
        check(messageAttributes, {
            body: String
        });
        var user = Meteor.user();
        var message = _.extend(messageAttributes, {
            userId: user._id,
            author: user.username,
            authorImage: user.profile.picture,
            submitted: new Date(),
        });
        Messages.insert(message);
        return;
    }
});
