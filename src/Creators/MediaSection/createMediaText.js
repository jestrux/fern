const {
  selection,
  Color,
  SceneNode
} = require("scenegraph");
const commands = require("commands");
const { insertNode, createText } = require("../../utils");
const navButtonsComponent = require("../Navbar/components/buttons");

function createMediaText({
  heading = "Supporting mothers in their time of need",
  subHeading = "Our mission is to make sure we keep track of all mothers in the neighborhood who are unable to fend for themselves and give the support they need.",
  buttons = "More about us, See beneficiaries",
  themeColor,
  theme,
}) {
  let buttonsNode;

  if(buttons && buttons.split(",").length){
    const icon = theme.buttons.icons ? "chevron-right" : "";
    theme.buttons.mainButton.icon = icon;
    theme.buttons.secondaryButton.icon = icon;

    buttonsNode = navButtonsComponent(
      {
        color: theme.color,
        themeColor,
        ...theme.buttons,
      },
      buttons
    );
  }

  const subHeadingNode = createText(subHeading, {
    width: theme.subHeading.width,
    fill: new Color(theme.color),
    fontSize: theme.subHeading.size == "sm" ? 16 : 22,
    lineSpacing: theme.subHeading.size == "sm" ? 30 : 40,
    fontStyle: "Regular",
  });

  insertNode(subHeadingNode);

  const fontFamily = {
    "sans": theme.heading.brazen ? "Poppins" : "Helvetica Neue",
    "serif": theme.heading.brazen ? "Rockwell" : "Pt Serif",
    "quirky": theme.heading.brazen ? "Gill Sans" : "Skia",
    "fancy": "Didot",
  }[theme.heading.font || "sans"];

  const headingNode = createText(heading, {
    width: theme.heading.width,
    fill: new Color(theme.color),
    fontSize: theme.heading.size == "md" ? 36 : 48,
    lineSpacing: theme.heading.size == "md" ? 50 : 62,
    fontFamily,
    fontStyle: "Bold",
  });

  insertNode(headingNode);

  selection.items = [headingNode, subHeadingNode];
  commands.alignLeft();
  commands.group();

  const headingAndSubHeading = selection.items[0];
  if (headingAndSubHeading.children.length > 1) {
    headingAndSubHeading.layout = {
      type: SceneNode.LAYOUT_STACK,
      stack: {
        orientation: SceneNode.STACK_VERTICAL,
        spacings: 20,
      },
    };
  }

  selection.items = [headingAndSubHeading, buttonsNode];
  commands.alignLeft();
  commands.group();

  const mediaTextElement = selection.items[0];
  if (mediaTextElement.children.length > 1) {
    mediaTextElement.layout = {
      type: SceneNode.LAYOUT_STACK,
      stack: {
        orientation: SceneNode.STACK_VERTICAL,
        spacings: 30,
      },
    };
  }
  mediaTextElement.name = "FernMediaText";

  return mediaTextElement;
}

module.exports = createMediaText;
