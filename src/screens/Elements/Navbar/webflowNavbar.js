const { randomUuid, webflowBorder } = require("../../../utils");
const tinyColor = require("../../../utils/tinycolor");
module.exports = function (props) {
  const { theme } = props;
  const { backgroundColor, shadow, border } = theme;
  let styles = `
        height: 70px; 
        background-color: ${backgroundColor};
    `;
  if (shadow) styles += "box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.16);";
  else if (border){
      const borderColor = new tinyColor(border.color);
      borderColor.setAlpha(border.opacity);
    styles += webflowBorder({width: border.thickness, color: borderColor.toRgbString(), bottomOnly: true});
  }

  styles = styles.split("\n").map(s => s.trim()).join("");

  const elementId = randomUuid();
  const styleId = randomUuid();

  return {
    type: "@webflow/XscpData",
    payload: {
      nodes: [
        {
          _id: "navbarWrapper" + elementId,
          tag: "div",
          classes: [styleId],
          children: [],
          type: "Section",
          data: {
            tag: "div",
            grid: {
              type: "section",
            },
          },
        },
      ],
      styles: [
        {
          _id: styleId,
          fake: false,
          type: "class",
          name: "fern-navbar" + randomUuid(),
          namespace: "",
          comb: "",
          styleLess: styles,
          variants: {},
          children: [],
          createdBy: "zzzzz19b79c288zzzzzzb301",
          selector: null,
        },
      ],
      assets: [],
      ix1: [],
      ix2: {
        interactions: [],
        events: [],
        actionLists: [],
      },
    },
    meta: {
      unlinkedSymbolCount: 0,
      droppedLinks: 0,
      dynBindRemovedCount: 0,
      dynListBindRemovedCount: 0,
      paginationRemovedCount: 0,
    },
  };
};
