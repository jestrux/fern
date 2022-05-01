const React = require("react");
const ComponentPage = require("../../components/ComponentPage");

const schema = {
  heading: {
    type: "text", 
    defaultValue: "Supporting all county mothers in need",
    sectionedGroup: "text", 
    optional: "group",
  },
  subHeading: {
    type: "text", 
    defaultValue: "Our mission is to make sure we keep track of all mothers who are unable to fend for themselves and give them the support they need.",
    sectionedGroup: "text",
  },
  buttons: {
    type: "text", 
    defaultValue: "Get to know us",
    optional: true,
    sectionedGroup: "text",
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
    },
  },
};

function FeatureSection({ value, onClose }) {
  return (
    <ComponentPage
      title="FeatureSection"
      onClose={onClose}
      schema={schema}
      data={value}
    />
  );
}

module.exports = FeatureSection;
