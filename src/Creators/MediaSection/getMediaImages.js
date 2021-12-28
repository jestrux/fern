const { PLUGIN_ID } = require("../../constants");
const { getGroupChildByName } = require("../../utils");

function getMediaImages(media){
    let props, mainImage, bottomImage;
    const jsonString = media.sharedPluginData.getItem(PLUGIN_ID, "richData");

    if (jsonString)
        props = JSON.parse(jsonString);

    if(!props) return null;

    // console.log("\n\n\n");
    // console.log("Media props from get media images: ", props);
    // console.log("\n\n\n");

    if(props.style == "overlay"){
        getGroupChildByName(media, "Overlay", overlay => {
            if(props.video){
                getGroupChildByName(overlay, "BG", bg => {
                    mainImage = bg;
                });
            }
            else
                mainImage = overlay;
        });

        getGroupChildByName(media, "Underlay", underlay => {
            if(props.video){
                getGroupChildByName(underlay, "BG", bg => {
                    bottomImage = bg;
                });
            }
            else
                bottomImage = overlay
        });
    }
    else if(props.video){
        getGroupChildByName(media, "BG", bg => {
            mainImage = bg;
        });
    }
    else    
        mainImage = media;

    return [mainImage, bottomImage];
}

module.exports = getMediaImages;