const React = require('react');
const Creators = require('../../Creators');
const Toggle = require('../../components/Toggle');
const ButtonGroup = require('../../components/ButtonGroup');

function MediaSection({value, onClose}){
    const style = value ? value.style : 'regular';
    const orientation = value ? value.orientation : 'landscape';
    const shadow = value ? value.shadow : false;
    const video = value ? value.video : false;
    const cornerRadius = value ? value.cornerRadius : 'sm';

    function handleSetStyle(style){
        Creators.MediaSection({...value, style});
    }

    function handleSetShadow(shadow){
        Creators.MediaSection({...value, shadow});
    }

    function handleSetVideo(video){
        Creators.MediaSection({...value, video});
    }

    function handleSetOrientation(orientation){
        Creators.MediaSection({...value, orientation});
    }

    function handleSetCornerRadius(cornerRadius){
        if(cornerRadius == true) cornerRadius = 'sm';
        Creators.MediaSection({...value, cornerRadius});
    }

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
                    choices={["regular", "circle", "overlay"]}
                    onChange={handleSetStyle}
                />
            </div>

            { style == 'regular' &&
                <div className="px-3 mt-2 flex flex-col items-start">
                    <label className="mb-1 text-md">Orientation</label>

                    <ButtonGroup 
                        value={orientation}
                        choices={["landscape", "portrait"]}
                        onChange={handleSetOrientation}
                    />
                </div>
            }

            <div className="px-3">
                <div className="flex items-center justify-between mt-3">
                    <label className="text-md">Shadow</label>
                    
                    <Toggle checked={shadow} onChange={handleSetShadow} />
                </div>
            </div>

            <div className="px-3">
                <div className="flex items-center justify-between mt-3">
                    <label className="text-md">Video</label>
                    
                    <Toggle checked={video} onChange={handleSetVideo} />
                </div>
            </div>

            { style !== 'circle' &&
                <div className="px-3 mt-3">
                    <div className="flex items-center justify-between">
                        <label className="text-md">Rounded Corners</label>
                        
                        <Toggle checked={cornerRadius} onChange={handleSetCornerRadius} />
                    </div>

                    { style == 'regular' && cornerRadius && video &&
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