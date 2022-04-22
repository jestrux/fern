const { selection, Color, Rectangle, SceneNode } = require("scenegraph");
const commands = require("commands");
const { createBorder, insertNode, placeInParent } = require("../../utils");
const createMedia = require("./createMedia");
const createMediaText = require("./createMediaText");

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

function assembleMediaSection(props = {}, images) {
  props = {
    ...props,
    images,
    width: 1600,
    // width: 1920,
    height: 620,
  };

  const [bg, container] = createSectionBackground({ ...props, });
  props.container = container;

  const media = createMedia(props);
  const mediaText = createMediaText(props);

  console.log("Container bounds: ", container);

  const { x, y } = container.topLeftInParent;

  placeInParent(mediaText, {x, y});
  placeInParent(media, {
    x: container.localBounds.width - media.localBounds.width + x,
    y
  });

  container.resize(container.localBounds.width, Math.max(media.localBounds.height, mediaText.localBounds.height));

  selection.items = [media, mediaText, container];
  commands.alignVerticalCenter();
  mediaText.moveInParentCoordinates(0, -32);
  commands.group();
  const content = selection.items[0];

  selection.items = [bg, content];
  commands.group();

  const mediaSection = selection.items[0];

  mediaSection.layout = {
    type: SceneNode.LAYOUT_PADDING,
    padding: {
      background: bg,
      values: { left: 130, right: 130, top: 90, bottom: 90, },
    },
  }

  mediaSection.resize(props.width, mediaSection.localBounds.height);

  return mediaSection;
}

module.exports = assembleMediaSection;
