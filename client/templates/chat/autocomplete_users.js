Template.userPill.helpers({
    labelClass: function() {
        if (this.status.idle) {
            return "label-warning"
        } else if (this.status.online) {
            return "label-success"
        } else {
            return "label-default"
        }
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
});
