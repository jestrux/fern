const { selection, Color, Rectangle, Text, SceneNode } = require("scenegraph");
const commands = require("commands");
const { getPadding, getGroupChildByName, createBorder, insertNode, placeInParent } = require("../../utils");

function createLink(){
    const linkBg = new Rectangle();
    linkBg.resize(90, 70);
    linkBg.fill = new Color("white", 0);
    linkBg.strokeEnabled = false;
    linkBg.name = "BG";
    insertNode(linkBg);

    const linkText = new Text();
    linkText.name = "text";
    linkText.text = "Android 12";
    linkText.fill = new Color("black");
    linkText.fontFamily = "Helvetica Neue";
    linkText.fontSize = 16;
    insertNode(linkText);

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

function createNavActiveIndicator({ shadow = false, activeLink, navMenu }){
    getGroupChildByName(navMenu, activeLink, navActiveLink => {
        try {
            const { width, height } = navActiveLink.localBounds;
            const navActiveIndicator = createBorder({
                width: width + 1,
                thickness: 2,
            });
            
            selection.items = [navMenu];
            commands.group();
            navMenu = selection.items[0];
            navMenu.addChild(navActiveIndicator);
            navMenu.name = "FernNavMenu";

            placeInParent(navActiveIndicator, {
                x: navActiveLink.topLeftInParent.x + 3, 
                y: height - (shadow ? 8 : 8.75)
            });
        } catch (error) {
            console.log("Error creating nav indicator: ", error);
        }
    });

    return navMenu;
}

function createNavMenu(props = {}, cb = () => {}){
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
        let navMenu = selection.items[0];
        navMenu.layout = {
            type: SceneNode.LAYOUT_STACK,
            stack: {
                orientation: SceneNode.STACK_HORIZONTAL,
                spacings: 20
            }
        }

        navMenu = selection.items[0];

        if(props.links.includes(props.activeLink)){
            navMenu = createNavActiveIndicator({
                ...props,
                navMenu
            });
        }

        return navMenu;
    } catch (error) {
        console.log("Error creating nav links: ", error);
    }
}

module.exports = createNavMenu;