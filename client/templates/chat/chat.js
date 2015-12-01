let removeNotificationMessage = ($remove) => {
    if ($remove.length > 0) {
        $remove
            .dequeue()
            .hide("slow", function() {
                $(this).remove();
            });
    }
};

let sendMessage = () => {
    let user = Meteor.user();
    if (user) {
        let inputMessage = $('#message'),
            body = inputMessage.val().trim(),
            matchImage = MatchType.matchImagePattern(body),
            matchGiphy = MatchType.matchGiphyPattern(body),
            matchUrl = MatchType.matchUrlPattern(body);

        let message = {
            body,
            url: {
                flag: true,
                path: "",
                meta: false
            }
        };

        if (message.body != '') {
            if (matchGiphy) {
                message.url.flag = false;
                message.body = message.body.toLowerCase();
                message.url.path = message.body.replace("/giphy", "");
            } else if (matchImage) {
                message.url.path = matchImage;
            } else if (matchUrl) {
                message.url.flag = false;
                message.url.path = matchUrl;
                message.url.meta = true;
            }

            Meteor.call("insertMessage", message, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    let scrollHeight = $(".messages-panel")[0].scrollHeight,
                        $remove = $(".remove");

                    removeNotificationMessage($remove);
                    Session.set("submittedMessages", Messages.find({}).count());
                }
            });

            Session.set("submittedMessages", Messages.find({}).count());
            inputMessage.val("");
        }
    }
};

Template.chatRoom.events({
    'keydown input#message': (e, t) => {
        if (e.which == 13) {
            sendMessage();
        }
    },
    'click button.send-button': (e, t) => {
        e.preventDefault();
        sendMessage();
    },
    "autocompleteselect input#message": (e, t) => {
        let $messageInput = $("input#message"),
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
