const defaultMediaSectionProps = {
    backgroundColor: "#F8F7F7",
    color: "#333",
    heading: "Supporting all county mothers in need",
    subHeading: "Our mission is to make sure we keep track of all mothers who are unable to fend for themselves and give them the support they need.",
    buttons: "More about us, See beneficiaries",
    image: "5",
    playButton: false,
    theme: {
        heading: {
            width: 530,
        },
        subHeading: {
            width: 530,
        },
        buttons: {
            icons: false,
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
        image: {
            width: 680,
            height: 448,
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
            color: "#000",
            invertColors: false,
            smoothCorners: true,
        },
    },
}

module.exports = defaultMediaSectionProps;