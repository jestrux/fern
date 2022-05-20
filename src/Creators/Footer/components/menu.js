const { selection, Color, Text, SceneNode } = require("scenegraph");
const commands = require("commands");
const { insertNode, createText } = require("../../../utils");

function createSectionTitle(text = "Quick Links", {
    color,
    menu
}){
    const sectionTitle = createText(text, {
        name: text,
        fill: menu.title.color || color,
        fontStyle: "Bold",
        fontSize: 16,
        type: Text.POINT,
        // textTransform: "uppercase"
    });

    sectionTitle.opacity = menu.title.opacity;

    console.log("Create title: ", text, sectionTitle);
    
    insertNode(sectionTitle);

    return sectionTitle;
}

function createLink(text = "FernNavLinkText", {color}){
    const linkText = createText(text, {
        name: text,
        fill: color,
        fontSize: 16,
        type: Text.POINT,
    });
    
    insertNode(linkText);

    return linkText;
}

function footerMenuComponent(props = {}, {links = "Home, About", title}) {
    links = links.split(",").map(link => link.trim());
    
    const linkItems = [...links];
    linkItems.reverse();

    try {
        const linkNode = createLink(linkItems[0], props.theme);
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

        if(!props.theme.menu.showTitles || !title)
            selection.items = navLinkNodes;
        else {
            const sectionTitle = createSectionTitle(title, props.theme);
            selection.items = [...navLinkNodes, sectionTitle];
        }

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