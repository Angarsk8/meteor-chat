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
};
var firstName = {
    _id: 'firstname',
    type: 'text',
    placeholder: {
        signUp: "First Name"
    },
    displayName: "First Name",
    required: true,
    // minLength: 6   
};
var lastName = {
    _id: 'lastname',
    type: 'text',
    placeholder: {
        signUp: "Last Name"
    },
    displayName: "Last Name",
    required: true,
    // minLength: 6  
}

var emailFieldConfig = _.extend(email, commonOptions);
var pwdFieldConfig = _.extend(pwd, _.omit(commonOptions, "lowercase"));
var usernameFieldConfig = _.extend(username, commonOptions);
var fistNameFieldConfig = _.extend(firstName, _.omit(commonOptions, ["lowercase", "trim"]));
var lastNameFieldConfig = _.extend(lastName, _.omit(commonOptions, ["lowercase", "trim"]));

AccountsTemplates.addFields([
    emailFieldConfig,
    usernameFieldConfig,
    fistNameFieldConfig,
    lastNameFieldConfig,
    pwdFieldConfig
]);
