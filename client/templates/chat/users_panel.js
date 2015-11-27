relativeTime = (timeAgo) => {
    let diff = moment.utc(TimeSync.serverTime() - timeAgo),
        time = diff.format("H:mm:ss"),
        days = diff.format("DDD") - 1,
        ago = (days ? `${days}d ` : "") + time;
    return `${ago} Ago`;
};

Template.usersList.helpers({
    users: function() {
        return Meteor.users.find({});
    },
    status: function() {
        let status = this.status;
        if (status) {
            if (status.idle) {
                return "inactive";
            } else if (status.online) {
                return "online";
            } else {
                return "offline";
            }
        }
    },
    activityPeriod: function() {
        return new Date(TimeSync.serverTime()).toLocaleString();
    },
    lastActivity: function() {
        var status = this.status;
        if (status) {
            var lastActivity = status.lastActivity;
            if (!status.online) {
                return "Currently Offline";
            } else {
                if (lastActivity != null) {
                    return "Last Activity " + relativeTime(lastActivity);
                } else {
                    return "Currently Active";
                }
            }
        }
    }
});

Template.usersList.onCreated(function() {
    this.subscribe('allUsers');
});

Template.usersList.onRendered(function() {
    // if (OSName !== "MacOS")
        $(".users-scroll-panel").niceScroll(niceScrollOptions);
});

Tracker.autorun(function(c) {
    try {
        UserStatus.startMonitor({
            threshold: 120000,
            idleOnBlur: true
        });
        return c.stop();
    } catch (_error) {
        console.error("An error has ocurred: " + _error.reason);
    }
});
