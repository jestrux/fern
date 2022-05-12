const buttonSizeMap = require("../../../Creators/Button/buttonSizeMap");
const { webflowBorder, webflowBorderRadii } = require("../../../utils");

module.exports = function (props) {
  const { heading, subHeading, buttons, theme } = props;
  const { backgroundColor, shadow, border } = theme;
  const [mainButton, secondaryButton] = (buttons || "").split(",");;

  const buttonProps = buttonSizeMap[theme.buttons.size];
  const [sm, md] = buttonProps.cornerRadius;
  const borderRadius = { none: 0, sm, md, full: 999 }[theme.buttons.roundness];
  
  return {
    type: "@webflow/XscpData",
    payload: {
      nodes: [
        {
          _id: "sectionText",
          tag: "div",
          classes: ["sectionTextClassId"],
          children: [
            "sectionTextHeadingId",
            "sectionTextSubHeadingId",
            ...(!buttons ? [] : ["sectionTextButtonsId",])
          ],
          type: "Section",
          data: {
            grid: {
              type: "section",
            },
            tag: "div",
          },
        },
        {
          _id: "sectionTextHeadingId",
          tag: "h1",
          classes: ["sectionTextHeadingClassId"],
          children: ["sectionTextHeadingTextId"],
          type: "Heading",
          data: {
            tag: "h1",
          },
        },
        {
          _id: "sectionTextHeadingTextId",
          text: true,
          v: heading,
        },
        {
          _id: "sectionTextSubHeadingId",
          tag: "p",
          classes: ["sectionTextSubheadingClassId"],
          children: [
            "sectionTextSubHeadingTextId",
          ],
          type: "Paragraph",
        },
        {
          _id: "sectionTextSubHeadingTextId",
          text: true,
          v: subHeading,
        },
        ...(!buttons ? [] : [
          {
            _id: "sectionTextButtonsId",
            tag: "div",
            classes: ["sectionTextButtonsClassId"],
            children: [
              "sectionTextMainButtonId",
              ...(secondaryButton ? ["sectionTextSecondaryButtonId"] : [])
            ],
            type: "Block",
            data: {
              tag: "div",
            },
          },
          {
            _id: "sectionTextMainButtonId",
            tag: "a",
            classes: ["sectionTextMainButtonClassId"],
            children: ["sectionTextMainButtonTextId"],
            type: "Link",
            data: {
              button: true,
              link: {
                mode: "external",
                url: "#",
              },
              block: "",
            },
          },
          {
            _id: "sectionTextMainButtonTextId",
            text: true,
            v: mainButton,
          },
          ...(!secondaryButton ? [] : [
              {
                _id: "sectionTextSecondaryButtonId",
                tag: "a",
                classes: ["sectionTextSecondaryButtonClassId"],
                children: ["sectionTextSecondaryButtonTextId"],
                type: "Link",
                data: {
                  button: true,
                  link: {
                    mode: "external",
                    url: "#",
                  },
                  block: "",
                },
              },
              {
                _id: "sectionTextSecondaryButtonTextId",
                text: true,
                v: secondaryButton,
              },
          ])
        ]),
      ],
      styles: [
        {
          _id: "sectionTextClassId",
          fake: false,
          type: "class",
          name: "FernSectionText",
          namespace: "",
          comb: "",
          styleLess:
            `background-color: ${backgroundColor}; padding-top: 70px; padding-bottom: 70px; display: flex; flex-direction: column; align-items: center;`,
          variants: {},
          children: [],
          createdBy: "zzzzz19b79c288zzzzzzb301",
          selector: null,
        },
        {
          _id: "sectionTextHeadingClassId",
          fake: false,
          type: "class",
          name: "FernSectionTextHeading",
          namespace: "",
          comb: "",
          styleLess:
            `color: ${theme.heading.color || theme.color};margin-top: 0px; margin-bottom: 6px; font-size: 36px; text-align: center;`,
          variants: {},
          children: [],
          createdBy: "zzzzz19b79c288zzzzzzb301",
          selector: null,
        },
        {
          _id: "sectionTextSubheadingClassId",
          fake: false,
          type: "class",
          name: "FernSectionTextSubheading",
          namespace: "",
          comb: "",
          styleLess: `
            color: ${theme.subHeading.color || theme.color};
            max-width: ${theme.subHeading.width}px; 
            font-size: 16px; text-align: center;
          `,
          variants: {},
          children: [],
          createdBy: "zzzzz19b79c288zzzzzzb301",
          selector: null,
        },
        ...(!buttons ? [] : [
          {
            _id: "sectionTextButtonsClassId",
            fake: false,
            type: "class",
            name: "FernSectionButtons",
            namespace: "",
            comb: "",
            styleLess:
              "display: flex; justify-content: center; grid-column-gap: 10px; grid-row-gap: 10px;",
            variants: {},
            children: [],
            createdBy: "zzzzz19b79c288zzzzzzb301",
            selector: null,
          },
          {
            _id: "sectionTextMainButtonClassId",
            fake: false,
            type: "class",
            name: "FernSectionTextMainButton",
            namespace: "",
            comb: "",
            styleLess: `
            ${webflowBorder({width: 1.2, color: theme.buttons.themeColor || theme.color})}
            ${webflowBorderRadii(borderRadius)}
            background-color: ${theme.buttons.themeColor || theme.color};
            color: white;
          `,
            variants: {},
            children: [],
            createdBy: "zzzzz19b79c288zzzzzzb301",
            selector: null,
          },
          ...(!secondaryButton ? [] : [
              {
                _id: "sectionTextSecondaryButtonClassId",
                fake: false,
                type: "class",
                name: "FernSectionTextSecondaryButton",
                namespace: "",
                comb: "",
                styleLess: `
                  ${webflowBorder({width: 1.2, color: theme.color})}
                  ${webflowBorderRadii(borderRadius)}
                  background-color: transparent; 
                  color: ${theme.color};
              `,
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
