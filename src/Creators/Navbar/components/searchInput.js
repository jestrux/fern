const createInput = require("../../Input/createInput");

function navSearchInputComponent({color, theme}, {placeholder = "Type here to search", value}){
    const searchInput = createInput({
        icon: "search",
        placeholder,
        value,
        theme: {
            roundness: theme.searchbar ? theme.searchbar.roundness || "full" : "full",
            width: 350,
            backgroundColor: "transparent",
            placeholderOpacity: 0.4,
            iconColor: color,
            iconOpacity: 0.6,
            borderColor: color,
            color,
        }
    });

    searchInput.name = "FernSearchInput";

    return searchInput;
}

module.exports = navSearchInputComponent;