const { SceneNode, Rectangle, Text, Color, selection } = require("scenegraph");
const commands = require("commands");
const icons = require("../../../data/icons");
const { insertNode, createIcon, getPadding } = require("../../../utils");

function navSearchInputComponent(props){
    const searchInputBg = new Rectangle();
    searchInputBg.resize(460, 45);
    searchInputBg.fill = new Color("#000", 0.08);
    searchInputBg.setAllCornerRadii(60);
    insertNode(searchInputBg);
    
    const searchText = new Text();
    searchText.text = "Type here to search...";
    searchText.fill = new Color("#000", 0.3);
    searchText.fontFamily = "Helvetica Neue";
    searchText.fontSize = 16;
    searchText.fontStyle = "Medium";
    searchText.charSpacing = 15;
    insertNode(searchText);

    const searchIcon = createIcon(icons.search, {
        fill: "#aaa",
        size: 18,
    });
    insertNode(searchIcon);

    selection.items = [searchIcon, searchText];
    commands.alignVerticalCenter();
    commands.alignLeft();
    commands.group();
    searchIcon.moveInParentCoordinates(0, 1);
    const searchInputContent = selection.items[0];
    searchInputContent.layout = {
        type: SceneNode.LAYOUT_STACK,
        stack: {
            orientation: SceneNode.STACK_HORIZONTAL,
            spacings: 10
        }
    }

    selection.items = [searchInputBg, searchInputContent];
    commands.alignVerticalCenter();
    commands.group();

    const searchInputContainer = selection.items[0];
    searchInputContainer.layout = {
        type: SceneNode.LAYOUT_PADDING,
        padding: {
            background: searchInputBg,
            values: {...getPadding(16, 12), right: 40}
        }
    };

    searchInputContainer.name = "FernSearchInput";

    return searchInputContainer;
}

module.exports = navSearchInputComponent;