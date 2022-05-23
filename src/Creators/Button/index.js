const viewport = require("viewport");
const { editDom, placeInParent, tagNode } = require("../../utils");
const defaultProps = require("./defaultButtonProps");
const createButton = require("./createButton");

async function Button(userProps, {fromPreset = false} = {}){
    const props = {
        ...defaultProps,
        ...(userProps || {})
    };

    try {
        editDom(async (selection) => {
            const oldButton = userProps && !fromPreset ? selection.items[0] : null;

            try {
                const button = createButton(props);
                button.name = "FernButton";

                tagNode(button, {  type: "Button", ...props });

                if(oldButton){
                    placeInParent(button, oldButton.topLeftInParent);
                    oldButton.removeFromParent();
                }
                else {
                    placeInParent(button, {x: 120, y: viewport.bounds.y});
                }
            } catch (error) {
                console.log("Error creating button: ", error);
            }
        });
    } catch (error) {
        console.log("Error creating card: ", error);
    }
}

module.exports = Button;