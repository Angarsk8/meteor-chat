Template.emojiPill.onRendered(function() {
    var autoContainer = $(".-autocomplete-container");
    var maxWidth = parseInt(autoContainer.css("max-width"));
    if (isNaN(maxWidth) || maxWidth > 250) {
        autoContainer.css("max-width", "300px");
    };
});
