const { selection, Color, SceneNode } = require("scenegraph");
const commands = require("commands");
const { insertNode, createText } = require("../../utils");
const navButtonsComponent = require("../Navbar/components/buttons");
const defaultSectionTextProps = require("./defaultProps");
  
  function createSectionText(userProps) {
    const {
      heading,
      subHeading,
      buttons,
      theme
    } = {...defaultSectionTextProps, ...userProps}
    let buttonsNode;
  
    if(buttons && buttons.split(",").length){
      const icon = theme.buttons.icons ? "chevron-right" : "";
      theme.buttons.mainButton.icon = icon;
      theme.buttons.secondaryButton.icon = icon;
  
      buttonsNode = navButtonsComponent(
        {
          color: theme.color,
          themeColor: theme.themeColor,
          ...theme.buttons,
        },
        buttons
      );
    }
  
    const subHeadingNode = createText(subHeading, {
      align: theme.center ? "center" : "left",
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
      align: theme.center ? "center" : "left",
      width: theme.heading.width,
      fill: new Color(theme.color),
      fontSize: theme.heading.size == "md" ? 36 : 48,
      lineSpacing: theme.heading.size == "md" ? 50 : 62,
      fontFamily,
      fontStyle: "Bold",
    });
  
    insertNode(headingNode);
  
    selection.items = [headingNode, subHeadingNode];
  
    if(theme.center) commands.alignHorizontalCenter();
    else commands.alignLeft();
  
    commands.group();
    
    const headingAndSubHeading = selection.items[0];
    headingAndSubHeading.name = "FernSectionText";
  
    if (headingAndSubHeading.children.length > 1) {
      headingAndSubHeading.layout = {
        type: SceneNode.LAYOUT_STACK,
        stack: {
          orientation: SceneNode.STACK_VERTICAL,
          spacings: 20,
        },
      };
    }
  
    let mediaTextElement;
  
    if(buttonsNode){
      selection.items = [headingAndSubHeading, buttonsNode];
      
      if(theme.center) commands.alignHorizontalCenter();
      else commands.alignLeft();
      
      commands.group();
    
      mediaTextElement = selection.items[0];
      if (mediaTextElement.children.length > 1) {
        mediaTextElement.layout = {
          type: SceneNode.LAYOUT_STACK,
          stack: {
            orientation: SceneNode.STACK_VERTICAL,
            spacings: 30,
          },
        };
      }
    }
    else {
      mediaTextElement = headingAndSubHeading;
    }
  
    mediaTextElement.name = "FernMediaText";
    return mediaTextElement;
  }
  
  module.exports = createSectionText;
  