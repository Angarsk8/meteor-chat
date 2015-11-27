let query = Messages.find({});

let insertMediaContent = (url, id) => {
    let containerHeight = 200,
        style = `display: block;
                 margin-top: 13px; 
                 max-height: 200px;
                 max-width: 600px;
                 border: solid 1px rgba(128, 128, 128, 0.3);
                 border-radius: 7px;`;

    let imageMarkUp = `<div style="height:${containerHeight}px">
                           <a href='${url}' target='_blank'>
                              <img class='img-rounded' src='${url}' style='${style}'>
                           </a>
                       </div>`;

    let $imageItem = $(imageMarkUp),
        $messagetext = $(`li#${id} .message-text`);
    $messagetext.after($imageItem);

    let renderedImage = $messagetext.next().find("img");
    $(renderedImage).on("load", function() {
        $messagetext.next().css("height", "auto");
    })
};

Template.messages.helpers({
    messages: function() {
        return query;
    }
});

Template.message.helpers({
    createdAtFormatted: function() {
        return moment(this.submitted).format('MM/DD/YYYY, HH:MM');
    }
});

Template.message.onRendered(function() {
    let messageData = this.data,
        body = messageData.body,
        image = messageData.image,
        id = messageData._id;

    if (image) {
        insertMediaContent(image, id);
    }
    // console.log(this.$(".message-image").width());
});

Template.messages.onRendered(function() {
    let scrollLevel = $(".messages-panel")[0].scrollHeight;
    scrollPanelDown(scrollLevel, 0);
    Session.set("initialMessages", query.count());
    Session.set("submittedMessages", Session.get("initialMessages"));
    Tracker.autorun(function() {
        Session.set("currentMessages", query.count());
        showHideNotificationPanel();
    });
});
