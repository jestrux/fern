const React = require('react');
const Creators = require("../../Creators");

function ElementList({onGoToScreen}){
    return (
        <div className="-mx-12px px-2">
            <div className="mt-2">
                <h1 className="px-0 text-md text-gray mx-0 mb-2">
                    Elements
                </h1>

                <div className="mt-1">
                    <div className="mb-1 cursor-pointer flex items-center bg-white border-2 border-gray rounded-sm p-1 spy-1 text-base"
                        onClick={() => Creators.Card()}
                    >
                        <div className="flex-shrink-0 rounded-xs relative overflow-hidden" 
                            style={{height: 35, width: 45}}
                        >
                            <img className="object-cover absolute w-full h-full" src="images/FernCard.png" alt="" />
                        </div>
                        <div className="mb-1 ml-2 flex-1">
                            <span className="block text-md font-medium">Card</span>
                            <span className="text-base opacity-65">Show more details over a loaction</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

module.exports = ElementList;