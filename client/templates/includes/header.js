Template.header.events({
    "click a.logout": function(e, t) {
        e.preventDefault();
        AccountsTemplates.logout(function(err) {
            if (err) {
                alert("an error has ocurred while logging you out: " + err.reason);
            } else {
                alert("logged out succesfully");
            }
        });
    }
});
