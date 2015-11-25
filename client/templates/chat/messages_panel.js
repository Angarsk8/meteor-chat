let hideMessagesNotification = (time) => {
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

Template.messagesPanel.onRendered(function() {
    $(".messages-scroll-panel").niceScroll(niceScrollOptions);
});

Template.messagesPanel.events({
    'click .notification-panel': function(e) {
        Session.set("submittedMessages", Messages.find({}).count());
        let scrollTop = $(".messages-panel").scrollTop(),
            fixValue = 60,
            topOfNotificationPanel = $("#more-messages-info").position().top - fixValue;
        scrollDownToElement(scrollTop, topOfNotificationPanel, 1000);
        hideMessagesNotification(6000);
    },
    'scroll .messages-panel': function(e) {
        let panelHeight = 450,
            scrollTop = $(".messages-panel").scrollTop(),
            scrollHeight = $(".messages-panel")[0].scrollHeight,
            scrollLevel = scrollTop + panelHeight,
            $moreMessagesInfoEl = $("#more-messages-info");

        if ($moreMessagesInfoEl.length !== 0) {
            let topOfNotificationPanel = $moreMessagesInfoEl.position().top,
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
