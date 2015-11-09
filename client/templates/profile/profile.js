Session.set("loading", false);

Template.profile.helpers({
    showChangePassword: function() {
        var user = Meteor.user();
        if (user)
            return user.username ? true : false;
    },
    canChangePassword: function() {
        var user = Meteor.user();
        if (user) {
            return _.contains(user.registeredServices, "password");
        }
    },
    isLoading: function() {
        return Session.get('loading');
    }
});

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
    },

    "click a.logout-other-clients": function(e, t) {
        e.preventDefault();
        Session.set("loading", true);
        Accounts.logoutOtherClients(function(err) {
            Session.set("loading", false);
            if (err) {
                console.error("an error has ocurred while logging out other clients: " + err.reason);
            } else {
                console.info("other clients logged out succesfully");
            }
        });
    },
    "click a.reset": function(e, t) {
        e.preventDefault();
        Session.set("loading", true);
        var user = Meteor.user();
        if (user) {
            var options = {
                email: user.emails[0].address
            }
            Accounts.forgotPassword(options, function(err) {
                Session.set("loading", false);
                if (err) {
                    console.log(err);
                    return;
                }
                console.info("An email for resetting the password has been sent");
            });
        }
    }
});
