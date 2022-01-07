const { selection, Color, Text, SceneNode } = require("scenegraph");
const commands = require("commands");
const { insertNode, createText } = require("../../../utils");

function createSectionTitle(text = "Quick Links"){
    const linkText = createText(text, {
        name: text,
        fill: new Color("#606060"),
        fontStyle: "Bold",
        fontSize: 13,
        type: Text.POINT,
        textTransform: "uppercase"
    });
    
    insertNode(linkText);

    return linkText;
}

function createLink(text = "FernNavLinkText"){
    const linkText = createText(text, {
        name: text,
        fill: new Color("#606060"),
        fontSize: 16,
        type: Text.POINT,
    });
    
    insertNode(linkText);

    return linkText;
}

function footerMenuComponent(props = {}){
    const {
        links = [],
    } = props;

    const linkItems = [...links];
    linkItems.reverse();

    try {
        const linkNode = createLink(linkItems[0]);
        linkNode.name = linkItems[0];
        const navLinkNodes = [linkNode];
        selection.items = [linkNode];

        for (let i = 1; i < links.length; i++) {
            commands.duplicate();
            const newLink = selection.items[0];
            selection.items = [newLink];
            navLinkNodes.push(newLink);
            newLink.name = linkItems[i];
            newLink.text = linkItems[i];
        }

        const sectionTitle = createSectionTitle();
        selection.items = [...navLinkNodes, sectionTitle];
        commands.group();
        let footerMenu = selection.items[0];
        footerMenu.layout = {
            type: SceneNode.LAYOUT_STACK,
            stack: {
                orientation: SceneNode.STACK_VERTICAL,
                spacings: 24
            }
        }

        footerMenu = selection.items[0];

        return footerMenu;
    } catch (error) {
        console.log("Error creating footer links: ", error);
    }
}

module.exports = footerMenuComponent;