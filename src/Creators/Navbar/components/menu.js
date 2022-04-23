const { selection, Color, Rectangle, Text, SceneNode } = require("scenegraph");
const commands = require("commands");
const {
  getPadding,
  getGroupChildByName,
  createBorder,
  insertNode,
  placeInParent,
  createText,
} = require("../../../utils");

function createLink(props) {
  const linkBg = new Rectangle();
  linkBg.resize(90, 70);
  linkBg.fill = new Color("white", 0);
  linkBg.strokeEnabled = false;
  linkBg.name = "FernNavLinkBg";
  insertNode(linkBg);

  const linkText = createText("Android 12", {
    name: "FernNavLinkText",
    fill: new Color(props.color, props.inActiveOpacity),
    fontSize: 16,
    type: Text.POINT,
    ...(props.theme && props.theme.text ? props.theme.text : {}),
  });

  insertNode(linkText);

  selection.items = [linkBg, linkText];
  commands.alignVerticalCenter();
  commands.alignHorizontalCenter();
  commands.group();

  const link = selection.items[0];

  link.layout = {
    type: SceneNode.LAYOUT_PADDING,
    padding: {
      background: linkBg,
      values: getPadding(10, 26),
    },
  };

  return link;
}

function changeLinkText(link, text = "Link", cb = () => {}) {
  if (!link) return;

  getGroupChildByName(link, "FernNavLinkText", linkText => {
    if (linkText) linkText.text = text.length ? text : "Link";
    cb();
  });
}

function createNavActiveIndicator({
  shadow = false,
  showIndicator,
  activeLink,
  color,
  themeColor,
  navMenu,
}) {
  getGroupChildByName(navMenu, activeLink, navActiveLink => {
    try {
      const { width, height } = navActiveLink.localBounds;
      getGroupChildByName(navActiveLink, "FernNavLinkText", linkText => {
        linkText.fill = new Color(themeColor || color);
      });

      if (showIndicator) {
        const navActiveIndicator = createBorder({
          width: width,
          thickness: 2,
          color: themeColor || color,
        });

        selection.items = [navMenu];
        commands.group();
        navMenu = selection.items[0];
        navMenu.addChild(navActiveIndicator);
        navMenu.name = "FernNavMenu";

        placeInParent(navActiveIndicator, {
          x: navActiveLink.topLeftInParent.x,
          y: height - (shadow ? 8 : 8.75),
        });
      }
    } catch (error) {
      console.log("Error creating nav indicator: ", error);
    }
  });

  return navMenu;
}

function navMenuComponent(props = {}, {links = "Home, About", activeLink}) {
  links = links.split(",").map(link => link.trim());
  const linkItems = [...links];
  linkItems.reverse();

  try {
    const linkNode = createLink(props);
    changeLinkText(linkNode, linkItems[0]);
    linkNode.name = linkItems[0];
    const navLinkNodes = [linkNode];

    for (let i = 1; i < links.length; i++) {
      commands.duplicate();
      const newLink = selection.items[0];
      selection.items = [newLink];
      navLinkNodes.push(newLink);
      newLink.name = linkItems[i];

      changeLinkText(newLink, linkItems[i]);
    }

    selection.items = navLinkNodes;
    commands.group();
    let navMenu = selection.items[0];

    if(links.length > 1){
      navMenu.layout = {
        type: SceneNode.LAYOUT_STACK,
        stack: {
          orientation: SceneNode.STACK_HORIZONTAL,
          spacings: 30,
        },
      };
    }

    navMenu = selection.items[0];

    if (links.includes(activeLink)) {
      navMenu = createNavActiveIndicator({
        ...props,
        navMenu,
        activeLink,
      });
    }

    return navMenu;
  } catch (error) {
    console.log("Error creating nav links: ", error);
  }
}

module.exports = navMenuComponent;
