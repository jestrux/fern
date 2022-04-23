const { Color, Rectangle, Ellipse, ImageFill, Shadow, GraphicNode, selection } = require("scenegraph");
const commands = require("commands");
const { insertNode, createIcon } = require("../../utils");

function getPlayButton({ color, invertColors, smoothCorners }) {
  const playButtonBg = new Ellipse();
  playButtonBg.radiusX = 35;
  playButtonBg.radiusY = 35;
  playButtonBg.fill = new Color(invertColors ? color : "white");

  insertNode(playButtonBg);

  const playIconNode = createIcon("M8 5v14l11-7z", {
    fill: invertColors ? "white" : color,
    stroke: invertColors ? "white" : color,
    strokeWidth: 5,
    strokeJoins: smoothCorners
      ? GraphicNode.STROKE_JOIN_ROUND
      : GraphicNode.STROKE_JOIN_MITER,
    size: 18,
  });

  insertNode(playIconNode);

  selection.items = [playButtonBg, playIconNode];
  commands.alignHorizontalCenter();
  commands.alignVerticalCenter();
  commands.group();
  playIconNode.moveInParentCoordinates(3, 0);

  const button = selection.items[0];
  button.name = "playButton";
  return button;
}

function getShadow({ size, placement, color } = {}) {
  const shadowPropsMap = {
    sm: [5, 15, 30],
    md: [10, 22, 60],
    lg: [15, 30, 90],
  };

  if (!size || !Object.keys(shadowPropsMap).includes(size)) size = "sm";

  const shadowProps = shadowPropsMap[size];
  let shadowOffsets = shadowProps.slice(0, 2);
  const shadowBlur = shadowProps[2];

  if (placement.indexOf("-L") != -1) shadowOffsets[0] *= -1;

  return new Shadow(...shadowOffsets, shadowBlur, new Color(color, 0.25), true);
}

function createMedia({
  images,
  image,
  playButton,
  theme = {
    image: {},
    playButton: {},
  },
}) {
  const { width, height, roundness, shadow, } = theme.image;
  const roundnessMap = {
    none: 0,
    sm: 6,
    md: 12,
    lg: 20,
  };

  const imageNode = new Rectangle();
  imageNode.resize(width, height);
  imageNode.fill = new ImageFill(images[`banner${image}`]);
  imageNode.setAllCornerRadii(roundnessMap[roundness || "sm"]);

  // try {
  //     imageNode.fill = imageNodeImage;
  // } catch (error) {
  //     imageNode.fill = new ImageFill(imageNodeImage);
  // }

  insertNode(imageNode);

  if (playButton) {
    selection.items = [imageNode];
    commands.duplicate();

    if (shadow) imageNode.shadow = getShadow(shadow);

    const scrim = selection.items[0];
    scrim.name = "Scrim";
    scrim.fill = new Color("black", theme.playButton.overlayOpacity);
    scrim.setAllCornerRadii(roundnessMap[roundness || "sm"]);

    selection.items = [imageNode, scrim, getPlayButton(theme.playButton)];

    commands.alignHorizontalCenter();
    commands.alignVerticalCenter();
    commands.group();
    return selection.items[0];
  } else if (shadow) imageNode.shadow = getShadow(shadow);

  return imageNode;
}

module.exports = createMedia;
