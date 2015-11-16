var hideMessagesNotification = function(time) {
    $("#more-messages-info")
        .delay(time)
        .hide("slow", function() {
            $(this).remove();
        });
}

Template.messagesPanel.onCreated(function() {
    this.subscribe('messages');
});

Template.messagesPanel.onRendered(function() {
    Template.messagesPanel.showClass = "hidden";
});

Template.messagesPanel.events({
    'click .notification-panel': function(e) {
        Session.set("submittedMessages", Messages.find({}).count());
        var scrollTop = $(".messages-panel").scrollTop();
        var fixValue = 60;
        var topOfNotificationPanel = $("#more-messages-info").position().top - fixValue;
        scrollDownToElement(scrollTop, topOfNotificationPanel, 1000);
        hideMessagesNotification(5000);
    },
    'scroll .messages-panel': function(e) {
        var panelHeight = 450,
            scrollHeight = $(".messages-panel")[0].scrollHeight,
            scrollLevel = $(".messages-panel").scrollTop() + panelHeight;
        if ((scrollHeight - scrollLevel) < 150) {
            $(".notification-panel").fadeOut(1000, function() {
                $(this).addClass("hidden");
                hideMessagesNotification(5000);
                Session.set("submittedMessages", Messages.find({}).count());
            });
        }
    }
});
