const { Ellipse, ImageFill } = require("scenegraph");
const { insertNode, tagNode } = require("../../../utils");

function navProfileImageComponent({profileImage}){
    const dp = new Ellipse();
    dp.radiusX = 25;
    dp.radiusY = 25;
    dp.fill = new ImageFill(profileImage);
    insertNode(dp);

    tagNode(dp, {type: "image"});

    return dp;
}

module.exports = navProfileImageComponent;