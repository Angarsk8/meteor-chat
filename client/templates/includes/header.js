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

Template.header.helpers({
    activeRouteClass: function( /*all routes go here*/ ) {
        var args = Array.prototype.slice.call(arguments, 0);
        args.pop();
        var active = args.some(function(route) {
            return Router.current() && Router.current().route.getName() == route
        });
        return active && "active"
    }
});
