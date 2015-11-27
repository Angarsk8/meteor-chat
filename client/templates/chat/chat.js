let matchImagePattern = (body) => {
    let matchImageRegexp = /((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$/i,
        validation = matchImageRegexp.exec(body);

    return validation ? _.first(validation) : null;
};

let matchGiphyPattern = (body) => {
    let matchGiphyRegexp = /^\/giphy\s+\w*/i,
        validation = matchGiphyRegexp.exec(body);

    return validation ? true : false;
};

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
            matchImage = matchImagePattern(body),
            matchGiphy = matchGiphyPattern(body);

        let message = {
            body: body,
            image: {
                flag: true,
                url: ""
            }
        };

        if (message.body != '') {
            if (matchGiphy) {
                message.image.flag = false;
                message.image.url = body.replace("/giphy", "");
            } else if (matchImage) {
                message.image.url = matchImage;
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
