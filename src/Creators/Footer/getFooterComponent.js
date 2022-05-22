const { getNodeTag, getFernComponentChildByName } = require("../../utils");

function getFooterComponent(navbar, component){
    const props = getNodeTag(navbar);

    if(!props) return null;

    const componentChildrenPathMap = {
        "leftSlot": "Container/FernFooterLeftSlot",
        "logo": "Container/FernFooterAboutSlot/FernFooterSlotContent/FernNavLogo",
    };

    return getFernComponentChildByName(navbar, component, componentChildrenPathMap);
}

module.exports = getFooterComponent;