const { selection, SceneNode } = require("scenegraph");
const commands = require("commands");

function assembleInput(inputComponents, inputProps) {
  const [bgRectangle, inputText, label, iconNode] = inputComponents;

  if (iconNode) {
    selection.items = [iconNode, inputText];
    commands.alignLeft();
    commands.alignVerticalCenter();
    commands.group();

    const inputContent = selection.items[0];
    const iconSize = inputProps.iconSize;
    inputText.moveInParentCoordinates(
      iconSize + (inputProps.size == "lg" ? 16 : 12),
      0
    );

    selection.items = [bgRectangle, inputContent];
    commands.alignHorizontalCenter();
    commands.alignVerticalCenter();
    commands.group();
    inputText.moveInParentCoordinates(
      0,
      inputProps.value && inputProps.value.length
        ? inputProps.size == "lg"
          ? -1
          : -1.25
        : -0.5
    );
  } else {
    selection.items = [bgRectangle, inputText];
    commands.alignHorizontalCenter();
    commands.alignVerticalCenter();
    commands.group();
  }

  const input = selection.items[0];
  const padding = inputProps.padding;

  input.layout = {
    type: SceneNode.LAYOUT_PADDING,
    padding: {
      background: bgRectangle,
      values: padding,
    },
  };

  if (!label) return input;

  selection.items = [input, label];
  commands.alignLeft();
  commands.group();
  label.moveInParentCoordinates(inputProps.roundness == "full" ? 6 : 0, 0);

  const inputGroup = selection.items[0];
  inputGroup.layout = {
    type: SceneNode.LAYOUT_STACK,
    stack: {
      orientation: SceneNode.STACK_VERTICAL,
      spacings: 3,
    },
  };

  return inputGroup;
}

module.exports = assembleInput;
