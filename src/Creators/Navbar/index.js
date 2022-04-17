const { selection } = require("scenegraph");

const {
  editDom,
  getAssetFileFromPath,
  placeInParent,
  tagNode,
} = require("../../utils");

const defaultNavbarProps = require("./defaultProps");
const assembleNavbar = require("./assemble");
const getNavbarComponent = require("./getNavbarComponent");

async function Navbar(userProps) {
  let props = {
    ...defaultNavbarProps,
    ...(userProps || {}),
  };

  // let logoImage = await getAssetFileFromPath(props.color == "white" ? "images/android-white.png" : "images/android.png");
  const [logo1, logo2, logo3, dp] = await Promise.all([
    getAssetFileFromPath("images/logo-android-white.png"),
    getAssetFileFromPath("images/logo-paperless.png"),
    getAssetFileFromPath("images/logo-darling-brew.png"),
    getAssetFileFromPath("images/dp-female-white.jpg"),
  ]);

  const imageMap = {
    logo1,
    logo2,
    logo3,
    dp,
  };
  let logoImage = imageMap[props.logo] || logo3;
  let dpImage = imageMap[dp];

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
        });
        navbar.name = "FernNavbar";

        tagNode(navbar, { type: "Navbar", ...props });

        if (oldNavbar) {
          placeInParent(navbar, oldNavbar.topLeftInParent);
          oldNavbar.removeFromParent();
        } else placeInParent(navbar, { x: 0, y: 0 });
      } catch (error) {
        console.log("Error creating navbar: ", error);
      }
    });
  } catch (error) {
    console.log("Error creating card: ", error);
  }
}

module.exports = Navbar;
