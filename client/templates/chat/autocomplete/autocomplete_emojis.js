Template.emojiPill.onRendered(function() {
    let autoContainer = $(".-autocomplete-container"),
        maxWidth = parseInt(autoContainer.css("max-width"));
    if (isNaN(maxWidth) || maxWidth > 250) {
        autoContainer.css("max-width", "300px");
    };
});
