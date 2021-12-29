const { getNodeTag, getFernComponentChildByName } = require("../../utils");

function getNavbarComponent(navbar, component){
    const props = getNodeTag(navbar);

    if(!props) return null;

    const componentChildrenPathMap = {
        "leftSlot": "FernNavLeftSlot",
        "logo": "FernNavLeftSlot/FernNavSlotContent/FernNavLogo",
        "dp": "FernNavRightSlot/FernNavSlotContent/FernNavDp",
    };

    return getFernComponentChildByName(navbar, component, componentChildrenPathMap);
}

module.exports = getNavbarComponent;