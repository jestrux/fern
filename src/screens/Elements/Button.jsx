const React = require("react");
const ComponentPage = require("../../components/ComponentPage");

const schema = {
  icon: {
    type: "icon",
    label: "",
    defaultValue: "add",
    group: "icon",
    optional: "group",
  },
  iconPlacement: {
    label: "Placement",
    type: "radio",
    choices: ["left", "right"],
    defaultValue: "left",
    group: "icon",
    optional: "group",
  },
  text: {
    label: "",
    defaultValue: "Submit",
    group: "text",
    optional: "group",
  },
  size: {
    type: "radio",
    choices: ["xs", "sm", "md", "lg"],
  },
  color: {
    type: "color",
    choices: ["#007bff", "#28a745", "#DC3535", "#ffc107", "#333", "#FFF"],
  },
  shadow: "boolean",
  outlined: "boolean",
  roundness: {
    label: "Rounded Corners",
    type: "radio",
    choices: ["none", "normal", "full"],
  },
};

function Button({ value, onClose }) {
  return (
    <ComponentPage
      title="Button"
      onClose={onClose}
      schema={schema}
      data={value}
    />
  );
}

module.exports = Button;
