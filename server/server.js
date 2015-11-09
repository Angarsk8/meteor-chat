var getValidUsername = function(email) {
    var firstPartOfEmail = email.split("@")[0];
    var validUsername = false;
    var i = 0;
    do {
        var possibleUsername = firstPartOfEmail + (i == 0 ? "" : "." + i);
        validUsername = !userExists(possibleUsername);
        i++;
    } while (!validUsername);
    return possibleUsername;
};

var userExists = function(username) {
    return Accounts.findUserByUsername(username) ? true : false;
};

Accounts.onCreateUser(function(options, user) {
    var email, oldUser, service;
    if (user.services != null) {
        service = _.keys(user.services)[0];
        var newService = _.chain(user.services)
            .keys()
            .without("resume")
            .last()
            .value();
        user.registeredServices = [];
        user.registeredServices.push(newService);
        email = user.services[service].email;
        if (email != null) {
            oldUser = Meteor.users.findOne({
                "emails.address": email
            });
            if (oldUser != null) {
                if (oldUser.services == null) {
                    oldUser.services = {};
                }
                if (service === "google" || service === "facebook") {
                    oldUser.services[service] = user.services[service];
                    Meteor.users.remove(oldUser._id);
                    user = oldUser;
                    user.registeredServices.push(newService);
                    if (user.services[service].email != null) {
                        user.emails = [{
                            address: user.services[service].email,
                            verified: true
                        }];
                    }
                }
            } else {
                if (service === "google" || service === "facebook") {
                    if (user.services[service].email != null) {
                        user.emails = [{
                            address: user.services[service].email,
                            verified: true
                        }];
                        user.username = getValidUsername(user.services[service].email);
                        user.profile = {};
                        user.profile.name = user.services[service].name;
                    } else {
                        throw new Meteor.Error(500, service + " account has no email attached");
                    }
                }
            }
        }
    }
    return user;
});

// Meteor.users.before.update(function(userId, doc, fieldNames, modifier, options) {

// });

// Meteor.users.after.update(function(userId, doc, fieldNames, modifier, options) {

// });
