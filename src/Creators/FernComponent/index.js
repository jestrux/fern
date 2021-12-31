const { selection } = require("scenegraph");

const { editDom, getAssetFileFromPath, placeInParent, tagNode } = require("../../utils");

const defaultComponentProps = require("./defaultProps");
const assembleComponent = require("./assemble");

async function FernComponent(userProps){
    let props = {
        ...defaultComponentProps,
        ...(userProps || {})
    };
    
    let logoImage = await getAssetFileFromPath("images/android.png");
    let dpImage = await getAssetFileFromPath("images/profile-image-placeholder.jpg");

    try {
        const oldComponent = userProps ? selection.items[0] : null;
        if(oldComponent){
            // const logoNode = getComponentComponent(oldComponent, "logo");
            // const dpNode = getComponentComponent(oldComponent, "dp");

            // logoImage = logoNode && logoNode.fill ? logoNode.fill : logoImage;
            // dpImage = dpNode && dpNode.fill ? dpNode.fill : dpImage;
        }
        
        editDom(() => {
            try {
                const component = assembleComponent(props, {
                    logoImage,
                    dpImage,
                });
                component.name = "FernComponent";

                tagNode(component, {  type: "FernComponent", ...props });

                if(oldComponent){
                    placeInParent(component, oldComponent.topLeftInParent);
                    oldComponent.removeFromParent();
                }
                else
                    placeInParent(component, {x: 0, y: 0});
            } catch (error) {
                console.log("Error creating component: ", error);
            }
        });
    } catch (error) {
        console.log("Error creating card: ", error);
    }
}

module.exports = FernComponent;