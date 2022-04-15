const { Color, Rectangle, Shadow, Text } = require("scenegraph");

const tinyColor = require("../../utils/tinycolor");
const iconData = require("../../data/icons");
const { insertNode, createIcon, getIconSizeFromTextSize } = require("../../utils");

const assembleButton = require("./assembleButton");
const buttonSizeMap = require("./buttonSizeMap");
const buttonRoundnessMap = require("./buttonRoundnessMap");
const defaultButtonProps = require("./defaultButtonProps");

function createButton(props = {}){
    let {
        iconPlacement,
        icon,
        text,
        size,
        color,
        shadow,
        outlined,
        link,
        underline,
        roundness
    } = {...defaultButtonProps, ...props};

    if(!text && !text.length && !icon && !icon.length) text = "Submit";

    const buttonProps = buttonSizeMap[size];
    const iconSize = icon ? getIconSizeFromTextSize(icon, buttonProps.fontSize) : 0;

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
    
    let buttonText, iconNode, showIcon = icon && iconData[icon];

    let textColor = "#FFF";
    if(outlined || link)
        textColor = color;
    else
        textColor = tinyColor(color).isLight() ? "black" : "white";
    
    if(showIcon){
        iconNode = createIcon(iconData[icon], {fill: textColor, size: iconSize});
        if(iconPlacement == "right") insertNode(iconNode);
    }
    
    if(text && text.length){
        buttonText = new Text();
        buttonText.text = text;
    
        buttonText.fill = new Color(textColor);
        buttonText.fontFamily = "Helvetica Neue";
        buttonText.fontSize = buttonProps.fontSize;
        buttonText.fontStyle = buttonProps.fontStyle;
        buttonText.underline = underline;
        
        insertNode(buttonText);
    }

    if(showIcon && iconPlacement != 'right') insertNode(iconNode);

    return assembleButton(
        [bgRectangle, buttonText, iconNode],
        {...buttonProps, iconPlacement, iconSize}
    );
}

module.exports = createButton;