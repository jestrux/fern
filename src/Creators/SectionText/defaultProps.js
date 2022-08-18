const defaultSectionTextProps = {
    heading: "Create brand content that builds trust",
    subHeading: "With over 20 years of knowledge, we use emerging technologies to solve problems and shape the behaviors of tomorrow.\nTalk to us about branding, artistry and the main squeeze.",
    buttons: "",
    theme: {
        layout: "center", // "regular", "horizontal"
        width: 1920, // 1920
        backgroundColor: "transparent",
        color: "black",
        verticalPadding: 65,
        heading: {
            font: "sans", // "serif", "quirky", "fancy",
            brazen: false,
            width: 900,
            size: "md", // "lg"
        },
        subHeading: {
            width: 900,
            size: "sm", // "md"
        },
        checklist: {
            width: 600,
            iconColor: null,
            bgOpacity: 0.28,
        },
        buttons: {
            icons: false,
            iconPlacement: "right",
            size: "sm",
            roundness: "sm",
            reversed: true,
            placement: "center",
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