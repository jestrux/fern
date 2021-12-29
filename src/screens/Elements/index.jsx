const React = require('react');
const { ELEMENT_TYPES } = require('../../constants');
const SelectionContext = require('../../SelectionContext');
const ElementList = require('./ElementList');
const Card = require("./Card");
const Image = require("./Image");
const Button = require('./Button');
const Navbar = require('./Navbar');
const MediaSection = require('./MediaSection');
const { getNodeTag } = require('../../utils');

function Elements({value, subscription, onUpgrade}){
    const [screen, setScreen] = React.useState("");
    const selection = React.useContext(SelectionContext);
    
    React.useEffect(() => {
        goBackToListIfNeedBe();
    }, [selection]);

    function goBackToListIfNeedBe(){
        let timeout;
        let goToList = false;

        if(!selection || !selection.length)
            goToList = "No selection items or nothing selected";
        else{
            const props = getNodeTag(selection[0]);
            console.log("Fancy maps JSON: ", props);
            if(!props) 
                goToList = "No plugin data";
            else{
                const { type } = props;
                if(!type || !ELEMENT_TYPES.includes(type))
                    goToList = "Not a map element";
            }
        }

        if(goToList){
            console.log("Clear element customize screen: ", goToList);
            timeout = setTimeout(() => {
                setScreen("");
            }, 100);

            return () => timeout ? clearTimeout(timeout) : false;
        }
        else{
            console.log("Not supported element: ", goToList);
        }
    }

    React.useEffect(() => {
        // Force recreation of the customize screen
        if(value && value.type){
            setScreen("");

            setTimeout(() => setScreen(value.type), 50);
        }
    }, [value]);

    function RenderElement(){
        const uiElements = {
            Button, Navbar, MediaSection,
            Card, Image
        };

        if(ELEMENT_TYPES.includes(screen)){
            const SelectedElement = uiElements[screen];

            return (
                <SelectedElement
                    value={value}
                    onClose={() => setScreen("List")} 
                />
            )
        }

        return (
            <div className="mb-2 relative -mx-12px px-12px">
                <ElementList onGoToScreen={screen => setScreen(screen ? screen.toLowerCase() : "")} />
            </div>
        );
    }

    return (
        <div>
            { RenderElement() }
        </div>
    );
}

module.exports = Elements;