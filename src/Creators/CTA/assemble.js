const { selection, SceneNode } = require("scenegraph");
const commands = require("commands");
const createSectionText = require("../SectionText/createSectionText");
const { insertNode, getPadding, createRectangle, getGroupChildByName } = require("../../utils");

function createCTASectionBackground({
  width,
  containerWidth,
  height,
  backgroundColor = "white",
  border,
  roundness,
}) {
  const bg = createRectangle(width, height, { name: "BG" });
  insertNode(bg);

  const container = createRectangle(containerWidth, height, {
    fill: backgroundColor,
    name: "Container",
    cornerRadius: roundness || "md",
    border,
  });
  insertNode(container);

  selection.items = [bg, container];
  commands.alignHorizontalCenter();
  commands.alignVerticalCenter();

  return [bg, container];
}

function assembleCTASection(props = {}, images) {
  props = {
    ...props,
    images,
    width: props.theme.width,
    height: 250,
  };

  const containerWidth = props.width == 1920 ? 1600 : 1400;
  const [bg, container] = createCTASectionBackground({ ...props, containerWidth, ...props.theme });
  props.container = container;

  let sectionText;
  const center = props.theme.center;
  sectionText = createSectionText({
    ...props,
    theme: {
      ...props.theme,
      center,
    },
    headingSubHeadingSpacing: 30,
  });
  commands.ungroup();
  
  selection.items = [...selection.items, container];
  commands.alignVerticalCenter();
  commands.alignLeft();
  
  if(center)
    commands.alignHorizontalCenter();
  
  commands.group();
  const content = selection.items[0];

  getGroupChildByName(content, "FernSectionButtons", (buttons) => {
    const containerRight = container.localBounds.x + container.localBounds.width;
    buttons.moveInParentCoordinates(containerRight - buttons.localBounds.width, 0);
  });

  content.layout = {
    type: SceneNode.LAYOUT_PADDING,
    padding: {
      background: container,
      values: getPadding(57, 57, 73, 57),
    },
  }

  selection.items = [bg, content];
  commands.alignTop();
  commands.alignHorizontalCenter();
  commands.group();

  let CTASectionContent = selection.items[0];
  const horizontalPadding = (props.theme.width - containerWidth) / 2;
  const verticalPadding = props.theme.verticalPadding;

  CTASectionContent.layout = {
    type: SceneNode.LAYOUT_PADDING,
    padding: {
      background: bg,
      values: getPadding(0, horizontalPadding),
    },
  }

  CTASectionContent.resize(props.width, CTASectionContent.localBounds.height);

  return CTASectionContent;
}

module.exports = assembleCTASection;
