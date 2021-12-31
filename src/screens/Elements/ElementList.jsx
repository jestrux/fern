const React = require('react');
const Creators = require("../../Creators");

function ElementList({onGoToScreen}){
    return (
        <div className="-mx-12px px-2">
            <div className="mt-2">
                <h1 className="px-0 text-md text-gray mx-0 mb-2">
                    Elements
                </h1>

                {
                    ['Button', 'Navbar', 'Grid', 'MediaSection'].map((element, index) => (
                        <div key={index} className="mb-1 cursor-pointer flex items-center bg-white border-2 border-gray rounded-sm p-1 spy-1 text-base"
                            onClick={() => Creators[element]()}
                        >
                            <div className="mb-1 ml-2 flex-1">
                                <span className="block text-md font-medium">{element}</span>
                                <span className="text-base opacity-65">
                                    Create a { element } with a click
                                </span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

module.exports = ElementList;