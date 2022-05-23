const { selection } = require("scenegraph");
const viewport = require("viewport");

const {
  editDom,
  placeInParent,
  tagNode,
  getAssetsByType,
  getNodeTag,
} = require("../../utils");

const defaultNavbarProps = require("./defaultProps");
const assembleNavbar = require("./assemble");
const getNavbarComponent = require("./getNavbarComponent");

async function Navbar(userProps, {fromPreset = false} = {}) {
  let props = {
    ...defaultNavbarProps,
    ...(userProps || {}),
  };

  const [logos, dps] = await Promise.all([
    getAssetsByType("logo"),
    getAssetsByType("dp"),
  ]);

  const leftSlotLogoIndex = props.leftSlot.logo ? props.leftSlot.logo : 4;
  let leftLogoImage = logos['logo' + leftSlotLogoIndex];
  
  const middleSlotLogoIndex = props.middleSlot.logo ? props.middleSlot.logo : 4;
  let middleLogoImage = logos['logo' + middleSlotLogoIndex];
  // let middleLogoImage = logos.logo4;

  let dpImage = dps.dp1;
  let leftLogoSearchQuery, middleLogoSearchQuery, dpSearchQuery;

  try {
    const oldNavbar = userProps && !fromPreset ? selection.items[0] : null;
    if (oldNavbar) {
      // const leftLogoNode = getNavbarComponent(oldNavbar, "leftLogo");
      // if(leftLogoNode){
      //   leftLogoImage = leftLogoNode.fill;
      //   const imageProps = getNodeTag(leftLogoNode);
      //   leftLogoSearchQuery = imageProps.searchQuery;
      // }

      // const middleLogoNode = getNavbarComponent(oldNavbar, "middleLogo");
      // if(middleLogoNode) {
      //   middleLogoImage = middleLogoNode.fill;
      //   const imageProps = getNodeTag(middleLogoNode);
      //   middleLogoSearchQuery = imageProps.searchQuery;
      // }

      const dpNode = getNavbarComponent(oldNavbar, "dp");
      if(dpNode) {
        dpImage = dpNode.fill;
        const imageProps = getNodeTag(dpNode);
        dpSearchQuery = imageProps.searchQuery;
      }
    }

    editDom(() => {
      try {
        const navbar = assembleNavbar(props, {
          leftLogoImage,
          middleLogoImage,
          leftLogoSearchQuery,
          middleLogoSearchQuery,
          dpImage,
          dpSearchQuery
        });
        navbar.name = "FernNavbar";

        tagNode(navbar, { type: "Navbar", ...props });

        placeInParent(navbar, { x: -30, y: 0 });
        if (oldNavbar) oldNavbar.removeFromParent();
        else
          viewport.scrollIntoView(navbar);
      } catch (error) {
        console.log("Error creating navbar: ", error);
      }
    });
  } catch (error) {
    console.log("Error creating card: ", error);
  }
}

module.exports = Navbar;
