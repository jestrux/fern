const { Rectangle, ImageFill } = require("scenegraph");
const { insertNode } = require("../../../utils");

function navLogoComponent({logoImage}){
    const logo = new Rectangle();
    logo.resize(163, 25);
    logo.fill = new ImageFill(logoImage);
    insertNode(logo);

    return logo;
}

module.exports = navLogoComponent;