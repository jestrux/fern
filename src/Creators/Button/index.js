const { editDom, placeInParent, tagNode } = require("../../utils");
const defaultProps = require("./defaultButtonProps");
const createButton = require("./createButton");

async function Button(userProps){
    const props = {
        ...defaultProps,
        ...(userProps || {})
    };

    try {
        editDom(async (selection) => {
            const oldButton = userProps ? selection.items[0] : null;

            try {
                const button = createButton(props);
                button.name = "FernButton";

                tagNode(button, {  type: "Button", ...props });

                if(oldButton){
                    placeInParent(button, oldButton.topLeftInParent);
                    oldButton.removeFromParent();
                }
                else
                    button.moveInParentCoordinates(30, 30);
            } catch (error) {
                console.log("Error creating button: ", error);
            }
        });
    } catch (error) {
        console.log("Error creating card: ", error);
    }
}

module.exports = Button;