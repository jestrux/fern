const defaultNavbarProps = {
    backgroundColor: "transparent",
    // backgroundColor: "white",
    color: "white",
    // color: "black",
    // activeColor: "#17FD9B",
    inActiveOpacity: 0.5,
    activeColor: "white",
    shadow: false,
    border: false,
    links: ["Home", "About Us", "Our Services", "Blogs", "Contact Us"],
    activeLink: "Home",
    buttons: [
        // "Sign In", 
        "Get Started"],
    mainButtonStyle: "outline",
    socialMediaIcons: ["facebook", "twitter", "instagram"],
    profile: true,
    search: true,
    showIndicator: false
};

module.exports = defaultNavbarProps;