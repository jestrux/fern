const { Rectangle, ImageFill } = require("scenegraph");
const { insertNode, calculateAspectRatioFit, createRectangle } = require("../../../utils");

function navLogoComponent({image, searchQuery = "as"}){
    const logo = createRectangle(163, 25, {
        name: "FernNavLogo",
        // richData: {type: "Image", searchQuery, logo: true},
    });

    try {
        logo.fill = image;
    } catch (error) {
        logo.fill = new ImageFill(image);
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