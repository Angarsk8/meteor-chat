Meteor.startup(() => {
    const SMTP = {
        username: encodeURIComponent('postmaster@sandbox9bb9a68de5e545a8b5580f6e92c4ab24.mailgun.org'),
        password: encodeURIComponent('d5fe53e3e8056406c91dd1677322e671'),
        server: encodeURIComponent('smtp.mailgun.org'),
        port: 587
    };
    process.env.MAIL_URL = `smtp://${SMTP.username}:${SMTP.password}@${SMTP.server}:${SMTP.port}`

    Accounts.emailTemplates.from = 'Andrés García';
    Accounts.emailTemplates.siteName = 'Meteor Login Test';
    Accounts.emailTemplates.verifyEmail.subject = (user) => {
        return 'Confirm Your Email Address for Meteor Login Test';
    };
    Accounts.emailTemplates.verifyEmail.html = (user, url) => {
        return `Please click on the following link to verify your email address: 
        ${url}`;
    };
});
