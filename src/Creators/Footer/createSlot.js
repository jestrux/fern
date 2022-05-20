const { selection, SceneNode, Rectangle, Color } = require("scenegraph");
const commands = require("commands");
const { placeInParent, insertNode, getPadding, createText } = require("../../utils");
const footerMenuComponent = require("./components/menu");
const footerLogoComponent = require("./components/logo");
const createSocialMediaIcons = require("../SocialMediaIcons/createIcons");
const footerSubscribeComponent = require("./components/subscribe");
const navLogoComponent = require("../Navbar/components/logo");

function footerAboutUsComponent(
    { theme, }, 
    aboutUs = "Making the world a better place by making very elegant visual hierarchies.",
){
    const linkText = createText(aboutUs, {
        name: "FernFooterAboutUs",
        fill: theme.color,
        fontSize: 16,
        width: theme.about.width,
        lineSpacing: 28,
    });
    
    insertNode(linkText);

    return linkText;
}

function createFooterSlot(props, components = {}){
    const componentMap = {
        "logo": navLogoComponent,
        "about": footerAboutUsComponent,
        socials: (props, icons) => createSocialMediaIcons({
            ...props.theme, 
            ...props.theme.socials,
            icons
        }),
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

        const componentsAvailable = components && Object.keys(components).length;
        const validComponents = !componentsAvailable
            ? null
            : Object.fromEntries(
                Object.entries(components).filter(
                    ([key, value]) => value && componentMap[key]
                )
            );

        if (validComponents && Object.keys(validComponents).length) {
            const content = Object.entries(validComponents)
                    .reverse()
                    .map(([component, data]) => componentMap[component](props, data));
            
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

            slot.name = "FernFooterSlot";
        }

        return slot;
    } catch (error) {
        console.log("Error creating slot: ", error);
    }
}

module.exports = createFooterSlot;