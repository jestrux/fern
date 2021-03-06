const React = require('react');
const { ELEMENT_TYPES } = require('../../constants');
const SelectionContext = require('../../SelectionContext');
const ElementList = require('./ElementList');
const Card = require("./Card");
const Image = require("./Image");
const Input = require('./Input');
const Button = require('./Button');
const Navbar = require('./Navbar');
const Hero = require('./Hero');
const FAQ = require('./FAQ');
const CTA = require('./CTA');
const Footer = require('./Footer');
const SectionText = require('./SectionText');
const FeatureSection = require('./FeatureSection');
const MediaSection = require('./MediaSection');
const Grid = require('./Grid');
const FernComponent = require('./FernComponent');
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
            console.log("Fern JSON: ", props);
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
            Button, Input, Card, Image,
            SectionText,
            Navbar, 
            Hero,
            FeatureSection,
            MediaSection,
            Grid,
            Footer,
            FAQ,
            CTA,
            FernComponent,
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