const { Color, Rectangle, Shadow, Text } = require("scenegraph");

const iconData = require("../../data/icons");
const { insertNode, createIcon, createText } = require("../../utils");

const assembleInput = require("./assembleInput");
const defaultInputProps = require("./defaultProps");
const inputRoundnessMap = require("./inputRoundnessMap");

function createInput(props = {}){
    let {
        icon,
        iconColor,
        color,
        label,
        placeholder,
        inputValue,
        roundness,
        width
    } = {...defaultInputProps, ...props};

    const padding = {
        bottom: 14, top: 14,
        left: 14, right: 12,
    };

    if(roundness == "full") padding.left = padding.left + 4;

    const iconSize = icon && iconData[icon] ? 20 : 0;
    const bgRectangle = new Rectangle();
    bgRectangle.resize(82, 150);
    bgRectangle.fill = new Color("#fff");
    bgRectangle.stroke = new Color("#888");
    bgRectangle.strokeEnabled = true;
    bgRectangle.strokeWidth = 1;
    // bgRectangle.shadow = new Shadow(0, 3, 6, new Color("#000000", 0.16), true);

    bgRectangle.setAllCornerRadii(inputRoundnessMap[roundness] || 0);
    bgRectangle.name = "BG";
        
    insertNode(bgRectangle);

    const text = inputValue && inputValue.length ? inputValue : placeholder;
    const inputText = createText(text + " ", {
        fill: new Color(color, inputValue && inputValue.length ? 1 : 0.3),
        width: width - ((iconSize > 0 ? (iconSize + 10) : 0) + padding.left + padding.right),
        fontStyle: "Regular",
    });
    insertNode(inputText);

    let iconNode;
    if(icon && iconData[icon]){
        iconNode = createIcon(iconData[icon], {fill: iconColor, size: iconSize});
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