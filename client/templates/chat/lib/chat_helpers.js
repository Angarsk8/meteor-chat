const [MAX_MESSAGES, PANEL_HEIGHT] = [10, 450];

scrollPanelDown = (scrollHeight, time) => {
    $('.messages-panel')
        .stop()
        .animate({
            scrollTop: scrollHeight
        }, time);
};

scrollDownToElement = (scrollTop, topOfNotificationPanel, time) => {
    $('.messages-panel')
        .stop()
        .animate({
            scrollTop: (scrollTop + topOfNotificationPanel)
        }, time);
};

let pluralize = (delta) => {
    if (delta > 1) {
        return `${delta} New Messages`;
    } else if (delta === 1) {
        return `${delta} New Message`;
    }
};

let updateMessagesNotification = (delta) => {
    let message = `Last ${delta} Messages`,
        moreMessagesInfoEl = $("#more-messages-info");
    moreMessagesInfoEl
        .find("div")
        .last()
        .html(message);
};

let insertNewMessagesNotification = (delta) => {
    let NotificationStyles = {
        lineStyles: `
            height: 1px;
            background-color: rgba(255, 0, 0, 0.35);
        `,
        textStyles: `
            color: rgba(255, 0, 0, 0.42);
            text-align: center;
            padding-top: 4px;
            font-size: smaller;
        `
    };

    let child = $(`.message:nth-last-child(${delta})`),
        moreMessagesInfoEl = `
            <div id='more-messages-info'>
                <div style='${NotificationStyles.lineStyles}'></div>
                <div style='${NotificationStyles.textStyles}'>
                Last Message</div>
            </div>
        `;
    child.before(moreMessagesInfoEl);
};

let handleNotificationMessages = (delta, $more, $remove) => {
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
        let count = delta;
        updateMessagesNotification(count);
    }
};

let messagesNotificationLogic = (delta, $panel, $more, $remove) => {
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

showHideNotificationPanel = () => {
    // Reactive Session Variables
    let currentMessages = Session.get("currentMessages"),
        submittedMessages = Session.get("submittedMessages"),
        delta = currentMessages - submittedMessages;

    // Non Reactive Sources
    let $messagesPanel = $(".messages-panel"),
        $notificationPanel = $(".notification-panel"),
        $moreMessagesInfoEl = $("#more-messages-info"),
        $toRemove = $(".remove"),
        scrollHeight = $messagesPanel[0].scrollHeight,
        scrollLevel = $messagesPanel.scrollTop() + PANEL_HEIGHT,
        scrollDiff = scrollHeight - scrollLevel;

    // Non Reactive Data Sources
    let user, status;
    Tracker.nonreactive(function() {
        user = Meteor.user();
        status = user.status;
    });

    // Non Reactive Sources
    let $messages = $(".message"),
        $lastMessage = $messages.last(),
        $lastImage = $lastMessage.find("img.message-image"),
        $lastAuthorId = $lastMessage.attr("author"),
        minScroll = $lastImage.length > 0 ? 400 : 200;

    if (status) {
        if (scrollDiff > minScroll) {
            user._id === $lastAuthorId ?
                scrollPanelDown(scrollHeight, 1000) :
                messagesNotificationLogic(delta, $notificationPanel, $moreMessagesInfoEl, $toRemove);
        } else if (status.idle && scrollLevel > PANEL_HEIGHT) {
            messagesNotificationLogic(delta, $notificationPanel, $moreMessagesInfoEl, $toRemove);
        } else {
            scrollPanelDown(scrollLevel, 1000);
            Session.set("submittedMessages", Messages.find({}).count());
            Session.set("unreadMessages", undefined);
        }
    }

}
