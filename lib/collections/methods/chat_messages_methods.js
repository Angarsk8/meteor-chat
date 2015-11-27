let getRandomInt = (min = 0, max = 20) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
                attributes.image = choosenData.images.fixed_height.url;
                extendAndInsert(attributes);
            } else {
                attributes.image = "";
                extendAndInsert(attributes);
            }
        }
    });
};

Meteor.methods({
    insertMessage: function(messageAttributes) {
        check(Meteor.userId(), String);
        check(messageAttributes, {
            body: String,
            image: Object
        });
        let imageObject = messageAttributes.image;
        if (imageObject.flag) {
            messageAttributes.image = messageAttributes.image.url;
            extendAndInsert(messageAttributes);
        } else {
            let keyword = messageAttributes.image.url;
            callGiphyMethod(keyword, messageAttributes);
        }
    }
});
