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

function getActiveLinkBorder(activeLink){
    const {width, height} = activeLink.localBounds;
    return createBorder({
        width: width + 1,
        thickness:2,
    });
}

function createNavLinks(props = {}, cb = () => {}){
    const {
        links = ["Home", "About Us", "Our Services", "Blogs", "Contact Us"],
        activeLink = "Blogs"
    } = props;

    links.reverse();

    let activeLinkNode, activeLinkIndicator;

    try {
        const linkNode = createLink();
        changeLinkText(linkNode, links[0]);
        linkNode.name = links[0];
        const navLinkNodes = [linkNode];

        for (let i = 1; i < links.length; i++) {
            commands.duplicate();
            const newLink = selection.items[0];
            selection.items = [newLink];
            navLinkNodes.push(newLink);
            newLink.name = links[i];
            
            if(activeLink == links[i]){
                activeLinkNode = newLink;
                changeLinkText(newLink, links[i], () => {
                    if(activeLinkIndicator) {
                        activeLinkIndicator.resize(0);
                        activeLinkIndicator.setStartEnd(0, 0, activeLinkNode.localBounds.width + 1, 0);
                    }
                    else{
                        activeLinkIndicator = getActiveLinkBorder(activeLinkNode);
                        selection.insertionParent.addChild(activeLinkIndicator);
                    }

                    doneRenderingNavLinks();
                });
            }
            else
                changeLinkText(newLink, links[i]);
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

        if(activeLinkNode){
            if(!activeLinkIndicator){
                activeLinkIndicator = getActiveLinkBorder(activeLinkNode);
                selection.insertionParent.addChild(activeLinkIndicator);
            }
        }
        else
            doneRenderingNavLinks();

        function doneRenderingNavLinks(){
            cb([navLinks, activeLinkNode, activeLinkIndicator]);
        }

        return [navLinks, activeLinkNode, activeLinkIndicator];
    } catch (error) {
        console.log("Error creating nav links: ", error);
    }
}

module.exports = createNavLinks;