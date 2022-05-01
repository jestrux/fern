const { selection, Color, Rectangle, Shadow } = require("scenegraph");
const commands = require("commands");
const { placeInParent, createBorder, insertNode } = require("../../utils");
const createNavSlot = require("./createSlot");

function createNavBackground({
  width,
  height,
  backgroundColor,
  color,
  border,
  shadow,
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

  if (shadow) bg.shadow = new Shadow(0, 1, 4, new Color("#000000", 0.16), true);
  else if (border) {
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

function assembleNavbar(props = {}, images) {
  props = {
    ...props,
    images,
    width: props.theme.width,
    height: 70,
  };

  const personaMap = {
    normal: {
      fontStyle: "Medium",
      textTransform: "none",
      textTransform: "none",
      letterSpacing: 18,
      fontSize: 16,
    },
    loud: {
      fontStyle: "Condensed Black",
      textTransform: "uppercase",
      letterSpacing: 50,
      fontSize: 22,
    },
  };

  if (props.theme && props.theme.persona) {
    props.theme.text = {
      ...props.theme.text,
      ...(personaMap[props.theme.persona] || {}),
    };
  }

  const [bg, container] = createNavBackground({ ...props, ...props.theme });
  props.container = container;

  const leftSlot = createNavSlot({ ...props, ...props.theme }, props.leftSlot);
  leftSlot.name = "FernNavLeftSlot";

  const middleSlot = createNavSlot({ ...props, ...props.theme, alignment: "center" }, props.middleSlot);
  middleSlot.name = "FernNavMiddleSlot";

  const rightSlot = createNavSlot(
    { ...props, ...props.theme, alignment: "right" },
    props.rightSlot
  );
  rightSlot.name = "FernNavRightSlot";

  const bounds = leftSlot.localBounds;
  middleSlot.moveInParentCoordinates(bounds.x + bounds.width + 60, 0);
  
  selection.items = [leftSlot, middleSlot, rightSlot];
  commands.distributeHorizontal();

  selection.items = [bg, container, leftSlot, middleSlot, rightSlot];
  commands.group();

  const navbar = selection.items[0];
  bg.resize(bg.localBounds.width, navbar.localBounds.height);
  container.resize(container.localBounds.width, navbar.localBounds.height);
  navbar.resize(navbar.localBounds.width + 60, navbar.localBounds.height);

  return navbar;
}

module.exports = assembleNavbar;
