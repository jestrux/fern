const { selection } = require("scenegraph");

const {
  editDom,
  placeInParent,
  tagNode,
  getAssetsByType,
  getNodeTag,
} = require("../../utils");

const defaultFooterProps = require("./defaultProps");
const assembleFooter = require("./assemble");
const getFooterComponent = require("./getFooterComponent");

async function Footer(userProps, {fromPreset = false} = {}) {
  let props = {
    ...defaultFooterProps,
    ...(userProps || {}),
  };

  const logos = await getAssetsByType("logo");
  const logoIndex = props.aboutSection && props.aboutSection.logo && props.aboutSection.logo != "custom" ? props.aboutSection.logo : 4;
  let logoImage = logos['logo' + logoIndex];
  let logoSearchQuery;

  try {
    const oldFooter = userProps && !fromPreset ? selection.items[0] : null;
    if(props.aboutSection && props.aboutSection.logo) {
      if (oldFooter) {
        if(props.aboutSection.logo == "custom") {
          const logoNode = getFooterComponent(oldFooter, "logo");
          if(logoNode){
            logoImage = logoNode.fill;
            // const imageProps = getNodeTag(logoNode);
            // logoSearchQuery = imageProps.searchQuery;
          }
        }
      }
      
      props.aboutSection.logo = "custom";
    }

    editDom(() => {
      try {
        const footer = assembleFooter(props, { 
          logoImage, logoSearchQuery
        });
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
