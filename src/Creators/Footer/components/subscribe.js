const { Rectangle, Color, selection, SceneNode } = require("scenegraph");
const commands = require("commands");
const { insertNode, createText, getGroupChildByName } = require("../../../utils");
const createInput = require("../../Input/createInput");
const createButton = require("../../Button/createButton");

function footerSubscribeComponent(props = {}, 
  {
    message,
    placeholder,
    action
  }
  ) {
  
  const roundness = props.theme.subscribe.roundness;
  const input = createInput({
    // icon: "mail",
    // iconColor: props.theme.subscribe.color || props.theme.color,
    placeholder,
    theme: {
      // color: props.theme.color,
      width: props.theme.subscribe.width,
      roundness,
    }
  });

  // console.log("Inset: ", props.theme.subscribe.inset);

  const button = createButton({
    // icon: "send",
    text: action,
    theme: {
      color: props.theme.subscribe.color || props.theme.color,
      size: props.theme.subscribe.inset ? "sm" : "md",
      roundness: roundness == "md" ? "sm" : roundness,
    }
  });

  if(!props.theme.subscribe.inset){
    getGroupChildByName(button, "BG", bg => {
      bg.cornerRadii = {
        ...bg.cornerRadii,
        topLeft: 0,
        bottomLeft: 0,
      };
    })
  }

  selection.items = [input, button];
  
  commands.alignRight();
  commands.alignVerticalCenter();

  commands.group();
  const subscribeForm = selection.items[0];

  button.moveInParentCoordinates(
    props.theme.subscribe.inset ? -5 : 3, 
    props.theme.subscribe.inset ? 0 : 0.5,
  );

  const subscribeText = createText(message, {
    name: "FernFooterSubscribeText",
    fill: props.theme.color,
    fontSize: 16,
    width: props.theme.subscribe.width,
    lineSpacing: 32,
  });

  insertNode(subscribeText);

  selection.items = [subscribeForm, subscribeText];
  commands.alignLeft();
  commands.group();

  const subscribeElement = selection.items[0];
  if (subscribeElement.children.length > 1) {
    subscribeElement.layout = {
      type: SceneNode.LAYOUT_STACK,
      stack: {
        orientation: SceneNode.STACK_VERTICAL,
        spacings: 20,
      },
    };
  }
  subscribeElement.name = "FernFooterSubscribe";

  return subscribeElement;
}

module.exports = footerSubscribeComponent;
