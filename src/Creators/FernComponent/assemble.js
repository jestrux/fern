const { selection, Color, Rectangle, Shadow } = require("scenegraph");
const commands = require("commands");
const { placeInParent, createBorder, insertNode } = require("../../utils");

function createFernComponentBackground({ width, height, color, shadow }){
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

function assembleFernComponent(props = {}, images){
    props = {
        ...props, ...images,
        color: "red",
        width: 1920, height: 800,
    };

    const [bg, container] = createFernComponentBackground(props);
    props.container = container;

    selection.items = [bg, container];
    commands.group();

    return selection.items[0];
}

module.exports = assembleFernComponent;