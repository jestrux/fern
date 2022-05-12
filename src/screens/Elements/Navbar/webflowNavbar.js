const buttonSizeMap = require("../../../Creators/Button/buttonSizeMap");
const { randomUuid, webflowBorder, webflowBorderRadii } = require("../../../utils");
const tinyColor = require("../../../utils/tinycolor");
module.exports = function (props) {
  const { buttons, theme } = props;
  const { backgroundColor, shadow, border } = theme;
  let bgStyles = `
        height: 70px; 
        background-color: ${backgroundColor};
        position: relative;
    `;
  if (shadow) bgStyles += "box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.16);";
  else if (border) {
    const borderColor = new tinyColor(border.color);
    borderColor.setAlpha(border.opacity);
    bgStyles += webflowBorder({
      width: border.thickness,
      color: borderColor.toRgbString(),
      bottomOnly: true,
    });
  }

  bgStyles = bgStyles
    .split("\n")
    .map(s => s.trim())
    .join("");

  const [mainButton, secondaryButton] = (props.rightSlot.buttons || "").split(",");;
  const buttonProps = buttonSizeMap[theme.buttons.size];
  const [sm, md] = buttonProps.cornerRadius;
  const borderRadius = { none: 0, sm, md, full: 999 }[theme.buttons.roundness];

  let mainButtonStyles = `
    ${webflowBorder({width: 1.2, color: theme.color})}
    ${webflowBorderRadii(borderRadius)}
    background-color: transparent; 
    color: ${theme.color};
  `;

  let secondaryButtonStyles = `
    ${webflowBorder({width: 1.2, color: theme.buttons.themeColor || theme.color})}
    ${webflowBorderRadii(borderRadius)}
    background-color: ${theme.buttons.themeColor || theme.color};
    color: white;
  `;

  if((secondaryButton && props.theme.buttons.reversed) || (!secondaryButton && !props.theme.buttons.reversed)) {
    let mainButtonStylesClone = JSON.parse(JSON.stringify(mainButtonStyles));
    mainButtonStyles = secondaryButtonStyles;
    secondaryButtonStyles = mainButtonStylesClone;
  }

  const links = props.rightSlot.menu.links.split(",").map((link, index) => {
    const linkId = randomUuid();
    const textId = randomUuid();
    const isActiveLink = link.trim() == props.rightSlot.menu.activeLink.trim();

    return [
      {
        _id: linkId,
        tag: "a",
        "classes": [
          "a7946ff7-7e35-bba9-9ba8-32dbe588b6b1",
          ...(isActiveLink ? ["7c3d0c51-6a26-5be2-9e17-742bed396a34"] : []),
        ],
        children: [textId],
        type: "Link",
        data: {
          button: false,
          link: {
            mode: "external",
            url: "#",
          },
        },
      },
      {
        _id: textId,
        text: true,
        v: link.trim(),
      },
    ];
  });

  return {
    type: "@webflow/XscpData",
    payload: {
      nodes: [
        {
          _id: "f98b76c5-fab0-1b0f-960b-eb70833066f6",
          tag: "div",
          classes: ["295b26d0-b91a-7588-d655-ad41ba07cab0"],
          children: ["39a6d71e-e959-f349-79d5-f4b2c1a850b8"],
          type: "Section",
          data: {
            tag: "div",
            grid: {
              type: "section",
            },
          },
        },
        {
          _id: "39a6d71e-e959-f349-79d5-f4b2c1a850b8",
          tag: "div",
          classes: ["navContainerClassId"],
          children: [
            "logoId",
            "rightSlotId",
          ],
          type: "Block",
          data: {
            tag: "div",
          },
        },
        {
          _id: "logoId",
          tag: "div",
          classes: ["27166d00-fdc2-b723-b8eb-71c6e264675f"],
          children: ["40d406d4-fc6c-73a3-f6c4-b1b65a53a44d"],
          type: "Block",
          data: {
            text: true,
            tag: "div",
          },
        },
        {
          _id: "40d406d4-fc6c-73a3-f6c4-b1b65a53a44d",
          text: true,
          v: "Fern.",
        },
        {
          _id: "rightSlotId",
          tag: "div",
          classes: ["97e0c99d-fcb3-13cc-3fa8-a56918e33e1d"],
          children: [
            "rightNavLinksId",
            ...(!props.rightSlot.buttons ? [] : ["rightNavButtonsId",])
          ],
          type: "Block",
          data: {
            text: true,
            tag: "div",
          },
        },
        {
          _id: "rightNavLinksId",
          tag: "nav",
          classes: ["97e0c99d-fcb3-13cc-3fa8-a56918e5513a"],
          children: links.map(([link]) => link._id),
          type: "Block",
          data: {
            tag: "nav",
          },
        },
        ...links.flat(),
        ...(!props.rightSlot.buttons ? [] : [
          {
            _id: "rightNavButtonsId",
            tag: "div",
            classes: ["e201d317-b6a8-62bb-7c31-aa7fbae08ec8"],
            children: [
              "d96d78c5-b344-4f48-67de-51926d3ba621",
              ...(secondaryButton ? ["sectionTextSecondaryButtonId"] : []),
            ],
            type: "Block",
            data: { tag: "div", text: false },
          },
          {
            _id: "d96d78c5-b344-4f48-67de-51926d3ba621",
            tag: "a",
            classes: ["e201d317-b6a8-62bb-7c31-aa7fbae08ec9"],
            children: ["d96d78c5-b344-4f48-67de-51926d3baa71"],
            type: "Link",
            data: {
              button: true,
              link: { mode: "external", url: "#" },
              block: "",
            },
          },
          {
            _id: "d96d78c5-b344-4f48-67de-51926d3baa71",
            text: true,
            v: mainButton,
          },
          ...(!secondaryButton ? [] : [
            {
              _id: "sectionTextSecondaryButtonId",
              tag: "a",
              classes: ["e201d317-b6a8-62bb-7c31-aa7fbae08eca"],
              children: ["d96d78c5-b344-4f48-67de-51926d3bad12"],
              type: "Link",
              data: {
                button: true,
                link: { mode: "external", url: "#" },
                block: "",
              },
            },
            {
              _id: "d96d78c5-b344-4f48-67de-51926d3bad12",
              text: true,
              v: secondaryButton,
            },
          ]),
        ])
      ],
      styles: [
        {
          _id: "295b26d0-b91a-7588-d655-ad41ba07cab0",
          fake: false,
          type: "class",
          name: "FernNavbar",
          namespace: "",
          comb: "",
          styleLess: bgStyles,
          variants: {},
          children: [],
          createdBy: "zzzzz19b79c288zzzzzzb301",
          selector: null,
        },
        {
          _id: "navContainerClassId",
          fake: false,
          type: "class",
          name: "NavContainer",
          namespace: "",
          comb: "",
          styleLess:
            "display: flex; height: 100%; max-width: 1200px; margin-right: auto; margin-left: auto; justify-content: space-between; align-items: center;",
          variants: {},
          children: [],
          createdBy: "5eea119b79c2885ecfd3b301",
          selector: null,
        },
        {
          _id: "27166d00-fdc2-b723-b8eb-71c6e264675f",
          fake: false,
          type: "class",
          name: "Logo",
          namespace: "",
          comb: "",
          styleLess: `
            color: ${theme.color};
            font-family: DM Serif Display; font-size: 26px; font-weight: 700;
          `,
          variants: {},
          children: [],
          createdBy: "5eea119b79c2885ecfd3b301",
          selector: null,
        },
        {
          _id: "97e0c99d-fcb3-13cc-3fa8-a56918e33e1d",
          fake: false,
          type: "class",
          name: "RightNavSlot",
          namespace: "",
          comb: "",
          styleLess:
            "display: flex; height: 100%; align-items: center; grid-column-gap: 16px; grid-row-gap: 16px;",
          variants: {},
          children: [],
          createdBy: "5eea119b79c2885ecfd3b301",
          selector: null,
        },
        {
          _id: "97e0c99d-fcb3-13cc-3fa8-a56918e5513a",
          fake: false,
          type: "class",
          name: "NavbarLinks",
          namespace: "",
          comb: "",
          styleLess:
            "display: flex; height: 100%; align-items: center; grid-column-gap: 12px; grid-row-gap: 12px;",
          variants: {},
          children: [],
          createdBy: "5eea119b79c2885ecfd3b301",
          selector: null,
        },
        {
          _id: "a7946ff7-7e35-bba9-9ba8-32dbe588b6b1",
          fake: false,
          type: "class",
          name: "NavbarLink",
          namespace: "",
          comb: "",
          styleLess: `
            color: ${theme.color};
            text-decoration: none;
            display: flex; align-items: center; 
            padding-right: 12px; padding-left: 12px; 
            border-bottom-style: solid; 
            border-bottom-width: ${props.theme.activeIndicator ? "2px" : "0"}; 
            height: 100%; 
            border-bottom-color: transparent;
          `,
          variants: {},
          children: ["7c3d0c51-6a26-5be2-9e17-742bed396a34"],
          createdBy: "5eea119b79c2885ecfd3b301",
          selector: null,
        },
        {
          _id: "7c3d0c51-6a26-5be2-9e17-742bed396a34",
          fake: false,
          type: "class",
          name: "Active",
          namespace: "",
          comb: "&",
          styleLess: `color: ${theme.themeColor || theme.color};border-bottom-color: ${theme.themeColor || theme.color};`,
          variants: {},
          children: [],
          createdBy: "5eea119b79c2885ecfd3b301",
          selector: null,
        },
        ...(!props.rightSlot.buttons ? [] : [
          {
            _id: "e201d317-b6a8-62bb-7c31-aa7fbae08ec8",
            fake: false,
            type: "class",
            name: "NavbarButtons",
            namespace: "",
            comb: "",
            styleLess:
              "display: flex; justify-content: flex-start; grid-column-gap: 7px; grid-row-gap: 7px;",
            variants: {},
            children: [],
            createdBy: "zzzzz19b79c288zzzzzzb301",
            selector: null,
          },
          {
            _id: "e201d317-b6a8-62bb-7c31-aa7fbae08ec9",
            fake: false,
            type: "class",
            name: "NavbarMainButton",
            namespace: "",
            comb: "",
            styleLess: mainButtonStyles,
            variants: {},
            children: [],
            createdBy: "zzzzz19b79c288zzzzzzb301",
            selector: null,
          },
          ...(!secondaryButton ? [] : [
            {
              _id: "e201d317-b6a8-62bb-7c31-aa7fbae08eca",
              fake: false,
              type: "class",
              name: "NavbarSecondaryButton",
              namespace: "",
              comb: "",
              styleLess: secondaryButtonStyles,
              variants: {},
              children: [],
              createdBy: "zzzzz19b79c288zzzzzzb301",
              selector: null,
            },
          ]),
        ]),
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
