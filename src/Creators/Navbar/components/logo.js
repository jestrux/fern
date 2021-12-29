const { Rectangle, ImageFill } = require("scenegraph");
const { insertNode, calculateAspectRatioFit } = require("../../../utils");

function navLogoComponent({logoImage}){
    const logo = new Rectangle();
    logo.resize(163, 25);
    logo.name = "FernNavLogo";
    
    try {
        logo.fill = logoImage;
    } catch (error) {
        logo.fill = new ImageFill(logoImage);
    }

    if(logo.fill.naturalWidth){
        const { naturalWidth, naturalHeight } = logo.fill;
        const { width, height } = calculateAspectRatioFit(naturalWidth, naturalHeight, 160, 50);
        logo.resize(width, height);
    }

    insertNode(logo);
    
    return logo;
}

module.exports = navLogoComponent;