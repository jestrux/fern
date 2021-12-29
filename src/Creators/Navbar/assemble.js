const { selection, Color, Rectangle, Shadow } = require("scenegraph");
const commands = require("commands");
const { placeInParent, createBorder, insertNode } = require("../../utils");
const createNavSlot = require("./createSlot");

function createNavBackground({ width, height, color, shadow }){
    let bg = new Rectangle();
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

    const container = new Rectangle();
    container.resize(Math.min(width, 1600), height);
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
        width: 1920, height: 70,
    };

    const [bg, container] = createNavBackground(props);
    props.container = container;

    const leftSlot = createNavSlot(props, [
        "logo", "menu", "buttons",
    ]);
    leftSlot.name = "FernNavLeftSlot";

    const rightSlot = createNavSlot({ ...props, alignment: "right" }, [
        "search", "socials", "dp",
        // "menu", "buttons"
    ]);
    rightSlot.name = "FernNavRightSlot";

    selection.items = [bg, container, leftSlot, rightSlot];
    commands.group();

    return selection.items[0];
}

module.exports = assembleNavbar;