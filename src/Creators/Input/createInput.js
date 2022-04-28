const { Color, Rectangle, Shadow, Text } = require("scenegraph");

const iconData = require("../../data/icons");
const {
  insertNode,
  createIcon,
  createText,
  getIconSizeFromTextSize,
} = require("../../utils");

const assembleInput = require("./assembleInput");
const defaultInputProps = require("./defaultProps");
const inputSizeMap = require("./inputSizeMap");

function createInput(props = {}) {
  let {
    icon,
    label,
    placeholder,
    value,
    theme,
  } = { ...defaultInputProps, ...props };
  
  const {
    backgroundColor,
    iconColor,
    iconOpacity,
    borderColor,
    color,
    labelOpacity,
    placeholderOpacity,
    size,
    outlined,
    roundness,
    width,
  } = theme;

  const inputProps = inputSizeMap[size || "md"];
  const padding = inputProps.padding;

  const validIconWaSet = icon && iconData[icon];

  const iconSize = validIconWaSet
    ? getIconSizeFromTextSize(icon, inputProps.fontSize)
    : 0;

  const bgRectangle = new Rectangle();
  bgRectangle.resize(82, 150);
  bgRectangle.fill =
    backgroundColor == "transparent" || outlined
      ? new Color("white", 0)
      : new Color(backgroundColor);
  bgRectangle.stroke = new Color(color);
  bgRectangle.strokeEnabled = true;
  bgRectangle.strokeWidth = 1;

  bgRectangle.setAllCornerRadii(
    (["none", "full"].includes(roundness)
      ? { none: 0, full: 999 }[roundness]
      : inputProps.cornerRadius) || 0
  );
  bgRectangle.name = "BG";

  insertNode(bgRectangle);

  const text = value && value.length ? value : placeholder;
  const inputText = createText(text + " ", {
    fill: new Color(color, value && value.length ? 1 : placeholderOpacity),
    width:
      width -
      ((iconSize > 0 ? iconSize + 10 : 0) + padding.left + padding.right),
    fontSize: inputProps.fontSize,
    fontStyle: inputProps.fontStyle,
  });
  insertNode(inputText);

  let iconNode;
  if (validIconWaSet) {
    iconNode = createIcon(iconData[icon], {
      fill: iconColor || color,
      size: iconSize,
      opacity: iconOpacity,
    });
    insertNode(iconNode);
  }

  let labelNode;
  if (label && label.length) {
    labelNode = createText(label, {
      fill: new Color(color, labelOpacity),
      fontSize: 17,
      type: Text.POINT,
    });
    insertNode(labelNode);
  }

  return assembleInput([bgRectangle, inputText, labelNode, iconNode], {
    ...props,
    iconSize: 20,
    padding,
  });
}

module.exports = createInput;
