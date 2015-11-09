AccountsTemplates.configure({
    defaultLayout: 'authLayout'
});

AccountsTemplates.configureRoute('signIn', {
    name: 'login',
    path: '/login',
    template: 'userAccounts',
    layoutTemplate: 'authLayout',
    redirect: redirectAfterAuthentication
});

AccountsTemplates.configureRoute('signUp', {
    name: 'signup',
    path: '/signup',
    template: 'userAccounts',
    layoutTemplate: 'authLayout',
    redirect: redirectAfterAuthentication,
});

AccountsTemplates.configureRoute('changePwd', {
    name: 'changePassword',
    path: '/change-password',
    template: 'userAccounts',
    layoutTemplate: 'authLayout',
    redirect: redirectAfterAuthentication,
});

AccountsTemplates.configureRoute('forgotPwd', {
    name: 'forgotPassword',
    path: '/forgot-password',
    template: 'userAccounts',
    layoutTemplate: 'authLayout',
    redirect: redirectAfterAuthentication,
});

AccountsTemplates.configureRoute('resetPwd', {
    name: 'resetPassword',
    path: '/reset-password',
    template: 'userAccounts',
    layoutTemplate: 'authLayout',
    redirect: redirectAfterAuthentication,
});
