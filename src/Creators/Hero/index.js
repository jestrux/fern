const { PLUGIN_ID } = require("../../constants");
const { selection } = require("scenegraph");
const { editDom, placeInParent, getAssetsByType, getNodeTag, } = require("../../utils");
const assembleMediaSection = require("../MediaSection/assemble");
const defaultMediaSectionProps = require("../MediaSection/defaultProps");
const getMediaImage = require("../MediaSection/getMediaImage");

async function Hero(userProps, {fromPreset = false} = {}){
    const props = {
        ...defaultMediaSectionProps,
        heading: "Supporting all county mothers in need",
        subHeading: "Our mission is to make sure we keep track of all mothers who are unable to fend for themselves and give them the support they need.",
        buttons: "More about us, See beneficiaries",
        image: "5",
        theme: {
            ...defaultMediaSectionProps.theme,
            backgroundColor: "white",
            verticalPadding: 90,
            textNegativeMargin: 30,
            heading: {
                ...defaultMediaSectionProps.theme.heading,
                size: "lg",
                width: 600,
                brazen: true,
            },
            subHeading: {
                ...defaultMediaSectionProps.theme.subHeading,
                size: "md",
            },
            buttons: {
                ...defaultMediaSectionProps.theme.buttons,
                size: "md",
                icons: true,
                themeColor: "#E2406C",
            },
            image: {
                ...defaultMediaSectionProps.theme.image,
                height: 464,
                width: 760,
            },
        },
        ...(userProps || {}),
    };

    const heroImages = await getAssetsByType("banner");
    let mediaImage = heroImages[`banner${props.image || "5"}`];
    let searchQuery;
    
    try {
        const oldHero = userProps && !fromPreset ? selection.items[0] : null;
        if(oldHero){
            const mediaImageNode = getMediaImage(oldHero)
            if(mediaImageNode) {
                mediaImage = mediaImageNode.fill;
                const imageProps = getNodeTag(mediaImageNode);
                searchQuery = imageProps.searchQuery;
            }
        }
        
        editDom(async (selection) => {
            try {
                const media = assembleMediaSection(
                    { ...props, }, 
                    {mediaImage, searchQuery}
                );
                
                selection.items = [media];
                media.name = "FernHero";
                media.sharedPluginData.setItem(PLUGIN_ID, "richData", JSON.stringify({ 
                    type: "Hero", ...props 
                }));

                if(oldHero){
                    placeInParent(media, oldHero.topLeftInParent);
                    oldHero.removeFromParent();
                }
                else
                    placeInParent(media, {x: 0, y: 0});
            } catch (error) {
                console.log("Error creating hero: ", error);
            }
        });
    } catch (error) {
        console.log("Error creating hero: ", error);
    }
}

module.exports = Hero;