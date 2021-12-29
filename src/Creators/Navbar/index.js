const { selection } = require("scenegraph");

const { editDom, getAssetFileFromPath, placeInParent, tagNode } = require("../../utils");

const defaultNavbarProps = require("./defaultProps");
const assembleNavbar = require("./assemble");
const getNavbarComponent = require("./getNavbarComponent");

async function Navbar(userProps){
    let props = {
        ...defaultNavbarProps,
        ...(userProps || {})
    };
    
    let logoImage = await getAssetFileFromPath("images/android.png");
    let dpImage = await getAssetFileFromPath("images/profile-image-placeholder.jpg");

    try {
        const oldNavbar = userProps ? selection.items[0] : null;
        if(oldNavbar){
            const logoNode = getNavbarComponent(oldNavbar, "logo");
            const dpNode = getNavbarComponent(oldNavbar, "dp");

            logoImage = logoNode && logoNode.fill ? logoNode.fill : logoImage;
            dpImage = dpNode && dpNode.fill ? dpNode.fill : dpImage;
        }
        
        editDom(() => {
            try {
                const navbar = assembleNavbar(props, {
                    logoImage,
                    dpImage,
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