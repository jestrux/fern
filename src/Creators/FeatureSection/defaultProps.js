const defaultFeatureSectionProps = {
    heading: "Create brand content that builds trust",
    subHeading: "With over 20 years of knowledge, we use emerging technologies to solve problems and shape the behaviors of tomorrow.",
    buttons: "",
    theme: {
        backgroundColor: "white",
        width: 1920, // 1920
        layout: "regular",
        color: "black",
        border: false,
        verticalPadding: 65,
        heading: {
            font: "sans", // "serif", "quirky", "fancy",
            brazen: false,
            width: 750, // 530,
            size: "md", // "lg"
        },
        subHeading: {
            width: 750, //530,
            size: "md", // "sm"
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
        graphic: {
            type: "number",
            color: null,
            bgOpacity: 0.27,
        },
    },
}

module.exports = defaultFeatureSectionProps;