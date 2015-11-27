Template.registerHelper("currentUsername", function() {
    let user = Meteor.user();
    if (user)
        return user.username != null ? user.username : user.profile.name;
});

Template.registerHelper('formatDate', function(date) {
    return moment(date).format('MM/DD/YYYY, hh:mm');
});

niceScrollOptions = {
    cursorcolor: "rgba(105, 105, 105, 0.70)",
    autohidemode: true,
    cursorwidth: "8px",
    scrollspeed: 100,
    mousescrollstep: 70
};


OSName = (() => {
    let appVersion = navigator.appVersion;
    if (appVersion.includes("Mac")) {
    	return "MacOS";
    }else if(appVersion.includes("Win")){
    	return "Windows";
    }else if(appVersion.includes("X11")){
    	return "UNIX";
    }else if(appVersion.includes("Linux")){
    	return "Linux";
    }
})();
