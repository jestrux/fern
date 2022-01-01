const { SceneNode, selection, Color, LinearGradient, ImageFill, Rectangle, Shadow, Text } = require("scenegraph");
const commands = require("commands");
const { placeInParent, createBorder, insertNode, getPadding, createText, getGroupChildByName, chunkArray, tagNode } = require("../../utils");
const gridRatingComponent = require("./components/rating");
const updateRating = require("./components/rating/updateRating");

function getGradient({aspectRatio, imageHeight}){
    const gradient = new LinearGradient();
    gradient.setEndPoints(0, 0, 0, 1);

    gradient.colorStops = [
        { color: new Color("#000", 0), stop: 0 },
        { color: new Color("#000", 0.1), stop: 0.25 },
        { color: new Color("#000", 0.5), stop: 0.35 },
        { color: new Color("#000", 0.9), stop: 0.7 },
        { color: new Color("#000"), stop: 1 }
    ];

    if(aspectRatio == "por" || imageHeight > 250){
        gradient.colorStops = [
            { color: new Color("#000", 0), stop: 0 },
            { color: new Color("#000", 0.1), stop: 0.4 },
            { color: new Color("#000", 0.5), stop: 0.6 },
            { color: new Color("#000", 0.9), stop: 0.8 },
            { color: new Color("#000"), stop: 1 }
        ];
    }

    return gradient;
}

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
        padding,
        border,
        shadow,
        overlay,
        showRating,
        showPrice,
        showTitle,
        showDescription,
        spaceAroundImage,
        data
    } = props;

    const {
        image, title, description, price, rating
    } = data;

    if(!shadow && !border && !overlay) padding = 0;
    
    width = width - (overlay || !spaceAroundImage ? 0 : (padding * 2));
    
    let imageHeight = width * 0.65; 
    if(aspectRatio == 'por')
        imageHeight = width / 0.75;
    else if(aspectRatio == 'sqr')
        imageHeight = width * 1;

    const cardImage = new Rectangle();
    cardImage.resize(width, imageHeight);
    
    try {
        cardImage.fill = image;
    } catch (error) {
        cardImage.fill = new ImageFill(image);
    }
    cardImage.name = "Image";
    const imageBorderRadius = getCornerRadius(props, spaceAroundImage);
    cardImage.cornerRadii = {
        topLeft: imageBorderRadius, 
        topRight: imageBorderRadius, 
        bottomLeft: spaceAroundImage || overlay ? imageBorderRadius : 0,
        bottomRight: spaceAroundImage || overlay ? imageBorderRadius : 0
    };

    let cardText, cardTitle, priceText, cardDescription, textNodes = [];
    
    if(showPrice){
        priceText = createText("$" + price, {
            name: "Price", 
            fill: overlay ? new Color("#fff", 0.8) : new Color("#000"),
            type: Text.POINT, 
            fontSize: 18, fontStyle: "Bold", 
        });

        insertNode(priceText);
        textNodes.push(priceText);
    }

    if(showTitle){
        cardTitle = createText(title, {
            name: "Title", 
            fill: overlay ? new Color("#fff", 0.8) : new Color("#000"), 
            width: width - (!overlay && spaceAroundImage ? 0 : (padding * 2)), 
            height: showDescription || showPrice ? 21 : null, 
            type: showDescription || showPrice ? Text.FIXED_HEIGHT : Text.AUTO_HEIGHT, 
            fontSize: 18, fontStyle: "Medium", 
        });
    }

    if(showDescription){
        const descriptionArray = description.split(" ");
        const descriptionText = descriptionArray.slice(0, 20).join(" ") + (descriptionArray.length > 20 ? "..." : "");
        cardDescription = createText(descriptionText, {
            name: "Description",
            fill: overlay ? new Color("#fff", 0.8) : new Color("#6D6D6D"), 
            fontSize: 14, fontStyle: "Regular", lineSpacing: 22,
            width: width - (!overlay && spaceAroundImage ? 0 : (padding * 2)), 
        });
    
        insertNode(cardDescription);
        textNodes.push(cardDescription);
    }

    if(cardTitle){
        insertNode(cardTitle);
        textNodes.push(cardTitle);
    }

    if(showRating){
        textNodes.push(gridRatingComponent({
            ...props.rating,
            darkMode: overlay,
            rating,
        }));
    }

    insertNode(cardImage);

    if(textNodes.length){
        selection.items = textNodes;
        commands.alignLeft();
        commands.group();
    
        cardText = selection.items[0];
        cardText.name = "FernGridCardText";
    }

    let cardContent;

    if(!cardText){
        selection.items = [cardImage];
        commands.group();
        cardContent = selection.items[0];
    }
    else{
        if(textNodes.length > 1){
            cardText.layout = {
                type: SceneNode.LAYOUT_STACK,
                stack: {
                    orientation: SceneNode.STACK_VERTICAL,
                    spacings: 7
                },
            };
    
            if(!spaceAroundImage && !overlay){
                cardText.layout = {
                    ...cardText.layout,
                    padding: {
                        values: {...getPadding(padding, padding), top: padding - 16}
                    }
                }
            }
        }
        else if(!spaceAroundImage && !overlay){
            cardText.layout = {
                type: SceneNode.LAYOUT_PADDING,
                padding: {
                    values: {...getPadding(padding, padding), top: padding - 16}
                }
            };
        }

        if(overlay){
            let scrim = new Rectangle();
            scrim.resize(width, imageHeight);
            scrim.fill = new Color("#000");
            scrim.name = "FernGridCardScrim";
            scrim.fill = getGradient({...props, imageHeight});
    
            insertNode(scrim);
            scrim.setAllCornerRadii(getCornerRadius(props));
    
            selection.items = [cardImage, scrim, cardText];
            commands.alignLeft();
            commands.alignBottom();
            commands.group();
    
            cardContent = selection.items[0];
    
            selection.items = [cardText];
            commands.bringToFront();

            let bottomPadding = padding;
            if(!showDescription && !showPrice) 
                bottomPadding = cardText.localBounds.height;

            cardText.moveInParentCoordinates(padding, -bottomPadding);
        }
        else{
            selection.items = [cardImage, cardText];
            commands.alignLeft();
            commands.group();
    
            cardContent = selection.items[0];
    
            cardContent.layout = {
                type: SceneNode.LAYOUT_STACK,
                stack: {
                    orientation: SceneNode.STACK_VERTICAL,
                    spacings: 12
                },
            };
        }
    }

    cardContent.name = "FernGridCardContent";

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

    if(!overlay && spaceAroundImage){
        card.layout = {
            type: SceneNode.LAYOUT_PADDING,
            padding: {
                background: bg,
                values: getPadding(padding, padding)
            }
        };
    }
    
    return card;
}

function setCardContent(card, content, props){
    const { rating, image, title, description, price } = content;
    const descriptionArray = description.split(" ");
    const descriptionText = descriptionArray.slice(0, 20).join(" ") + (descriptionArray.length > 20 ? "..." : "");

    getGroupChildByName(card, "FernGridCardContent/Image", cardImage => {
        try {
            cardImage.fill = image;
        } catch (error) {
            cardImage.fill = new ImageFill(image);
        }
    });

    if(props.showRating){
        getGroupChildByName(card, "FernGridCardContent/FernGridCardText/FernRating", ratingNode => {
            if(ratingNode)
                updateRating(ratingNode, rating, props.rating)
        });
    }

    if(props.showTitle){
        getGroupChildByName(card, "FernGridCardContent/FernGridCardText/Title", titleNode => {
            titleNode.text = title;
        });
    }

    if(props.showDescription){
        getGroupChildByName(card, "FernGridCardContent/FernGridCardText/Description", descriptionNode => {
            descriptionNode.text = descriptionText;
        });
    }

    if(props.showPrice){
        getGroupChildByName(card, "FernGridCardContent/FernGridCardText/Price", priceNode => {
            priceNode.text = "$" + price;
        });
    }
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
        data: data[0],
    });
    tagNode(card, {name: "FernGridCard1"});

    let cards = [card];

    for (let i = 1; i <= data.length - 1; i++) {
        commands.duplicate();
        const card = selection.items[0];
        cards.push(card);
        card.name = "FernGridCard";
        setCardContent(card, data[i], props);
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