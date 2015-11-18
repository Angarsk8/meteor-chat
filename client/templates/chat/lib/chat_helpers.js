var MAX_MESSAGES = 10,
    PANEL_HEIGHT = 450,
    MIN_SCROLL = 150;

scrollPanelDown = function(scrollHeight, time) {
    $('.messages-panel')
        .stop()
        .animate({
            scrollTop: scrollHeight
        }, time);
};

scrollDownToElement = function(scrollTop, topOfNotificationPanel, time) {
    $('.messages-panel')
        .stop()
        .animate({
            scrollTop: (scrollTop + topOfNotificationPanel)
        }, time);
};

var pluralize = function(delta) {
    if (delta > MAX_MESSAGES) {
        return "More Than 10 New Messages"
    } else if (delta > 1) {
        return delta + " New Messages";
    } else if (delta === 1) {
        return "1 New Message"
    }
};

var updateMessagesNotification = function(delta) {
    var message = "Last " + delta + " Messages";
    var moreMessagesInfoEl = $("#more-messages-info");
    moreMessagesInfoEl
        .find("div")
        .last()
        .html(message);
};

var insertNewMessagesNotification = function(delta) {
    var child = $(".message:nth-last-child(" + delta + ")");
    var moreMessagesInfoEl = "<div id='more-messages-info'>" +
        "<div style='height: 1px; background-color: rgba(255, 0, 0, 0.35);'></div>" +
        "<div style='color: rgba(255, 0, 0, 0.42);text-align: center;padding-top: 4px; font-size: smaller;'>" +
        "Last Message</div>" +
        "</div>";
    child.before(moreMessagesInfoEl);
};

var handleNotificationMessages = function(delta, $more, $remove) {
    if ($more.length === 0) {
        if ($remove.length > 0) {
            $remove
                .dequeue()
                .hide("slow", function() {
                    $(this).remove();
                });
        }
        insertNewMessagesNotification(delta);
    } else {
        var count = delta < MAX_MESSAGES ? delta : MAX_MESSAGES;
        updateMessagesNotification(count);
    }
};

var messagesNotificationLogic = function(delta, $panel, $more, $remove) {
    if (delta > 0) {
        $panel
            .removeClass("hidden")
            .fadeIn("slow", function() {
                $(this).find("span#unread-messages").html(pluralize(delta));
            });
        handleNotificationMessages(delta, $more, $remove);
        Session.set("unreadMessages", delta);
    } else {
        $panel.fadeOut("slow");
        Session.set("unreadMessages", undefined);
    }
};

showHideNotificationPanel = function() {

    var currentMessages = Session.get("currentMessages"),
        submittedMessages = Session.get("submittedMessages"),
        delta = currentMessages - submittedMessages;

    var $messagesPanel = $(".messages-panel"),
        $notificationPanel = $(".notification-panel"),
        $moreMessagesInfoEl = $("#more-messages-info"),
        $toRemove = $(".remove"),
        scrollHeight = $messagesPanel[0].scrollHeight,
        scrollLevel = $messagesPanel.scrollTop() + PANEL_HEIGHT,
        scrollDiff = scrollHeight - scrollLevel;

    var status = Meteor.user().status;

    if (status) {
        if (scrollDiff > MIN_SCROLL) {
            console.log(scrollLevel,"1");
            messagesNotificationLogic(delta, $notificationPanel, $moreMessagesInfoEl, $toRemove);
        } else if (status.idle && scrollLevel > PANEL_HEIGHT) {
            console.log(scrollLevel,"2");
            messagesNotificationLogic(delta, $notificationPanel, $moreMessagesInfoEl, $toRemove);
        } else {
            scrollPanelDown(scrollLevel, 1000);
            console.log(scrollLevel,"3");
            Session.set("submittedMessages", Messages.find({}).count());
            Session.set("unreadMessages", undefined);
        }
    }

}
