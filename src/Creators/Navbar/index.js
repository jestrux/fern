const { selection } = require("scenegraph");

const { editDom, getAssetFileFromPath, someTime, placeInParent, tagNode } = require("../../utils");

const defaultNavbarProps = require("./defaultProps");
const createNavContainer = require("./createContainer");
const createNavMenu = require("./createMenu");
const assembleNavbar = require("./assemble");

async function Navbar(userProps){
    let props = {
        ...defaultNavbarProps,
        ...(userProps || {})
    };
    
    const logoImage = await getAssetFileFromPath("images/android.png");

    try {
        const oldNavbar = userProps ? selection.items[0] : null;
        let navComponents = [];
        
        editDom(() => {
            try {
                const [navBg, logo] = createNavContainer(props, logoImage);
                const navMenu = createNavMenu(props);
                navComponents = [navBg, logo, navMenu];
            } catch (error) {
                console.log("Error creating navbar: ", error);
            }
        });
        
        await someTime(0);

        editDom(async () => {
            try {
                const navbar = assembleNavbar(navComponents);
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