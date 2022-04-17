const React = require("react");
const ComponentPage = require("../../components/ComponentPage");

const schema = {
  logo: {
    type: "radio",
    choices: ["custom", "logo1", "logo2", "logo3"],
  },
  theme: {
    type: "section",
    children: {
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
      activeColor: {
        label: "Active Color",
        type: "color",
        optional: true,
        defaultValue: "#0083F6",
        choices: ["#333", "white", "#0083F6", "#28A745", "#DC3535"],
      },
      // inActiveOpacity: {
      //   optional: true,
      //   type: "number",
      //   defaultValue: 0.5,
      //   min: 0,
      //   max: 1,
      // },
      shadow: "boolean",
      border: {
        type: "section",
        optional: true,
        children: {
          color: {
            type: "color",
            defaultValue: "black",
            choices: ["black", "white"],
            meta: { small: true },
          },
          thickness: {
            type: "number",
            defaultValue: 1.5,
            min: 1.5,
          },
          opacity: {
            type: "number",
            defaultValue: 1,
            min: 0.1,
            max: 1,
          },
        },
      },
      text: {
        type: "section",
        optional: true,
        children: {
          behavior: {
            type: "radio",
            defaultValue: "normal",
            choices: ["normal", "loud"],
          },
          // fontFamily: {
          //   type: "text",
          //   defaultValue: "Helvetica Neue"
          // },
          // fontFamily: {
          //   type: "text",
          //   defaultValue: "Helvetica Neue"
          // },
          // textTransform: {
          //   type: "choice",
          //   defaultValue: "none",
          //   choices: ["none", "uppercase"]
          // },
        },
      },
    },
  },
};

function Navbar({ value, onClose }) {
  return (
    <ComponentPage
      title="Navbar"
      onClose={onClose}
      schema={schema}
      data={value}
    />
  );
}

module.exports = Navbar;
