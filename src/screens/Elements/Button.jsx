const React = require('react');
const Creators = require('../../Creators');
const Toggle = require('../../components/Toggle');
const ColorList = require('../../components/ColorList');
const ButtonGroup = require('../../components/ButtonGroup');
const IconList = require('../../components/IconPicker/IconList');

function Button({value, onClose}){
    const [text, setText] = React.useState(value ? value.text : "Submit");
    const size = value ? value.size : "sm";
    const color = value ? value.color : "#000";
    const shadow = value ? value.shadow : false;
    const outlined = value ? value.outlined : false;
    const roundness = value ? value.roundness : "xs";
    const icon = value ? value.icon : null;

    function handleSetSize(size){
        Creators.Button({...value, size});
    }

    function handleSetColor(color){
        Creators.Button({...value, color});
    }

    function handleSetShadow(shadow){
        Creators.Button({...value, shadow});
    }

    function handleSetOutlined(outlined){
        Creators.Button({...value, outlined});
    }

    function handleSetRoundness(roundness){
        Creators.Button({...value, roundness});
    }

    function handleSetIcon(icon){
        if(icon == true) icon = "add";
        Creators.Button({...value, icon});
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
                    Button
                </h2>
            </div>

            <div className="px-3">
                <div className="pt-2 mt-3">
                    <div className="flex items-center justify-between">
                        <label className="text-md">Icon</label>
                        
                        <Toggle checked={icon} onChange={handleSetIcon} />
                    </div>

                    { icon &&
                        <div className="-mx-12px p-2 mt-1 bg-white overflow-y-auto" style={{maxHeight: "140px"}}>
                            <IconList
                                onChange={handleSetIcon}
                            />
                        </div>
                    }
                </div>

                <div className="pt-2 mt-3 flex flex-col items-start">
                    <label className="mb-1 text-md">Text</label>

                    <form className='w-full' onSubmit={e => {e.preventDefault(); Creators.Button({...value, text})}}>
                        <input className="m-0 w-full" type="text" 
                            value={text}
                            onChange={e => setText(e.target.value)} 
                        />
                    </form>
                </div>

                <div className="pt-2 mt-3 flex flex-col items-start">
                    <label className="mb-1 text-md">Size</label>

                    <ButtonGroup 
                        value={size}
                        choices={["sm", "md", "lg"]}
                        onChange={handleSetSize}
                    />
                </div>

                <div className="pt-2 mt-3 flex flex-col items-start">
                    <label className="mb-1 text-md">Color</label>

                    <ColorList
                        small={true}
                        colors={["#007bff", "#28a745", "#DC3535", "#ffc107", "#333", "#FFF"]}
                        selectedColor={color}
                        onChange={handleSetColor}
                    />
                </div>

                <div className="flex items-center justify-between mt-3 pt-2">
                    <label className="text-md">Shadow</label>
                    
                    <Toggle checked={shadow} onChange={handleSetShadow} />
                </div>

                <div className="flex items-center justify-between mt-3 pt-1">
                    <label className="text-md">Outlined</label>
                    
                    <Toggle checked={outlined} onChange={handleSetOutlined} />
                </div>

                <div className="pt-1 mt-3 flex flex-col items-start">
                    <label className="mb-1 text-md">
                        Rounded Corners
                    </label>

                    <ButtonGroup 
                        value={roundness}
                        choices={["none", "sm", "md", "lg", "full"]}
                        onChange={handleSetRoundness}
                    />
                </div>
            </div>
        </div>
    );
}

module.exports = Button;