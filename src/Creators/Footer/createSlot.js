const { selection, SceneNode, Rectangle, Color } = require("scenegraph");
const commands = require("commands");
const { placeInParent, insertNode, getPadding } = require("../../utils");
const footerMenuComponent = require("./components/menu");
const footerLogoComponent = require("./components/logo");
const createSocialMediaIcons = require("../SocialMediaIcons/createIcons");

function createFooterSlot(props, components = []){
    const componentMap = {
        "logo": footerLogoComponent,
        "menu": footerMenuComponent,
        "socials": createSocialMediaIcons,
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
                        spacings: 50
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