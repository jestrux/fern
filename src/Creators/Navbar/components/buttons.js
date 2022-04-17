const { SceneNode, selection } = require("scenegraph");
const commands = require("commands");

const createButton = require("../../Button/createButton");

function navButtonsComponent({color, activeColor,
    buttons = ["Sign In", "Get Started"],
    mainButtonStyle = "fill"
}){
    let button1, button2;

    if(buttons.length == 2){
        button1 = createButton({
            text: buttons[1],
            size: "sm",
            color: activeColor || color,
            outlined: mainButtonStyle == "outline",
            roundness: "md"
        });
    
        button2 = createButton({
            text: buttons[0],
            size: "sm",
            color: color,
            link: true,
            underline: true,
        });
    }
    else{
        button1 = createButton({
            text: buttons[0],
            size: "sm",
            color: activeColor || color,
            outlined: mainButtonStyle == "outline",
            roundness: "md"
        });
    }
    
    selection.items = buttons.length == 2 ? [button1, button2] : [button1];
    commands.alignVerticalCenter();
    commands.group();
    
    const buttonNodes = selection.items[0];
    buttonNodes.name = "FernNavButtons";

    if(buttons.length == 2){
        buttonNodes.layout = {
            type: SceneNode.LAYOUT_STACK,
            stack: {
                orientation: SceneNode.STACK_HORIZONTAL,
                spacings: 4
            }
        };
    }

    return buttonNodes;
}

module.exports = navButtonsComponent;