const { Color, Rectangle, Shadow, Text } = require("scenegraph");

const tinyColor = require("../../utils/tinycolor");
const iconData = require("../../data/icons");
const {
  insertNode,
  createIcon,
  getIconSizeFromTextSize,
} = require("../../utils");

const assembleButton = require("./assembleButton");
const buttonSizeMap = require("./buttonSizeMap");
const defaultButtonProps = require("./defaultButtonProps");

function createButton(props = {}) {
  let { iconPlacement, icon, text, size, color, shadow, style, roundness } = {
    ...defaultButtonProps,
    ...props,
  };

  const buttonProps = buttonSizeMap[size];
  const iconSize = icon
    ? getIconSizeFromTextSize(icon, buttonProps.fontSize)
    : 0;

  const bgRectangle = new Rectangle();
  bgRectangle.resize(...buttonProps.size);
  bgRectangle.fill = new Color(color);
  bgRectangle.stroke = new Color(color);
  bgRectangle.strokeEnabled = true;
  bgRectangle.strokeWidth = 1.2;
  const [sm, md] = buttonProps.cornerRadius;
  bgRectangle.setAllCornerRadii({ none: 0, sm, md, full: 999 }[roundness]);
  bgRectangle.name = "BG";

  insertNode(bgRectangle);

  const textColor =
    style != "fill" ? color : tinyColor(color).isLight() ? "black" : "white";

  let buttonText,
    iconNode,
    showIcon = icon && iconData[icon];

  if (showIcon) {
    iconNode = createIcon(iconData[icon], { fill: textColor, size: iconSize });
    if (iconPlacement == "right") insertNode(iconNode);
  }

  if (!text && !text.length && !icon && !icon.length) text = "Submit";

  if (text && text.length) {
    buttonText = new Text();
    buttonText.text = text;

    buttonText.fontFamily = "Helvetica Neue";
    buttonText.fontSize = buttonProps.fontSize;
    buttonText.fontStyle = buttonProps.fontStyle;
    buttonText.fill = new Color(textColor);
    buttonText.underline = style == "link";

    insertNode(buttonText);
  }

  if (showIcon && iconPlacement != "right") insertNode(iconNode);

  if (style != "fill") {
    bgRectangle.fill = new Color(color, 0);
    bgRectangle.stroke = new Color(color, style == "outline" ? 1 : 0);
  } else if (shadow)
    bgRectangle.shadow = new Shadow(0, 3, 6, new Color("#000000", 0.16), true);

  return assembleButton([bgRectangle, buttonText, iconNode], {
    ...buttonProps,
    style,
    iconPlacement,
    iconSize,
  });
}

module.exports = createButton;
