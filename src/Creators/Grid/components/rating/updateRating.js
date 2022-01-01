const { getGroupChildByName } = require("../../../../utils");
const starPaths = require("./starPaths");

function updateRating(ratingNode, rating, {format}){
    if(format == "icons"){
        getGroupChildByName(ratingNode, "FernRatingStar", starNodes => {
            starNodes.reverse().forEach((starNode, index) => {
                let star = rating > index && rating - index >= 1 ? "full" : "empty";
                if(rating > index && rating - index < 1)
                    star = "half";

                starNode.pathData = starPaths[star];
                starNode.resize(16, 16);
            });
        }, true);
    }
}

module.exports = updateRating;