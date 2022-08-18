const defaultNavbarProps = {
  leftSlot: { logo: "4" },
  middleSlot: {},
  rightSlot: {
    menu: {
      links: "Home, About Us, Events, Contact Us",
      activeLink: "Home",
    },
    buttons: "Sign In, Get Started",
  },
  activeLink: "Home",
  profile: false,
  search: false,
  shoppingCart: false,
  socialMediaIcons: [], //["facebook", "twitter", "instagram"],
  theme: {
    width: 1920,
    backgroundColor: "white",
    color: "black",
    // themeColor: "#17FD9B",
    // inActiveOpacity: 0.5,
    shadow: null,
    border: null,
    persona: "normal", // "loud",
    text: {
      fontFamily: "Helvetica Neue",
      fontStyle: "Regular", // "Condensed Black",
      textTransform: "none", // "titlecase", "lowercase", "uppercase",
    },
    buttons: {
      size: "sm",
      roundness: "sm",
      mainButton: {
          // color: "black",
          // icon: "chevron-right",
          style: "fill",
      },
      secondaryButton: {
          // color: "black",
          // icon: "chevron-right",
          style: "outline",
      },
    },
    socials: {
      opacity: 0.5,
      // background: {
      //     opacity: 0.3,
      //     roundness: "sm",
      // },
    },
    // buttons: {
    //     size: "sm",
    //     style: "outline", //fill,
    //     roundness: "md"
    // },
    // menu: {
    //     activeIndicator: false,
    //     inActiveOpacity: 0.5,
    // },
    // socialMediaIcons: {
    //     backgroundStyle: "none", // "fill", "outline",
    //     roundness: "md", // "full", "none",
    // },
    // search: {
    //     style: "outline", // fill,
    //     roundness: "md", // full,
    // },
  },
};

module.exports = defaultNavbarProps;
