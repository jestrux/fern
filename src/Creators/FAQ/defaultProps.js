const defaultFAQProps = {
    heading: "FAQs",
    subHeading: "Can't find the answer you're looking for below? Visit our *_help center_*.",
    buttons: "",
    faqs: {
        expandedQuestions: "2,4"
    },
    theme: {
        backgroundColor: "white",
        width: 1600, // 1920
        layout: "center",
        color: "black",
        border: false,
        verticalPadding: 65,
        heading: {
            font: "sans", // "serif", "quirky", "fancy",
            brazen: false,
            width: 750, // 530,
            size: "lg", // "md"
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
        faqs: {
            width: 900,
            expandIcon: {
                type: "plus",
            }
        },
    },
}

module.exports = defaultFAQProps;