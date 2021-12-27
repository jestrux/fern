const { SceneNode, selection } = require("scenegraph");
const commands = require("commands");
const { PLUGIN_ID } = require("../../constants");
const { editDom, getAssetFileFromPath, someTime, placeInParent, getGroupChildByName, } = require("../../utils");
const createMedia = require("./createMedia");

const defaultMediaSectionProps = {
    style: "regular",
    color: "#EA4949",
    shadow: true,
    cornerRadius: 'sm',
    video: false,
    orientation: 'landscape',
};

async function MediaSection(props){
    const defaultMediaImage = await getAssetFileFromPath("images/media-section-default.jpg");
    const portraitMediaImage = await getAssetFileFromPath("images/media-section-portrait.jpg");
    let mainImageFill, bottomImageFill;

    try {
        const oldMediaSection = props ? selection.items[0] : null;
        let media;

        if(oldMediaSection){
            if(props.style == "overlay"){
                getGroupChildByName(oldMediaSection, "Overlay", overlay => {
                    if(props.video){
                        getGroupChildByName(overlay, "BG", bg => {
                            mainImageFill = bg.fill;
                        });
                    }
                    else
                        mainImageFill = overlay.fill;
                });

                getGroupChildByName(oldMediaSection, "Underlay", underlay => {
                    if(props.video){
                        getGroupChildByName(underlay, "BG", bg => {
                            bottomImageFill = bg.fill;
                        });
                    }
                    else
                        bottomImageFill = overlay.fill
                });
            }
            else if(props.video){
                getGroupChildByName(oldMediaSection, "BG", bg => {
                    mainImageFill = bg.fill;
                });
            }
            else    
                mainImageFill = oldMediaSection.fill;
        }
        
        editDom(async (selection) => {
            try {
                const [mediaNode] = createMedia(
                    props || defaultMediaSectionProps, 
                    [defaultMediaImage, portraitMediaImage, mainImageFill, bottomImageFill]
                );
                media = mediaNode;
            } catch (error) {
                console.log("Error creating mediaSection: ", error);
            }
        });
        
        await someTime(0);

        editDom(async (selection) => {
            try {
                selection.items = [media];
                // commands.alignRight();
                // commands.group();
                // const mediaSection = selection.items[0];
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