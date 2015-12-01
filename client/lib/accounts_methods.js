Accounts.onLogin((result) => {
    Meteor.setTimeout(() => {
        Meteor.logoutOtherClients((err) => {
            if (err)
                console.error(err.reason);
        });
    }, 10000);
});
