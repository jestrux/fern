const { selection, Color, Rectangle, Shadow } = require("scenegraph");
const commands = require("commands");
const { placeInParent, createBorder, insertNode } = require("../../utils");
const createNavSlot = require("./createSlot");

function createNavBackground({ width, height, backgroundColor, color, border, shadow }){
    console.log("BG Color: ", backgroundColor, backgroundColor == "transparent");
    let bg = new Rectangle();
    bg.resize(width, height);
    bg.fill = backgroundColor == "transparent" ? new Color("white", 0) : new Color(backgroundColor);
    bg.strokeEnabled = false;
    bg.name = "BG";
    insertNode(bg);

    if(shadow)
        bg.shadow = new Shadow(0, 1, 4, new Color("#000000", 0.16), true);
    else if(border){
        const borderNode = createBorder({ width });
        borderNode.opacity = 0.1;
        insertNode(borderNode);

        selection.items = [bg, borderNode];
        commands.group();
        bg = selection.items[0];
        placeInParent(borderNode, {x: 0, y: height});
    }

    const container = new Rectangle();
    const containerWidth = 1400 // 1600;
    container.resize(Math.min(width, containerWidth), height);
    container.fill = new Color("white", 0);
    container.strokeEnabled = false;
    container.name = "Container";
    insertNode(container);

    selection.items = [bg, container];
    commands.alignHorizontalCenter();
    commands.alignVerticalCenter();

    return [bg, container];
}

function assembleNavbar(props = {}, images){
    props = {
        ...props, ...images,
        width: 1600,
        // width: 1920,
        height: 70,
    };

    const [bg, container] = createNavBackground(props);
    props.container = container;

    const leftSlotContent = [
        "logo",
        // "menu", "buttons"
    ];
    const leftSlot = createNavSlot(props, leftSlotContent);
    leftSlot.name = "FernNavLeftSlot";

    const rightSlotContent = [
        // "search", "socials", "dp",
        "menu", //"buttons"
    ];

    const rightSlot = createNavSlot({ ...props, alignment: "right" }, rightSlotContent);
    rightSlot.name = "FernNavRightSlot";

    selection.items = [bg, container, leftSlot, rightSlot];
    commands.group();

    return selection.items[0];
}

module.exports = assembleNavbar;