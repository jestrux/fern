const React = require('react');
const Creators = require('../../Creators');
const Toggle = require('../../components/Toggle');

function FernComponent({value, onClose}){
    const shadow = value ? value.shadow : false;

    function handleSetShadow(shadow){
        Creators.FernComponent({...value, shadow});
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
                    FernComponent
                </h2>
            </div>

            <div className="px-3">
                <div className="pt-2 mt-3">
                    <div className="flex items-center justify-between">
                        <label className="text-md">Shadow</label>
                        
                        <Toggle checked={shadow} onChange={handleSetShadow} />
                    </div>
                </div>
            </div>
        </div>
    );
}

module.exports = FernComponent;