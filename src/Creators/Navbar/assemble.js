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

    const leftSlot = createNavSlot(props, [
        "logo",
        // "menu",
        // "socials",
    ]);
    leftSlot.name = "FernNavLeftSlot";

    const middleSlot = createNavSlot(props, [
        // "logo",
        "menu",
        // "socials"
    ]);
    middleSlot.name = "FernNavMiddleSlot";

    const rightSlot = createNavSlot({ ...props, alignment: "right" }, [
        // "search",
        // "dp",
        // "menu",
        "socials",
        "buttons"
    ]);
    rightSlot.name = "FernNavRightSlot";

    selection.items = [leftSlot, middleSlot, rightSlot];
    commands.distributeHorizontal();

    selection.items = [bg, container, leftSlot, middleSlot, rightSlot];
    commands.group();

    return selection.items[0];
}

module.exports = assembleNavbar;