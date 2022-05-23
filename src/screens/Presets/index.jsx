const React = require('react');
const PresetGrid = require('../../components/PresetGrid');
const buttonPresets = require('../Elements/Button/presets');
const ctaPresets = require('../Elements/CTA/presets');
const componentPresets = {
    "Button": buttonPresets,
    "CTA": ctaPresets,
}

function PresetList({onGoToScreen}){
    return (
        <div className="-mx-12px mt-1">
            {["Button", "CTA"].map((component, index) => {
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