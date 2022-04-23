const defaultMediaSectionProps = {
    heading: "Experts you can trust",
    subHeading: "With over 20 years of knowledge, we use emerging technologies to solve problems and shape the behaviors of tomorrow. We’ve taken the time to study every part of the industry and have the process down pat.\n\nWe’re very passionate and take a lot of pride in everything we do and that's clear in the meticulous care into every little detail; from art direction and branding to speed, reach and performance.",
    buttons: "Get to know us",
    image: "4",
    playButton: false,
    layout: "normal", // "flip-x", "center", "overlay"
    theme: {
        width: 1600,
        backgroundColor: "#F8F7F7",
        color: "black",
        verticalPadding: 65,
        textNegativeMargin: 16,
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
        image: {
            width: 680,
            height: 400, // 448,
            roundness: 'sm',
            // orientation: 'landscape',
            // style: "basic",
            // shadow: {
            //     size: "lg",
            //     placement: "B-R",
            //     color: "#000",
            // },
            // overLayout: "T-R",
        },
        playButton: {
            // color: "#EA4949",
            overlayOpacity: 0.3,
            color: "#000",
            invertColors: false,
            smoothCorners: true,
        },
    },
}

module.exports = defaultMediaSectionProps;