const React = require("react");
const ComponentPage = require("../../../components/ComponentPage");
const webflowFAQSection = require("./webflowFAQSection");

const schema = {
  heading: {
    type: "text",
    sectionedGroup: "text", 
    defaultValue: "Ready to take part in the safety of future of teenage online shopping?",
  },
  subHeading: {
    type: "text",
    sectionedGroup: "text", 
    defaultValue: "Join a other early stage investors and employees joining Ecosafe.",
  },
  buttons: {
    type: "text",
    sectionedGroup: "text", 
    defaultValue: "Invest in Cilo, Join Our Team",
    optional: true,
  },
  faqs: {
    type: "section", 
    children: {
      expandedQuestions: {
        defaultValue: "2,4",
        optional: true,
      },
    }
  },
  theme: {
    type: "section",
    children: {
      width: {
        type: "radio",
        choices: [1600, 1920],
      },
      layout: {
        type: "radio",
        choices: ["regular", "center", "horizontal"],
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
      roundness: {
        label: "Corner Radius",
        type: "radio",
        choices: ["none", "md", "lg"],
      },
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
            defaultValue: 0.5,
            min: 0.1,
            max: 1,
          },
        },
      },
      heading: {
        type: "section",
        children: {
          color: {
            type: "color",
            choices: ["black", "white"],
            optional: true,
            defaultValue: "black"
          },
          width: {
            type: "number",
            min: 550,
            max: 850,
          },
          // size: {
          //   type: "radio",
          //   choices: ["md", "lg"],
          // },
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
          placement: {
            type: "radio",
            choices: ["center", "bottom"],
          },
          icons: "boolean",
          reversed: "boolean",
          themeColor: {
            type: "color",
            defaultValue: "#E2406C",
            choices: ["#E2406C", "#007BFF", "black", "white"],
            optional: true,
            meta: { small: true },
          },
          // size: {
          //   type: "radio",
          //   choices: ["sm", "md"],
          // },
          roundness: {
            label: "Corner Radius",
            type: "radio",
            choices: ["none", {label: "Regular", value: "sm"}, "full"],
          },
        },
      },
      faqs: {
        type: "section",
        children: {
          width: {
            type: "number",
            min: 600,
            max: 1100,
          },
          expandIcon: {
            type: "section",
            children: {
              type: {
                label: "",
                type: "radio",
                choices: ["plus", "chevron"],
              }
            }
          },
        }
      },
    },
  },
};

function FAQ({ value, onClose }) {
  return (
    <ComponentPage
      title="FAQ"
      onClose={onClose}
      schema={schema}
      data={value}
      // webflow={webflowFAQSection}
    />
  );
}

module.exports = FAQ;
