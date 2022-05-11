const buttonSizeMap = require("../../../Creators/Button/buttonSizeMap");
const { webflowBorder, webflowBorderRadii } = require("../../../utils");
const tinyColor = require("../../../utils/tinycolor");

module.exports = function (props) {
  const {
    text,
    theme
  } = props;
  const { iconPlacement, size, color, shadow, style, roundness } = theme;

  const buttonProps = buttonSizeMap[size];
  const [sm, md] = buttonProps.cornerRadius;
  const borderRadius = { none: 0, sm, md, full: 999 }[roundness];
  const textColor =
    style != "fill" ? color : tinyColor(color).isLight() ? "black" : "white";
  const styleLess = `
    ${webflowBorder({width: 1.2, color})}
    ${webflowBorderRadii(borderRadius)}
    background-color: ${style != "fill" ? "transparent" : color};
    color: ${textColor};
  `.split("\n").map(s => s.trim()).join("");

  return {
    type: "@webflow/XscpData",
    payload: {
      nodes: [
        {
          _id: "fernButton",
          tag: "a",
          classes: ["buttonStyles"],
          children: ["buttonText"],
          type: "Link",
          data: { button: true, link: { mode: "external", url: "#" } },
        },
        {
          _id: "buttonText",
          text: true,
          v: text,
        },
      ],
      styles: [
        {
          _id: "buttonStyles",
          fake: false,
          type: "class",
          name: "Button 2",
          namespace: "",
          comb: "",
          styleLess,
          variants: {},
          children: [],
          createdBy: "zzzzz19b79c288zzzzzzb301",
          selector: null,
        },
      ],
      assets: [],
      ix1: [],
      ix2: { interactions: [], events: [], actionLists: [] },
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
