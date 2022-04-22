const React = require("react");
const ComponentPage = require("../../components/ComponentPage");

const schema = {
  backgroundColor: {
    label: "Background",
    type: "color",
    choices: ["transparent", "#333", "#FFF"],
  },
  color: {
    label: "Text Color",
    type: "color",
    choices: ["#333", "#FFF"],
  },
  heading: "text",
  subHeading: "text",
  buttons: "text",
  image: {
    type: "radio",
    choices: ["1", "2", "3", "4", "5", "6", "7", "8"],
  },
  playButton: "boolean",
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
          color: {
            type: "color",
            defaultValue: "black",
            choices: ["#EA4949", "black", "white",],
            meta: { small: true },
          },
          invertColors: "boolean",
          smoothCorners: "boolean",
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
