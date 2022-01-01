const React = require('react');
const Creators = require('../../Creators');
const Toggle = require('../../components/Toggle');
const ButtonGroup = require('../../components/ButtonGroup');

function Grid({value, onClose}){
    const numberOfRecords = value ? value.numberOfRecords : 3;
    const columns = value ? value.columns : 3;
    const columnChoices = [
        { label: 'TWO', value: 2},
        {label: 'THREE', value: 3},
        {label: 'FOUR', value: 4},
        {label: 'FIVE', value: 5},
    ];
    const columnSpacing = value ? value.columnSpacing : 20;
    const rowSpacing = value ? value.rowSpacing : 30;
    const aspectRatio = value ? value.aspectRatio : 'landscape';
    const overlay = value ? value.overlay : false;
    const showRating = value ? value.showRating : true;
    const showTitle = value ? value.showTitle : true;
    const showDescription = value ? value.showDescription : true;
    const showPrice = value ? value.showPrice : true;
    const shadow = value ? value.shadow : false;
    const border = value ? value.border : false;
    const spaceAroundImage = value ? value.spaceAroundImage : false;
    const cornerRadius = value ? value.cornerRadius : 'sm';

    function refreshData(){
        Creators.Grid({...value, refreshData: true});
    }

    function handleSetNumberOfRecords(numberOfRecords){
        const newColumnCount = numberOfRecords < columns ? numberOfRecords : columns;
        Creators.Grid({...value, numberOfRecords, columns: newColumnCount});
    }

    function handleSetColumns(columns){
        Creators.Grid({...value, columns});
    }

    function handleSetColumnSpacing(columnSpacing){
        Creators.Grid({...value, columnSpacing});
    }

    function handleSetRowSpacing(rowSpacing){
        Creators.Grid({...value, rowSpacing});
    }

    function handleSetAspectRatio(aspectRatio){
        Creators.Grid({...value, aspectRatio});
    }

    function handleSetOverlay(overlay){
        Creators.Grid({...value, overlay});
    }

    function handleSetShowRating(showRating){
        Creators.Grid({...value, showRating});
    }

    function handleSetShowTitle(showTitle){
        Creators.Grid({...value, showTitle});
    }

    function handleSetShowDescription(showDescription){
        Creators.Grid({...value, showDescription});
    }

    function handleSetShowPrice(showPrice){
        Creators.Grid({...value, showPrice});
    }

    function handleSetShadow(shadow){
        if(shadow == "none") shadow = false;
        Creators.Grid({...value, shadow});
    }

    function handleSetBorder(border){
        Creators.Grid({...value, border});
    }

    function handleSetSpaceAroundImage(spaceAroundImage){
        Creators.Grid({...value, spaceAroundImage});
    }

    function handleSetCornerRadius(cornerRadius){
        Creators.Grid({...value, cornerRadius});
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
                    Grid
                </h2>
            </div>

            <div className="mt-2">
                <label className="text-blue flex mt-3 mb-3 text-sm tracking-widest px-3 pb-1 border-b border-black26">
                    GRID PROPS
                </label>

                <div className="px-3 mt-2">
                    <div className="flex items-center justify-between">
                        <label className="mb-1 text-md">Grid data</label>

                        <span className="cursor-pointer bg-gray rounded-full flex center-center" style={{width: "22px", height: "22px", marginTop: "4px"}}
                            onClick={refreshData}
                        >
                            <svg width="14px" viewBox="0 0 24 24"><path fill="none" stroke="#555" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        </span>
                    </div>
                    <div>
                        <input className="w-full" type="range" min="2" max="20"
                            value={numberOfRecords}
                            onChange={(e) => handleSetNumberOfRecords(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="flex justify-between opacity-50 px-1">
                        <div className="flex flex-col items-start">
                            <span className="mb-1">|</span>
                            2
                        </div>
                        <div className="flex flex-col center-center">
                            <span className="mb-1">|</span>
                            11
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="mb-1">|</span>
                            20
                        </div>
                    </div>
                </div>

                <div className="px-3 mt-2 flex flex-col items-start">
                    <label className="mb-1 text-md">No. of columns</label>

                    <ButtonGroup
                        value={columns}
                        choices={columnChoices}
                        onChange={handleSetColumns}
                    />
                </div>

                <div className="px-3 mt-3">
                    <label className="text-md">Column space</label>
                    <div>
                        <input className="w-full" type="range" min="0" max="40"
                            value={columnSpacing}
                            onChange={(e) => handleSetColumnSpacing(parseInt(e.target.value))}
                        />
                    </div>
                </div>

                <div className="px-3 mt-3">
                    <label className="text-md">Row space</label>
                    <div>
                        <input className="w-full" type="range" min="0" max="40"
                            value={rowSpacing}
                            onChange={(e) => handleSetRowSpacing(parseInt(e.target.value))}
                        />
                    </div>
                </div>

                <div className="mt-3">
                    <label className="text-blue flex mt-3 mb-3 text-sm tracking-widest px-3 pb-1 border-b border-black26">
                        CARD PROPS
                    </label>
                </div>

                <div className="px-3 pt-1 mt-3">
                    <div className="flex items-center justify-between">
                        <label className="text-md">Overlay Text</label>
                        
                        <Toggle checked={overlay} onChange={handleSetOverlay} />
                    </div>
                </div>

                <div className="px-3 mt-3">
                    <label className="block text-md">Shadow</label>
                    
                    <ButtonGroup 
                        value={!shadow ? "none" : shadow}
                        choices={["none", "sm", "md", "lg"]}
                        onChange={handleSetShadow}
                    />
                </div>

                { !shadow &&
                    <div className="px-3 mt-3">
                        <div className="flex items-center justify-between">
                            <label className="text-md">Border</label>
                            
                            <Toggle checked={border} onChange={handleSetBorder} />
                        </div>
                    </div>
                }

                <div className="px-3 mt-3">
                    <label className="text-md">Rounded corners</label>

                    { cornerRadius &&
                        <div className="mt-1">
                            <ButtonGroup 
                                value={cornerRadius}
                                choices={["none", "sm", "md", "lg"]}
                                onChange={handleSetCornerRadius}
                            />
                        </div>
                    }
                </div>

                <div className="mt-2">
                    <label className="text-blue flex mt-3 mb-3 text-sm tracking-widest px-3 pb-1 border-b border-black26">
                        CARD IMAGE
                    </label>
                </div>

                <div className="px-3 mt-2 flex flex-col items-start">
                    <label className="mb-1 text-md">Aspect ratio</label>

                    <ButtonGroup 
                        value={aspectRatio}
                        choices={["land", "por", "sqr"]}
                        onChange={handleSetAspectRatio}
                    />
                </div>

                { (shadow || border) &&
                    <div className="px-3 mt-3">
                        <div className="flex items-center justify-between">
                            <label className="text-md">Space around</label>
                            
                            <Toggle checked={spaceAroundImage} onChange={handleSetSpaceAroundImage} />
                        </div>
                    </div>
                }

                <div className="mt-1">
                    <label className="text-blue flex mt-3 mb-3 text-sm tracking-widest px-3 pb-1 border-b border-black26">
                        CARD CONTENT
                    </label>
                </div>

                <div className="px-3 mt-3">
                    <div className="flex items-center justify-between">
                        <label className="text-md">Show rating</label>
                        
                        <Toggle checked={showRating} onChange={handleSetShowRating} />
                    </div>
                </div>

                <div className="px-3 mt-3">
                    <div className="flex items-center justify-between">
                        <label className="text-md">Show title</label>
                        
                        <Toggle checked={showTitle} onChange={handleSetShowTitle} />
                    </div>
                </div>

                <div className="px-3 mt-3">
                    <div className="flex items-center justify-between">
                        <label className="text-md">Show description</label>
                        
                        <Toggle checked={showDescription} onChange={handleSetShowDescription} />
                    </div>
                </div>

                <div className="px-3 mt-3">
                    <div className="flex items-center justify-between">
                        <label className="text-md">Show price</label>
                        
                        <Toggle checked={showPrice} onChange={handleSetShowPrice} />
                    </div>
                </div>
            </div>
        </div>
    );
}

module.exports = Grid;