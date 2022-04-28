const React = require("react");
const ComponentPage = require("../../components/ComponentPage");

const schema = {
  label: {
    defaultValue: "Email Address",
    optional: true,
  },
  icon: {
    type: "icon",
    defaultValue: "mail",
    optional: true,
    choices: [
      "search",
      "account-circle",
      "account-box",
      "mail",
      "phone",
      "lock",
      "date",
      "location",
      "time",
      "attachment",
      "link",
      "notes",
      "work",
      "seat",
    ],
  },
  placeholder: {
    defaultValue: "E.g. apwbd@hogwarts.com",
    optional: true,
  },
  value: {
    defaultValue: "watson@sherlocks.com",
    optional: true,
  },
  theme: {
    type: "section",
    children: {
      width: {
        type: "number",
        min: ({ icon, value, placeholder, label }) => {
          let minWidth = 120;
    
          if (value && value.length) minWidth = value.length * 13;
          else if (placeholder && placeholder.length)
            minWidth = placeholder.length * 13;
    
          if (label && label.length)
            minWidth = Math.max(label.length * 8, minWidth);
    
          if (icon && icon.length) minWidth += 32;
    
          return Math.ceil(minWidth);
        },
      },
      size: {
        type: "radio",
        choices: ["md", "lg"],
      },
      color: {
        type: "color",
        choices: ["black", "white"],
      },
      shadow: "boolean",
      outlined: "boolean",
      roundness: {
        label: "Rounded Corners",
        type: "radio",
        choices: ["none", "normal", "full"],
      },
    }
  }
};

function Input({ value, onClose }) {
  return (
    <ComponentPage
      title="Input"
      onClose={onClose}
      schema={schema}
      data={value}
    />
  );
}

module.exports = Input;
