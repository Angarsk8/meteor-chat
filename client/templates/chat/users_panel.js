relativeTime = function(timeAgo) {
    var diff = moment.utc(TimeSync.serverTime() - timeAgo);
    var time = diff.format("H:mm:ss");
    var days = diff.format("DDD") - 1;
    var ago = (days ? days + "d " : "") + time;
    return ago + " Ago";
};

Template.usersList.helpers({
    users: function() {
        return Meteor.users.find({});
    },
    status: function() {
        var status = this.status;
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

Tracker.autorun(function(c) {
    try {
        UserStatus.startMonitor({
            threshold: 30000,
            idleOnBlur: true
        });
        return c.stop();
    } catch (_error) {
        console.error("An error has ocurred: " + _error.reason);
    }
});
