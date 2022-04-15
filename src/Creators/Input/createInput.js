const { Color, Rectangle, Shadow, Text } = require("scenegraph");

const iconData = require("../../data/icons");
const { insertNode, createIcon, createText, getIconSizeFromTextSize } = require("../../utils");

const assembleInput = require("./assembleInput");
const defaultInputProps = require("./defaultProps");
const inputSizeMap = require("./inputSizeMap");
const inputRoundnessMap = require("./inputRoundnessMap");

function createInput(props = {}){
    let {
        icon,
        iconColor,
        iconOpacity,
        backgroundColor,
        borderColor,
        color,
        label,
        placeholder,
        placeholderOpacity,
        inputValue,
        size,
        roundness,
        width
    } = {...defaultInputProps, ...props};

    const inputProps = inputSizeMap[size];
    const padding = inputProps.padding;

    if(roundness == "full") {
        padding.left = padding.left + 4;
        padding.right = padding.right + 4;
    }

    const iconSize = icon && iconData[icon] ? getIconSizeFromTextSize(icon, inputProps.fontSize) : 0;

    const bgRectangle = new Rectangle();
    bgRectangle.resize(82, 150);
    bgRectangle.fill = backgroundColor == "transparent" ? new Color("white", 0) : new Color(backgroundColor);
    bgRectangle.stroke = new Color(borderColor ? borderColor : "#888");
    bgRectangle.strokeEnabled = true;
    bgRectangle.strokeWidth = 1;
    // bgRectangle.shadow = new Shadow(0, 3, 6, new Color("#000000", 0.16), true);

    bgRectangle.setAllCornerRadii((["none", "full"].includes(roundness) ? inputRoundnessMap[roundness] : inputProps.cornerRadius) || 0);
    bgRectangle.name = "BG";
        
    insertNode(bgRectangle);

    const text = inputValue && inputValue.length ? inputValue : placeholder;
    const inputText = createText(text + " ", {
        fill: new Color(color, inputValue && inputValue.length ? 1 : placeholderOpacity),
        width: width - ((iconSize > 0 ? (iconSize + 10) : 0) + padding.left + padding.right),
        fontSize: inputProps.fontSize,
        fontStyle: inputProps.fontStyle,
    });
    insertNode(inputText);

    let iconNode;
    if(icon && iconData[icon]){
        iconNode = createIcon(iconData[icon], {fill: iconColor, size: iconSize, opacity: iconOpacity});
        insertNode(iconNode);
    }

    let labelNode;
    if(label && label.length){
        labelNode = createText(label, {
            fill: new Color("#777"),
            fontSize: 17,
            type: Text.POINT,
        });
        insertNode(labelNode);
    }

    return assembleInput(
        [bgRectangle, inputText, labelNode, iconNode],
        {
            ...props,
            iconSize: 20,
            padding
        }
    );
}

module.exports = createInput;