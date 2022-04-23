const { PLUGIN_ID } = require("../../constants");
const { selection } = require("scenegraph");
const { editDom, placeInParent, getAssetsByType, } = require("../../utils");
const assembleMediaSection = require("../MediaSection/assemble");
const defaultMediaSectionProps = require("../MediaSection/defaultProps");
const getMediaImages = require("../MediaSection/getMediaImages");

async function Hero(userProps){
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
                themeColor: "#F44663",
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
    let imageFills;
    
    try {
        const oldHero = userProps ? selection.items[0] : null;
        if(oldHero){
            if (props.image == "custom") {
                const mediaImageNodes = getMediaImages(oldHero);
                if(mediaImageNodes)
                    imageFills = mediaImageNodes.map(image => image ? image.fill : null);
            }
        }
        
        editDom(async (selection) => {
            try {
                const media = assembleMediaSection(
                    props, 
                    heroImages
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
                console.log("Error creating mediaSection: ", error);
            }
        });
    } catch (error) {
        console.log("Error creating card: ", error);
    }
}

module.exports = Hero;