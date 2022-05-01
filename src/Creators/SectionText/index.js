const { PLUGIN_ID } = require("../../constants");
const { selection } = require("scenegraph");
const { editDom, placeInParent, getAssetsByType, } = require("../../utils");
const assembleSectionText = require("./assemble");
const defaultSectionTextProps = require("./defaultProps");

async function SectionText(userProps){
    const props = {
        ...defaultSectionTextProps,
        ...(userProps || {}),
    };
    
    try {
        const oldSectionText = userProps ? selection.items[0] : null;
        
        editDom(async (selection) => {
            try {
                const sectionText = assembleSectionText(
                    props, 
                );
                
                selection.items = [sectionText];
                sectionText.name = "FernSectionText";

                const data = { 
                    type: "SectionText",
                    ...(props ? props: defaultSectionTextProps),
                };

                sectionText.sharedPluginData.setItem(PLUGIN_ID, "richData", JSON.stringify(data));

                if(oldSectionText){
                    placeInParent(sectionText, oldSectionText.topLeftInParent);
                    oldSectionText.removeFromParent();
                }
                else
                    placeInParent(sectionText, {x: 0, y: 0});
            } catch (error) {
                console.log("Error creating SectionText: ", error);
            }
        });
    } catch (error) {
        console.log("Error creating feature section: ", error);
    }
}

module.exports = SectionText;