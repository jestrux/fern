const { selection, SceneNode } = require("scenegraph");
const commands = require("commands");
const { placeInParent } = require("../../utils");

function assembleInput(inputComponents, inputProps) {
  const {
    bgRectangle, inputText, labelNode, iconNode, rightIconNode, border, borderNode
  } = inputComponents;

  if (iconNode || rightIconNode) {
    if(iconNode && rightIconNode) {
      selection.items = [iconNode, rightIconNode, inputText];
      commands.alignLeft();
      commands.alignVerticalCenter();
      commands.group();
    }
    else if(rightIconNode){
      selection.items = [rightIconNode, inputText];
      commands.alignLeft();
      commands.alignVerticalCenter();
      commands.group();
    }
    else{
      selection.items = [bgRectangle, iconNode, inputText];
      commands.alignLeft();
      commands.alignVerticalCenter();

      selection.items = [iconNode, inputText];
      commands.group();
    }

    if(iconNode){
      const iconSize = inputProps.iconSize;
      inputText.moveInParentCoordinates(
        iconSize + (inputProps.size == "lg" ? 16 : 12),
        0
      );
    }

    const inputContent = selection.items[0];

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

  let input = selection.items[0];
  const padding = inputProps.padding;

  input.layout = {
    type: SceneNode.LAYOUT_PADDING,
    padding: {
      background: bgRectangle,
      values: padding,
    },
  };

  if(rightIconNode){
    const {x, width} = input.localBounds;
    rightIconNode.moveInParentCoordinates(
      x + width - padding.right,
      0
    );
  }

  if(borderNode) {
    const {x, width} = input.localBounds;
    input.layout = {
      type: SceneNode.LAYOUT_NONE,
    };
    bgRectangle.resize(width, bgRectangle.localBounds.height);

    inputText.moveInParentCoordinates(
      -padding.left,
      0
    );

    if(iconNode){
      iconNode.moveInParentCoordinates(
        -padding.left,
        0
      );
    }

    if(rightIconNode){
      rightIconNode.moveInParentCoordinates(
        padding.right / 2,
        0
      );
    }

    selection.items = [input, borderNode];
    commands.alignLeft();
    commands.alignBottom();
    commands.group();
    // borderNode.moveInParentCoordinates(0, border.thickness / 2 - 0.5);

    input = selection.items[0];
  }

  if (!labelNode) return input;

  selection.items = [labelNode];
  commands.bringToFront();
  selection.items = [input, labelNode];
  commands.alignLeft();
  commands.alignTop();
  commands.group();
  labelNode.moveInParentCoordinates(
    inputProps.roundness == "full" ? 6 : 0, 
    -labelNode.localBounds.height - (!borderNode ? 3 : -5)
  );
  const inputGroup = selection.items[0];
  return inputGroup;
}

module.exports = assembleInput;
