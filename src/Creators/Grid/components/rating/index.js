const { SceneNode, selection, Color, Text } = require("scenegraph");
const commands = require("commands");
const { insertNode, createIcon, placeInParent, createText, getPadding } = require("../../../../utils");
const starPaths = require("./starPaths");

function gridRatingComponent(props = {}){
    const {
        rating = 3.2, 
        outOf = 5,
        color,
        format = "text",
        reviewCount = 20,
        darkMode = false,
    } = props;

    let ratingText;

    if(format == "icons"){
        const icons = [];

        Array(outOf).fill(2).map((n, i) => {
            const index = outOf - i;
            let star = rating > index && rating - index >= 1 ? "full" : "empty";
            if(rating > index && rating - index < 1)
                star = "half";
            
            const icon = createIcon(starPaths[star], {fill: color ? color : "#F7CD42", size: 16});
            icon.name = "FernRatingStar";
            insertNode(icon);

            icons.push(icon);
        });

        selection.items = icons;
    }

    else{
        const roundedRating = Math.round(rating);
        const ratingIconPath = starPaths[roundedRating < outOf ? "half" : "full"];
        const icon = createIcon(
            roundedRating == 0 ? emptyStar : ratingIconPath, 
            { fill: color ? color : "#FF385C", size: 16, }
        );
        icon.name = "FernRatingStar";

        ratingText = createText(`${rating.toFixed(1)} ( 20 reviews )`, {
            name: "FernRatingText",
            fill: new Color(darkMode ? "white" : "#4D4D4D"),
            fontStyle: "Regular", fontSize: 16,
            type: Text.POINT, height: 24,
            styleRanges: [
                { fontStyle: "Medium", length: 3, },
                {
                    fontStyle: "Regular",
                    length: 13 + reviewCount.toString().length,
                    fill: new Color(darkMode ? "rgba(255, 255, 255, 0.7)" : "#6A6A6A")
                }
            ]
        });
        insertNode(ratingText);
        insertNode(icon);
        selection.items = [icon, ratingText];
    }

    commands.alignVerticalCenter();
    commands.alignLeft();
    commands.group();

    const ratingNode = selection.items[0];
    ratingNode.name = "FernRating";

    ratingNode.layout = {
        type: SceneNode.LAYOUT_STACK,
        stack: {
            orientation: SceneNode.STACK_HORIZONTAL,
            spacings: 6
        },
        padding: {
            values: getPadding(0, 0, 2, 0)
        }
    };

    return ratingNode;
}

module.exports = gridRatingComponent;