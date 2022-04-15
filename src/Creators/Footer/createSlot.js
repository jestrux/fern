const { selection, SceneNode, Rectangle, Color } = require("scenegraph");
const commands = require("commands");
const { placeInParent, insertNode, getPadding, createText } = require("../../utils");
const footerMenuComponent = require("./components/menu");
const footerLogoComponent = require("./components/logo");
const createSocialMediaIcons = require("../SocialMediaIcons/createIcons");
const footerSubscribeComponent = require("./components/subscribe");

function footerAboutUsComponent({
    aboutUs = "Making the world a better place by making very elegant visual hierarchies."
}){
    const linkText = createText(aboutUs, {
        name: "FernFooterAboutUs",
        fill: new Color("#606060"),
        fontSize: 16,
        width: 310,
        lineSpacing: 28,
        fontStyle: "Regular",
        // type: Text.POINT,
    });
    
    insertNode(linkText);

    return linkText;
}

function createFooterSlot(props, components = []){
    const componentMap = {
        "logo": footerLogoComponent,
        "about": footerAboutUsComponent,
        "socials": createSocialMediaIcons,
        "menu": footerMenuComponent,
        "subscribe": footerSubscribeComponent,
    }

    try {
        const { width, height, alignment = "left" } = props;

        let slot;

        const slotBg = new Rectangle();
        slotBg.resize(width / 2, height);
        slotBg.name = "FernFooterSlotBg";
        insertNode(slotBg);

        if(components.length){
            const content = components.reverse().map(component => {
                return componentMap[component](props);
            });
            
            selection.items = content;
            commands.group();

            const slotContent = selection.items[0];
            if(slotContent.children.length > 1){
                slotContent.layout = {
                    type: SceneNode.LAYOUT_STACK,
                    stack: {
                        orientation: SceneNode.STACK_VERTICAL,
                        spacings: 30
                    }
                };
            }
            slotContent.name = "FernFooterSlotContent";

            if(alignment == "left"){
                selection.items = content;
                commands.alignLeft();

                selection.items = [ slotBg, slotContent ];
                commands.alignLeft();
            }
            else{
                selection.items = content;
                commands.alignRight();

                selection.items = [ slotBg, slotContent ];
                commands.alignRight();
            }
            
            slotBg.resize(slotContent.localBounds.width, slotContent.localBounds.height);
            
            selection.items = [ slotBg, slotContent ];
            commands.group();

            slot = selection.items[0];

            placeInParent(slot, {x: 0, y: 0});
        }

        slot.name = "FernFooterSlot";

        return slot;
    } catch (error) {
        console.log("Error creating slot: ", error);
    }
}

module.exports = createFooterSlot;