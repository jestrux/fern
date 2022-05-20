const defaultCTASectionProps = {
    heading: "Ready to take part in the safety of future of teenage online shopping?",
    subHeading: "Join many other early stage investors and employees joining Ecosafe.",
    buttons: "Get to know us,  Join the team",
    theme: {
        center: false,
        width: 1600, // 1920
        backgroundColor: "transparent", // "#eee",
        color: "black",
        roundness: "md",
        verticalPadding: 65,
        border: {
            color: "black", thickness: 2, opacity: 0.5,
        },
        heading: {
            font: "sans", // "serif", "quirky", "fancy",
            brazen: false,
            width: 700,
            size: "md", // "lg"
        },
        subHeading: {
            width: 700,
            size: "md", // "md"
        },
        buttons: {
            icons: true,
            iconPlacement: "right",
            size: "cta",
            roundness: "sm",
            reversed: false,
            // themeColor: "#FFD26C",
            mainButton: {
                icon: "chevron-right",
                style: "fill",
            },
            secondaryButton: {
                icon: "chevron-right",
                style: "outline",
            },
        },
    },
}

module.exports = defaultCTASectionProps;