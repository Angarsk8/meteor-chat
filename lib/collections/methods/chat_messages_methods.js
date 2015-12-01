let getRandomInt = (min = 0, max = 20) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

let urlScheme = {
    name: "",
    description: "",
    link: "",
    imagePath: ""
};

let extendAndInsert = (attributes) => {
    let user = Meteor.user(),
        message = _.extend(attributes, {
            userId: user._id,
            author: user.username,
            authorImage: user.profile.picture,
            submitted: new Date(),
        });
    Messages.insert(message);
};

let callGiphyMethod = (keyword, attributes) => {
    Meteor.call('getGifFromGiphy', keyword, (err, res) => {
        if (res) {
            let data = res.data;
            if (data.length > 0) {
                let limit = data.length - 1,
                    randomIndex = getRandomInt(0, limit),
                    choosenData = data[randomIndex];
                attributes.url = _.clone(urlScheme);
                attributes.url.link = choosenData.images.fixed_height.url;
                attributes.url.imagePath = choosenData.images.fixed_height.url;
                extendAndInsert(attributes);
            } else {
                attributes.url = _.clone(urlScheme);
                extendAndInsert(attributes);
            }
        }
    });
};

let extractUrlMetadata = (url, attributes) => {
    Meteor.call('fetchMetadata', url, function(err, res) {
        if (res) {
            attributes.url = _.clone(urlScheme);
            attributes.url.name = res.name;
            attributes.url.description = res.description;
            attributes.url.link = res.url;
            attributes.url.imagePath = res.images;
            extendAndInsert(attributes);
        }
    });
};

Meteor.methods({
    insertMessage: function(messageAttributes) {
        check(Meteor.userId(), String);
        check(messageAttributes, {
            body: String,
            url: Object
        });

        let urlObject = messageAttributes.url,
            modifiedAttributes = _.clone(messageAttributes);

        if (urlObject.flag) {
            modifiedAttributes.url = _.clone(urlScheme);
            modifiedAttributes.url.link = messageAttributes.url.path;
            modifiedAttributes.url.imagePath = messageAttributes.url.path
            extendAndInsert(modifiedAttributes);
        } else if (urlObject.meta) {
            let url = modifiedAttributes.url.path;
            extractUrlMetadata(url, modifiedAttributes);
        } else {
            let keyword = modifiedAttributes.url.path;
            callGiphyMethod(keyword, modifiedAttributes);
        }
    }
});
