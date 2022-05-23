const { selection, Color, SceneNode } = require("scenegraph");
const commands = require("commands");
const { insertNode, createText, getContainerWidth } = require("../../utils");
const navButtonsComponent = require("../Navbar/components/buttons");
const defaultSectionTextProps = require("./defaultProps");
const createChecklist = require("../MediaSection/createChecklist");
  
  function createSectionText(userProps) {
    const props = {...defaultSectionTextProps, ...(userProps || {})};
    const {
      heading,
      subHeading,
      checklist,
      buttons,
      theme,
    } = props;
    const headingSubHeadingSpacing = theme.layout == "horizontal" 
      ? userProps.headingSubHeadingSpacing || 12 
      : theme.heading.size == "lg" 
        ? theme.subHeading.size == "lg" ? 24 : 20
        : theme.subHeading.size == "lg" ? 24 : 16;
    const centerContent = theme.layout == "center";
    let buttonsNode, checklistNode, subHeadingNode, headingNode, headingAndSubHeading;
  
    if(buttons && buttons.split(",").length){
      const icon = theme.buttons.icons ? "chevron-right" : "";
      theme.buttons.mainButton.icon = icon;
      theme.buttons.secondaryButton.icon = icon;
      const [mainButton, secondaryButton] = (buttons || "").split(",");
  
      buttonsNode = navButtonsComponent(
        {
          color: theme.color,
          themeColor: theme.themeColor,
          ...theme.buttons,
          reversed: secondaryButton ? !theme.buttons.reversed : theme.buttons.reversed
        },
        buttons
      );

      buttonsNode.name = "FernSectionButtons";
    }

    if(checklist)
      checklistNode = createChecklist(props);

    if(subHeading){
      const [fontSize, lineSpacing] = {
        "sm": [16, 28],
        "md": [22, 36],
        "lg": [31, 44],
      }[theme.subHeading.size || "sm"];

      subHeadingNode = createText(subHeading, {
        align: centerContent ? "center" : "left",
        width: theme.subHeading.width,
        fill: new Color(theme.subHeading.color || theme.color),
        fontSize,
        lineSpacing,
        fontStyle: "Regular",
      });
    
      insertNode(subHeadingNode);
    }

    if(heading){
      const fontFamily = {
        "sans": theme.heading.brazen ? "Poppins" : "Helvetica Neue",
        "serif": theme.heading.brazen ? "Rockwell" : "Pt Serif",
        "quirky": theme.heading.brazen ? "Gill Sans" : "Skia",
        "fancy": "Didot",
      }[theme.heading.font || "sans"];
    
      headingNode = createText(heading, {
        align: centerContent ? "center" : "left",
        width: theme.heading.width,
        fill: new Color(theme.heading.color || theme.color),
        fontSize: theme.heading.size == "md" ? 36 : 48,
        lineSpacing: theme.heading.size == "md" ? 50 : 62,
        fontFamily,
        fontStyle: "Bold",
      });

      insertNode(headingNode);
    }

    if(heading && subHeading) {
      selection.items = [headingNode, subHeadingNode];
      if(centerContent) commands.alignHorizontalCenter();
      else commands.alignLeft();
      commands.group();

      headingAndSubHeading = selection.items[0];
      headingAndSubHeading.name = "FernSectionText";
    
      headingAndSubHeading.layout = {
        type: SceneNode.LAYOUT_STACK,
        stack: {
          orientation: SceneNode.STACK_VERTICAL,
          spacings: headingSubHeadingSpacing,
        },
      };
    }
    else if(heading)
      headingAndSubHeading = headingNode;
    else if(subHeading)
      headingAndSubHeading = headingNode;

    let sectionTextElement;

    if(checklistNode){
      if(!headingAndSubHeading)
        headingAndSubHeading = checklistNode;
      else {
        selection.items = [headingAndSubHeading, checklistNode];
        if(centerContent) commands.alignHorizontalCenter();
        else commands.alignLeft();
      
        commands.group();
        headingAndSubHeading = selection.items[0];
        headingAndSubHeading.layout = {
          type: SceneNode.LAYOUT_STACK,
          stack: {
            orientation: SceneNode.STACK_VERTICAL,
            spacings: 36,
          },
        };
      }
    }
  
    if(buttonsNode){
      if(headingAndSubHeading) {
        selection.items = [headingAndSubHeading, buttonsNode];
        
        if(centerContent) commands.alignHorizontalCenter();
        else commands.alignLeft();

        commands.group();
        sectionTextElement = selection.items[0];

        if(theme.layout == "horizontal"){
          selection.items = [headingAndSubHeading, buttonsNode];
          if(theme.buttons.placement == "bottom")
            commands.alignBottom();
          else
            commands.alignVerticalCenter();
          const containerWidth = getContainerWidth(theme.width);
          buttonsNode.moveInParentCoordinates(containerWidth, 0);
        }
        else {
          if (sectionTextElement.children.length > 1) {
            sectionTextElement.layout = {
              type: SceneNode.LAYOUT_STACK,
              stack: {
                orientation: SceneNode.STACK_VERTICAL,
                spacings: 30,
              },
            };
          }
        }
      }
      else {
        sectionTextElement = buttonsNode;
      }
    }
    else
      sectionTextElement = headingAndSubHeading;
  
    sectionTextElement.name = "FernSectionText";
    return sectionTextElement;
  }
  
  module.exports = createSectionText;
  