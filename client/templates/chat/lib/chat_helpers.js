MAX_MESSAGES = 10;

scrollPanelDown = function(scrollHeight, time) {
    $('.messages-panel').stop().animate({
        scrollTop: scrollHeight
    }, time);
};

scrollDownToElement = function(scrollTop, topOfNotificationPanel, time) {
    $('.messages-panel').stop().animate({
        scrollTop: (scrollTop + topOfNotificationPanel)
    }, time);
}

var pluralize = function(delta) {
    if (delta > 10) {
        return "More Than 10 New Messages"
    } else if (delta > 1) {
        return delta + " New Messages";
    } else if (delta === 1) {
        return "1 New Message"
    };
};

var updateMessagesNotification = function(delta) {
    var message = "Last " + delta + " Messages";
    var moreMessagesInfoEl = $("#more-messages-info");
    moreMessagesInfoEl
        .find("div")
        .last()
        .html(message);
}

var insertNewMessagesNotification = function(delta) {
    var child = $(".message:nth-last-child(" + delta + ")");
    var moreMessagesInfoEl = "<div id='more-messages-info'>" +
        "<div style='height: 1px; background-color: rgba(255, 0, 0, 0.35);'></div>" +
        "<div style='color: rgba(255, 0, 0, 0.42);text-align: center;padding-top: 4px; font-size: smaller;'>" +
        "Last Message</div>" +
        "</div>";
    child.before(moreMessagesInfoEl);
}

showHideNotificationPanel = function() {

    var currentMessages = Session.get("currentMessages"),
        submittedMessages = Session.get("submittedMessages"),
        delta = currentMessages - submittedMessages;

    var panelHeight = 450,
        scrollHeight = $(".messages-panel")[0].scrollHeight,
        scrollLevel = $(".messages-panel").scrollTop() + panelHeight,
        scrollDiff = scrollHeight - scrollLevel;

    if (scrollDiff > 150) {
        if (delta > 0) {
            $(".notification-panel")
                .removeClass("hidden")
                .fadeIn("slow", function() {
                    $(this).find("span#unread-messages").html(pluralize(delta));
                });
            if ($("#more-messages-info").length === 0) {
                insertNewMessagesNotification(delta);
            } else {
                var count = delta < MAX_MESSAGES ? delta : MAX_MESSAGES;
                updateMessagesNotification(count);
            }
        } else {
            $(".notification-panel").fadeOut("slow");
        }
    } else {
        scrollPanelDown(scrollLevel, 1000);
        Session.set("submittedMessages", Messages.find({}).count());
    }
}
