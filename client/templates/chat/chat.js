Template.chatRoom.helpers({
    users: function() {
        return Meteor.users.find({});
    },
    messages: function() {
        return Messages.find({});
    }
});

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
            inputMessage.val("");
            $('.messages-panel').stop().animate({
                scrollTop: $(".messages-panel")[0].scrollHeight
            }, 1000);
        }
    }
}

Template.chatRoom.onRendered(function() {
    Meteor.setTimeout(function() {
        $('.messages-panel').stop().animate({
            scrollTop: $(".messages-panel")[0].scrollHeight
        }, 3000);
    }, 300);
});

Template.message.onRendered(function() {
    $('.messages-panel').stop().animate({
        scrollTop: $(".messages-panel")[0].scrollHeight
    }, 1000);
});


Template.chatRoom.events = {
    'keydown input#message': function(e) {
        if (e.which == 13) {
            sendMessage();
        }
    },
    'click button.send-button': function(e) {
        e.preventDefault();
        sendMessage();
    }
}
