Meteor.startup(() => {
    Tracker.autorun(() => {
        let unread = Session.get("unreadMessages"),
            routerTitle = "UserAccounts Module";
        if (unread) {
            document.title = `(${unread}) ${routerTitle}`;
        } else {
            document.title = routerTitle;
        }
    });
});
