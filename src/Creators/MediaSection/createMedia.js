const { selection, Color, Rectangle, Ellipse, ImageFill, Shadow } = require("scenegraph");
const commands = require("commands");
const { createIcon, getGroupChildByName } = require("../../utils");

function createMedia(props, [
    defaultImage, portraitImage, mainImageFill, bottomImageFill
]){
    let {
        style,
        color,
        shadow,
        cornerRadius,
        video,
        orientation,
    } = props || {};

    function playButton(){
        const playButtonBg = new Ellipse();
        playButtonBg.radiusX = 40;
        playButtonBg.radiusY = 40;
        playButtonBg.fill = new Color("white");

        selection.insertionParent.addChild(playButtonBg);

        const playIcon = createIcon("M8 5v14l11-7z", {
            fill: color,
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

        const button = selection.items[0];
        button.name = 'playButton';
        return button;
    }

    function createOverlayMedia(){
        let bgRectangle = new Rectangle();
        bgRectangle.resize(580, 380);
        bgRectangle.name = "BG";
        bgRectangle.fill = bottomImageFill ? bottomImageFill : new ImageFill(portraitImage);
        if(cornerRadius)
            bgRectangle.setAllCornerRadii(5);
        
        selection.insertionParent.addChild(bgRectangle);

        if(shadow)
            bgRectangle.shadow = new Shadow(0, 1, 4, new Color("#000000", 0.16), true);

        let overlayImage;
        selection.items = [bgRectangle];
        commands.duplicate();
        
        if(video){
            overlayImage = selection.items[0];
            overlayImage.fill = mainImageFill ? mainImageFill : new ImageFill(defaultImage);

            commands.duplicate();
            const scrim = selection.items[0];
            scrim.name = "Scrim";
            scrim.fill = new Color("black", 0.3);

            commands.duplicate();
            const overlayScrim = selection.items[0];

            selection.items = [
                bgRectangle, scrim
            ];

            commands.group();
            bgRectangle = selection.items[0];
            bgRectangle.name = "Underlay";

            selection.items = [
                overlayImage, overlayScrim, playButton()
            ];
            commands.alignHorizontalCenter();
            commands.alignVerticalCenter();
            commands.group();
            overlayImage = selection.items[0];
            overlayImage.name = "Overlay";
        }
        else{
            overlayImage = selection.items[0];
            overlayImage.name = "Overlay";
            overlayImage.fill = mainImageFill ? mainImageFill : new ImageFill(defaultImage);
        }

        selection.items = [ bgRectangle, overlayImage ];
        commands.group();
        overlayImage.moveInParentCoordinates(70, -60);

        return selection.items[0];
    }

    function createRegularMedia(){
        const bgRectangle = new Rectangle();
        bgRectangle.name = "BG";
        bgRectangle.fill = mainImageFill ? mainImageFill : new ImageFill(defaultImage);

        if(orientation == 'portrait')
            bgRectangle.resize(460, 580);
        else
            bgRectangle.resize(580, 460);
        
        if(cornerRadius){
            const radiusMap = { 'xs': 10, 'sm': 40, 'md': 120, 'lg': 500 };
            bgRectangle.setAllCornerRadii(radiusMap[cornerRadius]);
        }
        
        selection.insertionParent.addChild(bgRectangle);

        if(video){
            selection.items = [bgRectangle];
            commands.duplicate();

            if(shadow)
                bgRectangle.shadow = new Shadow(0, 1, 4, new Color("#000000", 0.16), true);

            const scrim = selection.items[0];
            scrim.name = "Scrim";
            scrim.fill = new Color("black", 0.3);

            selection.items = [
                bgRectangle, scrim, playButton()
            ];

            commands.alignHorizontalCenter();
            commands.alignVerticalCenter();
            commands.group();
            return selection.items[0];
        }
        else if(shadow)
            bgRectangle.shadow = new Shadow(0, 1, 4, new Color("#000000", 0.16), true);

        return bgRectangle;
    }

    function createCircularMedia(){
        const bg = new Ellipse();
        bg.name = "BG";
        bg.radiusX = 260;
        bg.radiusY = 260;
        bg.fill = mainImageFill ? mainImageFill : new ImageFill(defaultImage);
        
        selection.insertionParent.addChild(bg);

        if(video){
            selection.items = [bg];
            commands.duplicate();

            if(shadow)
                bg.shadow = new Shadow(0, 1, 4, new Color("#000000", 0.16), true);

            const scrim = selection.items[0];
            scrim.name = "Scrim";
            scrim.fill = new Color("black", 0.3);

            selection.items = [
                bg, scrim, playButton()
            ];

            commands.alignHorizontalCenter();
            commands.alignVerticalCenter();
            commands.group();
            return selection.items[0];
        }
        else if(shadow)
            bg.shadow = new Shadow(0, 1, 4, new Color("#000000", 0.16), true);

        return bg;
    }

    const styleMap = {
        'regular': createRegularMedia,
        'circle': createCircularMedia,
        'overlay': createOverlayMedia
    }

    const mediaCreator = styleMap[style] || createRegularMedia;

    return [mediaCreator()];
}

module.exports = createMedia;