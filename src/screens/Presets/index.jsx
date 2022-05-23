const React = require('react');
const PresetGrid = require('../../components/PresetGrid');
const buttonPresets = require('../Elements/Button/presets');
const navbarPresets = require('../Elements/Navbar/presets');
const ctaPresets = require('../Elements/CTA/presets');
const mediaSectionPresets = require('../Elements/MediaSection/presets');
const footerPresets = require('../Elements/Footer/presets');

const componentPresets = {
    "Button": buttonPresets,
    "Navbar": navbarPresets,
    "CTA": ctaPresets,
    "MediaSection": mediaSectionPresets,
    "Footer": footerPresets,
}

function PresetList({onGoToScreen}){
    return (
        <div className="-mx-12px mt-1">
            {Object.keys(componentPresets).map((component, index) => {
                return (
                    <div key={index} className="mb-2 bg-white border-b border-t border-gray">
                        <span className='block text-centers p-2 bg-black26'>
                            ~ {component.toUpperCase()}
                        </span>
                        <PresetGrid 
                            component={component}
                            presets={componentPresets[component]}
                            onPresetScreen
                        />
                    </div>
                );
            })}
        </div>
    );
}

module.exports = PresetList;