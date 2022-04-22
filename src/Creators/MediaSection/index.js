const { PLUGIN_ID } = require("../../constants");
const { selection } = require("scenegraph");
const { editDom, placeInParent, getAssetsByType, } = require("../../utils");
const assembleMediaSection = require("./assemble");
const defaultMediaSectionProps = require("./defaultProps");
const getMediaImages = require("./getMediaImages");

async function MediaSection(userProps){
    const props = {
        ...defaultMediaSectionProps,
        ...(userProps || {}),
    };

    const bannerImages = await getAssetsByType("banner");
    let imageFills;
    
    try {
        const oldMediaSection = userProps ? selection.items[0] : null;
        if(oldMediaSection){
            if (props.logo == "custom") {
                const mediaImageNodes = getMediaImages(oldMediaSection);
                if(mediaImageNodes)
                    imageFills = mediaImageNodes.map(image => image ? image.fill : null);
            }

        }
        
        editDom(async (selection) => {
            try {
                const media = assembleMediaSection(
                    props, 
                    bannerImages
                );
                
                selection.items = [media];
                media.name = "FernMedia";

                const data = { 
                    type: "MediaSection",
                    ...(props ? props: defaultMediaSectionProps),
                };

                media.sharedPluginData.setItem(PLUGIN_ID, "richData", JSON.stringify(data));

                if(oldMediaSection){
                    placeInParent(media, oldMediaSection.topLeftInParent);
                    oldMediaSection.removeFromParent();
                }
                else
                    placeInParent(media, {x: 0, y: 0});
            } catch (error) {
                console.log("Error creating mediaSection: ", error);
            }
        });
    } catch (error) {
        console.log("Error creating card: ", error);
    }
}

module.exports = MediaSection;