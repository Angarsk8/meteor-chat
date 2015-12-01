let commonOptions = {
    trim: true,
    lowercase: true,
    negativeValidation: true,
    positiveValidation: true,
    negativeFeedback: false,
    positiveFeedback: true,
    showValidating: true,
    continuousValidation: true,
    forbidClientAccountCreation: true
};

let emailRegexp = {
    re: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
};

let email = _.extend(AccountsTemplates.removeField("email"), emailRegexp);
let pwd = AccountsTemplates.removeField("password");
let username = {
    _id: 'username',
    type: 'text',
    placeholder: {
        signUp: "username"
    },
    displayName: "Username",
    required: true,
    minLength: 6
};
let firstName = {
    _id: 'firstname',
    type: 'text',
    placeholder: {
        signUp: "First Name"
    },
    displayName: "First Name",
    required: true 
};
let lastName = {
    _id: 'lastname',
    type: 'text',
    placeholder: {
        signUp: "Last Name"
    },
    displayName: "Last Name",
    required: true
};

let emailFieldConfig = _.extend(email, commonOptions),
    pwdFieldConfig = _.extend(pwd, _.omit(commonOptions, "lowercase")),
    usernameFieldConfig = _.extend(username, commonOptions),
    fistNameFieldConfig = _.extend(firstName, _.omit(commonOptions, ["lowercase", "trim"])),
    lastNameFieldConfig = _.extend(lastName, _.omit(commonOptions, ["lowercase", "trim"]));

AccountsTemplates.addFields([
    emailFieldConfig,
    usernameFieldConfig,
    fistNameFieldConfig,
    lastNameFieldConfig,
    pwdFieldConfig
]);
