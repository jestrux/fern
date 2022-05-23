const React = require("react");
const ComponentPage = require("../../../components/ComponentPage");
const webflowButton = require("./webflowButton");
const ButtonPresets = require("./Presets");

const schema = {
  icon: {
    type: "icon",
    defaultValue: "add",
    optional: true,
  },
  text: {
    defaultValue: "Submit",
    optional: true,
  },
  theme: {
    children: {
      size: {
        type: "radio",
        choices: ["xs", "sm", "md", "lg"],
      },
      color: {
        type: "color",
        choices: ["#007bff", "#28a745", "#DC3535", "#ffc107", "black", "white"],
      },
      shadow: "boolean",
      style: {
        type: "radio",
        choices: ["fill", "outline", "flat", "link"],
      },
      roundness: {
        label: "Rounded Corners",
        type: "radio",
        choices: ["none", "sm", "md", "full"],
      },
      iconPlacement: {
        type: "radio",
        choices: ["left", "right"],
        defaultValue: "left",
      },
    }
  },
};

function Button({ value, onClose }) {
  return (
    <ComponentPage
      title="Button"
      onClose={onClose}
      schema={schema}
      data={value}
      webflow={webflowButton}
      presets={ButtonPresets}
    />
  );
}

module.exports = Button;
