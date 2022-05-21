const mediaSectionSchema = {
  heading: {
    type: "text",
    defaultValue: "Supporting all county mothers in need",
    sectionedGroup: "text",
    optional: "group",
  },
  subHeading: {
    type: "text",
    defaultValue:
      "Our mission is to make sure we keep track of all mothers who are unable to fend for themselves and give them the support they need.",
    sectionedGroup: "text",
  },
  checklist: {
    type: "boolean",
    sectionedGroup: "text",
  },
  buttons: {
    type: "text",
    defaultValue: "Get to know us",
    optional: true,
    sectionedGroup: "text",
  },
  image: {
    type: "radio",
    choices: ["1", "2", "3", "4", "5", "6", "7", "8"],
    sectionedGroup: "media",
  },
  playButton: {
    type: "boolean",
    sectionedGroup: "media",
  },
  theme: {
    type: "section",
    children: {
      width: {
        type: "radio",
        choices: [1600, 1920],
      },
      layout: {
        type: "radio",
        choices: [
          {
            label: "NML",
            value: "normal",
          },
          {
            label: "FLPX",
            value: "flip-x",
          },
          {
            label: "CNTR",
            value: "center",
          },
          {
            label: "OVLY",
            value: "overlay",
          },
        ],
        // choices: ["normal", "flip-x", "center", "overlay"],
      },
      backgroundColor: {
        label: "Background",
        type: "color",
        choices: ["transparent", "black", "white"],
      },
      color: {
        label: "Text Color",
        type: "color",
        choices: ["black", "white"],
      },
      border: "boolean",
      fadeBackground: {
        type: "section",
        optional: true,
        children: {
          fadeTo: {
            type: "color",
            choices: ["white", "black", "#F8F7F7"],
            defaultValue: "white",
            meta: { small: true },
          },
          softFade: {
            type: "boolean",
          },
          slant: {
            type: "radio",
            choices: ["none", "up", "down"],
            defaultValue: "none",
          },
        },
      },
      heading: {
        type: "section",
        children: {
          color: {
            type: "color",
            choices: ["black", "white"],
            optional: true,
            defaultValue: "black",
          },
          width: {
            type: "number",
            min: 400,
            max: 1500,
          },
          size: {
            type: "radio",
            choices: ["md", "lg"],
          },
          font: {
            type: "radio",
            choices: ["sans", "serif", "quirky", "fancy"],
          },
          // brazen: "boolean"
        },
      },
      subHeading: {
        type: "section",
        children: {
          // color: {
          //   type: "color",
          //   choices: ["black", "white"],
          //   optional: true,
          //   defaultValue: "black",
          // },
          width: {
            type: "number",
            min: 400,
            max: 1500,
          },
          size: {
            type: "radio",
            choices: ["sm", "md"],
          },
        },
      },
      buttons: {
        type: "section",
        children: {
          icons: "boolean",
          reversed: "boolean",
          themeColor: {
            type: "color",
            defaultValue: "#E2406C",
            choices: ["#E2406C", "#007BFF", "black", "white"],
            optional: true,
            meta: { small: true },
          },
          size: {
            type: "radio",
            choices: ["sm", "md"],
          },
          roundness: {
            label: "Corner Radius",
            type: "radio",
            choices: ["none", "sm", "full"],
          },
        },
      },
      image: {
        type: "section",
        children: {
          aspectRatio: {
            type: "radio",
            choices: [{label: "por", value: "portrait"}, {label: "land", value: "landscape"}],
          },
          blend: {
            type: "radio",
            choices: [
              { label: "mltply", value: "mulitply" },
              { label: "scrn", value: "screen" },
              { label: "ovly", value: "overlay" },
              // {label: "clr", value: "color"},
              { label: "lmnsty", value: "luminosity" },
            ],
            defaultValue: "mulitply",
            optional: true,
          },
          roundness: {
            label: "Corner Radius",
            type: "radio",
            choices: ["none", "sm"],
          },
          height: {
            type: "radio",
            choices: [400, 464],
          },
          // width: {
          //   type: "radio",
          //   choices: [680, 760],
          // },
          fullWidth: "boolean",
          shadow: {
            type: "section",
            optional: true,
            children: {
              size: {
                type: "radio",
                choices: ["sm", "md", "lg"],
                defaultValue: "md",
              },
              placement: {
                type: "radio",
                choices: ["T-R", "T-L", "B-R", "B-L"],
                defaultValue: "B-R",
              },
              color: {
                type: "color",
                choices: ["black", "white"],
                defaultValue: "black",
              },
            },
          },
        },
      },
      overlay: {
        type: "section",
        children: {
          color: {
            type: "color",
            choices: ["black", "white"],
            meta: { small: true },
          },
          opacity: {
            type: "number",
            min: 0.1,
            max: 0.8,
          },
          blur: {
            type: "radio",
            choices: ["sm", "md"],
            defaultValue: "sm",
            optional: true,
          },
        },
      },
      playButton: {
        type: "section",
        children: {
          color: {
            type: "color",
            choices: ["#EA4949", "black"],
            meta: { small: true },
          },
          invertColors: "boolean",
          smoothCorners: "boolean",
        },
      },
    },
  },
};

module.exports = mediaSectionSchema;
