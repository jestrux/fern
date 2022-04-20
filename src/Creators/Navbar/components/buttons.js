const { SceneNode, selection } = require("scenegraph");
const commands = require("commands");

const createButton = require("../../Button/createButton");

function navButtonsComponent(
  {
    color,
    activeColor,
    secondaryButtonStyle = "outline", // "link",
    mainButtonStyle = "fill",
  },
  buttons = "Sign In, Get Started"
) {
  buttons = buttons.split(",").map(button => button.trim());
  let button1, button2;

  if (buttons.length == 2) {
    button1 = createButton({
      text: buttons[1],
      size: "sm",
      color: activeColor || color,
      style: mainButtonStyle,
      roundness: "sm",
    });

    button2 = createButton({
      text: buttons[0],
      size: "sm",
      color: color,
      style: secondaryButtonStyle,
      roundness: "sm",
    });
  } else {
    button1 = createButton({
      text: buttons[0],
      size: "sm",
      color: activeColor || color,
      style: mainButtonStyle,
      roundness: "sm",
    });
  }

  selection.items = buttons.length == 2 ? [button1, button2] : [button1];
  commands.alignVerticalCenter();
  commands.group();

  const buttonNodes = selection.items[0];
  buttonNodes.name = "FernNavButtons";

  if (buttons.length == 2) {
    buttonNodes.layout = {
      type: SceneNode.LAYOUT_STACK,
      stack: {
        orientation: SceneNode.STACK_HORIZONTAL,
        spacings: secondaryButtonStyle == "outline" ? 8 : 14,
      },
    };
  }

  return buttonNodes;
}

module.exports = navButtonsComponent;
