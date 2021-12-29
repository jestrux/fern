const { getGroupChildByName, getNodeTag } = require("../../utils");

function getMediaImages(media){
    const props = getNodeTag(media);
    
    if(!props) return null;
    
    let mainImage, bottomImage;

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