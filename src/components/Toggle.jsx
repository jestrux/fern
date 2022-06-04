const React = require('react');

function Toggle({checked, onChange}){
    return (
        <div className={`cursor-pointer flex border ${checked ? 'border-dark-gray bg-dark-gray' : 'bg-black54 border-gray'}`}
            style={{width: "28px", padding: "1px", borderRadius: "8px"}}
            onClick={() => onChange(!checked)}
        >
            <div className={`rounded-full bg-white border border-darkgray ${checked && 'ml-auto'}`}
                style={{width: "10px", height: "10px"}}
            >
            </div>
        </div>
    );
}
module.exports = Toggle;