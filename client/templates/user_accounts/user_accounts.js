Template.userAccounts.helpers({
    atDisabled: function() {
        return AccountsTemplates.disabled();
    },
    atClass: function() {
        return AccountsTemplates.disabled() ? 'disabled hidden' : 'active';
    }
});
