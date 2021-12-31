const { SceneNode, selection, Color, ImageFill, Rectangle, Shadow, Text } = require("scenegraph");
const commands = require("commands");
const { placeInParent, createBorder, insertNode, getPadding, createText, getGroupChildByName, chunkArray, tagNode } = require("../../utils");

function getCornerRadius({cornerRadius, shadow, border}, forImage){
    const radiusMap = { 'none': 0, 'sm': 6, 'md': 8, 'lg': 16 };
    let radius = radiusMap[cornerRadius];
    if(forImage && (shadow || border))
        radius *= 0.65;

    return Math.max(radius, 0);
}

function getShadow(shadow){
    const shadowPropsMap = {
        "sm": [0, 1, 3],
        "md": [1, 2, 5],
        "lg": [1.5, 3.5, 7],
    };

    if(!shadow || !Object.keys(shadowPropsMap).includes(shadow))
        shadow = "sm";

    const shadowProps = shadowPropsMap[shadow];
    const shadowOffsets = shadowProps.slice(0,2);
    const shadowBlur = shadowProps[2];

    return new Shadow(...shadowOffsets, shadowBlur, new Color("#000", 0.26), true);
}

function createCard(props){
    let { 
        aspectRatio = 'landscape', 
        width = 450,
        image, title, description,
        padding,
        border,
        shadow,
    } = props;

    if(!shadow && !border) padding = 0;
    
    width = width - (padding * 2);
    
    let imageHeight = width * 0.65; 
    if(aspectRatio == 'por')
        imageHeight = width / 0.75;
    else if(aspectRatio == 'sqr')
        imageHeight = width * 1;

    const cardImage = new Rectangle();
    cardImage.resize(width, imageHeight);
    console.log("Card image: ", image);
    try {
        cardImage.fill = image;
    } catch (error) {
        cardImage.fill = new ImageFill(image);
    }
    cardImage.name = "Image";
    cardImage.setAllCornerRadii(getCornerRadius(props, true));

    const cardTitle = createText(title, {
        name: "Title", width, height: 28, type: Text.FIXED_HEIGHT, 
        fontSize: 24, fontStyle: "Medium", 
    });

    const cardDescription = createText(description, {
        fill: new Color("#4D4D4D"), lineSpacing: 30,
        name: "Description", width
    });

    insertNode(cardDescription);
    insertNode(cardTitle);
    insertNode(cardImage);

    selection.items = [cardTitle, cardDescription];
    commands.alignLeft();
    commands.group();

    const cardText = selection.items[0];
    cardText.name = "FernGridCardText"
    cardText.layout = {
        type: SceneNode.LAYOUT_STACK,
        stack: {
            orientation: SceneNode.STACK_VERTICAL,
            spacings: 6
        }
    };

    selection.items = [cardImage, cardText];
    commands.alignLeft();
    commands.group();

    const cardContent = selection.items[0];
    cardContent.name = "FernGridCardContent"
    cardContent.layout = {
        type: SceneNode.LAYOUT_STACK,
        stack: {
            orientation: SceneNode.STACK_VERTICAL,
            spacings: 12
        }
    };

    const bg = new Rectangle();
    bg.resize(width, cardContent.localBounds.height);
    bg.fill = new Color("#fff", padding ? 1 : 0);
    bg.setAllCornerRadii(getCornerRadius(props));

    if(border && !shadow){
        bg.strokeEnabled = true;
        bg.strokeWidth = 1.5;
        bg.stroke = new Color("#e0e0e0");
        bg.name = "FernGridCardBg";
    }

    if(shadow)
        bg.shadow = getShadow(shadow);

    insertNode(bg);
    
    selection.items = [cardContent];
    commands.bringToFront();

    selection.items = [bg, cardContent];
    commands.alignVerticalCenter();
    commands.alignHorizontalCenter();
    commands.group();

    const card = selection.items[0];
    card.name = "FernGridCard";

    card.layout = {
        type: SceneNode.LAYOUT_PADDING,
        padding: {
            background: bg,
            values: getPadding(padding, padding)
        }
    };
    
    return card;
}

function setCardContent(card, content){
    const { image, title, description } = content;

    getGroupChildByName(card, "FernGridCardContent/Image", cardImage => {
        try {
            cardImage.fill = image;
        } catch (error) {
            cardImage.fill = new ImageFill(image);
        }
    });

    getGroupChildByName(card, "FernGridCardContent/FernGridCardText/Title", titleNode => {
        titleNode.text = title;
    });

    getGroupChildByName(card, "FernGridCardContent/FernGridCardText/Description", descriptionNode => {
        descriptionNode.text = description;
    });
}

function createGridCards(props){
    let {
        data,
        columns,
        columnSpacing,
        rowSpacing,
        images,
    } = props;

    data = [...data].reverse();

    const { width } = props.container.localBounds;
    // const cardWidth = (width - 64 - ( columnSpacing * (columns - 1))) / columns;
    const containerPadding = 64;
    const totalSpaces = columnSpacing * (columns - 1);
    const cardWidth = (width - containerPadding - totalSpaces) / columns;

    const card = createCard({
        ...props,
        width: cardWidth,
        image: data[0].image,
        title: data[0].title,
        description: data[0].description,
    });
    tagNode(card, {name: "FernGridCard1"});

    let cards = [card];

    for (let i = 1; i <= data.length - 1; i++) {
        commands.duplicate();
        const card = selection.items[0];
        cards.push(card);
        card.name = "FernGridCard";
        setCardContent(card, data[i]);
        tagNode(card, {name: "FernGridCard" + (i + 1)});
    }

    const gridRows = [];
    const rowCount = Math.ceil(data.length / columns);
    let reversedSlicedCardIndices = [...cards].map((_, i) => i).reverse();
    reversedSlicedCardIndices = chunkArray(reversedSlicedCardIndices, columns);
    reversedSlicedCardIndices = reversedSlicedCardIndices.map(a => {
        const slice = [ a.pop() ];
        
        if(a.length) slice.push(a.shift() + 1);

        return slice;
    });

    for (let index = 0; index < rowCount; index++) {
        const [firstColumnIndex, lastColumnIndex] = reversedSlicedCardIndices[index];
        let rowItems;
        if(lastColumnIndex)
            rowItems = cards.slice(firstColumnIndex, lastColumnIndex);
        else
            rowItems = [cards[firstColumnIndex]];

        selection.items = rowItems;
        commands.group();

        const row = selection.items[0];
        row.name = "FernGridRow" + (index + 1);

        if(rowItems.length > 1){
            row.layout = {
                type: SceneNode.LAYOUT_STACK,
                stack: {
                    orientation: SceneNode.STACK_HORIZONTAL,
                    spacings: columnSpacing
                }
            };
        }

        gridRows.push(row);
    }

    selection.items = gridRows;
    commands.group();

    const grid = selection.items[0];
    grid.name = "FernGridRows";

    if(gridRows.length > 1){
        grid.layout = {
            type: SceneNode.LAYOUT_STACK,
            stack: {
                orientation: SceneNode.STACK_VERTICAL,
                spacings: rowSpacing
            }
        };
    }
    
    return grid;
}

module.exports = createGridCards;