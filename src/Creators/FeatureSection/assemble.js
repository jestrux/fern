const { selection, Color, Rectangle, SceneNode } = require("scenegraph");
const commands = require("commands");
const createSectionText = require("../SectionText/createSectionText");
const { insertNode, createBorder } = require("../../utils");
const createFeatures = require("./createFeatures");

function createSectionBackground({
  width,
  height,
  backgroundColor,
  color,
  border,
}) {
  let bg = new Rectangle();
  bg.resize(width, height);
  bg.fill =
    backgroundColor == "transparent"
      ? new Color("white", 0)
      : new Color(backgroundColor);
  bg.strokeEnabled = false;
  bg.name = "BG";
  insertNode(bg);

  if (border) {
    const border = {
      color: "black",
      thickness: 1.5,
      opacity: 0.1,
    };

    const borderNode = createBorder({
      width,
      color: border.color || color,
      thickness: border.thickness || 1.5,
    });
    borderNode.opacity = border.opacity || 0.1;
    insertNode(borderNode);

    selection.items = [bg, borderNode];
    commands.alignLeft();
    commands.alignBottom();
    borderNode.moveInParentCoordinates(0, border.thickness / 2 - 0.5);
    commands.group();
    bg = selection.items[0];
  }

  const container = new Rectangle();
  const containerWidth = 1400; // 1600;
  container.resize(Math.min(width, containerWidth), height);
  container.fill = new Color("white", 0);
  container.strokeEnabled = false;
  container.name = "Container";
  insertNode(container);

  selection.items = [bg, container];
  commands.alignHorizontalCenter();
  commands.alignVerticalCenter();

  return [bg, container];
}

function assembleFeatureSection(props = {}, images) {
  props = {
    ...props,
    images,
    width: props.theme.width,
    height: 620,
  };

  const [bg, container] = createSectionBackground({ ...props, ...props.theme });
  props.container = container;

  const features = createFeatures(props);
  let sectionText;
  const center = props.theme.center;
  const noText = !props.heading && !props.subHeading;

  if(!noText){
    sectionText = createSectionText({
      ...props,
      theme: {
        ...props.theme,
        backgroundColor: "transparent", 
        verticalPadding: 0,
        center,
      }
    });

    selection.items = [sectionText, features];
    
    if(center) commands.alignHorizontalCenter();
    else commands.alignLeft();

    commands.group();

    const featuresAndText = selection.items[0];
    featuresAndText.layout = {
      type: SceneNode.LAYOUT_STACK,
      stack: {
        orientation: SceneNode.STACK_VERTICAL,
        spacings: 50
      },
    };
    container.resize(container.localBounds.width,  featuresAndText.localBounds.height);
    selection.items = [container, featuresAndText];
    commands.alignLeft();
    commands.group();
  }
  else{
    selection.items = [container, features];
    commands.alignLeft();
    container.resize(container.localBounds.width, features.localBounds.height);
  }
  
  
  const content = selection.items[0];
  selection.items = [bg, content];
  commands.alignHorizontalCenter();
  commands.group();

  let featureSectionContent = selection.items[0];
  const horizontalPadding = (props.theme.width - container.localBounds.width) / 2;
  const verticalPadding = noText ? 0 : props.theme.verticalPadding;

  featureSectionContent.layout = {
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

  featureSectionContent.resize(props.width, featureSectionContent.localBounds.height);

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

    selection.items = [featureSectionContent, borderNode];
    commands.alignLeft();
    commands.alignBottom();
    borderNode.moveInParentCoordinates(0, border.thickness / 2 - 0.5);
    commands.group();
    
    return selection.items[0];
  }
  else
    return featureSectionContent;
}

module.exports = assembleFeatureSection;
