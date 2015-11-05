AccountsTemplates.configure({
    defaultLayout: 'authLayout'
});

AccountsTemplates.configureRoute('signIn', {
    name: 'login',
    path: '/login',
    template: 'login',
    layoutTemplate: 'authLayout',
    redirect: redirectAfterAuthentication
});

AccountsTemplates.configureRoute('signUp', {
    name: 'signup',
    path: '/signup',
    template: 'signUp',
    layoutTemplate: 'authLayout',
    redirect: redirectAfterAuthentication,
});

AccountsTemplates.configureRoute('changePwd', {
    name: 'changePassword',
    path: '/change-password',
    template: 'changePassword',
    layoutTemplate: 'authLayout',
    redirect: redirectAfterAuthentication,
});