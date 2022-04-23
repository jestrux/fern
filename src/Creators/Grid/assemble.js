const { SceneNode, selection, Color, Rectangle, Shadow } = require("scenegraph");
const commands = require("commands");
const { placeInParent, insertNode, getPadding } = require("../../utils");
let createGridCards; // = require("./createCards");

try {
    createGridCards = require("./createCards");
} catch (error) {
    console.log("Error loading assembler: ", error);
}

function createGridBackground({ width, height, color, shadow, images }){
    let bg = new Rectangle();
    bg.resize(width, height);
    bg.fill = new Color(color, 0);
    bg.strokeEnabled = false;
    bg.name = "BG";
    insertNode(bg);

    const container = new Rectangle();
    const containerWidth = 1400; //1600;
    container.resize(
        Math.min(width, containerWidth), 
        height
    );
    container.fill = new Color("red");
    container.strokeEnabled = false;
    
    insertNode(container);

    selection.items = [bg, container];
    commands.alignHorizontalCenter();

    return [bg, container];
}

function assembleGrid(props = {}, images){
    props = {
        ...props, images,
        width: 1600, //1920, 
        height: 800,
    };

    let [bg, container] = createGridBackground({...props, ...props.theme});
    props.container = container;
    const gridCards = createGridCards(props);
    container.height = gridCards.localBounds.height + 40;

    selection.items = [container, gridCards];
    commands.group();
    commands.alignTop();
    commands.alignHorizontalCenter();
    container.fill = new Color("white", 0);
    selection.items[0].layout = {
        type: SceneNode.LAYOUT_PADDING,
        padding: {
            background: container,
            values: getPadding(32, 32)
        }
    };
    container = selection.items[0];
    container.name = "Container";

    bg.height = container.localBounds.height;
    
    selection.items = [bg, container];
    commands.alignTop();
    commands.alignHorizontalCenter();
    commands.group();
    
    const grid = selection.items[0];
    return grid;
}

module.exports = assembleGrid;