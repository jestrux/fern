const mediaSectionSchema = {
    heading: {
      type: "text", 
      defaultValue: "Experts you can trust",
      sectionedGroup: "text", 
      optional: "group",
    },
    subHeading: {
      type: "text", 
      defaultValue: "With over 20 years of knowledge, we use emerging technologies to solve problems and shape the behaviors of tomorrow. We’ve taken the time to study every part of the industry and have the process down pat.\n\nWe’re very passionate and take a lot of pride in everything we do and that's clear in the meticulous care into every little detail; from art direction and branding to speed, reach and performance.",
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
        heading: {
          type: "section",
          children: {
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
            brazen: "boolean"
          },
        },
        subHeading: {
          type: "section",
          children: {
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
              defaultValue: "#F44663",
              choices: ["#F44663", "#007BFF"],
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
            roundness: {
              label: "Corner Radius",
              type: "radio",
              choices: ["none", "sm"],
            },
            height: {
              type: "radio",
              choices: [400, 464],
            },
            width: {
              type: "radio",
              choices: [680, 760],
            },
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
                  choices: ["T-R","T-L","B-R","B-L"],
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