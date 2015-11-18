Template.registerHelper("currentUsername", function() {
    var user = Meteor.user();
    if (user) 
        return user.username != null ? user.username : user.profile.name;
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MM/DD/YYYY, hh:mm');
});

