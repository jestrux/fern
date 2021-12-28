const { PLUGIN_ID } = require("../../constants");
const { editDom, placeInParent, createIcon } = require("../../utils");
const tinyColor = require("../../utils/tinycolor");
const iconData = require("../../data/icons");
const buttonSizeMap = require("./buttonSizeMap");
const buttonRoundnessMap = require("./buttonRoundnessMap");

async function Button(props){
    let {
        icon = null,
        text="Get Started",
        size = "lg",
        color = "#333",
        shadow = false, 
        outlined = false,
        roundness = "full",
    } = props || {};

    if(!text.length) text = "Submit";
    
    const { Color, Rectangle, Shadow, Text, SceneNode } = require("scenegraph");
    const commands = require("commands");

    const buttonProps = buttonSizeMap[size];
    const iconSize = buttonProps.fontSize * 0.8;

    const addText = (selection) => new Promise((res) => {
        let bgRectangle, buttonText;

        bgRectangle = new Rectangle();
        bgRectangle.resize(...buttonProps.size);
        bgRectangle.fill = new Color(color, outlined ? 0 : 1);
        bgRectangle.strokeEnabled = true;
        bgRectangle.strokeWidth = 1.5;

        bgRectangle.setAllCornerRadii(buttonRoundnessMap[roundness]);
        bgRectangle.name = "BG";
        if(!shadow)
            bgRectangle.stroke = new Color(color);
        else{
            bgRectangle.stroke = new Color(color);
            bgRectangle.shadow = new Shadow(0, 3, 6, new Color("#000000", 0.16), true);
        }
        selection.insertionParent.addChild(bgRectangle);

        // TEXT
        buttonText = new Text();
        buttonText.text = text;
        let textColor = "#FFF";
        if(outlined)
            textColor = color;
        else
            textColor = tinyColor(color).isLight() ? "black" : "white";

        buttonText.fill = new Color(textColor);
        buttonText.fontFamily = "Helvetica Neue";
        buttonText.fontSize = buttonProps.fontSize;
        buttonText.fontStyle = buttonProps.fontStyle;
        
        selection.insertionParent.addChild(buttonText);

        let content;

        if(icon && iconData[icon]){
            const iconNode = createIcon(iconData[icon], {fill: textColor, size: iconSize});
            selection.insertionParent.addChild(iconNode);
            content = [bgRectangle, buttonText, iconNode];
        }
        else
            content = [bgRectangle, buttonText];
        
        res(content);
    });

    try {
        editDom(async (selection) => {
            const oldButton = props ? selection.items[0] : null;

            try {
                const group = await addText(selection);
                const [bgRectangle, buttonText, iconNode] = group;

                if(iconNode){
                    selection.items = [iconNode, buttonText];
                    commands.alignLeft();
                    commands.alignVerticalCenter();
                    commands.group();

                    const buttonContent = selection.items[0];
                    buttonText.moveInParentCoordinates(iconSize * 1.5, 0);

                    selection.items = [bgRectangle, buttonContent];
                    commands.alignHorizontalCenter()
                    commands.alignVerticalCenter()
                    commands.group();
                    buttonText.moveInParentCoordinates(0, -0.5);
                }
                else{
                    selection.items = [bgRectangle, buttonText];
                    commands.alignHorizontalCenter()
                    commands.alignVerticalCenter()
                    commands.group();
                }

                const button = selection.items[0];
                button.layout = {
                    type: SceneNode.LAYOUT_PADDING,
                    padding: {
                        background: bgRectangle,
                        values: buttonProps.padding,
                    }
                };
                button.name = "FernButton";

                const data = { 
                    type: "Button", 
                    size,
                    color,
                    shadow,
                    outlined,
                    roundness,
                    icon,
                    text,
                };

                button.sharedPluginData.setItem(PLUGIN_ID, "richData", JSON.stringify(data));

                if(oldButton){
                    placeInParent(button, oldButton.topLeftInParent);
                    oldButton.removeFromParent();
                }
                else
                    button.moveInParentCoordinates(30, 30);
            } catch (error) {
                console.log("Error creating button: ", error);
            }
        });
    } catch (error) {
        console.log("Error creating card: ", error);
    }
}

module.exports = Button;