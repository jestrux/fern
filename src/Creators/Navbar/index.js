const { selection } = require("scenegraph");

const { editDom, getAssetFileFromPath, placeInParent, tagNode } = require("../../utils");

const defaultNavbarProps = require("./defaultProps");
const assembleNavbar = require("./assemble");

async function Navbar(userProps){
    let props = {
        ...defaultNavbarProps,
        ...(userProps || {})
    };
    
    const logoImage = await getAssetFileFromPath("images/android.png");
    const profileImage = await getAssetFileFromPath("images/profile-image-placeholder.jpg");

    try {
        const oldNavbar = userProps ? selection.items[0] : null;
        
        editDom(() => {
            try {
                const navbar = assembleNavbar(props, {
                    logoImage,
                    profileImage,
                });
                navbar.name = "FernNavbar";

                tagNode(navbar, {  type: "Navbar", ...props });

                if(oldNavbar){
                    placeInParent(navbar, oldNavbar.topLeftInParent);
                    oldNavbar.removeFromParent();
                }
                else
                    placeInParent(navbar, {x: 0, y: 0});
            } catch (error) {
                console.log("Error creating navbar: ", error);
            }
        });
    } catch (error) {
        console.log("Error creating card: ", error);
    }
}

module.exports = Navbar;