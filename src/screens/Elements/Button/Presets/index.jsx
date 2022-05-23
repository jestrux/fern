const React = require("react");
const Creators = require("../../../../Creators");
const buttonPresets = require("./presets");

function ButtonPresets() {
    function handlePresetClicked(name){
        Creators.Button(buttonPresets[name], {fromPreset: true});
    }

    return (
        <div className="flex flex-wrap overflow-y-auto"
            style={{ maxHeight: "70vh" }}
        >
            {Object.entries(buttonPresets).map(([name, value], index) => {
                return (
                    <div key={index} className="hoverable flex-shrink-0 font-bold text-center bg-gray-100 overflow-hidden relative flex center-center"
                        style={{ width: "50%", height: "65px", border: "solid #e5e5e5", borderWidth: "0 1px 1px 0" }}
                        onClick={() => handlePresetClicked(name)}
                    >
                        {/* <img loading="lazy" className="object-contain" src={image.preview} alt=""
                            style={{ maxWidth: "60%", height: "auto", maxHeight: "60%" }}
                        /> */}
                        { name.toUpperCase() }
                    </div>
                );
            })}
        </div>
    );
}

module.exports = ButtonPresets;