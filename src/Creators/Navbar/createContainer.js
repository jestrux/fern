const { selection, Color, Rectangle, ImageFill, Shadow } = require("scenegraph");
const commands = require("commands");
const { placeInParent, createBorder, insertNode } = require("../../utils");

function createNavContainer(props = {}, logoImage){
    let {
        color = "white",
        shadow = true,
    } = props || {};

    let bgRectangle, logo, borderNode;

    bgRectangle = new Rectangle();
    bgRectangle.resize(1600, 70);
    bgRectangle.fill = new Color(color);
    bgRectangle.strokeEnabled = false;
    bgRectangle.name = "BG";
    if(!shadow){
        borderNode = createBorder({
            top: 71,
            width: 1600
        });
        borderNode.opacity = 0.1;
    }
    else{
        bgRectangle.stroke = new Color(color);
        bgRectangle.shadow = new Shadow(0, 1, 4, new Color("#000000", 0.16), true);
    }
    insertNode(bgRectangle);
    
    logo = new Rectangle();
    logo.resize(163, 25);
    logo.fill = new ImageFill(logoImage);
    insertNode(logo);
    
    selection.items = [bgRectangle];
    commands.group();
    const navBg = selection.items[0];

    if(borderNode){
        navBg.addChild(borderNode);
        placeInParent(borderNode, {x: 0, y:70});
    }

    return [navBg, logo];
}

module.exports = createNavContainer;