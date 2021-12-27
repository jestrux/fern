const { SceneNode, selection } = require("scenegraph");
const commands = require("commands");
const { PLUGIN_ID } = require("../../constants");
const { editDom, getAssetFileFromPath, someTime, placeInParent, } = require("../../utils");
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

    try {
        const oldMediaSection = props ? selection.items[0] : null;
        let media;
        
        editDom(async (selection) => {
            try {
                const [mediaNode] = createMedia(
                    props || defaultMediaSectionProps, 
                    [defaultMediaImage, portraitMediaImage]
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
                commands.group();
                const mediaSection = selection.items[0];
                mediaSection.name = "FernMediaSection";

                const data = { 
                    type: "MediaSection",
                    ...(props ? props: defaultMediaSectionProps),
                };

                mediaSection.sharedPluginData.setItem(PLUGIN_ID, "richData", JSON.stringify(data));

                if(oldMediaSection){
                    placeInParent(mediaSection, oldMediaSection.topLeftInParent);
                    oldMediaSection.removeFromParent();
                }
                else
                    placeInParent(mediaSection);
            } catch (error) {
                console.log("Error creating mediaSection: ", error);
            }
        });
    } catch (error) {
        console.log("Error creating card: ", error);
    }
}

module.exports = MediaSection;