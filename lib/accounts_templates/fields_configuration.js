var commonOptions = {
    trim: true,
    lowercase: true,
    negativeValidation: true,
    positiveValidation: true,
    negativeFeedback: false,
    positiveFeedback: true,
    showValidating: true,
    continuousValidation: true,
    forbidClientAccountCreation: true
}

var emailRegexp = {
    re: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
}

var email = _.extend(AccountsTemplates.removeField("email"), emailRegexp);
var pwd = AccountsTemplates.removeField("password");
var username = {
    _id: 'username',
    type: 'text',
    placeholder: {
        signUp: "username"
    },
    displayName: "Username",
    required: true,
    minLength: 6
}

var emailFieldConfig = _.extend(email, commonOptions);
var pwdFieldConfig = _.extend(pwd, _.omit(commonOptions, "lowercase"));
var usernameFieldConfig = _.extend(username, commonOptions);

AccountsTemplates.addFields([
    emailFieldConfig,
    usernameFieldConfig,
    pwdFieldConfig
]);
