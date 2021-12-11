const React = require('react');
const { PLUGIN_ID } = require('../../constants');
const SelectionContext = require('../../SelectionContext');
const ElementList = require('./ElementList');
const Card = require("./Card");
const Image = require("./Image");

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
            const node = selection[0];
            let jsonString = node.sharedPluginData.getItem(PLUGIN_ID, "richData");
            console.log("Fancy maps JSON: ", jsonString);
            if(!jsonString) goToList = "No plugin data";
            else{
                try {
                    jsonString = JSON.parse(jsonString);
                    if(!jsonString.type || !["card", "image"].includes(jsonString.type))
                        goToList = "Not a map element";
                } catch (error) {
                    goToList = "No plugin data";
                }
            }
        }

        if(goToList){
            console.log("Clear element customize screen: ", goToList);
            timeout = setTimeout(() => {
                setScreen("");
            }, 100);

            return () => timeout ? clearTimeout(timeout) : false;
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
        if(screen == "image")
            return (
                <Image
                    value={value}
                    onClose={() => setScreen("List")} 
                />
            )

        if(screen == "card")
            return (
                <Card 
                    value={value}
                    onClose={() => setScreen("List")} 
                />
            );

        if(screen == "icons")
            return (
                <Icons 
                    value={value}
                    onClose={() => setScreen("List")} 
                />
            );

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