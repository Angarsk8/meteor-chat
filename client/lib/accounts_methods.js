Accounts.onLogin(function(result) {
    Meteor.logoutOtherClients(function (err) {
    	if(err){
    		console.error(err.reason);
    	}
    });
});