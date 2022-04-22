const defaultMediaSectionProps = {
    backgroundColor: "#F8F7F7",
    color: "#333",
    image: "5",
    heading: "Supporting mothers in their time of need",
    subHeading: "Our mission is to make sure we keep track of all mothers in the neighborhood who are unable to fend for themselves and give the support they need.",
    buttons: "More about us, See beneficiaries",
    theme: {
        heading: {
            width: 500,
        },
        subHeading: {
            width: 500,
        },
        buttons: {
            icons: true,
            activeColor: "#F44663",
            iconPlacement: "right",
            size: "md",
            roundness: "sm",
            mainButton: {
                // color: "#333",
                icon: "chevron-right",
                style: "fill",
            },
            secondaryButton: {
                // color: "#333",
                icon: "chevron-right",
                style: "outline",
            },
        },
        media: {
            width: 680,
            height: 448,
            cornerRadius: 'sm',
            video: {
                overlay: "none", //"blur", "scrim",
                playIcon: {
                    color: "#EA4949",
                    invertColors: false,
                    smoothCorners: false,
                }
            },
            // orientation: 'landscape',
            // style: "basic",
            // shadow: {
            //     size: "lg",
            //     placement: "B-R",
            //     color: "#000",
            // },
            // overLayout: "T-R",
        },
    },
}

module.exports = defaultMediaSectionProps;