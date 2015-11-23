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
            var $remove = $(".remove");
            scrollPanelDown(scrollHeight, 1000);
            if ($remove.length > 0) {
                $remove
                    .dequeue()
                    .hide("slow", function() {
                        $(this).remove();
                    });
            }
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
    },
    "autocompleteselect input#message": function(e, tmp, doc) {
        var $messageInput = $("input#message"),
            currentText = $messageInput.val(),
            lastSelected = _.last(
                currentText
                .trim()
                .split(" ")
            );
        if (_.contains(lastSelected, ":")) {
            var validText = currentText.trim() + ": ";
            $messageInput.val(validText);
        }
    }
});

Template.chatRoom.helpers({
    settings: function() {
        return {
            position: "top",
            limit: 10,
            rules: [{
                token: '#',
                collection: Meteor.users,
                field: 'username',
                options: '',
                filter: {
                    _id: {
                        $nin: [Meteor.userId()]
                    }
                },
                template: Template.userPill,
                noMatchTemplate: Template.usersNoMatch
            }, {
                token: ':',
                collection: Emojis,
                field: 'alias',
                matchAll: true,
                options: '',
                template: Template.emojiPill,
                noMatchTemplate: Template.emojisNoMatch
            }, ]
        }
    }
});
