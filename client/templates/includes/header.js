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
        let args = Array.prototype.slice.call(arguments, 0);
        args.pop();
        let active = args.some((route) => {
            return Router.current() && Router.current().route.getName() == route
        });
        return active && "active"
    }
});
