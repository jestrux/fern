const { selection, SceneNode } = require("scenegraph");
const commands = require("commands");

function assembleButton(buttonComponents, buttonProps) {
  const [bgRectangle, buttonText, iconNode] = buttonComponents;

  if (iconNode) {
    if (buttonText) {
      selection.items = [iconNode, buttonText];
      if (buttonProps.iconPlacement == "right") commands.alignRight();
      else commands.alignLeft();

      commands.alignVerticalCenter();
      commands.group();

      const buttonContent = selection.items[0];

      let iconSpacing = buttonProps.iconSize + 10;
      if (buttonProps.iconPlacement == "right") iconSpacing *= -1;
      buttonText.moveInParentCoordinates(iconSpacing, 0);

      selection.items = [bgRectangle, buttonContent];
      commands.alignHorizontalCenter();
      commands.alignVerticalCenter();
      commands.group();

      buttonText.moveInParentCoordinates(0, -0.5);
    } else {
      selection.items = [bgRectangle, iconNode];
      commands.group();
    }
  } else {
    selection.items = [bgRectangle, buttonText];
    commands.alignHorizontalCenter();
    commands.alignVerticalCenter();
    commands.group();
  }

  let button = selection.items[0];
  const padding = buttonProps.padding;
  button.layout = {
    type: SceneNode.LAYOUT_PADDING,
    padding: {
      background: bgRectangle,
      values: {
        ...padding,
        ...(["flat", "link"].includes(buttonProps.style)
          ? { left: 0, right: 0 }
          : {}),
      },
    },
  };

  if(iconNode && !buttonText && buttonProps.roundness == "full"){
    bgRectangle.resize(button.localBounds.height, button.localBounds.height);
    button.layout = {
      type: SceneNode.LAYOUT_NONE
    };
    selection.items = [bgRectangle, iconNode];
    commands.alignHorizontalCenter();
    commands.alignVerticalCenter();
    commands.group();
    button = selection.items[0];
  }

  return button;
}

module.exports = assembleButton;
