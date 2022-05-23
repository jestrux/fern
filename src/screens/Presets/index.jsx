const React = require('react');
const Creators = require("../../Creators");
const ButtonPresets = require('../Elements/Button/Presets');

function PresetList({onGoToScreen}){
    return (
        <div className="-mx-12px">
            <div className="mb-1 cursor-pointer flex items-center bg-white border-b border-t border-gray">
                <ButtonPresets />
            </div>
        </div>
    );
}

module.exports = PresetList;