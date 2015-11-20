Template.registerHelper("currentUsername", function() {
    var user = Meteor.user();
    if (user)
        return user.username != null ? user.username : user.profile.name;
});

Template.registerHelper('formatDate', function(date) {
    return moment(date).format('MM/DD/YYYY, hh:mm');
});

niceScrollOptions = {
    cursorcolor: "rgba(105, 105, 105, 0.70)",
    autohidemode: true,
    cursorwidth: "8px"
};
