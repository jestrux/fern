const { Color, Rectangle, Shadow, Text } = require("scenegraph");

const iconData = require("../../data/icons");
const {
  insertNode,
  createIcon,
  createText,
  getIconSizeFromTextSize,
  createBorder,
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
    rightIcon,
  } = { ...defaultInputProps, ...props };
  
  const {
    backgroundColor,
    iconColor,
    iconOpacity,
    borderColor,
    floatingLabel,
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
  const validRightIconWaSet = rightIcon && iconData[rightIcon];

  const iconSize = validIconWaSet
    ? getIconSizeFromTextSize(icon, inputProps.fontSize)
    : 0;
  const rightIconSize = validRightIconWaSet
    ? getIconSizeFromTextSize(rightIcon, inputProps.fontSize)
    : 0;

  const bgRectangle = new Rectangle();
  bgRectangle.resize(82, 150);
  bgRectangle.fill =
    backgroundColor == "transparent" || outlined
      ? new Color("white", 0)
      : new Color(backgroundColor);
  bgRectangle.stroke = new Color(color, floatingLabel ? 0 : 1);
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
      ((iconSize > 0 ? iconSize + 10 : 0) + rightIconSize + padding.left + padding.right),
    fontSize: inputProps.fontSize,
    fontStyle: inputProps.fontStyle,
  });
  insertNode(inputText);

  let iconNode, rightIconNode;
  if (validIconWaSet) {
    iconNode = createIcon(iconData[icon], {
      fill: iconColor || color,
      size: iconSize,
      opacity: iconOpacity,
    });
    insertNode(iconNode);
  }
  
  if (validRightIconWaSet) {
    rightIconNode = createIcon(iconData[rightIcon], {
      fill: iconColor || color,
      size: rightIconSize,
      opacity: iconOpacity,
    });
    insertNode(rightIconNode);
  }

  let labelNode;
  if (label && label.length) {
    labelNode = createText(label, {
      fill: new Color(color, labelOpacity),
      fontSize: 17,
      type: Text.POINT,
      fontStyle: "Regular",
    });
    insertNode(labelNode);
  }

  let borderNode;
  const border = {
    color: "black",
    thickness: 1.5,
    opacity: 0.1,
  };

  if (floatingLabel) {
    borderNode = createBorder({
      width,
      color: border.color || color,
      thickness: border.thickness || 1.5,
    });
    borderNode.opacity = labelOpacity;
    insertNode(borderNode);
  }

  return assembleInput({bgRectangle, inputText, labelNode, iconNode, rightIconNode, border, borderNode}, {
    ...props,
    iconSize: 20,
    padding,
  });
}

module.exports = createInput;
