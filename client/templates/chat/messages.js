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
