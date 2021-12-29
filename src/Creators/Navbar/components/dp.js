const { Ellipse, ImageFill } = require("scenegraph");
const { insertNode, tagNode } = require("../../../utils");

function navDpComponent({dpImage}){
    const dp = new Ellipse();
    dp.radiusX = 20;
    dp.radiusY = 20;
    dp.name = "FernNavDp";

    try {
        dp.fill = dpImage;
    } catch (error) {
        dp.fill = new ImageFill(dpImage);
    }
    
    insertNode(dp);
    tagNode(dp, {type: "Image", searchQuery: "face"});

    return dp;
}

module.exports = navDpComponent;