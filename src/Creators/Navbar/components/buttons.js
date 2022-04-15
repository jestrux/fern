const { SceneNode, selection } = require("scenegraph");
const commands = require("commands");

const createButton = require("../../Button/createButton");

function navButtonsComponent({color, activeColor}){
    const button1 = createButton({
        text: "Get Started",
        size: "md",
        color: activeColor,
        roundness: "md"
    });

    const button2 = createButton({
        text: "Sign In",
        size: "md",
        color: color,
        link: true,
        underline: true,
    });
    
    selection.items = [button1, button2];
    commands.alignVerticalCenter();
    commands.group();
    
    const buttons = selection.items[0];
    buttons.name = "FernNavButtons";
    buttons.layout = {
        type: SceneNode.LAYOUT_STACK,
        stack: {
            orientation: SceneNode.STACK_HORIZONTAL,
            spacings: 6
        }
    };

    return buttons;
}

module.exports = navButtonsComponent;