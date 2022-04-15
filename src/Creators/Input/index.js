const { editDom, placeInParent, tagNode } = require("../../utils");
const defaultProps = require("./defaultProps");
const createInput = require("./createInput");

async function Input(userProps){
    const props = {
        ...defaultProps,
        ...(userProps || {})
    };

    try {
        editDom(async (selection) => {
            const oldInput = userProps ? selection.items[0] : null;

            try {
                const input = createInput(props);
                input.name = "FernInput";

                tagNode(input, {  type: "Input", ...props });

                if(oldInput){
                    placeInParent(input, oldInput.topLeftInParent);
                    oldInput.removeFromParent();
                }
                else
                    input.moveInParentCoordinates(30, 30);
            } catch (error) {
                console.log("Error creating input: ", error);
            }
        });
    } catch (error) {
        console.log("Error creating card: ", error);
    }
}

module.exports = Input;