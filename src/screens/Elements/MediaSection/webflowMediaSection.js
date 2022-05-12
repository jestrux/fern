const buttonSizeMap = require("../../../Creators/Button/buttonSizeMap");
const { webflowBorder, webflowBorderRadii } = require("../../../utils");

module.exports = function (props) {
  const { heading, subHeading, buttons, theme } = props;
  const { backgroundColor, shadow, border } = theme;
  const [mainButton, secondaryButton] = (buttons || "").split(",");

  const buttonProps = buttonSizeMap[theme.buttons.size];
  const [sm, md] = buttonProps.cornerRadius;
  const borderRadius = { none: 0, sm, md, full: 999 }[theme.buttons.roundness];

  let mainButtonStyles = `
    ${webflowBorder({width: 1.2, color: theme.buttons.themeColor || theme.color})}
    ${webflowBorderRadii(borderRadius)}
    background-color: ${theme.buttons.themeColor || theme.color};
    color: white;
  `;
  
  let secondaryButtonStyles = `
    ${webflowBorder({width: 1.2, color: theme.color})}
    ${webflowBorderRadii(borderRadius)}
    background-color: transparent; 
    color: ${theme.color};
  `;

  if(props.theme.buttons.reversed) {
    const mainButtonStylesClone = JSON.parse(JSON.stringify(mainButtonStyles));
    mainButtonStyles = secondaryButtonStyles;
    secondaryButtonStyles = mainButtonStylesClone;
  }

  return {
    type: "@webflow/XscpData",
    payload: {
      nodes: [
        {
          _id: "7523c514-ce3f-2803-a879-f35dc5be7555",
          tag: "div",
          classes: ["e201d317-b6a8-62bb-7c31-eef7bae08ec5"],
          children: ["44d4ce32-364e-8809-7ca6-0bdbff07dfa0"],
          type: "Section",
          data: { grid: { type: "section" }, tag: "div" },
        },
        {
          _id: "44d4ce32-364e-8809-7ca6-0bdbff07dfa0",
          tag: "div",
          classes: ["fe21a86d-f2e6-9e0a-4ed6-0b3fb6c71f96"],
          children: [
            "d96d78c5-b344-4f48-67de-51926d3ba5ef",
            "64c512dc-79e4-6dc1-d969-3fa0f3b302a4",
          ],
          type: "Block",
          data: { tag: "div" },
        },
        {
          _id: "d96d78c5-b344-4f48-67de-51926d3ba5ef",
          tag: "div",
          classes: ["77d69c17-ff9d-7d84-be02-e30f78fe3b25"],
          children: [
            "d96d78c5-b344-4f48-67de-51926d3ba5f0",
            "d96d78c5-b344-4f48-67de-51926d3ba5f2",
            ...(!buttons ? [] : [
              "mediaSectionButtonsId",
            ])
          ],
          type: "Block",
          data: { tag: "div" },
        },
        {
          _id: "d96d78c5-b344-4f48-67de-51926d3ba5f0",
          tag: "h1",
          classes: ["e201d317-b6a8-62bb-7c31-eef7bae08ec6"],
          children: ["d96d78c5-b344-4f48-67de-51926d3ba5f1"],
          type: "Heading",
          data: { tag: "h1" },
        },
        {
          _id: "d96d78c5-b344-4f48-67de-51926d3ba5f1",
          text: true,
          v: heading,
        },
        {
          _id: "d96d78c5-b344-4f48-67de-51926d3ba5f2",
          tag: "p",
          classes: ["e201d317-b6a8-62bb-7c31-eef7bae08ec7"],
          children: ["d96d78c5-b344-4f48-67de-51926d3ba5f3"],
          type: "Paragraph",
        },
        {
          _id: "d96d78c5-b344-4f48-67de-51926d3ba5f3",
          text: true,
          v: subHeading,
        },
        ...(!buttons ? [] : [
          {
            _id: "mediaSectionButtonsId",
            tag: "div",
            classes: ["e201d317-b6a8-62bb-7c31-eef7bae08ec8"],
            children: [
              "d96d78c5-b344-4f48-67de-51926d3ba5f5",
              ...(secondaryButton ? ["sectionTextSecondaryButtonId"] : [])
            ],
            type: "Block",
            data: { tag: "div", text: false },
          },
          {
            _id: "d96d78c5-b344-4f48-67de-51926d3ba5f5",
            tag: "a",
            classes: ["e201d317-b6a8-62bb-7c31-eef7bae08ec9"],
            children: ["d96d78c5-b344-4f48-67de-51926d3ba5f6"],
            type: "Link",
            data: {
              button: true,
              link: { mode: "external", url: "#" },
              block: "",
            },
          },
          {
            _id: "d96d78c5-b344-4f48-67de-51926d3ba5f6",
            text: true,
            v: mainButton,
          },
          ...(!secondaryButton ? [] : [
            {
              _id: "sectionTextSecondaryButtonId",
              tag: "a",
              classes: ["e201d317-b6a8-62bb-7c31-eef7bae08eca"],
              children: ["d96d78c5-b344-4f48-67de-51926d3ba5f8"],
              type: "Link",
              data: {
                button: true,
                link: { mode: "external", url: "#" },
                block: "",
              },
            },
            {
              _id: "d96d78c5-b344-4f48-67de-51926d3ba5f8",
              text: true,
              v: secondaryButton,
            },
          ]),
        ]),
        {
          _id: "64c512dc-79e4-6dc1-d969-3fa0f3b302a4",
          tag: "img",
          classes: ["5c006375-5441-cd29-dc1a-6904da56fe42"],
          children: [],
          type: "Image",
          data: {
            attr: {
              src: "https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg",
              loading: "lazy",
              width: "auto",
              height: "auto",
            },
            img: { id: "plugins/Basic/assets/placeholder.svg" },
          },
        },
      ],
      styles: [
        {
          _id: "e201d317-b6a8-62bb-7c31-eef7bae08ec5",
          fake: false,
          type: "class",
          name: "FernMediaSection",
          namespace: "",
          comb: "",
          styleLess: `
            background-color: ${backgroundColor};
            display: block; padding-top: 55px; padding-right: 55px; padding-bottom: 55px; padding-left: 55px; flex-direction: column; flex-wrap: nowrap; align-items: flex-start;
          `,
          variants: {},
          children: [],
          createdBy: "zzzzz19b79c288zzzzzzb301",
          selector: null,
        },
        {
          _id: "fe21a86d-f2e6-9e0a-4ed6-0b3fb6c71f96",
          fake: false,
          type: "class",
          name: "MediaSectionContainer",
          namespace: "",
          comb: "",
          styleLess:
            `flex-direction: ${theme.layout == "flip-x" ? "row-reverse": "row"};
            display: flex; max-width: 1100px; margin-right: auto; margin-bottom: auto; margin-left: auto;
            justify-content: space-between; align-items: center; grid-column-gap: 60px; grid-row-gap: 60px;
          `,
          variants: {},
          children: [],
          createdBy: "5eea119b79c2885ecfd3b301",
          selector: null,
        },
        {
          _id: "77d69c17-ff9d-7d84-be02-e30f78fe3b25",
          fake: false,
          type: "class",
          name: "MediaSectionText",
          namespace: "",
          comb: "",
          styleLess: "width: 50%; margin-right: 0px; padding-bottom: 5%;",
          variants: {},
          children: [],
          createdBy: "5eea119b79c2885ecfd3b301",
          selector: null,
        },
        {
          _id: "e201d317-b6a8-62bb-7c31-eef7bae08ec6",
          fake: false,
          type: "class",
          name: "MediaSectionHeading",
          namespace: "",
          comb: "",
          styleLess:
            `color: ${theme.heading.color || theme.color};
            margin-top: 0px; margin-bottom: 6px; font-size: 36px; text-align: left;
          `,
          variants: {},
          children: [],
          createdBy: "zzzzz19b79c288zzzzzzb301",
          selector: null,
        },
        {
          _id: "e201d317-b6a8-62bb-7c31-eef7bae08ec7",
          fake: false,
          type: "class",
          name: "MediaSectionSubheading",
          namespace: "",
          comb: "",
          styleLess: `
            color: ${theme.color};
            max-width: ${theme.subHeading.width}px; 
            font-size: 16px; text-align: left;
          `,
          variants: {},
          children: [],
          createdBy: "zzzzz19b79c288zzzzzzb301",
          selector: null,
        },
        ...(!buttons ? [] : [
          {
            _id: "e201d317-b6a8-62bb-7c31-eef7bae08ec8",
            fake: false,
            type: "class",
            name: "MediaSectionButtons",
            namespace: "",
            comb: "",
            styleLess:
              "display: flex; justify-content: flex-start; grid-column-gap: 10px; grid-row-gap: 10px; margin-top: 24px",
            variants: {},
            children: [],
            createdBy: "zzzzz19b79c288zzzzzzb301",
            selector: null,
          },
          {
            _id: "e201d317-b6a8-62bb-7c31-eef7bae08ec9",
            fake: false,
            type: "class",
            name: "MediaSectionMainButton",
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
              _id: "e201d317-b6a8-62bb-7c31-eef7bae08eca",
              fake: false,
              type: "class",
              name: "MediaSectionSecondaryButton",
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
        {
          _id: "5c006375-5441-cd29-dc1a-6904da56fe42",
          fake: false,
          type: "class",
          name: "MediaSectionImage",
          namespace: "",
          comb: "",
          styleLess: "width: 50%; height: 400px; object-fit: cover;",
          variants: {},
          children: [],
          createdBy: "5eea119b79c2885ecfd3b301",
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
