const { SceneNode, selection, Color, Rectangle } = require("scenegraph");
const commands = require("commands");
const { placeInParent, createBorder, insertNode, getPadding, getGroupChildByName } = require("../../utils");
const createFooterSlot = require("./createSlot");

function createFooterBackground({ width, height, backgroundColor }){
    let bg = new Rectangle();
    bg.resize(width, height);
    bg.fill = new Color(backgroundColor);
    bg.strokeEnabled = false;
    insertNode(bg);

    const borderNode = createBorder({ width });
    borderNode.opacity = 0.1;
    insertNode(borderNode);

    selection.items = [bg, borderNode];
    commands.group();
    bg = selection.items[0];
    placeInParent(borderNode, {x: 0, y: 0});
    bg.name = "BG";

    return bg;
}

function assembleFooter(props = {}, images){
    props = {
        ...props, ...images,
        width: 1600, //1920, 
        height: 70, 
        // icons: [
        //     "facebook",
        //     "twitter", 
        //     "instagram", 
        //     // "linkedIn", 
        //     // "youtube",
        //     "tiktok",
        // ]
    };

    const bg = createFooterBackground(props);
    
    const slotDefinitions = [
        ["logo", "about"],
        ["menu"],
        // ["subscribe"],
        // ["menu"],
        // ["menu"],
        ["menu"],
        ["socials", "subscribe"],
    ];

    const slots = Array(slotDefinitions);

    for (let index = slotDefinitions.length - 1; index >= 0; index--) {
        slots[index] = createFooterSlot(props, slotDefinitions[index]);
    }
    
    const slotsWrapperPadding = 30;
    let spaceBetweenSlots = 180;

    try {
        const fixedSlotSpace = [...slots].filter((_, index) => {
            const slot = slotDefinitions[index];
            return slot.length > 0 && slot[0] != "menu";
        })
        .reduce((agg, slot) => agg + slot.localBounds.width, 0);
        console.log("Fixed slot space: ", fixedSlotSpace);

        const resizableSlots = [...slots].filter((_, index) => {
            const slot = slotDefinitions[index];
            return slot.length == 1 && slot[0] == "menu";
        });

        const containerWidth = 1400; //1600;

        let totalSpaceBetweenSlots = (slots.length - 1) * spaceBetweenSlots;
        let availableWidth = (containerWidth - fixedSlotSpace - totalSpaceBetweenSlots - (slotsWrapperPadding * 2));
        let slotWidth = availableWidth / resizableSlots.length;

        while(slotWidth < 100 && spaceBetweenSlots > 0){
            spaceBetweenSlots -= 5;
            totalSpaceBetweenSlots = (slots.length - 1) * spaceBetweenSlots;
            availableWidth = (containerWidth - fixedSlotSpace - totalSpaceBetweenSlots - (slotsWrapperPadding * 2));
            slotWidth = availableWidth / resizableSlots.length;
        }

        while(slotWidth > 200){
            spaceBetweenSlots += 5;
            totalSpaceBetweenSlots = (slots.length - 1) * spaceBetweenSlots;
            availableWidth = (containerWidth - fixedSlotSpace - totalSpaceBetweenSlots - (slotsWrapperPadding * 2));
            slotWidth = availableWidth / resizableSlots.length;
        }

        console.log("Slot width: ", slotWidth);

        resizableSlots.forEach(slot => {
            getGroupChildByName(slot, "FernFooterSlotBg", slotBg => {
                slotBg.resize(slotWidth, slot.localBounds.height);
            });
        });
    } catch (error) {
        console.log("Error updating slot width: ", error);
    }

    selection.items = slots;
    commands.group();

    const container = selection.items[0];
    container.name = "Container";
    container.layout = {
        type: SceneNode.LAYOUT_STACK,
        stack: {
            orientation: SceneNode.STACK_HORIZONTAL,
            spacings: spaceBetweenSlots
        },
        padding: {
            values: getPadding(slotsWrapperPadding, 0)
        }
    };
    
    const footerHeight = container.localBounds.height;
    // const footerBgWhiteSpace = bg.localBounds.width - container.localBounds.width;
    // const footerBgHorizontalPadding = Math.floor(footerBgWhiteSpace / 2);
    // container.fill = new Color("red");
    // bg.resize(bg.localBounds.width - footerBgWhiteSpace, footerHeight);
    bg.resize(bg.localBounds.width, footerHeight + 120);
    // console.log("Footer bg padding: ", Math.floor(footerBgHorizontalPadding));

    selection.items = [bg, container];
    commands.alignVerticalCenter();
    commands.alignHorizontalCenter();
    commands.group();

    const footer = selection.items[0];

    // footer.layout = {
    //     type: SceneNode.LAYOUT_PADDING,
    //     padding: {
    //         background: bg,
    //         values: getPadding(footerBgHorizontalPadding, 60),
    //     }
    // };

    return footer;
}

module.exports = assembleFooter;