const { SceneNode, selection } = require("scenegraph");
const commands = require("commands");
const { PLUGIN_ID } = require("../../constants");
const { editDom, getAssetFileFromPath, someTime, placeInParent } = require("../../utils");
const createNavContainer = require("./createNavContainer");
const createNavLinks = require("./createNavLinks");

async function Navbar(props){
    let {
        color = "white",
        shadow = true,
        border = true,
        linksPlacement = 'right',
        activeLink = "Home",
        links = ["Home", "About Us", "Our Services", "Contact Us"],
        buttons = ["Get Started"],
        socialMediaIcons = ["Facebook, Twitter, Instagram, Youtube"],
        profile = true,
        search = true,
    } = props || {};
    
    const logoImage = await getAssetFileFromPath("images/android.png");

    try {
        const oldNavbar = props ? selection.items[0] : null;
        let navBackground, navLogo, navMenu, navActiveLink, navActiveIndicator;
        editDom(async (selection) => {
            try {
                const [navBg, logo] = createNavContainer(props, logoImage);
                const [navLinks, activeLinkNode, activeLinkIndicator] = createNavLinks();

                navBackground = navBg;
                navLogo = logo;
                navMenu = navLinks;
                navActiveLink = activeLinkNode;
                navActiveIndicator = activeLinkIndicator;

                if(navActiveLink && navActiveIndicator){
                    selection.items = [navMenu, navActiveIndicator];
                    commands.alignLeft();
                    commands.alignBottom();
                    commands.group();
                    navActiveIndicator.moveInParentCoordinates(navActiveLink.topLeftInParent.x + 3, -1);
                    navMenu = selection.items[0];
                }
            } catch (error) {
                console.log("Error creating navbar: ", error);
            }
        });

        
        await someTime(0);
        
        console.log("Done waiting!");

        editDom(async (selection) => {
            try {
                selection.items = [navBackground, navMenu];
                commands.alignRight();
                navMenu.moveInParentCoordinates(-30, 0);
    
                selection.items = [navBackground, navLogo];
                commands.alignLeft();
                navLogo.moveInParentCoordinates(30, 0);
    
                selection.items = [navBackground, navLogo, navMenu];
                commands.alignVerticalCenter();
                
                commands.group();
                const navbar = selection.items[0];
                navbar.name = "FernNavbar";

                const data = { 
                    type: "Navbar",
                    color,
                    shadow,
                    border,
                    links,
                    linksPlacement,
                    activeLink,
                    buttons,
                    profile,
                    search,
                    socialMediaIcons,
                };

                navbar.sharedPluginData.setItem(PLUGIN_ID, "richData", JSON.stringify(data));

                if(oldNavbar){
                    placeInParent(navbar, oldNavbar.topLeftInParent);
                    oldNavbar.removeFromParent();
                }
                else
                    placeInParent(navbar);
            } catch (error) {
                console.log("Error creating navbar: ", error);
            }
        });
    } catch (error) {
        console.log("Error creating card: ", error);
    }
}

module.exports = Navbar;