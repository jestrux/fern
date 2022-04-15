const { Rectangle, Color, selection, SceneNode } = require("scenegraph");
const commands = require("commands");
const { insertNode, createText } = require("../../../utils");
const createInput = require("../../Input/createInput");
const createButton = require("../../Button/createButton");

function footerSubscribeComponent(props = {}) {
    const {
        subscribeMessage = "Subscribe to our newsletter to get premium content. We'll respect your privacy never spam your inbox.",
        subscribeWidth = 380,
        subscribeInset = true,
        subscribeRoundness = "md",
        subscribeColor,
    } = {...props, ...{subscribeColor: "#00A860"}};
    
  const input = createInput({
    // icon: "mail",
    // iconColor: subscribeColor,
    // inputValue: "watson@sherlocks.com",
    width: subscribeWidth,
    placeholder: "e.g. apwbd@hogwarts.com",
    roundness: subscribeRoundness,
  });
  
  const button = createButton({
    // color: subscribeColor,
    // icon: "send",
    text: "subscribe",
    size: subscribeInset ? "sm" : "md",
    roundness: subscribeRoundness,
  });

  selection.items = [input, button];
  
  commands.alignRight();
  commands.alignVerticalCenter();

  commands.group();
  const subscribeForm = selection.items[0];

  if(subscribeInset) button.moveInParentCoordinates(-6, 0);

  const subscribeText = createText(subscribeMessage, {
    name: "FernFooterSubscribeText",
    fill: new Color("#606060"),
    fontSize: 16,
    width: subscribeWidth,
    lineSpacing: 32,
    fontStyle: "Regular",
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
        spacings: 24,
      },
    };
  }
  subscribeElement.name = "FernFooterSubscribe";

  return subscribeElement;
}

module.exports = footerSubscribeComponent;
