const React = require("react");
const Creators = require("../../../../Creators");
const buttonPresets = require("./presets");

function ButtonPresets({onPresetScreen}) {
    function handlePresetClicked(name){
        Creators.Button(buttonPresets[name].props, {fromPreset: onPresetScreen});
    }

    return (
        <div className="flex flex-wrap">
            {Object.entries(buttonPresets).map(([name, value], index) => {
                const { props, ...styles } = buttonPresets[name];
                const { height = 30, fullWidth } = styles || {};

                return (
                    <div key={index} className="hoverable py-3 flex-shrink-0 font-bold text-center bg-gray-100 overflow-hidden relative flex flex-col center-center"
                        style={{ width: fullWidth ? "100%" : "50%", border: "solid #e5e5e5", borderWidth: "0 1px 1px 0" }}
                        onClick={() => handlePresetClicked(name)}
                    >
                        <div className="flex center-center" style={{ height: "50px"}}>
                            <img loading="lazy" className="object-contain" 
                                src={`images/presets/button/${name}.png`} alt=""
                                style={{ maxWidth: "85%", maxHeight: `${height}px` }}
                            />
                        </div>
                        
                        <span className="font-light block text-center mt-2 text-sm tracking-wide">{ name.replaceAll("-", " ").toUpperCase() }</span>
                    </div>
                );
            })}
        </div>
    );
}

module.exports = ButtonPresets;