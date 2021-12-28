const { selection } = require("scenegraph");
const { PLUGIN_ID } = require("../../constants");
const { editDom, getAssetFileFromPath, placeInParent, } = require("../../utils");
const createMedia = require("./createMedia");
const getMediaImages = require("./getMediaImages");

const defaultShadowProps = {
    size: "lg",
    placement: "B-R",
    color: "#000",
};

const defaultMediaSectionProps = {
    style: "basic",
    playIcon: {
        color: "#EA4949",
        invertColors: false,
        smoothCorners: false,
    },
    shadow: defaultShadowProps,
    cornerRadius: 'xs',
    video: false,
    orientation: 'landscape',
    overLayout: "T-R",
};

async function MediaSection(props){
    const defaultMediaImage = await getAssetFileFromPath("images/media-section-default.jpg");
    const portraitMediaImage = await getAssetFileFromPath("images/media-section-portrait.jpg");
    let imageFills = [null, null];

    try {
        const oldMediaSection = props ? selection.items[0] : null;
        let media;

        if(oldMediaSection){
            const mediaImageNodes = getMediaImages(oldMediaSection);
            if(mediaImageNodes)
                imageFills = mediaImageNodes.map(image => image ? image.fill : null);
        }
        
        editDom(async (selection) => {
            try {
                const [mediaNode] = createMedia(
                    props || defaultMediaSectionProps, 
                    [
                        defaultMediaImage, portraitMediaImage, 
                        ...imageFills
                    ]
                );
                media = mediaNode;
                
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
                    placeInParent(media);
            } catch (error) {
                console.log("Error creating mediaSection: ", error);
            }
        });
    } catch (error) {
        console.log("Error creating card: ", error);
    }
}

module.exports = MediaSection;