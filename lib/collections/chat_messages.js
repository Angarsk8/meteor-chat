Messages = new Mongo.Collection("messages");

Messages.allow({
    insert: (userId, doc) => {
        return false;
    }
});
