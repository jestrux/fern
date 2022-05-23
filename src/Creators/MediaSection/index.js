const { PLUGIN_ID } = require("../../constants");
const { selection } = require("scenegraph");
const viewport = require("viewport");
const { editDom, placeInParent, getAssetsByType, getNodeTag, } = require("../../utils");
const assembleMediaSection = require("./assemble");
const defaultMediaSectionProps = require("./defaultProps");
const getMediaImage = require("./getMediaImage");

async function MediaSection(userProps, {fromPreset = false} = {}){
    const props = {
        ...defaultMediaSectionProps,
        ...(userProps || {}),
    };

    const bannerImages = await getAssetsByType("banner");
    let mediaImage = bannerImages[`banner${props.image || "3"}`];
    let searchQuery;
    
    try {
        const oldMediaSection = userProps && !fromPreset ? selection.items[0] : null;
        if(oldMediaSection){
            const mediaImageNode = getMediaImage(oldMediaSection)
            if(mediaImageNode) {
                mediaImage = mediaImageNode.fill;
                const imageProps = getNodeTag(mediaImageNode);
                searchQuery = imageProps.searchQuery;
            }
        }
        
        editDom(async (selection) => {
            try {
                const media = assembleMediaSection(
                    props,
                    { mediaImage, searchQuery }
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
                else {
                    placeInParent(media, {x: 0, y: viewport.bounds.y});
                }
            } catch (error) {
                console.log("Error creating mediaSection: ", error);
            }
        });
    } catch (error) {
        console.log("Error creating card: ", error);
    }
}

module.exports = MediaSection;