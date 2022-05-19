const { PLUGIN_ID } = require("../../constants");
const { selection } = require("scenegraph");
const { editDom, placeInParent, } = require("../../utils");
const assembleCTASection = require("./assemble");
const defaultCTASectionProps = require("./defaultProps");

async function CTASection(userProps){
    const props = {
        ...defaultCTASectionProps,
        ...(userProps || {}),
    };
    
    try {
        const oldCTASection = userProps ? selection.items[0] : null;
        
        editDom(async (selection) => {
            try {
                const cta = assembleCTASection(props);
                selection.items = [cta];
                cta.name = "FernCTA";

                const data = { 
                    type: "CTA",
                    ...(props ? props: defaultCTASectionProps),
                };

                cta.sharedPluginData.setItem(PLUGIN_ID, "richData", JSON.stringify(data));

                if(oldCTASection){
                    placeInParent(cta, oldCTASection.topLeftInParent);
                    oldCTASection.removeFromParent();
                }
                else
                    placeInParent(cta, {x: 0, y: 0});
            } catch (error) {
                console.log("Error creating cta section: ", error);
            }
        });
    } catch (error) {
        console.log("Error creating card: ", error);
    }
}

module.exports = CTASection;