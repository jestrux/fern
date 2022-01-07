const { Rectangle, Color } = require("scenegraph");
const { insertNode } = require("../../../utils");

function footerSubscribeComponent({ width, height, color }){
    let bg = new Rectangle();
    bg.resize(400, 300);
    bg.fill = new Color("#ddd");
    bg.strokeEnabled = false;
    insertNode(bg);

    return bg;
}

module.exports = footerSubscribeComponent;