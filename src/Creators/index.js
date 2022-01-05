const { placeInParent, createIcon, editDom, base64ArrayBuffer, insertNode, tagNode } = require("../utils");
const Button = require("./Button");
const Navbar = require("./Navbar");
const Footer = require("./Footer");
const MediaSection = require("./MediaSection");
const Grid = require("./Grid");
const FernComponent = require("./FernComponent");

class Creators {
    static Button = Button
    static Navbar = Navbar
    static Footer = Footer
    static Grid = Grid
    static MediaSection = MediaSection
    static FernComponent = FernComponent
    
    static Rating(selection, props = {}){
        const {
            rating = 3.2, 
            outOf = 5,
            color = "#F7CD42",
            format = "text",
            reviewCount = 20,
            darkMode
        } = props;
        return new Promise((res, rej) => {
            const emptyStar = "M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z";
            const halfStar = "M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z";
            const fullStar = "M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z";
    
            const { editDocument } = require("application");
            const { Color, Text } = require("scenegraph");
            const commands = require("commands");
            
            try {
                // editDom(async (selection, root) => {
                    let ratingText;

                    if(format == "icons"){
                        const icons = [];
                        let referenceCoords;
            
                        Array(outOf).fill(2).map((n, index) => {
                            let path = rating > index && rating - index >= 1 ? fullStar : emptyStar;
                            if(rating > index && rating - index < 1)
                                path = halfStar;
                            
                            const icon = createIcon(path, {fill: color});
                            insertNode(icon);
            
                            icons.push(icon);
                            
                            if(index > 0){
                                placeInParent(icon, {
                                    x: referenceCoords.x + (50 * index), 
                                    y: referenceCoords.y
                                })
                            }
                            else
                                referenceCoords = icon.localBounds;
                        });
            
                        selection.items = icons;
                    }

                    else{
                        const roundedRating = Math.round(rating);
                        const ratingIconPath = roundedRating < outOf ? halfStar : fullStar;
                        const icon = createIcon(
                            roundedRating == 0 ? emptyStar : ratingIconPath, 
                            {fill: color}
                        );
                        insertNode(icon);
    
                        ratingText = new Text();
                        ratingText.text = `${rating.toFixed(1)} ( 20 reviews )`;
                        ratingText.fill = new Color(darkMode ? "#FFF" : "#4D4D4D");
                        ratingText.fontFamily = "Helvetica Neue";
                        ratingText.fontSize = 20;
                        ratingText.fontStyle = "Light";
    
                        ratingText.styleRanges = [
                            {
                                fontStyle: "Medium",
                                length: 3,
                            },
                            {
                                fontStyle: "Light",
                                length: 13 + reviewCount.toString().length,
                                fill: new Color(darkMode ? "rgba(255, 255, 255, 0.7)" : "#6A6A6A")
                            }
                        ];
                        insertNode(ratingText);
                        selection.items = [icon, ratingText];
                    }

                    commands.alignVerticalCenter();
                    commands.group();

                    const group = selection.items[0];
                    group.name = "FernRating";

                    if(ratingText)
                        ratingText.moveInParentCoordinates(30, -1);
                    else
                        group.resize(130, group.localBounds.height);

                    res(group);
                // });
            } catch (error) {
                console.log("Error creating rating: ", error);
            }
        })
    }

    static Card = async function(props){
        const {
            image, 
            shadow, 
            darkMode, 
            large,
            rating = {
                color: "#F7CD42",
                format: "text",
                level: 3.5
            }
        } = props || {};
        const commands = require("commands");
        const { Color, Rectangle, Shadow, Text, ImageFill } = require("scenegraph");

        let cardImage;

        if(image){
            const { ImageFill } = require("scenegraph");
            const storage = require("uxp").storage;
            const fs = storage.localFileSystem;
    
            const pluginFolder = await fs.getPluginFolder();
            const cardImageFile = await pluginFolder.getEntry(`images/card/${darkMode ? 'dark' : 'light'}.jpg`);
            const cardImageFileContents = await cardImageFile.read({format: storage.formats.binary});
            cardImage = await base64ArrayBuffer(cardImageFileContents);
        }

        const bgWidth = image && !large ? 473 : 360;
        const bgHeight = large ? 300 : 128;
        const imageInset = image == "inset" ? 12 : 0;
        const imageWidth = !large ? 132 - imageInset : bgWidth - (imageInset * 2);
        const imageHeight = !large ? bgHeight - (imageInset * 2) : 170 - imageInset;
        const leftOffset = !image || large ? 18 : imageInset + 16 + imageWidth;
        const topOffset = large ? imageHeight + imageInset : 0;
        
        const addText = (selection) => new Promise((res) => {
            let imageRectangle, bgRectangle, location, price;
            bgRectangle = new Rectangle();
            bgRectangle.resize(bgWidth, bgHeight);
            bgRectangle.fill = new Color(darkMode ? "#1A2637" : "#fff");
            bgRectangle.strokeEnabled = true;
            bgRectangle.strokeWidth = 1;

            bgRectangle.setAllCornerRadii(12);
            bgRectangle.name = "BG";
            if(!shadow)
                bgRectangle.stroke = new Color(darkMode ? "#1A2637" : "#707070");
            else{
                bgRectangle.stroke = new Color(darkMode ? "#1A2637" : "#E5E5E5");
                bgRectangle.shadow = new Shadow(0, 3, 6, new Color("#000000", 0.16), true);
            }
            insertNode(bgRectangle);
            
            // selection.items = [bgRectangle];
            // commands.group();
            // const group = selection.items[0];

            if(image){
                try {
                    imageRectangle = new Rectangle();
                    imageRectangle.resize(imageWidth, imageHeight);
                    const cardFill = new ImageFill(`data:image/png;base64,${cardImage}`);
                    imageRectangle.fill = cardFill;
        
                    imageRectangle.cornerRadii = {
                        topLeft: 8, 
                        topRight: large || imageInset ? 8 : 0, 
                        bottomLeft: large && !imageInset ? 0 : 8, 
                        bottomRight: large && !imageInset ? 0 : imageInset ? 8 : 0
                    };
                    imageRectangle.name = "Image";
                    insertNode(imageRectangle);
                    // group.addChild(imageRectangle);

                    tagNode(imageRectangle, {type: "image", darkMode});

                    // placeInParent(imageRectangle, {x: imageInset, y: imageInset});
                } catch (error) {
                    console.log("Error adding image: ", error);
                }
            }

            // TEXT
            location = new Text();
            location.text = "Acacia Grove | The Right Inn..";
            location.fill = new Color(darkMode ? "#FFF" : "#4D4D4D");
            location.fontFamily = "Helvetica Neue";
            location.fontSize = 24;
            location.fontStyle = "Light";
            // group.addChild(location);
            // placeInParent(location, {x: leftOffset, y: topOffset + 48.5});
            insertNode(location);

            price = new Text();
            price.text = "$65 / night";
            price.fill = new Color(darkMode ? "#FFF" : "#4D4D4D");
            price.fontFamily = "Helvetica Neue";
            price.fontSize = 22;
            price.fontStyle = "Light";

            price.styleRanges = [
                {
                    charSpacing: 60,
                    fontStyle: "Bold",
                    length: 3,
                },
                {
                    charSpacing: 0,
                    fontStyle: "Light",
                    length: 8,
                }
            ];
            
            // group.addChild(price);
            // placeInParent(price, {x: leftOffset, y: topOffset + 85});
            insertNode(price);

            // res(group);
            const content = [bgRectangle, location, price];
            if(imageRectangle)
                content.push(imageRectangle);
            
            res(content);
        });

        try {
            editDom(async (selection) => {
                const oldCard = props ? selection.items[0] : null;

                try {
                    const group = await addText(selection);
                    const [bgRectangle, location, price, imageRectangle] = group;
                    const ratingNode = await Creators.Rating(selection, rating ? {...rating, rating: rating.level, darkMode} : {darkMode});

                    selection.items = [...group, ratingNode];
                    // commands.alignTop();
                    commands.alignLeft();
                    commands.group();
                    
                    if(imageRectangle)
                        placeInParent(imageRectangle, {x: imageInset, y: imageInset});

                    placeInParent(location, {x: leftOffset, y: topOffset + 48.5});
                    placeInParent(price, {x: leftOffset, y: topOffset + 85});
                    placeInParent(ratingNode, {
                        x: leftOffset, 
                        y: topOffset + (rating && rating.format == "icons" ? 19.5 : 16)
                    });

                    const card = selection.items[0];
                    card.name = "FernCard";

                    tagNode(card, { 
                        type: "card", shadow, image, darkMode, large, rating
                    });

                    if(oldCard){
                        placeInParent(card, oldCard.topLeftInParent);
                        oldCard.removeFromParent();
                    }
                    else
                        card.moveInParentCoordinates(30, 30);
                } catch (error) {
                    console.log("Error creating card: ", error);
                }
            });

            // selection = [rating, bgRectangle];
            // commands.group();
        } catch (error) {
            console.log("Error creating card: ", error);
        }
    }
}

module.exports = Creators;