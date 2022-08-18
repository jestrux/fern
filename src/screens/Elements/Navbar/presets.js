const navbarPresets = {
    "center-menu-dp": {
        props: {"leftSlot":{"logo":"2"},"middleSlot":{"menu":{"links":"Home, About Us, Events, Contact Us","activeLink":"Home"}},"rightSlot":{"menu":null,"buttons":"","links":"Home, About Us, Events, Contact Us","activeLink":"Home","dp":"1"},"activeLink":"Home","profile":false,"search":false,"shoppingCart":false,"socialMediaIcons":[],"theme":{"width":1920,"backgroundColor":"#033969","color":"#BAC9D6","shadow":null,"border":null,"persona":"normal","text":{"fontFamily":"Helvetica Neue","fontStyle":"Medium","textTransform":"none","letterSpacing":18,"fontSize":16},"buttons":{"size":"sm","roundness":"sm","mainButton":{"style":"fill"},"secondaryButton":{"style":"outline"}},"socials":{"opacity":0.5},"themeColor":"#44ED95"},"name":"FernNavbar","editorSection":"Content","type":"Navbar"},
        height: 80,
        fullWidth: true,
        floatingLabel: false,
    },
    "search-social": {
        props: {"leftSlot":{"logo":"4"},"middleSlot":{"search":true},"rightSlot":{"menu":null,"buttons":"","links":"Home, About Us, Events, Contact Us","activeLink":"Home","socials":"facebook, twitter, instagram"},"activeLink":"Home","profile":false,"search":false,"shoppingCart":false,"socialMediaIcons":[],"theme":{"width":1920,"backgroundColor":"white","color":"black","shadow":true,"border":null,"persona":"normal","text":{"fontFamily":"Helvetica Neue","fontStyle":"Medium","textTransform":"none","letterSpacing":18,"fontSize":16},"buttons":{"size":"sm","roundness":"sm","mainButton":{"style":"fill"},"secondaryButton":{"style":"outline"}},"socials":{"opacity":0.5}},"name":"FernNavbar","editorSection":"Content","type":"Navbar"},
        height: 80,
        fullWidth: true,
        floatingLabel: false
    },
    "minimal": {
        props: {"leftSlot":{"logo":null,"menu":{"links":"Contribute","activeLink":"Home"}},"middleSlot":{"search":false,"logo":"5"},"rightSlot":{"menu":null,"buttons":"Get Help","links":"Home, About Us, Events, Contact Us","activeLink":"Home","socials":""},"activeLink":"Home","profile":false,"search":false,"shoppingCart":false,"socialMediaIcons":[],"theme":{"width":1920,"backgroundColor":"#efeae8","color":"black","shadow":false,"border":null,"persona":"normal","text":{"fontFamily":"Helvetica Neue","fontStyle":"Medium","textTransform":"none","letterSpacing":18,"fontSize":16},"buttons":{"size":"sm","roundness":"sm","mainButton":{"style":"fill"},"secondaryButton":{"style":"outline"},"reversed":true},"socials":{"opacity":0.5}},"name":"FernNavbar","editorSection":"Content","type":"Navbar"},
        height: 80,
        fullWidth: true,
        floatingLabel: false
    },
    "loud": {
        props: {"leftSlot":{"logo":"4"},"middleSlot":{"search":false,"menu":{"links":"HOME, ABOUT US, EVENTS, CONTACT US","activeLink":"HOME"}},"rightSlot":{"menu":null,"buttons":"OPEN SESAME","links":"Home, About Us, Events, Contact Us","activeLink":"Home","socials":""},"activeLink":"Home","profile":false,"search":false,"shoppingCart":false,"socialMediaIcons":[],"theme":{"width":1920,"backgroundColor":"#ffc107","color":"#775A03","shadow":null,"border":{"color":"black","thickness":4,"opacity":1},"persona":"loud","text":{"fontFamily":"Helvetica Neue","fontStyle":"Condensed Black","textTransform":"uppercase","letterSpacing":50,"fontSize":22},"buttons":{"size":"sm","roundness":"sm","mainButton":{"style":"fill"},"secondaryButton":{"style":"outline"},"themeColor":"#0083f6"},"socials":{"opacity":0.5},"themeColor":"#0083F6","activeIndicator":false},"name":"FernNavbar","editorSection":"Content","type":"Navbar"},
        height: 80,
        fullWidth: true,
        floatingLabel: false
    },
}

module.exports = navbarPresets;