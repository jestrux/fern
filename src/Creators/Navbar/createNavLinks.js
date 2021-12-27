const { selection, Color, Rectangle, Text, SceneNode } = require("scenegraph");
const commands = require("commands");
const { getPadding, getGroupChildByName, createBorder } = require("../../utils");

function createLink(props = {}){
    const {
        color = "white"
    } = props;

    const linkBg = new Rectangle();
    linkBg.resize(90, 70);
    linkBg.fill = new Color(color);
    linkBg.strokeEnabled = false;
    linkBg.name = "BG";
    selection.insertionParent.addChild(linkBg);

    const linkText = new Text();
    linkText.name = "text";
    linkText.text = "Android 12";
    linkText.fill = new Color("black");
    linkText.fontFamily = "Helvetica Neue";
    linkText.fontSize = 16;
    selection.insertionParent.addChild(linkText);

    selection.items = [linkBg, linkText];
    commands.alignVerticalCenter();
    commands.alignHorizontalCenter();
    commands.group();

    const link = selection.items[0];

    link.layout = {
        type: SceneNode.LAYOUT_PADDING,
        padding: {
            background: linkBg,
            values: getPadding(10, 26),
        }
    };

    return link;
}

function changeLinkText(link, text = "Link", cb = () => {}){
    if(!link) return;

    getGroupChildByName(link, 'text', linkText => {
        if(linkText)
            linkText.text = text.length ? text : "Link";
        cb();
    });
}

function createNavLinks(props = {}, cb = () => {}){
    const {
        links = [],
    } = props;

    const linkItems = [...links];
    linkItems.reverse();

    try {
        const linkNode = createLink();
        changeLinkText(linkNode, linkItems[0]);
        linkNode.name = linkItems[0];
        const navLinkNodes = [linkNode];

        for (let i = 1; i < links.length; i++) {
            commands.duplicate();
            const newLink = selection.items[0];
            selection.items = [newLink];
            navLinkNodes.push(newLink);
            newLink.name = linkItems[i];
            
            changeLinkText(newLink, linkItems[i]);
        }

        selection.items = navLinkNodes;
        commands.group();
        const navLinks = selection.items[0];
        navLinks.layout = {
            type: SceneNode.LAYOUT_STACK,
            stack: {
                orientation: SceneNode.STACK_HORIZONTAL,
                spacings: 20
            }
        }

        return navLinks;
    } catch (error) {
        console.log("Error creating nav links: ", error);
    }
}

module.exports = createNavLinks;