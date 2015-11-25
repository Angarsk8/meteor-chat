Template.userPill.helpers({
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
});

Template.userPill.onRendered(function() {
    let autoContainer = $(".-autocomplete-container"),
        maxWidth = parseInt(autoContainer.css("max-width"));
    if (isNaN(maxWidth) || maxWidth > 250) {
        autoContainer.css("max-width", "450px");
    };
});
