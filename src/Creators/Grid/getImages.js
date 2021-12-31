const { getGroupChildByName, getNodeTag } = require("../../utils");

function getGridImages(grid, { numberOfRecords, columns }){
    const images = [];

    const rowCount = Math.ceil(numberOfRecords / columns);
    for (let index = rowCount; index >= 1; index--) {
        const pathToCards = `Container/FernGridRows/FernGridRow${index}/FernGridCard`;
        getGroupChildByName(grid, pathToCards, cards => {
            cards.forEach(card => {
                getGroupChildByName(card, "FernGridCardContent/Image", image => {
                    if(image)
                        images.push(image.fill);
                    else
                        console.log("No image fill found for: ", card);
                });
            });
        }, true);
    }
    
    return images.reverse();
}

module.exports = getGridImages;