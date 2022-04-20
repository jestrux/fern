const React = require("react");
const ComponentPage = require("../../components/ComponentPage");

const socials = {
  defaultValue: "facebook, twitter, instagram",
  optional: true,
};

const logo = {
  type: "radio",
  choices: [
    // "custom", 
    "1", "2", "3", "4", "5",
  ],
  defaultValue: "2",
  offValue: "",
  optional: true,
};

const menu = {
  type: "section",
  optional: true,
  children: {
    links: {
      defaultValue: "Home, About Us, Events, Contact Us",
    },
    activeLink: {
      defaultValue: "Home",
      optional: true,
    },
  },
};

const schema = {
  leftSlot: {
    type: "section",
    children: {
      socials, logo, menu
    },
  },
  middleSlot: {
    type: "section",
    children: {
      logo, menu,
      search: "boolean"
    },
  },
  rightSlot: {
    type: "section",
    children: {
      menu,
      search: "boolean",
      buttons: {
        defaultValue: "Sign In, Get Started",
        optional: true,
      },
      socials,
      dp: {
        label: "Profile Picture",
        type: "radio",
        choices: [
          // "custom", 
          "1", "2", "3",
          "4", "5", "6",
        ],
        defaultValue: "1",
        optional: true,
      }
    },
  },
  theme: {
    type: "section",
    children: {
      persona: {
        type: "radio",
        defaultValue: "normal",
        choices: ["normal", "loud"],
      },
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
            defaultValue: 0.1,
            min: 0.1,
            max: 1,
          },
        },
      },
      // text: {
      //   type: "section",
      //   optional: true,
      //   children: {
      //     fontFamily: {
      //       type: "text",
      //       defaultValue: "Helvetica Neue"
      //     },
      //     fontFamily: {
      //       type: "text",
      //       defaultValue: "Helvetica Neue"
      //     },
      //     textTransform: {
      //       type: "choice",
      //       defaultValue: "none",
      //       choices: ["none", "uppercase"]
      //     },
      //   },
      // },
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
