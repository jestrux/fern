const { SceneNode, selection, Color, Rectangle, Shadow } = require("scenegraph");
const commands = require("commands");
const { createRectangle, createText, insertNode, getPadding, createCircle, createIcon } = require("../../utils");
const defaultFeatureSectionProps = require("./defaultProps");
const icons = require("../../data/icons");

const createFeature = (props = {}) => {
    const {
        width = 200,
        verticalSpace = 12,
        padding = 0, 
    } = props;

    const bg = createRectangle(width + (padding * 2));
    const circle = createCircle(30);
    const icon = createIcon(icons.seat, { fill: "#333", size: 24 });
    const number = createText(
        "01", 
        {
            fontSize: 20,
            lineSpacing: 0,
            // letterSpacing: 40, 
            fill: "#333", //"#eee",
            fontFamily: "Poppins",
            fontStyle: "SemiBold", 
        },
    );
    const title = createText("Real data access", {width, fontStyle: "Bold", fontSize: 24});
    const description = createText(
        "Create custom landing pages with Fastland that converts more visitors than any website.", 
        { 
            width, lineSpacing: 32,
        }
    );

    insertNode(bg);
    insertNode(description);
    insertNode(title);
    insertNode(circle);
    insertNode(number);

    // selection.items = [icon, circle];
    selection.items = [number, circle];
    commands.alignHorizontalCenter();
    commands.alignVerticalCenter();
    commands.group();
    const iconNode = selection.items[0];

    selection.items = [title, description];
    commands.group();
    const featureText = selection.items[0];
    featureText.layout = {
        type: SceneNode.LAYOUT_STACK,
        stack: {
            orientation: SceneNode.STACK_VERTICAL,
            spacings: verticalSpace
        },
    };

    selection.items = [featureText, iconNode];
    commands.group();
    const featureTextWithIcon = selection.items[0];
    featureTextWithIcon.layout = {
        type: SceneNode.LAYOUT_STACK,
        stack: {
            orientation: SceneNode.STACK_VERTICAL,
            spacings: verticalSpace, //* 0.75
        },
    };
    
    selection.items = [bg, featureTextWithIcon];
    commands.group();

    const feature = selection.items[0];

    feature.layout = {
        type: SceneNode.LAYOUT_PADDING,
        padding: {
          background: bg,
          values: getPadding(padding),
        },
    };

    return feature;
}

const createFeatures = (userProps) => {
    const props = {
        ...defaultFeatureSectionProps,
        ...(userProps || {}),
    };

    const itemPadding = 0;
    const itemSpacing = 20; //20;
    let itemWidth = (props.container.localBounds.width - (itemSpacing * 2)) / 3;
    itemWidth -= (itemPadding * 2);

    const feature1 = createFeature({
        width: itemWidth,
        padding: itemPadding
    });
    commands.duplicate();
    const feature2 = selection.items[0];
    commands.duplicate();
    const feature3 = selection.items[0];

    selection.items = [feature1, feature2, feature3];
    commands.group();

    const features = selection.items[0];
    features.layout = {
        type: SceneNode.LAYOUT_STACK,
        stack: {
            orientation: SceneNode.STACK_HORIZONTAL,
            spacings: itemSpacing
        },
    };

    return features;
}

module.exports = createFeatures;