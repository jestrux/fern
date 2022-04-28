const { SceneNode, selection } = require("scenegraph");
const commands = require("commands");

const createButton = require("../../Button/createButton");

function navButtonsComponent(
  {
    color,
    themeColor,
    size = "sm",
    roundness = "sm",
    iconPlacement = "left",
    mainButton,
    secondaryButton,
    reversed = false,
  },
  buttons = "Sign In, Get Started",
) {
  buttons = buttons.split(",").map(button => button.trim());
  let button1, button2;

  if(reversed) {
    const mainButtonCopy = {...mainButton};
    mainButton = {...secondaryButton};
    secondaryButton = {...mainButtonCopy};
  }

  if (buttons.length == 2) {
    button2 = createButton({
      text: buttons[1],
      theme: {
        color: !reversed ? themeColor || color : color,
        size,
        roundness,
        iconPlacement,
        ...(mainButton ? mainButton : {}),
      },
      ...(mainButton ? mainButton : {}),
    });
  }
  
  let button1Styling = mainButton ? mainButton : {};
  if(buttons.length == 2) button1Styling = secondaryButton ? secondaryButton : {};

  button1 = createButton({
    text: buttons[0],
    theme: {
      color: buttons.length == 1 && !reversed || buttons.length == 2 && reversed ? themeColor || color : color,
      size,
      roundness,
      iconPlacement,
      ...button1Styling,
    },
    ...button1Styling,
  });

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
        spacings: secondaryButton && secondaryButton.style == "outline" ? 8 : 14,
      },
    };
  }

  return buttonNodes;
}

module.exports = navButtonsComponent;
