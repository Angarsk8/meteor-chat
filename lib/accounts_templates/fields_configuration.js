var commonOptions = {
    trim: true,
    lowercase: true,
    negativeValidation: true,
    positiveValidation: true,
    showValidating: true,
    continuousValidation: true
}

var email = AccountsTemplates.removeField("email");
var pwd = AccountsTemplates.removeField("password");
var username = {
    _id: 'username',
    type: 'text',
    placeholder: {
        signUp: "username"
    },
    displayName: "Username",
    required: true,
    minLength: 6,
}

var emailFieldConfig = _.extend(email, commonOptions);
var pwdFieldConfig = _.extend(pwd, _.omit(commonOptions, "lowercase"));
var usernameFieldConfig = _.extend(username, commonOptions);

AccountsTemplates.addFields([
    emailFieldConfig,
    pwdFieldConfig,
    usernameFieldConfig
]);
