const React = require("react");
const ComponentPage = require("../../components/ComponentPage");

const schema = {
  backgroundColor: {
    label: "Background",
    type: "color",
    meta: {
      showTransparent: true,
    },
  },
  color: {
    label: "Text Color",
    type: "color",
    choices: ["transparent", "#333", "#FFF"],
  },
  heading: "text",
  subHeading: "text",
  buttons: "text",
  theme: {
    type: "section",
    children: {
      buttons: {
        type: "section",
        children: {
          icons: "boolean",
          activeColor: {
            type: "color",
            defaultValue: "black",
            choices: ["black", "white"],
            meta: { small: true },
          },
          roundness: {
            label: "Corner Radius",
            type: "radio",
            defaultValue: "sm",
            choices: ["none", "sm"],
          },
        },
      },
    },
  },
};

function MediaSection({ value, onClose }) {
  return (
    <ComponentPage
      title="MediaSection"
      onClose={onClose}
      schema={schema}
      data={value}
    />
  );
}

module.exports = MediaSection;
