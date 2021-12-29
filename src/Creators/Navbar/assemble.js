const { selection, Color, Rectangle, Shadow } = require("scenegraph");
const commands = require("commands");
const { placeInParent, createBorder, insertNode } = require("../../utils");
const createNavSlot = require("./createSlot");

function createNavBackground({ width, height, color, shadow }){
    const bg = new Rectangle();
    bg.resize(width, height);
    bg.fill = new Color(color);
    bg.strokeEnabled = false;
    bg.name = "BG";
    
    insertNode(bg);

    if(shadow)
        bg.shadow = new Shadow(0, 1, 4, new Color("#000000", 0.16), true);
    else{
        const borderNode = createBorder({ width });
        borderNode.opacity = 0.1;
        insertNode(borderNode);

        selection.items = [bg, borderNode];
        commands.group();
        bg = selection.items[0];
        placeInParent(borderNode, {x: 0, y: height});
    }

    return bg;
}

function assembleNavbar(props = {}, images){
    props = {
        ...props, ...images,
        width: 1600, height: 70,
    };

    const bg = createNavBackground(props);
    props.bg = bg;

    const leftSlot = createNavSlot(props, ["logo", "menu"]);
    leftSlot.name = "FernNavLeftSlot";

    const rightSlot = createNavSlot({ ...props, alignment: "right" }, ["socials", "dp"]);
    rightSlot.name = "FernNavRightSlot";

    selection.items = [bg, leftSlot, rightSlot];
    commands.group();

    return selection.items[0];
}

module.exports = assembleNavbar;