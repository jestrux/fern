const React = require('react');
const { selection, ImageFill } = require("scenegraph");

const Creators = require('../../Creators');
const Toggle = require('../../components/Toggle');
const ColorList = require('../../components/ColorList');
const ButtonGroup = require('../../components/ButtonGroup');
const Image = require('./Image');
const { editDom, getGroupChildByName } = require('../../utils');
const getMediaImages = require('../../Creators/MediaSection/getMediaImages');
const { PLUGIN_ID } = require('../../constants');

function MediaSection({value, onClose}){
    const style = value ? value.style : 'basic';
    const orientation = value ? value.orientation : 'landscape';
    let overLayout = value ? value.overLayout : "T-R";

    const shadow = value ? value.shadow : false;
    const defaultShadowProps = {
        size: "lg",
        placement: "B-R",
        color: "#000",
    };
    const shadowSize = shadow ? shadow.size : "lg";
    const shadowPlacement = shadow ? shadow.placement : "B-R";
    const shadowColor = shadow ? shadow.color : "red";

    const video = value ? value.video : false;
    const playIcon = value ? value.playIcon || {} : {};
    const playIconColor = playIcon.color || "red";
    const invertPlayIconColors = playIcon.invertColors;
    const smoothPlayIconCorners = playIcon.smoothCorners;

    const cornerRadius = value ? value.cornerRadius : 'sm';

    const [editImage, setEditImage] = React.useState(false);
    const [editUnderlayImage, setEditUnderlayImage] = React.useState(false);

    const [showShadowStyles, setShowShadowStyles] = React.useState(value.showShadowStyles);
    const [showPlayIconStyles, setShowPlayIconStyles] = React.useState(value.showPlayIconStyles);

    React.useEffect(() => {
        if(showShadowStyles != value.showShadowStyles
            || showPlayIconStyles != value.showPlayIconStyles
        ){
            value.showShadowStyles = showShadowStyles;
            value.showPlayIconStyles = showPlayIconStyles;
            
            editDom(() => {
                selection.items[0].sharedPluginData.setItem(PLUGIN_ID, "richData", JSON.stringify(value));
            });
        }
    }, [showShadowStyles, showPlayIconStyles]);

    function handleSetImage(image){
        const [topImage] = getMediaImages(selection.items[0]);
        editDom(() => {
            topImage.fill = new ImageFill(image);
        });
    }

    function handleSetUnderlayImage(image){
        const [topImage, bottomImage] = getMediaImages(selection.items[0]);
        editDom(() => {
            bottomImage.fill = new ImageFill(image);
        });
    }

    function handleSetStyle(style){
        Creators.MediaSection({...value, style});
    }

    function handleSetOrientation(orientation){
        Creators.MediaSection({...value, orientation});
    }

    function handleSetOverLayout(overLayout){
        Creators.MediaSection({...value, overLayout});
    }

    function handleSetShadow(shadow){
        if(shadow) shadow = {...defaultShadowProps};
        Creators.MediaSection({...value, shadow});
    }

    function handleSetShadowSize(size){
        if(!shadow) shadow = {...defaultShadowProps};
        Creators.MediaSection({...value, shadow: { ...shadow, size } });
    }

    function handleSetShadowColor(color){
        if(!shadow) shadow = {...defaultShadowProps};
        Creators.MediaSection({...value, shadow: { ...shadow, color } });
    }

    function handleSetShadowPlacement(placement){
        if(!shadow) shadow = {...defaultShadowProps};
        Creators.MediaSection({...value, shadow: { ...shadow, placement } });
    }

    function handleSetVideo(video){
        Creators.MediaSection({...value, video});
    }

    function handleSetPlayIconColor(color){
        Creators.MediaSection({...value, playIcon: { ...playIcon, color } });
    }

    function handleSetInvertPlayIconColors(invertColors){
        Creators.MediaSection({...value, playIcon: { ...playIcon, invertColors } });
    }

    function handleSetSmoothPlayIconCorners(smoothCorners){
        Creators.MediaSection({...value, playIcon: { ...playIcon, smoothCorners } });
    }

    function handleSetCornerRadius(cornerRadius){
        if(cornerRadius == true) cornerRadius = 'sm';
        Creators.MediaSection({...value, cornerRadius});
    }

    if(editImage || editUnderlayImage) return(
        <Image 
            value="office space"
            onClose={() => {setEditImage(false); setEditUnderlayImage(false); }}
            onSelect={editUnderlayImage ? handleSetUnderlayImage : handleSetImage}
        />
    );

    return (
        <div style={{margin: "0.5rem -12px"}}>
            <div className="flex items-center px-1">
                <span className="cursor-pointer opacity-65" onClick={onClose}>
                    <svg height="16" viewBox="0 0 24 24" width="24">
                        <path fill="#333" d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/>
                    </svg>
                </span>

                <h2 className="px-0 text-md ml-1">
                    MediaSection
                </h2>
            </div>

            <div className="px-3 pt-2 mt-3 flex flex-col items-start">
                <label className="mb-1 text-md">Style</label>

                <ButtonGroup 
                    value={style}
                    choices={["basic", "circle", "overlay"]}
                    onChange={handleSetStyle}
                />
            </div>

            { style == 'basic' &&
                <div className="px-3 mt-2 flex flex-col items-start">
                    <label className="mb-1 text-md">Orientation</label>

                    <ButtonGroup 
                        value={orientation}
                        choices={["landscape", "portrait"]}
                        onChange={handleSetOrientation}
                    />
                </div>
            }

            { style == 'overlay' &&
                <div className="px-3 mt-2 flex flex-col items-start">
                    <label className="mb-1 text-md">
                        Overlay Placement
                    </label>

                    <ButtonGroup 
                        value={overLayout}
                        choices={["T-R","T-L","B-R","B-L"]}
                        onChange={handleSetOverLayout}
                    />
                </div>
            }

            <div className="px-3 pt-1 mt-3 flex items-center justify-between">
                <label className="text-md">
                    { style == "overlay" ? 'Top Picture' : 'Picture' }
                </label>

                <span className="text-sm border-b border-current text-blue cursor-pointer"
                    onClick={() => setEditImage(true)}
                >
                    CHANGE
                </span>
            </div>

            { style == "overlay" &&
                <div className="px-3 mt-3 flex items-center justify-between">
                    <label className="text-md">Bottom Picture</label>

                    <span className="text-sm border-b border-current text-blue cursor-pointer"
                        onClick={() => setEditUnderlayImage(true)}
                    >
                        CHANGE
                    </span>
                </div>
            }

            <div className="">
                <div className="px-3 flex items-center justify-between mt-3">
                    <label className="text-md">Shadow</label>
                    
                    <Toggle checked={shadow} onChange={handleSetShadow} />
                </div>

                { shadow &&
                    <div className={`-mx-12px px-12px mt-1 bg-white ${showShadowStyles && 'border-b'}`}>
                        <div className="py-2 px-3 border-b border-light-gray flex items-center justify-between">
                            <label className="text-base">SHADOW STYLES</label>

                            <div className="visible-on-parent-hover cursor-pointer rounded-full flex center-center"
                                style={{ width: "20px", height: "20px" }}
                                onClick={() => setShowShadowStyles(!showShadowStyles)}
                            >
                                <svg className='opacity-50' width="15px" height="15px" viewBox="0 0 24 24"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/></svg>
                            </div>
                        </div>

                        { showShadowStyles &&
                            <div className="pt-1 pb-3 px-3 bg-black12">
                                <div className="flex flex-col items-start">
                                    <label className="mb-1 text-md">
                                        Size
                                    </label>

                                    <ButtonGroup 
                                        value={shadowSize}
                                        choices={["sm","md", "lg"]}
                                        onChange={handleSetShadowSize}
                                    />
                                </div>

                                <div className="mt-3 flex flex-col items-start">
                                    <label className="mb-1 text-md">
                                        Placement
                                    </label>

                                    <ButtonGroup 
                                        value={shadowPlacement}
                                        choices={["B-L","B-R"]}
                                        onChange={handleSetShadowPlacement}
                                    />
                                </div>

                                <div className="mt-3 flex flex-col items-start">
                                    <label className="mb-1 text-md">Color</label>

                                    <ColorList
                                        choiceSize={8}
                                        colors={["#000", "#5A2F15", "#9EE52C", "#22A4B5"]}
                                        selectedColor={shadowColor}
                                        onChange={handleSetShadowColor}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>

            <div className="">
                <div className="px-3 flex items-center justify-between mt-3">
                    <label className="text-md">Video</label>
                    
                    <Toggle checked={video} onChange={handleSetVideo} />
                </div>

                { video &&
                    <div className={`-mx-12px px-12px mt-1 bg-white ${showPlayIconStyles && 'border-b'}`}>
                        <div className="py-2 px-3 border-b border-light-gray flex items-center justify-between">
                            <label className="text-base">PLAY ICON</label>

                            <div className="visible-on-parent-hover cursor-pointer rounded-full flex center-center"
                                style={{ width: "20px", height: "20px" }}
                                onClick={() => setShowPlayIconStyles(!showPlayIconStyles)}
                            >
                                <svg className='opacity-50' width="15px" height="15px" viewBox="0 0 24 24"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/></svg>
                            </div>
                        </div>

                        { showPlayIconStyles &&
                            <div className="pt-1 pb-3 px-3 bg-black12">
                                <div className="flex flex-col items-start">
                                    <label className="mb-1 text-md">Color</label>

                                    <ColorList
                                        choiceSize={8}
                                        colors={["#EA4949", "#00DF7F", "#333"]}
                                        selectedColor={playIconColor}
                                        onChange={handleSetPlayIconColor}
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-1 mt-3">
                                    <label className="text-md">Invert Colors</label>
                                    
                                    <Toggle 
                                        checked={invertPlayIconColors} 
                                        onChange={handleSetInvertPlayIconColors} 
                                    />
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <label className="text-md">Smooth Corners {smoothPlayIconCorners} </label>
                                    
                                    <Toggle 
                                        checked={smoothPlayIconCorners} 
                                        onChange={handleSetSmoothPlayIconCorners} 
                                    />
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>

            { style !== 'circle' &&
                <div className="px-3 mt-3">
                    <div className="flex items-center justify-between">
                        <label className="text-md">Rounded Corners</label>
                        
                        <Toggle checked={cornerRadius} onChange={handleSetCornerRadius} />
                    </div>

                    { style == 'basic' && cornerRadius && video &&
                        <div className="mt-1">
                            <ButtonGroup 
                                value={cornerRadius}
                                choices={["xs", "sm", "md", "lg"]}
                                onChange={handleSetCornerRadius}
                            />
                        </div>
                    }
                </div>
            }

        </div>
    );
}

module.exports = MediaSection;