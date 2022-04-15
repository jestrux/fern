const { SceneNode, Rectangle, Text, Color, selection } = require("scenegraph");
const commands = require("commands");
const icons = require("../../../data/icons");
const { insertNode, createIcon, getPadding } = require("../../../utils");
const createInput = require("../../Input/createInput");

function navSearchInputComponent({color}){
    const searchInput = createInput({
        icon: "search",
        placeholder: "Type here to search",
        roundness: "full",
        width: 250,
        backgroundColor: "transparent",
        placeholderOpacity: 0.4,
        iconColor: color,
        iconOpacity: 0.6,
        borderColor: color,
        color,
    });

    searchInput.name = "FernSearchInput";

    return searchInput;
}

module.exports = navSearchInputComponent;