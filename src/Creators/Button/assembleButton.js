const { selection, SceneNode } = require("scenegraph");
const commands = require("commands");

function assembleButton(buttonComponents, buttonProps){
    const [bgRectangle, buttonText, iconNode] = buttonComponents;
    
    if(iconNode){
        if(buttonText){
            selection.items = [iconNode, buttonText];
            commands.alignLeft();
            commands.alignVerticalCenter();
            commands.group();
    
            const buttonContent = selection.items[0];
            buttonText.moveInParentCoordinates(buttonProps.iconSize + 10, 0);
    
            selection.items = [bgRectangle, buttonContent];
            commands.alignHorizontalCenter()
            commands.alignVerticalCenter()
            commands.group();
    
            buttonText.moveInParentCoordinates(0, -0.5);
        }
        else{
            selection.items = [bgRectangle, iconNode];
            commands.group();
        }
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

    return button;
}

module.exports = assembleButton;