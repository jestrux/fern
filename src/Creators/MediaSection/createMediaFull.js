const { selection, Color, Rectangle, Ellipse, ImageFill, Shadow, GraphicNode } = require("scenegraph");
const commands = require("commands");
const { createIcon, insertNode } = require("../../utils");

function createMedia(props, [
    defaultImage, portraitImage, mainImageFill, bottomImageFill
]){
    let {
        style,
        playIcon,
        shadow,
        cornerRadius,
        video,
        orientation,
        overLayout
    } = props || {};

    function playButton(){
        const {
            color,
            invertColors,
            smoothCorners,
        } = playIcon;

        const playButtonBg = new Ellipse();
        playButtonBg.radiusX = 40;
        playButtonBg.radiusY = 40;
        playButtonBg.fill = new Color(invertColors ? color : "white");

        insertNode(playButtonBg);

        const playIconNode = createIcon("M8 5v14l11-7z", {
            fill: invertColors ? "white" : color,
            stroke: invertColors ? "white" : color,
            strokeWidth: 5,
            strokeJoins: smoothCorners 
                ? GraphicNode.STROKE_JOIN_ROUND
                : GraphicNode.STROKE_JOIN_MITER,
            size: 30,
        });

        insertNode(playIconNode);

        selection.items = [
            playButtonBg, playIconNode
        ];
        commands.alignHorizontalCenter();
        commands.alignVerticalCenter();
        commands.group();
        playIconNode.moveInParentCoordinates(3, 0);

        const button = selection.items[0];
        button.name = 'playButton';
        return button;
    }

    function getShadow(){
        let { size, placement, color } = shadow || {};
        const shadowPropsMap = {
            "sm": [5, 15, 30],
            "md": [10, 22, 60],
            "lg": [15, 30, 90],
        };

        if(!size || !Object.keys(shadowPropsMap).includes(size))
            size = "sm";

        const shadowProps = shadowPropsMap[size];
        let shadowOffsets = shadowProps.slice(0,2);
        const shadowBlur = shadowProps[2];

        if(placement.indexOf("-L") != -1)
            shadowOffsets[0]*=-1;

        return new Shadow(...shadowOffsets, shadowBlur, new Color(color, 0.25), true);
    }

    function createOverlayMedia(){
        let bgRectangle = new Rectangle();
        bgRectangle.resize(510, 340);
        bgRectangle.name = "BG";
        bgRectangle.fill = bottomImageFill ? bottomImageFill : new ImageFill(portraitImage);
        if(cornerRadius)
            bgRectangle.setAllCornerRadii(5);
        
        insertNode(bgRectangle);

        if(shadow)
            bgRectangle.shadow = getShadow();

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

        const overLayouts = {
            "T-R" : [70, -60],
            "T-L" : [-70, -60],
            "B-R" : [70, 60],
            "B-L" : [-70, 60],
        };

        overlayImage.moveInParentCoordinates(...overLayouts[overLayout]);

        return selection.items[0];
    }

    function createRegularMedia(){
        const bgRectangle = new Rectangle();
        bgRectangle.name = "BG";
        bgRectangle.fill = mainImageFill ? mainImageFill : new ImageFill(defaultImage);

        if(orientation == 'portrait')
            bgRectangle.resize(540, 580);
        else
            bgRectangle.resize(580, 440);
        
        if(cornerRadius)
            bgRectangle.setAllCornerRadii(10);
        
        insertNode(bgRectangle);

        if(video){
            const radiusMap = { 'xs': 10, 'sm': 40, 'md': 120, 'lg': 500 };
            bgRectangle.setAllCornerRadii(radiusMap[cornerRadius]);

            selection.items = [bgRectangle];
            commands.duplicate();

            if(shadow)
                bgRectangle.shadow = getShadow();

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
            bgRectangle.shadow = getShadow();

        return bgRectangle;
    }

    function createCircularMedia(){
        const bg = new Ellipse();
        bg.name = "BG";
        bg.radiusX = 246;
        bg.radiusY = 246;
        bg.fill = mainImageFill ? mainImageFill : new ImageFill(defaultImage);
        
        insertNode(bg);

        if(video){
            selection.items = [bg];
            commands.duplicate();

            if(shadow)
                bg.shadow = getShadow();

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
            bg.shadow = getShadow();

        return bg;
    }

    const styleMap = {
        'basic': createRegularMedia,
        'circle': createCircularMedia,
        'overlay': createOverlayMedia
    }

    const mediaCreator = styleMap[style] || createRegularMedia;

    return [mediaCreator()];
}

module.exports = createMedia;