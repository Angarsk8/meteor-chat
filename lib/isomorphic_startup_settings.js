Meteor.startup(function() {
    // Meteor.settings.public.cdnUrl = 'https://assets-cdn.github.com/images/icons';
    // if (Meteor.settings.public.cdnUrl) {
    //     Emojis.setBasePath(Meteor.settings.public.cdnUrl + '/emoji/unicode/');
    // }
    Emojis.useImages = true;
});
