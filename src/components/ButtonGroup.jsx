const React = require('react');

function ButtonGroup({choices = [], value, onChange}){
    return (
        <div className="inline-flex border bg-white rounded-xs overflow-hidden"
            style={{padding: "0.1rem"}}
        >
            { choices.map((choice, index) => {
                const selected = value == choice;

                return (
                    <span key={index} className={`rounded-xs cursor-pointer py-1 px-2 ${selected ? 'bg-dark-gray text-white' : 'text-dark-gray'}`}
                        onClick={() => onChange(choice, index)}
                    >
                        { choice.toString().toUpperCase() }
                    </span>
                )
            }) }
        </div>
    );
}
module.exports = ButtonGroup;