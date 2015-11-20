var query = Messages.find({});

Template.messages.helpers({
    messages: function() {
        return query;
    }
});

Template.message.helpers({
    createdAtFormatted: function() {
        return moment(this.submitted).format('MM/DD/YYYY, HH:MM');
    }
});

Template.messages.onRendered(function() {
    var scrollLevel = $(".messages-panel")[0].scrollHeight;
    scrollPanelDown(scrollLevel, 0);
    Session.set("initialMessages", query.count());
    Session.set("submittedMessages", Session.get("initialMessages"));
    Tracker.autorun(function() {
        Session.set("currentMessages", query.count());
        showHideNotificationPanel();
    });
});
