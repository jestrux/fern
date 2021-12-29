const { selection, SceneNode, Rectangle, Color } = require("scenegraph");
const commands = require("commands");
const { placeInParent, insertNode, getPadding } = require("../../utils");
const navMenuComponent = require("./components/menu");
const navLogoComponent = require("./components/logo");
const navDpComponent = require("./components/dp");
const navSocialsComponent = require("./components/socials");
const navSearchInputComponent = require("./components/searchInput");
const navButtonsComponent = require("./components/buttons");

function createNavSlot(props, components = []){
    const componentMap = {
        "logo": navLogoComponent,
        "menu": navMenuComponent,
        "dp": navDpComponent,
        "socials": navSocialsComponent,
        "search": navSearchInputComponent,
        "buttons": navButtonsComponent,
    }

    try {
        const { width, height, container, alignment = "left" } = props;

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
            if(slotContent.children.length > 1){
                slotContent.layout = {
                    type: SceneNode.LAYOUT_STACK,
                    stack: {
                        orientation: SceneNode.STACK_HORIZONTAL,
                        spacings: 30
                    }
                };
            }
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

            const { width } = container.localBounds;
            const { x, y } = container.topLeftInParent;
            const slotPlacement = { x, y };
            console.log("Container bounds: ", container);
            
            if(alignment == "right")
                slotPlacement.x = width - slot.localBounds.width + x;

            placeInParent(slot, slotPlacement);
        }

        return slot;
    } catch (error) {
        console.log("Error creating slot: ", error);
    }
}

module.exports = createNavSlot;