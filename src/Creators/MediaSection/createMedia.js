const {
  Color,
  Rectangle,
  ImageFill,
  Shadow
} = require("scenegraph");
const commands = require("commands");
const { insertNode } = require("../../utils");

function getShadow({ size, placement, color } = {}){
  const shadowPropsMap = {
    "sm": [5, 15, 30],
    "md": [10, 22, 60],
    "lg": [15, 30, 90],
  };

  if(!size || !Object.keys(shadowPropsMap).includes(size))
      size = "sm";

  const shadowProps = shadowPropsMap[size];
  let shadowOffsets = shadowProps.slice(0,2);
  const shadowBlur = shadowProps[2];

  if(placement.indexOf("-L") != -1)
      shadowOffsets[0]*=-1;

  console.log("Shadow offsets: ", shadowOffsets);
  return new Shadow(...shadowOffsets, shadowBlur, new Color(color, 0.25), true);
}

function createMedia({
  roundness = "sm",
  shadow,
  images,
  image,
  theme = {
    media: {}
  }
}) {
  const {width, height} = theme.media;
  const roundnessMap = {
    "none": 0,
    "sm": 6,
    "md": 12,
    "lg": 20
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

  if(shadow) imageNode.shadow = getShadow(shadow);

  return imageNode;
}

module.exports = createMedia;
