const React = require('react');
const ComponentPage = require("../../../components/ComponentPage");
// const webflowSectionText = require("./webflowSectionText");

const schema = {
    aboutSection: {
        type: "section",
        children: {
            logo: {
                type: "radio",
                choices: [
                    // "custom", 
                    "1", "2", "3", "4", "5",
                ],
                defaultValue: "2",
                offValue: "",
                optional: true,
            },
            about: {
                defaultValue: "Making the world a better place by making very elegant visual hierarchies.",
                optional: true,
            },
            socials: {
                defaultValue: "facebook, twitter, instagram",
                optional: true,
            },
        },
        optional: true,
    },
    menu1: {
        type: "section",
        children: {
            title: {
                defaultValue: "Company",
                optional: true,
            },
            links: {
                defaultValue: "Careers, Newsroom, Privacy Policy",
            },
        },
        optional: true,
    },
    menu2: {
        type: "section",
        children: {
            title: {
                defaultValue: "About Us",
                optional: true,
            },
            links: {
                defaultValue: "Services, Our Values, Founding Team",
            },
        },
        optional: true,
    },
    menu3: {
        type: "section",
        children: {
            title: {
                defaultValue: "Product",
                optional: true,
            },
            links: {
                defaultValue: "Features, Pricing, Changelog",
            },
        },
        optional: true,
    },
    menu4: {
        type: "section",
        children: {
            title: {
                defaultValue: "Support",
                optional: true,
            },
            links: {
                defaultValue: "FAQs, Help Center, Report Issue",
            },
        },
        optional: true,
    },
    menu5: {
        type: "section",
        children: {
            title: {
                defaultValue: "Contact Us",
                optional: true,
            },
            links: {
                defaultValue: "Fern HQ, Xd Marketplace, +1 (888) 288-1588, hello@fern.co",
            },
        },
        optional: true,
    },
    subscribeSection: {
        type: "section",
        children: {
            socials: {
                defaultValue: "facebook, twitter, instagram",
                optional: true,
            },
            subscribe: {
                type: "section",
                children: {
                    message: "text",
                    placeholder: "text",
                    action: "text",
                    // icon: {
                    //     defaultValue: "mail",
                    //     optional: true,
                    // },
                    // value: "text", "watson@sherlocks.com",
                },
                defaultValue: {
                    message: "Subscribe to newsletter to get premium content.",
                    // message: "Subscribe to newsletter to get well researched, premium content in your inbox ever morning.",
                    placeholder: "e.g. apwbd@hogwarts.com",
                    action: "Join",
                },
            },
        },
        optional: true,
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
            about: {
                type: "section",
                children: {
                    width: {
                        type: "number",
                        defaultValue: 310,
                        min: 280,
                        max: 340
                    },
                }
            },
            menu: {
                type: "section",
                children: {
                    showTitles: "boolean",
                    title: {
                        type: "section",
                        children: {
                            opacity: {
                                type: "number",
                                defaultValue: 0.5,
                                min: 0.45,
                                max: 1,
                            },
                        }
                    }
                }
            },
            subscribe: {
                type: "section",
                children: {
                    // iconColor: "#00A860",
                    inset: "boolean",
                    width: {
                        type: "number",
                        defaultValue: 360,
                        min: 300,
                        max: 380
                    },
                    roundness: {
                        type: "radio",
                        choices: ["none", {label: "Regular", value: "md"}, "full"],
                    },
                }
            }
        },
    },
};

function Footer({ value, onClose }) {
    return (
        <ComponentPage
            title="Footer"
            onClose={onClose}
            schema={schema}
            data={value}
        //   webflow={webflowFooter}
        />
    );
}

module.exports = Footer;