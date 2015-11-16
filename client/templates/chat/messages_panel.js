var hideMessagesNotification = function(time) {
    $("#more-messages-info")
        .delay(time)
        .removeAttr("id")
        .addClass("remove")
        .hide("slow", function() {
            $(this).remove();
        });
};

Template.messagesPanel.onCreated(function() {
    this.subscribe('messages');
});

Template.messagesPanel.events({
    'click .notification-panel': function(e) {
        Session.set("submittedMessages", Messages.find({}).count());
        var scrollTop = $(".messages-panel").scrollTop();
        var fixValue = 60;
        var topOfNotificationPanel = $("#more-messages-info").position().top - fixValue;
        scrollDownToElement(scrollTop, topOfNotificationPanel, 1000);
        hideMessagesNotification(6000);
    },
    'scroll .messages-panel': function(e) {
        var panelHeight = 450,
            scrollTop = $(".messages-panel").scrollTop(),
            scrollHeight = $(".messages-panel")[0].scrollHeight,
            scrollLevel = scrollTop + panelHeight,
            $moreMessagesInfoEl = $("#more-messages-info");

        if ($moreMessagesInfoEl.length !== 0) {
            var topOfNotificationPanel = $moreMessagesInfoEl.position().top,
                scrollLevelBefore = scrollTop + topOfNotificationPanel;
            if (scrollLevel > scrollLevelBefore) {
                $(".notification-panel").fadeOut(1000, function() {
                    $(this).addClass("hidden");
                    hideMessagesNotification(6000);
                    Session.set("submittedMessages", Messages.find({}).count());
                });
            };
        }
    }
});
