const React = require("react");
const ComponentPage = require("../../../components/ComponentPage");
const webflowNavbar = require("./webflowNavbar");

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

const search = {
  type: "section",
  children: {
    placeholder: {
      defaultValue: "Type here to search"
    },
    value: {
      defaultValue: "",
      optional: true,
    }
  },
  optional: true,
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
      search: "boolean",
      menu,
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
      width: {
        type: "radio",
        choices: [1600, 1920],
      },
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
        choices: ["black", "white"],
      },
      themeColor: {
        label: "Active Color",
        type: "color",
        optional: true,
        defaultValue: "#0083F6",
        choices: ["black", "white", "#0083F6", "#28A745", "#DC3535"],
      },
      activeIndicator: "boolean",
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
      buttons: {
        type: "section",
        children: {
          reversed: "boolean",
          themeColor: {
            type: "color",
            defaultValue: "black",
            choices: ["black", "white"],
            meta: { small: true },
            optional: true,
          },
          roundness: {
            label: "Corner Radius",
            type: "radio",
            defaultValue: "sm",
            choices: ["none", "sm", "full"],
          },
        },
      },
      // searchbar: {
      //   type: "section",
      //   children: {
      //     roundness: {
      //       label: "Corner Radius",
      //       type: "radio",
      //       defaultValue: "sm",
      //       choices: ["none", "sm", "full"],
      //     },
      //   },
      //   optional: true,
      // },
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
      webflow={webflowNavbar}
    />
  );
}

module.exports = Navbar;