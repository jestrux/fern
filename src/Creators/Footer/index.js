const { selection } = require("scenegraph");

const {
  editDom,
  placeInParent,
  tagNode,
  getAssetsByType,
} = require("../../utils");

const defaultFooterProps = require("./defaultProps");
const assembleFooter = require("./assemble");
const getFooterComponent = require("./getFooterComponent");

async function Footer(userProps) {
  let props = {
    ...defaultFooterProps,
    ...(userProps || {}),
  };

  const logos = await getAssetsByType("logo");
  let logoImage = logos.logo4;

  try {
    const oldFooter = userProps ? selection.items[0] : null;
    if (oldFooter) {
      if (props.logo == "custom") {
        const logoNode = getFooterComponent(oldFooter, "logo");
        logoImage = logoNode && logoNode.fill ? logoNode.fill : logoImage;
      }
    }

    editDom(() => {
      try {
        const footer = assembleFooter(props, { logoImage, ...logos });
        footer.name = "FernFooter";

        tagNode(footer, { type: "Footer", ...props });

        if (oldFooter) {
          placeInParent(footer, oldFooter.topLeftInParent);
          oldFooter.removeFromParent();
        } else placeInParent(footer, { x: 0, y: 0 });
      } catch (error) {
        console.log("Error creating footer: ", error);
      }
    });
  } catch (error) {
    console.log("Error creating card: ", error);
  }
}

module.exports = Footer;
