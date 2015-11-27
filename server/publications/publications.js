Meteor.publish("userData", function() {
    return Meteor.users.find({
        _id: this.userId
    }, {
        fields: {
            'registeredServices': 1
        }
    });
});

Meteor.publish("allUsers", function() {
    return Meteor.users.find({}, {
        fields: {
            'username': 1,
            'profile': 1,
            'status': 1
        }
    });
});

Meteor.publish("messages", function() {
    return Messages.find({});
})

Meteor.publish('emojis', function() {
    return Emojis.find({});
});
