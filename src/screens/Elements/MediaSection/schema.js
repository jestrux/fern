const mediaSectionSchema = {
    heading: {type: "text", sectionedGroup: "content" },
    subHeading: {type: "text", sectionedGroup: "content" },
    buttons: {type: "text", sectionedGroup: "content" },
    image: {
      type: "radio",
      choices: ["1", "2", "3", "4", "5", "6", "7", "8"],
      sectionedGroup: "content",
    },
    playButton: {
      type: "boolean",
      sectionedGroup: "content",
    },
    theme: {
      type: "section",
      children: {
        width: {
          type: "radio",
          choices: [1600, 1920],
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
        heading: {
          type: "section",
          children: {
            size: {
              type: "radio",
              choices: ["md", "lg"],
            },
            font: {
              type: "radio",
              choices: ["sans", "serif", "quirky", "fancy"],
            },
            brazen: "boolean"
          },
        },
        buttons: {
          type: "section",
          children: {
            icons: "boolean",
            reversed: "boolean",
            themeColor: {
              type: "color",
              defaultValue: "#F44663",
              choices: ["#F44663", "#007BFF"],
              optional: true,
              meta: { small: true },
            },
            roundness: {
              label: "Corner Radius",
              type: "radio",
              defaultValue: "sm",
              choices: ["none", "sm", "full"],
            },
          },
        },
        image: {
          type: "section",
          children: {
            roundness: {
              label: "Corner Radius",
              type: "radio",
              defaultValue: "sm",
              choices: ["none", "sm"],
            },
          },
        },
        playButton: {
          type: "section",
          children: {
            overlayOpacity: {
              type: "number",
              min: 0.1,
              max: 0.8,
            },
            color: {
              type: "color",
              defaultValue: "black",
              choices: ["#EA4949", "black",],
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