const { SceneNode, selection, Color, Rectangle } = require("scenegraph");
const commands = require("commands");
const { placeInParent, createBorder, insertNode, getPadding, getGroupChildByName } = require("../../utils");
const createFooterSlot = require("./createSlot");

function createFooterBackground({ width, height, color }){
    let bg = new Rectangle();
    bg.resize(width, height);
    bg.fill = new Color(color);
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
        width: 1920, height: 70,
    };

    const bg = createFooterBackground(props);

    const slot2 = createFooterSlot(props, [ "menu" ]);
    const slot3 = createFooterSlot(props, [ "menu" ]);
    const slot4 = createFooterSlot(props, [ "menu" ]);
    const slot5 = createFooterSlot(props, [ "menu" ]);

    const leftSlot = createFooterSlot(props, [
        "logo", "socials",
    ]);
    leftSlot.name = "FernFooterLeftSlot";

    const slots = [leftSlot, slot2, slot3, slot4, slot5];
    const slotsWrapperPadding = 30;
    const spaceBetweenSlots = 30;

    try {
        const totalSpaceBetweenSlots = (slots.length - 1) * spaceBetweenSlots;
        const containerWidth = 1600;
        const availableWidth = (containerWidth - totalSpaceBetweenSlots - (slotsWrapperPadding * 2));
        const slotWidth = availableWidth / slots.length;

        console.log("Slot width: ", slotWidth);

        slots.forEach(slot => {
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
    const footerBgWhiteSpace = bg.localBounds.width - container.localBounds.width;
    const footerBgHorizontalPadding = footerBgWhiteSpace / 2;
    bg.resize(bg.localBounds.width - footerBgWhiteSpace, footerHeight);
    container.fill = new Color("red");

    selection.items = [bg, container];
    commands.group();

    const footer = selection.items[0];

    footer.layout = {
        type: SceneNode.LAYOUT_PADDING,
        padding: {
            background: bg,
            values: getPadding(footerBgHorizontalPadding, 60),
        }
    };

    return footer;
}

module.exports = assembleFooter;