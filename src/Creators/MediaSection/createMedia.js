const { selection, Color, Rectangle, Ellipse, ImageFill, Shadow } = require("scenegraph");
const commands = require("commands");
const { createIcon } = require("../../utils");

function createMedia(props = {}, [defaultImage, portraitImage]){
    let {
        color = "black",
        shadow = true,
        roundedCorners = true,
    } = props || {};

    function createOverlayMedia(){
        const bgRectangle = new Rectangle();
        bgRectangle.resize(580, 380);
        bgRectangle.name = "BG";
        bgRectangle.fill = new ImageFill(portraitImage);
        
        selection.insertionParent.addChild(bgRectangle);

        selection.items = [bgRectangle];
        commands.duplicate();

        const overlayImage = selection.items[0];
        overlayImage.name = "Overlay";
        overlayImage.fill = new ImageFill(defaultImage);

        selection.items = [
            bgRectangle, overlayImage
        ];
        commands.group();
        overlayImage.moveInParentCoordinates(70, -60);
        return selection.items[0];
    }

    function createDefaultMedia(){
        const bgRectangle = new Rectangle();
        bgRectangle.resize(580, 380); // land
        // bgRectangle.resize(460, 560); // portrait
        bgRectangle.name = "BG";
        bgRectangle.fill = new ImageFill(defaultImage);
        if(roundedCorners)
            bgRectangle.setAllCornerRadii(10);
        
        selection.insertionParent.addChild(bgRectangle);

        selection.items = [bgRectangle];
        commands.duplicate();

        if(shadow)
            bgRectangle.shadow = new Shadow(0, 1, 4, new Color("#000000", 0.16), true);

        const scrim = selection.items[0];
        scrim.name = "Scrim";
        scrim.fill = new Color("black", 0.3);

        const playButtonBg = new Ellipse();
        playButtonBg.radiusX = 40;
        playButtonBg.radiusY = 40;
        playButtonBg.fill = new Color("white");

        selection.insertionParent.addChild(playButtonBg);

        const playIcon = createIcon("M8 5v14l11-7z", {
            fill: "red",
            size: 30,
        });

        selection.insertionParent.addChild(playIcon);

        selection.items = [
            playButtonBg, playIcon
        ];
        commands.alignHorizontalCenter();
        commands.alignVerticalCenter();
        commands.group();
        playIcon.moveInParentCoordinates(3, 0);

        const playButton = selection.items[0];

        selection.items = [
            bgRectangle, scrim, playButton
        ];
        commands.alignHorizontalCenter();
        commands.alignVerticalCenter();
        commands.group();
        return selection.items[0];
    }

    return [createDefaultMedia()];
}

module.exports = createMedia;