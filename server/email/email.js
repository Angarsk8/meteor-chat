Meteor.startup(function() {
    SMTP = {
        hostName: "smtp.mailgun.org",
        password: "d5fe53e3e8056406c91dd1677322e671",
        username: "postmaster@sandbox9bb9a68de5e545a8b5580f6e92c4ab24.mailgun.org",
        port: 587,
    };
    //Set up stmp
    process.env.MAIL_URL = 'smtp://' +
        encodeURIComponent(SMTP.username) + ':' +
        encodeURIComponent(SMTP.password) + '@' +
        encodeURIComponent(SMTP.hostName) + ':' + SMTP.port;

    //Format the email
    //-- Set the from address
    Accounts.emailTemplates.from = 'Andrés García';

    //-- Application name
    Accounts.emailTemplates.siteName = 'Meteor Login Test';

    //-- Subject line of the email.
    Accounts.emailTemplates.verifyEmail.subject = function(user) {
        return 'Confirm Your Email Address for Meteor Login Test';
    };

    //-- Email text
    Accounts.emailTemplates.verifyEmail.html = function(user, url) {
      return '<h1>Thank you for registering</h1>.  Please click on the following link to verify your email address: \r\n' + url;
    };
});
