const defaultFooterProps = {
    aboutSection: {
        logo: "4",
        about: "Making the world a better place by making very elegant visual hierarchies.",
    },
    menu1: {
        title: "COMPANY",
        links: "Careers, Newsroom, Privacy Policy",
    },
    menu2: {
        title: "ABOUT US",
        links: "Services, Our Values, Founding Team",
    },
    menu3: {
        title: "PRODUCT",
        links: "Features, Pricing, Changelog",
    },
    menu4: null,
    menu5: {
        title: "CONTACT US",
        links: "Fern HQ, Xd Marketplace, +1 (888) 288-1588, hello@fern.co",
    },
    subscribeSection: null,
    theme: {
        backgroundColor: "white",
        color: "#000",
        shadow: true,
        border: true,
        about: {
            width: 310,
        },
        menu: {
            showTitles: true,
            title: {
                opacity: 0.45
            }
        },
        subscribe: {
            // icon: "mail",
            // iconColor: "#00A860",
            width: 360,
            roundness: "md",
        },
        socials: {
            opacity: 0.5,
            // background: {
            //     opacity: 0.3,
            //     roundness: "sm",
            // },
        }
    }
};

module.exports = defaultFooterProps;