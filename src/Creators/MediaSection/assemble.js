const { selection, Color, LinearGradient, Rectangle, SceneNode } = require("scenegraph");
const commands = require("commands");
const { createBorder, insertNode, placeInParent, getGroupChildByName } = require("../../utils");
const createMedia = require("./createMedia");
const createMediaText = require("./createMediaText");

function createSectionBackground({
  width,
  height,
  backgroundColor,
  color,
  border,
  layout,
  fadeBackground,
}) {
  const transparentColor = new Color("white", 0);
  const bgColor = backgroundColor == "transparent" ? transparentColor : new Color(backgroundColor);

  let bg = new Rectangle();
  bg.resize(width, height);
  bg.strokeEnabled = false;
  bg.name = "BG";
  bg.fill = bgColor;

  if(layout == "center" && fadeBackground){
    const {
      fadeTo = "#F8F7F7",
      softFade = false,
      slant = "down",
    } = fadeBackground;

    const fadeToColor = fadeTo == "transparent" ? transparentColor : new Color(fadeTo);
    const gradient = new LinearGradient();
    let endPoints = [0.5, 0.56, 0.5, 0.73];
    
    if(slant == "up") endPoints = [0.5, 0.56, 0.516, 0.759];
    else if(slant == "down") endPoints = [0.5, 0.56, 0.491, 0.762];
    
    gradient.setEndPoints(...endPoints);
    
    gradient.colorStops = [
        { color: bgColor, stop: 0 },
        ...(softFade ? [] : [
          { color: bgColor, stop: 0.39 },
          { color: fadeToColor, stop: 0.4 },
        ]),
        { color: fadeToColor, stop: 1 }
    ];

    bg.fill = gradient;
  }

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
    width: props.theme.width,
    height: 620,
  };

  const [bg, container] = createSectionBackground({ ...props, ...props.theme });
  props.container = container;

  let mediaText; 
  const flipX = props.theme.layout == "flip-x";
  const center = props.theme.layout == "center";
  const overlay = props.theme.layout == "overlay";

  const noText = !props.heading && !props.subHeading;
  const minTextWidth = center || overlay ? 900 : 300;
  const maxTextWidth = center || overlay ? 1300 : 600;
  const fullWidthImage = center && props.theme.image.fullWidth;

  const media = createMedia({
    ...props, 
    ...(noText || center || overlay ? {
      large: noText || center,
      theme: {
        ...props.theme,
        image: {
          ...props.theme.image,
          width: overlay || fullWidthImage ? props.theme.width : 1200, 
          height: overlay ? props.height : fullWidthImage ? props.theme.image.height : 600,
          roundness: overlay || fullWidthImage ? "none" : props.theme.image.roundness
        },
      }
    } : {})
  });

  if(!noText){
    // clamp
    props.theme.heading.width = Math.max(minTextWidth, Math.min(props.theme.heading.width, maxTextWidth));
    props.theme.subHeading.width = Math.max(minTextWidth, Math.min(props.theme.subHeading.width, maxTextWidth));
    mediaText = createMediaText({
      ...props,
      center: center || overlay,
    });
    selection.items = [media, mediaText, container];

    if(center || overlay){
      commands.alignTop();
      commands.alignHorizontalCenter();

      if(center){
        media.moveInParentCoordinates(0, mediaText.localBounds.height + 60);
        container.resize(container.localBounds.width, media.localBounds.height + mediaText.localBounds.height + 60);
      }
      else{
        const textNegativeMargin = props.playButton ? -30 : 30;
        mediaText.moveInParentCoordinates(0, (media.localBounds.height / 2) - (mediaText.localBounds.height / 2) - textNegativeMargin);
        container.resize(container.localBounds.width, media.localBounds.height);

        if(props.playButton){
          getGroupChildByName(media, "playButton", (playButton) => {
            if(playButton) playButton.moveInParentCoordinates(0, mediaText.localBounds.y - playButton.localBounds.height - 30);
          });
        }
      }
    }
    else{
      container.resize(container.localBounds.width, Math.max(media.localBounds.height, mediaText.localBounds.height));

      // const textNegativeMargin = props.theme.textNegativeMargin;
      const textNegativeMargin = props.theme.image.height == 464 ? 30 : 16;
      const { x, y } = container.topLeftInParent;
      const leftSlot = {x, y};
      const mediaRight = container.localBounds.width - media.localBounds.width + x;
      const textRight =  x + media.localBounds.width + 75;
      const rightSlot = {
        x: flipX ? textRight : mediaRight,
        y
      };
      
      placeInParent(mediaText, flipX ? rightSlot : leftSlot);
      placeInParent(media, flipX ? leftSlot : rightSlot);

      commands.alignVerticalCenter();
      mediaText.moveInParentCoordinates(0, -textNegativeMargin);
    }
    commands.group();
  }
  else{
    container.resize(container.localBounds.width, media.localBounds.height);
    selection.items = [media, container];
    commands.alignHorizontalCenter();
    commands.group();
  }

  const content = selection.items[0];
  selection.items = [bg, content];
  commands.alignHorizontalCenter();
  commands.group();

  const mediaSection = selection.items[0];
  const horizontalPadding = overlay || fullWidthImage ? 0 : (props.theme.width - container.localBounds.width) / 2;
  const verticalPadding = overlay || noText ? 0 : props.theme.verticalPadding;

  mediaSection.layout = {
    type: SceneNode.LAYOUT_PADDING,
    padding: {
      background: bg,
      values: {
        left: horizontalPadding, right: horizontalPadding, 
        top: verticalPadding, 
        bottom: fullWidthImage ? 0 : verticalPadding, 
      },
    },
  }

  mediaSection.resize(props.width, mediaSection.localBounds.height);

  return mediaSection;
}

module.exports = assembleMediaSection;
