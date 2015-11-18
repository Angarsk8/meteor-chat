var query = Messages.find({});

Messages.find({}).observeChanges({
    added: function(id, fields) {
        Session.set("currentMessages", Messages.find({}).count());
        showHideNotificationPanel();
    }
});

Template.messages.helpers({
    messages: function() {
        return Messages.find({});
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
    Session.set("initialMessages", Messages.find({}).count());
    Session.set("submittedMessages", Session.get("initialMessages"));
    // Tracker.autorun(function() {
        // Session.set("currentMessages", Messages.find({}).count());
        // Messages.find({}).observeChanges({
        //     added: function () {
        //      console.log(this);
        //      // Session.set("currentMessages", Messages.find({}).count());
        //      // showHideNotificationPanel();
        //     }
        // });
        // showHideNotificationPanel();
    // });
});
