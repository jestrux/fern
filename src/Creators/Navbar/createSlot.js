const { selection, SceneNode, Rectangle, Color } = require("scenegraph");
const commands = require("commands");
const { placeInParent, insertNode, getPadding } = require("../../utils");
const navMenuComponent = require("./components/menu");
const navLogoComponent = require("./components/logo");
const navProfileImageComponent = require("./components/profileImage");
const navSocialsComponent = require("./components/socials");

function createNavSlot(props, components = []){
    const componentMap = {
        "logo": navLogoComponent,
        "menu": navMenuComponent,
        "dp": navProfileImageComponent,
        "socials": navSocialsComponent
    }

    try {
        const { width, height, bg, alignment = "left" } = props;

        let slot;

        const slotBg = new Rectangle();
        slotBg.resize(width / 2, height);
        insertNode(slotBg);

        if(components.length){
            const placeholder = new Rectangle();
            placeholder.resize(1, height);
            insertNode(placeholder);

            const content = components.reverse().map(component => {
                return componentMap[component](props);
            });

            selection.items = [ slotBg, placeholder, ...content ];
            commands.alignVerticalCenter();
            
            if(alignment == "left")
                commands.alignLeft();
            else
                commands.alignRight();
        
            selection.items = [...content, placeholder];
            commands.bringToFront();
            commands.group();
        
            const slotContent = selection.items[0];
            // if(content.length > 1){
                slotContent.layout = {
                    type: SceneNode.LAYOUT_STACK,
                    stack: {
                        orientation: SceneNode.STACK_HORIZONTAL,
                        spacings: 30
                    }
                };
            // }
            slotContent.name = "FernNavSlotContent";
        
            selection.items = [ slotBg, slotContent ];
            commands.group();

            slot = selection.items[0];

            slot.layout = {
                type: SceneNode.LAYOUT_PADDING,
                padding: {
                    background: slot,
                    values: {...getPadding(30, 0), right: 0}
                }
            };

            const { y, width } = bg.localBounds;
            const slotPlacement = { x: 0, y };
            
            if(alignment == "right")
                slotPlacement.x = width - slot.localBounds.width;

            placeInParent(slot, slotPlacement);
        }

        return slot;
    } catch (error) {
        console.log("Error creating slot: ", error);
    }
}

module.exports = createNavSlot;