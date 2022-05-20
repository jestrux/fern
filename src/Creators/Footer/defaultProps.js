const defaultFooterProps = {
    aboutSection: {
        logo: "4",
        about: "Making the world a better place by making very elegant visual hierarchies.",
    },
    menu1: {
        title: "Company",
        links: "Careers, Newsroom, Privacy Policy",
    },
    menu2: {
        title: "About Us",
        links: "Services, Our Values, Founding Team",
    },
    menu3: {
        title: "Product",
        links: "Features, Pricing, Changelog",
    },
    menu4: null,
    menu5: {
        title: "Contact Us",
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