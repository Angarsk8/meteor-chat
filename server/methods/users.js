Meteor.methods({
    sendResetPasswordEmail: function() {
        check(Meteor.userId(), String);
        var user = Meteor.user();
        var _email = user.emails[0].address;
        console.log(_email);
        Accounts.sendResetPasswordEmail(userId, _email);
    }
});
