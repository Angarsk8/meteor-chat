MatchType = (function() {
    let matchImagePattern = (body, regex) => {
        let matchImageRegexp = /((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)/i,
            validation = matchImageRegexp.exec(body);

        return validation ? _.first(validation) : null;
    };

    let matchGiphyPattern = (body) => {
        let matchGiphyRegexp = /^\/giphy\s+\w*/i,
            validation = matchGiphyRegexp.exec(body);

        return validation ? true : false;
    };

    let matchUrlPattern = (body) => {
        let matchUrlRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,5}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i,
            validation = matchUrlRegexp.exec(body);

        return validation ? _.first(validation) : null;
    };

    return {
        matchImagePattern: matchImagePattern,
        matchGiphyPattern: matchGiphyPattern,
        matchUrlPattern: matchUrlPattern
    };
})();
