const { selection } = require("scenegraph");
const viewport = require("viewport");

const {
  editDom,
  placeInParent,
  tagNode,
  getAssetsByType,
} = require("../../utils");

const defaultNavbarProps = require("./defaultProps");
const assembleNavbar = require("./assemble");
const getNavbarComponent = require("./getNavbarComponent");

async function Navbar(userProps) {
  let props = {
    ...defaultNavbarProps,
    ...(userProps || {}),
  };

  const [logos, dps] = await Promise.all([
    getAssetsByType("logo"),
    getAssetsByType("dp"),
  ]);

  let logoImage = logos.logo3;
  let dpImage = dps.dp1;

  try {
    const oldNavbar = userProps ? selection.items[0] : null;
    if (oldNavbar) {
      if (props.logo == "custom") {
        const logoNode = getNavbarComponent(oldNavbar, "logo");
        logoImage = logoNode && logoNode.fill ? logoNode.fill : logoImage;
      }
      if (props.dp == "custom") {
        const dpNode = getNavbarComponent(oldNavbar, "dp");
        dpImage = dpNode && dpNode.fill ? dpNode.fill : dpImage;
      }
    }

    editDom(() => {
      try {
        const navbar = assembleNavbar(props, {
          logoImage,
          dpImage,
          ...logos,
          ...dps
        });
        navbar.name = "FernNavbar";

        tagNode(navbar, { type: "Navbar", ...props });

        placeInParent(navbar, { x: -30, y: 0 });
        if (oldNavbar) oldNavbar.removeFromParent();
        else
          viewport.scrollIntoView(navbar);

        // if (oldNavbar) {
        //   placeInParent(navbar, oldNavbar.topLeftInParent);
        //   oldNavbar.removeFromParent();
        // } else placeInParent(navbar, { x: -30, y: 0 });
      } catch (error) {
        console.log("Error creating navbar: ", error);
      }
    });
  } catch (error) {
    console.log("Error creating card: ", error);
  }
}

module.exports = Navbar;
