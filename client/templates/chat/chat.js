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

var scrollPanelDown = function(scrollHeight, time) {
    $('.messages-panel').stop().animate({
        scrollTop: scrollHeight
    }, time);
};

var showHideNotificationPanel = function() {

    var currentMessages = Session.get("currentMessages"),
        submittedMessages = Session.get("submittedMessages"),
        delta = currentMessages - submittedMessages;

    var panelHeight = 450,
        scrollHeight = $(".messages-panel")[0].scrollHeight,
        scrollLevel = $(".messages-panel").scrollTop() + panelHeight;


    if ((scrollHeight - scrollLevel) > 150) {
        if (delta > 0) {
            $(".notification-panel")
                .removeClass("hidden")
                .fadeIn(1000, function() {
                    $(this).find("span#unread-messages").html(delta);
                });
        } else {
            $(".notification-panel")
                .fadeOut(1000, function() {
                    $(this).addClass("hidden");
                });
        }
    } else {
        scrollPanelDown(scrollLevel, 1000);
        Session.set("submittedMessages", Messages.find({}).count());
    }
}

//Chat Room Template
Template.chatRoom.helpers({
    users: function() {
        return Meteor.users.find({});
    }
});

Template.messagesPanel.onCreated(function() {
    this.subscribe('messages');
});

Template.messagesPanel.onRendered(function() {
    Template.messagesPanel.showClass = "hidden";
});

Template.messages.helpers({
    messages: function() {
        return Messages.find({});
    }
});

Template.messages.onRendered(function() {
    var scrollLevel = $(".messages-panel")[0].scrollHeight;
    scrollPanelDown(scrollLevel, 0);
    Session.set("initialMessages", Messages.find({}).count());
    Session.set("submittedMessages", Session.get("initialMessages"));
    Tracker.autorun(function() {
        Session.set("currentMessages", Messages.find({}).count());
        showHideNotificationPanel();
    });
});

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

Template.messagesPanel.events({
    'click .notification-panel': function(e) {
        Session.set("submittedMessages", Messages.find({}).count());
        var scrollHeight = $(".messages-panel")[0].scrollHeight;
        scrollPanelDown(scrollHeight, 1000);
    },
    'scroll .messages-panel': function(e) {
        var panelHeight = 450,
            scrollHeight = $(".messages-panel")[0].scrollHeight,
            scrollLevel = $(".messages-panel").scrollTop() + panelHeight;
        if ((scrollHeight - scrollLevel) < 150) {
            $(".notification-panel")
                .fadeOut(1000, function() {
                    $(this).addClass("hidden");
                });
            Session.set("submittedMessages", Messages.find({}).count());
        }
    }
});
