const { Ellipse, ImageFill } = require("scenegraph");
const { insertNode, tagNode } = require("../../../utils");

function navDpComponent({image, searchQuery = "face"}){
    const dp = new Ellipse();
    dp.radiusX = 20;
    dp.radiusY = 20;
    dp.name = "FernNavDp";

    try {
        dp.fill = image;
    } catch (error) {
        dp.fill = new ImageFill(image);
    }
    
    insertNode(dp);
    tagNode(dp, {type: "Image", searchQuery});

    return dp;
}

module.exports = navDpComponent;