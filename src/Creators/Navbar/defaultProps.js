const defaultNavbarProps = {
    slots: {
        left: ["logo"],
        middle: [],
        right: ["menu", "buttons"]
    },
    links: ["Home", "About Us", "Events", "Contact Us"],
    activeLink: "Home",
    buttons: [
        // "Sign In", 
        "Get Started",
    ],
    profile: false,
    search: false,
    shoppingCart: false,
    socialMediaIcons: [], //["facebook", "twitter", "instagram"],
    theme: {
        backgroundColor: "white",
        color: "black",
        // activeColor: "#17FD9B",
        shadow: false,
        border: false,
        // inActiveOpacity: 0.5,
        // buttons: {
        //     size: "sm",
        //     style: "outline", //fill,
        //     roundness: "md"
        // },
        // text: {
        //     fontFamily: "Helvetica Neue",
        //     fontWeight: "Regular", // "Condensed Black",
        //     textTransform: "none", // "titlecase", "lowercase", "uppercase",
        // },
        // menu: {
        //     showIndicator: false,
        // },
        // socialMediaIcons: {
        //     backgroundStyle: "none", // "fill", "outline",
        //     roundness: "md", // "full", "none", 
        // },
        // search: {
        //     style: "outline", // fill,
        //     roundness: "md", // full,
        // },
    }
};

module.exports = defaultNavbarProps;