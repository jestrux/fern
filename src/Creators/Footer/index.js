const { selection } = require("scenegraph");

const { editDom, getAssetFileFromPath, placeInParent, tagNode } = require("../../utils");

const defaultFooterProps = require("./defaultProps");
const assembleFooter = require("./assemble");
const getFooterComponent = require("./getFooterComponent");

async function Footer(userProps){
    let props = {
        ...defaultFooterProps,
        ...(userProps || {})
    };
    
    let logoImage = await getAssetFileFromPath("images/android.png");

    try {
        const oldFooter = userProps ? selection.items[0] : null;
        if(oldFooter){
            const logoNode = getFooterComponent(oldFooter, "logo");

            logoImage = logoNode && logoNode.fill ? logoNode.fill : logoImage;
        }
        
        editDom(() => {
            try {
                const footer = assembleFooter(props, { logoImage, });
                footer.name = "FernFooter";

                tagNode(footer, {  type: "Footer", ...props });

                if(oldFooter){
                    placeInParent(footer, oldFooter.topLeftInParent);
                    oldFooter.removeFromParent();
                }
                else
                    placeInParent(footer, {x: 0, y: 0});
            } catch (error) {
                console.log("Error creating footer: ", error);
            }
        });
    } catch (error) {
        console.log("Error creating card: ", error);
    }
}

module.exports = Footer;