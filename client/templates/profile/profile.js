Template.profile.events({
    "click a.logout": function(e, t) {
        e.preventDefault();
        AccountsTemplates.logout(function(err) {
            if (err) {
                console.error("an error has ocurred while logging you out: " + err.reason);
            } else {
                console.info("logged out succesfully");
            }
        });
    }
});
