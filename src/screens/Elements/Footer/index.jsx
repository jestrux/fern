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
                defaultValue: "COMPANY",
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
                defaultValue: "ABOUT US",
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
                defaultValue: "PRODUCT",
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
                defaultValue: "SUPPORT",
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
                defaultValue: "CONTACT US",
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
                    message: {
                        defaultValue: "Subscribe to newsletter to get premium content."
                    },
                    placeholder: {
                        defaultValue: "e.g. snape@hogwarts.com"
                    },
                    action: {
                        defaultValue: "Join"
                    },
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
                optional: true,
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
                    color: {
                        type: "color",
                        choices: ["black", "white"],
                        defaultValue: "black",
                        optional: true,
                    },
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
            },
            socials: {
                type: "section",
                children: {
                    color: {
                        type: "color",
                        choices: ["black", "white"],
                        defaultValue: "black",
                        optional: true,
                    },
                    opacity: {
                        type: "number",
                        min: 0.3,
                        max: 1,
                    },
                    background: {
                        type: "section",
                        children: {
                            color: {
                                type: "color",
                                defaultValue: "black",
                                choices: ["black", "white"],
                                optional: true,
                            },
                            opacity: {
                                type: "number",
                                defaultValue: 0.3,
                                min: 0.2,
                                max: 0.6,
                            },
                            roundness: {
                                type: "radio",
                                defaultValue: "sm",
                                choices: ["none", {label: "Regular", value: "sm"}, "full"],
                            },
                        },
                        optional: true,
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