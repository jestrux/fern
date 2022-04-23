const React = require('react');
const Creators = require('../../Creators');
const Toggle = require('../../components/Toggle');
const ColorList = require('../../components/ColorList');
const ButtonGroup = require('../../components/ButtonGroup');
const { getGroupChildByName, editDom } = require('../../utils');

function Card({value, onClose}){
    const rating = value ? value.rating || { fomat: "text" } : { format: "text" };
    const large = value ? value.large : false;
    const image = value ? value.image : false;
    const shadow = value ? value.shadow : false;
    const darkMode = value ? value.darkMode : false;

    React.useEffect(() => {
        console.log("Initial card value: ", value)
    }, []);

    function handleSetRatingLevel(value){
        const updatedRating = {...rating, level: value};
        Creators.Card({darkMode, shadow, image, large, rating: updatedRating});
    }

    function handleSetRatingColor(value){
        const updatedRating = {...rating, color: value};
        Creators.Card({darkMode, shadow, image, large, rating: updatedRating});
    }

    function handleSetRatingFormat(value){
        const updatedRating = {...rating, format: value};
        Creators.Card({darkMode, shadow, image, large, rating: updatedRating});
    }

    function handleSetLarge(value){
        Creators.Card({darkMode, shadow, image, rating, large: value});
    }

    function handleSetImage(value){
        Creators.Card({darkMode, shadow, large, rating, image: value});
    }

    function handleChangeImage(){
        editDom(async (selection) => {
            try {
                const card = selection.items[0];

                if(card && card.constructor.name.toLowerCase().indexOf("group") != -1){
                    const cardImage = await getGroupChildByName(card, "Image");
                    
                    if(!cardImage)
                        return console.log("Card image not found!");

                    selection.items = [cardImage];
                }
            } catch (errMsg) {
                console.log("Error changing card image: ", errMsg);
            }
        });
    }

    function handleSetShadow(value){
        Creators.Card({darkMode, image, large, rating, shadow: value});
    }

    function handleSetDarkMode(value){
        Creators.Card({shadow, image, large, rating, darkMode: value});
    }

    return (
        <div style={{margin: "0.5rem -12px"}}>
            <div className="flex items-center px-1">
                <span className="cursor-pointer opacity-65" onClick={onClose}>
                    <svg height="16" viewBox="0 0 24 24" width="24">
                        <path fill="black" d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/>
                    </svg>
                </span>

                <h2 className="px-0 text-md ml-1">
                    Card
                </h2>
            </div>

            <div className="px-3">
                <div className="pt-2 mt-3">
                    <div className="flex items-center justify-between">
                        <label className="text-md">IMAGE</label>
                        
                        <Toggle checked={image} onChange={value => handleSetImage(value ? "normal" : null)} />
                    </div>

                    {
                        image && (
                            <div className={`mt-1 bg-white py-3 -mx-12px px-12px`}>
                                <div className="flex items-center justify-between">
                                    <label className="text-md">Picture</label>

                                    <span className="text-sm border-b border-current text-blue cursor-pointer"
                                        onClick={handleChangeImage}
                                    >CHANGE</span>
                                </div>

                                <div className="flex items-center justify-between mt-3">
                                    <label className="text-md">Style</label>

                                    <ButtonGroup 
                                        value={ image }
                                        choices={["normal", "inset"]}
                                        onChange={handleSetImage}
                                    />
                                </div>

                                <div className="flex items-center justify-between mt-3 pt-1">
                                    <label className="text-md">Size</label>

                                    <ButtonGroup 
                                        value={ large ? "large" : "small" }
                                        choices={["small", "large"]}
                                        onChange={ value => handleSetLarge(value == "large") }
                                    />
                                </div>
                            </div>
                        )
                    }
                </div>

                <div>
                    <div className="flex items-center justify-between mt-3">
                        <label className="text-md">RATING</label>
                    </div>

                    <div className={`mt-1 bg-white py-3 -mx-12px px-12px`}>
                        <div className="">
                            <label className="text-md">Score</label>

                            <input className="w-full" type="range" min="0" max="5" step="0.5" value={rating.level} onChange={e => handleSetRatingLevel(e.target.value)} />
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            <label className="text-md">Format</label>

                            <ButtonGroup 
                                value={ rating && rating.format }
                                choices={["icons", "text"]}
                                onChange={handleSetRatingFormat}
                            />
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            <label className="text-md">Color</label>

                            <ColorList
                                small={true}
                                colors={["#F7CD42", "#ff385c"]}
                                selectedColor={rating && rating.color}
                                onChange={handleSetRatingColor}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <label className="text-md">SHADOW</label>
                    
                    <Toggle checked={shadow} onChange={handleSetShadow} />
                </div>

                <div className="flex items-center justify-between mt-3 pt-1">
                    <label className="text-md">DARK MODE</label>
                    
                    <Toggle checked={darkMode} onChange={handleSetDarkMode} />
                </div>
            </div>
        </div>
    );
}

module.exports = Card;