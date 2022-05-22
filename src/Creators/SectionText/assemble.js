const { selection, Color, Rectangle, SceneNode } = require("scenegraph");
const commands = require("commands");
const createSectionText = require("../SectionText/createSectionText");
const { insertNode, createRectangle, getContainerWidth, createBorder } = require("../../utils");

function createSectionTextBackground({
  width,
  height,
  backgroundColor = "white",
  color,
  border,
}) {
  let bg = new createRectangle(width, height, {
    fill: backgroundColor,
    name: "BG",
  });
  insertNode(bg);

  const container = createRectangle(
    getContainerWidth(width), height, { name: "Container" }
  ); 
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

  const [bg, container] = createSectionTextBackground({ ...props, ...props.theme });
  props.container = container;

  let sectionText;
  const center = props.theme.layout == "center" || props.theme.center;
  const noText = !props.heading && !props.subHeading;
  sectionText = createSectionText({
    ...props,
    theme: {
      ...props.theme,
      center,
    }
  });
  selection.items = [sectionText, container];
  commands.alignTop();
  
  if(center)
    commands.alignHorizontalCenter();
  else
    commands.alignLeft();
    
  container.resize(container.localBounds.width, sectionText.localBounds.height);
  
  commands.group();
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
