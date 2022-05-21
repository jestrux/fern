const { SceneNode, selection } = require("scenegraph");
const commands = require("commands");
const { createRectangle, createText, insertNode, getPadding, createCircle, createIcon, getGroupChildByName, resizeIcon } = require("../../utils");
const defaultFeatureSectionProps = require("./defaultProps");
const icons = require("../../data/many-icons");

const createFeature = (props = {}) => {
    const {
        width = 200,
        verticalSpace = 12,
        padding = 0,
        number,
        icon,
        title = "Real data access",
        description = "Create custom landing pages with Fastland that converts more visitors than any website.",
        theme,
    } = props;

    const graphicSize = theme.graphic.size || 22;
    const bg = createRectangle(width + (padding * 2));
    const circle = createCircle(Math.floor(graphicSize * 1.36), {
        name: "bg",
        fill: theme.graphic.color || theme.color,
        opacity: theme.graphic.bgOpacity || 0.28,
    });

    let graphicChild;
    if(theme.graphic.type == "number") {
        graphicChild = createText(
            number, 
            {
                name: "number",
                fontSize: Math.floor(graphicSize / 1.1),
                lineSpacing: 0,
                fill: theme.graphic.color || theme.color,
                fontFamily: "Poppins",
                fontStyle: "SemiBold", 
            },
        );
    }
    else{
        graphicChild = createIcon(icons[icon], { 
            fill: theme.graphic.color || theme.color,
            size: Math.floor(graphicSize)
        });
    }
    graphicChild.name = "child";
    
    const titleNode = createText(title, {
        name: "title", 
        fill: theme.color,
        width, 
        fontStyle: "Bold", 
        fontSize: 24,
    });
    const descriptionNode = createText(
        description, 
        { 
            name: "description",
            fill: theme.color,
            width, 
            lineSpacing: 32,
        }
    );

    insertNode(bg);
    insertNode(descriptionNode);
    insertNode(titleNode);
    insertNode(circle);
    insertNode(graphicChild);

    selection.items = [graphicChild, circle];
    commands.alignHorizontalCenter();
    commands.alignVerticalCenter();
    commands.group();
    const graphicNode = selection.items[0];
    graphicNode.name = "graphic";

    selection.items = [titleNode, descriptionNode];
    commands.group();
    const featureText = selection.items[0];
    featureText.layout = {
        type: SceneNode.LAYOUT_STACK,
        stack: {
            orientation: SceneNode.STACK_VERTICAL,
            spacings: verticalSpace
        },
    };
    featureText.name = "text";

    selection.items = [featureText, graphicNode];
    commands.group();

    const featureTextWithGraphic = selection.items[0];
    featureTextWithGraphic.layout = {
        type: SceneNode.LAYOUT_STACK,
        stack: {
            orientation: SceneNode.STACK_VERTICAL,
            spacings: verticalSpace * 1.25
        },
    };
    featureTextWithGraphic.name = "content";
    
    selection.items = [bg, featureTextWithGraphic];
    commands.group();

    const feature = selection.items[0];

    feature.layout = {
        type: SceneNode.LAYOUT_PADDING,
        padding: {
          background: bg,
          values: getPadding(padding),
        },
    };
    feature.name = "FeatureItem";

    return feature;
}

const createFeatures = (userProps) => {
    const props = {
        ...defaultFeatureSectionProps,
        ...(userProps || {}),
    };

    const features = [
        {
            icon: "landmark-JP",
            title: "Expertly designed",
            description: "Statement-making homes with exceptionally styled interiors.",
        },
        {
            icon: "lighthouse", // "heliport", "gaming"
            title: "Luxury amenities",
            description: "Fully equipped to meet your needs, with ample space and privacy.",
        },
        {
            icon: "natural", // "florist"
            title: "Custom itineraries",
            description: "Your trip designer can plan every last detail and make sure everything is just right."
        },
        // {
        //     icon: "bakery",
        //     title: "300-point inspection and vetting",
        //     description: "Each property is vetted for pristineness and meticulously maintainance."
        // },
        // {
        //     icon: "car",
        //     title: "Effortless arrivals",
        //     description: "Private airport pick-up, an in-person welcome, and a home stocked are popular add-ons."
        // },
        // {
        //     icon: "restaurant",
        //     title: "Tailored services",
        //     description: "From personal chefs to massage therapists, a local team of professionals waits for you."
        // },
    ];

    const featureItems = [...features];
    featureItems.reverse();

    const itemPadding = 0;
    const itemSpacing = 20; //20;
    let itemWidth = (props.container.localBounds.width - (itemSpacing * 2)) / 3;
    itemWidth -= (itemPadding * 2);

    const featureItemNode = createFeature({
        ...props,
        ...featureItems[0],
        number: featureItems.length.toString().padStart(2, "0"),
        width: itemWidth,
        padding: itemPadding,
    });
    const featureItemNodes = [featureItemNode];
    selection.items = [featureItemNode];

    for (let i = 1; i < featureItems.length; i++) {
        commands.duplicate();
        const newItem = selection.items[0];
        selection.items = [newItem];
        featureItemNodes.push(newItem);

        getGroupChildByName(newItem, "content/graphic/child", graphicChild => {
            if(props.theme.graphic.type == "number")
                graphicChild.text = (featureItems.length - i).toString().padStart(2, "0");
            else {
                graphicChild.pathData = icons[featureItems[i].icon];
                resizeIcon(graphicChild, props.theme.graphic.size || 22);

                if(graphicChild.localBounds.x > 0)
                    graphicChild.moveInParentCoordinates(-graphicChild.localBounds.x, 0);
            }
        });


        getGroupChildByName(newItem, "content/text", text => {
            getGroupChildByName(text, "title", titleNode => {
                titleNode.text = featureItems[i].title;
            });
            getGroupChildByName(text, "description", descriptionNode => {
                descriptionNode.text = featureItems[i].description;
            });
        });
    }

    selection.items = featureItemNodes;
    commands.group();

    // const feature1 = createFeature({
    //     width: itemWidth,
    //     padding: itemPadding
    // });
    // commands.duplicate();
    // const feature2 = selection.items[0];
    // commands.duplicate();
    // const feature3 = selection.items[0];

    // selection.items = [feature1, feature2, feature3];
    // commands.group();

    const featureNodes = selection.items[0];
    featureNodes.layout = {
        type: SceneNode.LAYOUT_STACK,
        stack: {
            orientation: SceneNode.STACK_HORIZONTAL,
            spacings: itemSpacing
        },
    };

    return featureNodes;
}

module.exports = createFeatures;