const { getNodeTag, getFernComponentChildByName } = require("../../utils");

function getNavbarComponent(navbar, component){
    console.log("Navbar component: ", navbar, component);
    const props = getNodeTag(navbar);

    if(!props) return null;

    const componentChildrenPathMap = {
        "leftSlot": "FernNavLeftSlot",
        "leftLogo": "FernNavLeftSlot/FernNavSlotContent/FernNavLogo",
        "middleLogo": "FernNavMiddleSlot/FernNavSlotContent/FernNavLogo",
        "dp": "FernNavRightSlot/FernNavSlotContent/FernNavDp",
    };

    return getFernComponentChildByName(navbar, component, componentChildrenPathMap);
}

module.exports = getNavbarComponent;