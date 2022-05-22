const { selection, Color, Rectangle, SceneNode } = require("scenegraph");
const commands = require("commands");
const createSectionText = require("../SectionText/createSectionText");
const { insertNode, createBorder, createRectangle, getContainerWidth } = require("../../utils");
const createFAQs = require("./createFAQs");

function createFAQBackground({
  width,
  height,
  backgroundColor,
  color,
}) {
  let bg = new createRectangle(width, height, {
    fill: backgroundColor,
    name: "BG"
  });
  insertNode(bg);

  const container = createRectangle(
    getContainerWidth(width), height, 
    { name: "Container" }
  );
  insertNode(container);

  selection.items = [bg, container];
  commands.alignHorizontalCenter();
  commands.alignVerticalCenter();

  return [bg, container];
}

function assembleFAQ(props = {}, images) {
  props = {
    ...props,
    images,
    width: props.theme.width,
    height: 620,
  };

  const [bg, container] = createFAQBackground({ ...props, ...props.theme });
  props.container = container;

  const faqs = createFAQs(props);
  let sectionText;
  const noText = !props.heading && !props.subHeading;

  if(!noText){
    sectionText = createSectionText({
      ...props,
      theme: {
        ...props.theme,
        backgroundColor: "transparent", 
        verticalPadding: 0,
      }
    });

    selection.items = [sectionText, faqs];
    
    if(props.theme.layout == "center") commands.alignHorizontalCenter();
    else commands.alignLeft();

    commands.group();

    const faqsAndText = selection.items[0];
    faqsAndText.layout = {
      type: SceneNode.LAYOUT_STACK,
      stack: {
        orientation: SceneNode.STACK_VERTICAL,
        spacings: 70
      },
    };
    container.resize(container.localBounds.width,  faqsAndText.localBounds.height);
    selection.items = [container, faqsAndText];

    if(props.theme.layout == "center") commands.alignHorizontalCenter();
    else commands.alignLeft();
    
    commands.group();
  }
  else{
    selection.items = [container, faqs];
    commands.alignLeft();
    container.resize(container.localBounds.width, faqs.localBounds.height);
  }
  
  
  const content = selection.items[0];
  selection.items = [bg, content];
  commands.alignHorizontalCenter();
  commands.group();

  let faqContent = selection.items[0];
  const horizontalPadding = (props.theme.width - container.localBounds.width) / 2;
  const verticalPadding = noText ? 0 : props.theme.verticalPadding;

  faqContent.layout = {
    type: SceneNode.LAYOUT_PADDING,
    padding: {
      background: bg,
      values: {
        left: horizontalPadding, right: horizontalPadding, 
        top: verticalPadding, 
        bottom: verticalPadding, 
      },
    },
  }

  faqContent.resize(props.width, faqContent.localBounds.height);

  if (props.theme.border) {
    const border = {
      color: "black",
      thickness: 1.5,
      opacity: 0.1,
    };
    const borderNode = createBorder({
      width: props.theme.width,
      color: border.color || color,
      thickness: border.thickness || 1.5,
    });
    borderNode.opacity = border.opacity || 0.1;
    insertNode(borderNode);

    selection.items = [faqContent, borderNode];
    commands.alignLeft();
    commands.alignBottom();
    borderNode.moveInParentCoordinates(0, border.thickness / 2 - 0.5);
    commands.group();
    
    return selection.items[0];
  }
  else
    return faqContent;
}

module.exports = assembleFAQ;
