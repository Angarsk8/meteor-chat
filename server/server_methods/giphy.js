let apiCall = (apiUrl, callback) => {
    try {
        let response = HTTP.get(apiUrl).data;
        callback(null, response);
    } catch (error) {
        if (error.response) {
            let errorCode = error.response.data.code,
                errorMessage = error.response.data.message;
        } else {
            let errorCode = 500,
                errorMessage = 'Cannot access the API';
        }
        let myError = new Meteor.Error(errorCode, errorMessage);
        callback(myError, null);
    }
};

Meteor.methods({
    'getGifFromGiphy': function(keyword) {
        check(Meteor.userId(), String);
        check(keyword, String);
        this.unblock();

        const [GIPHY_API, HTTP_VERB, LIMIT, ENDPOINT] = [
            "dc6zaTOxFJmzC", "GET", 10, "http://api.giphy.com/v1/gifs/"
        ];

        let encodedKeyword = keyword.trim().replace(" ", "+"),
            apiUrl = `${ENDPOINT}search?q=${encodedKeyword}&api_key=${GIPHY_API}&limit=${LIMIT}`,
            response = Meteor.wrapAsync(apiCall)(apiUrl);

        return response;
    }
})
