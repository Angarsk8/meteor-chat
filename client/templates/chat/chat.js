var sendMessage = function() {
    var user = Meteor.user();
    if (user) {
        var name = user.username;
        var inputMessage = $('#message');
        var message = {
            body: inputMessage.val()
        };
        if (message.body != '') {
            Meteor.call("insertMessage", message, function(err, result) {
                if (err) {
                    console.error(err);
                }
            });
            var scrollHeight = $(".messages-panel")[0].scrollHeight;
            scrollPanelDown(scrollHeight, 1000);
            Session.set("submittedMessages", Messages.find({}).count());
            inputMessage.val("");
        }
    }
};

Template.chatRoom.events({
    'keydown input#message': function(e) {
        if (e.which == 13) {
            sendMessage();
        }
    },
    'click button.send-button': function(e) {
        e.preventDefault();
        sendMessage();
    }
});
