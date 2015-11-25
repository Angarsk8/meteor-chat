redirectAfterAuthentication = () => {
    let user = Meteor.user();
    if (user) {
        Router.go("chatRoom");
    }
};
