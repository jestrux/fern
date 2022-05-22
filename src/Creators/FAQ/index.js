const { PLUGIN_ID } = require("../../constants");
const viewport = require("viewport");
const { selection } = require("scenegraph");
const { editDom, placeInParent, getAssetsByType, } = require("../../utils");
const assembleFAQ = require("./assemble");
const defaultFAQProps = require("./defaultProps");

async function FAQ(userProps){
    const props = {
        ...defaultFAQProps,
        ...(userProps || {}),
    };

    const bannerImages = await getAssetsByType("banner");
    
    try {
        const oldFAQ = userProps ? selection.items[0] : null;
        
        editDom(async (selection) => {
            try {
                const faq = assembleFAQ(
                    props, 
                    bannerImages
                );
                
                selection.items = [faq];
                faq.name = "FernFAQ";

                const data = { 
                    type: "FAQ",
                    ...(props ? props: defaultFAQProps),
                };

                faq.sharedPluginData.setItem(PLUGIN_ID, "richData", JSON.stringify(data));

                if(oldFAQ){
                    placeInParent(faq, oldFAQ.topLeftInParent);
                    oldFAQ.removeFromParent();
                }
                else {
                    placeInParent(faq, {x: 0, y: viewport.bounds.y});
                }
            } catch (error) {
                console.log("Error creating faq: ", error);
            }
        });
    } catch (error) {
        console.log("Error creating faq: ", error);
    }
}

module.exports = FAQ;