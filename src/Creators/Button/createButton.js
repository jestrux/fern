const { Color, Rectangle, Shadow, Text } = require("scenegraph");

const tinyColor = require("../../utils/tinycolor");
const iconData = require("../../data/icons");
const { insertNode, createIcon } = require("../../utils");

const assembleButton = require("./assembleButton");
const buttonSizeMap = require("./buttonSizeMap");
const buttonRoundnessMap = require("./buttonRoundnessMap");

function createButton(props){
    let {
        icon,
        text,
        size,
        color,
        shadow,
        outlined,
        link,
        underline,
        roundness
    } = props;

    if(!text.length) text = "Submit";

    const buttonProps = buttonSizeMap[size];
    const iconSize = buttonProps.fontSize * 0.8;

    const bgRectangle = new Rectangle();
    bgRectangle.resize(...buttonProps.size);
    bgRectangle.fill = new Color(color, outlined || link ? 0 : 1);
    bgRectangle.strokeEnabled = !link;
    bgRectangle.strokeWidth = 1.5;

    bgRectangle.setAllCornerRadii(buttonRoundnessMap[roundness] || 0);
    bgRectangle.name = "BG";
    if(!shadow)
        bgRectangle.stroke = new Color(color);
    else
        bgRectangle.shadow = new Shadow(0, 3, 6, new Color("#000000", 0.16), true);
        
    insertNode(bgRectangle);

    const buttonText = new Text();
    buttonText.text = text;
    let textColor = "#FFF";
    if(outlined || link)
        textColor = color;
    else
        textColor = tinyColor(color).isLight() ? "black" : "white";

    buttonText.fill = new Color(textColor);
    buttonText.fontFamily = "Helvetica Neue";
    buttonText.fontSize = buttonProps.fontSize;
    buttonText.fontStyle = buttonProps.fontStyle;
    buttonText.underline = underline;
    
    insertNode(buttonText);

    let iconNode;
    if(icon && iconData[icon]){
        iconNode = createIcon(iconData[icon], {fill: textColor, size: iconSize});
        insertNode(iconNode);
    }

    return assembleButton(
        [bgRectangle, buttonText, iconNode],
        buttonProps
    );
}

module.exports = createButton;