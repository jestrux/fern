const React = require("react");
const ComponentPage = require("../../components/ComponentPage");

const schema = {
  heading: {
    type: "text", 
    defaultValue: "Create brand content that builds trust",
  },
  subHeading: {
    type: "text", 
    defaultValue: "With over 20 years of knowledge, we use emerging technologies to solve problems and shape the behaviors of tomorrow. Talk to us about branding, artistry and the main squeeze.",
  },
  buttons: {
    type: "text", 
    defaultValue: "Get to know us",
    optional: true,
  },
  theme: {
    type: "section",
    children: {
      center: "boolean",
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
      border: "boolean",
      heading: {
        type: "section",
        children: {
          color: {
            type: "color",
            choices: ["black", "white"],
            optional: true,
            defaultValue: "black"
          },
          // width: {
          //   type: "number",
          //   min: 400,
          //   max: 1500,
          // },
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
          //   defaultValue: "black"
          // },
          // width: {
          //   type: "number",
          //   min: 400,
          //   max: 1500,
          // },
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
    },
  },
};

function SectionText({ value, onClose }) {
  return (
    <ComponentPage
      title="SectionText"
      onClose={onClose}
      schema={schema}
      data={value}
    />
  );
}

module.exports = SectionText;
