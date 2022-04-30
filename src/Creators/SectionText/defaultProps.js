const defaultSectionTextProps = {
    heading: "Create brand content that builds trust",
    // subHeading: "With over 20 years of knowledge, we use emerging technologies to solve problems and shape the behaviors of tomorrow. We’ve taken the time to study every part of the industry and have the process down pat.\n\nWe’re very passionate and take a lot of pride in everything we do and that's clear in the meticulous care into every little detail; from art direction and branding to speed, reach and performance.",
    subHeading: "With over 20 years of knowledge, we use emerging technologies to solve problems and shape the behaviors of tomorrow. Talk to us about branding, artistry and the main squeeze.",
    buttons: "Get to know us",
    theme: {
        center: true,
        color: "black",
        heading: {
            font: "sans", // "serif", "quirky", "fancy",
            brazen: false,
            width: 530,
            size: "md", // "lg"
        },
        subHeading: {
            width: 530,
            size: "sm", // "md"
        },
        buttons: {
            icons: false,
            iconPlacement: "right",
            size: "sm",
            roundness: "sm",
            reversed: true,
            mainButton: {
                // color: "black",
                icon: "chevron-right",
                style: "fill",
            },
            secondaryButton: {
                // color: "black",
                icon: "chevron-right",
                style: "outline",
            },
        },
    },
}

module.exports = defaultSectionTextProps;