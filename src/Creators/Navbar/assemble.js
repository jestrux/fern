const { selection } = require("scenegraph");
const commands = require("commands");

function assembleNavbar(components) {
    const [navBackground, navLogo, navMenu] = components;

    selection.items = [navBackground, navMenu];
    commands.alignRight();
    navMenu.moveInParentCoordinates(-30, 0);

    selection.items = [navBackground, navLogo];
    commands.alignLeft();
    navLogo.moveInParentCoordinates(30, 0);

    selection.items = [navBackground, navLogo, navMenu];
    commands.alignVerticalCenter();

    commands.group();

    return selection.items[0];
}

module.exports = assembleNavbar;