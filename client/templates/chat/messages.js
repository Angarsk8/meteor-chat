let query = Messages.find({});

let insertMediaContent = (url, id) => {
    let styles = {
        outerContainerStyles: `
          padding-bottom: 8px;
        `,
        innerContainerStyles: `
          border-left: solid 3px rgba(165, 165, 165, 0.23);
          padding-left: 10px;
        `,
        standardLeftPadding: `
          padding-left: 3px;
        `,
        imageStyle: `
          display: block;
          margin-top: 13px; 
          max-height: 200px;
          max-width: 600px;
          border: solid 1px rgba(128, 128, 128, 0.3);
          border-radius: 5px;
        `,
        imageContainer: `
          height: 200px;
        `
    };

    let showClass = (value) => {
        return value.length > 0 ? "" : "hidden";
    };

    let markup = {
        name: `
          <a class="${showClass(url.name)}" href="${url.link}" target='_blank'>
            <h5 class="text-muted" style="${styles.standardLeftPadding}">${url.name}</h5>
          </a>
        `,
        description: `
          <h6 class="${showClass(url.description)}" style="${styles.standardLeftPadding}">
            ${url.description}
          </h6>
        `,
        image: `
          <div class="${showClass(url.imagePath)} url-image-container" style="${styles.imageContainer}">
            <a href='${url.link}' target='_blank'>
              <img class='img-rounded' src='${url.imagePath}' style='${styles.imageStyle}'>
            </a>
          </div>
        `
    };


    let imageMarkUp = `
      <div class="url-outer-container" style="${styles.outerContainerStyles}">
        <div class="url-inner-container" style="${styles.innerContainerStyles}">
          ${markup.name}
          ${markup.description}
          ${markup.image}
        </div>
      </div>
    `;

    let $imageItem = $(imageMarkUp),
        $messagetext = $(`li#${id} .message-text`);

    $messagetext.siblings("br").remove();
    $messagetext.after($imageItem);

    let renderedImage = $messagetext.siblings(".url-outer-container").find("img");
    $(renderedImage).on("load", () => {
        $messagetext.siblings(".url-outer-container")
            .find(".url-image-container")
            .css("height", "auto");
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
        url = messageData.url,
        id = messageData._id;

    if (url && (url.name || url.description || url.imagePath)) {
        insertMediaContent(url, id);
    }
});

Template.messages.onRendered(function() {
    let scrollLevel = $(".messages-panel")[0].scrollHeight;
    scrollPanelDown(scrollLevel, 0);
    Session.set("initialMessages", query.count());
    Session.set("submittedMessages", Session.get("initialMessages"));
    Tracker.autorun(() => {
        Session.set("currentMessages", query.count());
        showHideNotificationPanel();
    });
});
