const { PLUGIN_ID } = require("../../constants");
const { selection } = require("scenegraph");
const { editDom, placeInParent, getAssetsByType, } = require("../../utils");
const assembleFeatureSection = require("./assemble");
const defaultFeatureSectionProps = require("./defaultProps");

async function FeatureSection(userProps){
    const props = {
        ...defaultFeatureSectionProps,
        ...(userProps || {}),
    };

    const bannerImages = await getAssetsByType("banner");
    
    try {
        const oldFeatureSection = userProps ? selection.items[0] : null;
        
        editDom(async (selection) => {
            try {
                const featureSection = assembleFeatureSection(
                    props, 
                    bannerImages
                );
                
                selection.items = [featureSection];
                featureSection.name = "FernFeatureSection";

                const data = { 
                    type: "FeatureSection",
                    ...(props ? props: defaultFeatureSectionProps),
                };

                featureSection.sharedPluginData.setItem(PLUGIN_ID, "richData", JSON.stringify(data));

                if(oldFeatureSection){
                    placeInParent(featureSection, oldFeatureSection.topLeftInParent);
                    oldFeatureSection.removeFromParent();
                }
                else
                    placeInParent(featureSection, {x: 0, y: 0});
            } catch (error) {
                console.log("Error creating FeatureSection: ", error);
            }
        });
    } catch (error) {
        console.log("Error creating feature section: ", error);
    }
}

module.exports = FeatureSection;