const React = require('react');
const SelectionContext = require("./SelectionContext");

require('./App.css');

const { PLUGIN_ID } = require('./constants');
const Elements = require('./screens/Elements');

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSection: "Elements",
            presetElement: null,
            selectedItems: [],
        };

        this.panel = React.createRef();
        this.documentStateChanged = this.documentStateChanged.bind(this);
        this.handleSectionChanged = this.handleSectionChanged.bind(this);
    }

    documentStateChanged(selection) {
        this.setState({selectedItems: selection.items});

        if(selection.items && selection.items.length > 0){
            const node = selection.items[0];
            let jsonString = node.sharedPluginData.getItem(PLUGIN_ID, "richData");
            // console.log("Fancy Table JSON: ", jsonString);

            if (jsonString) {
                const { type, ...taggedProps } = JSON.parse(jsonString);
                console.log("Fancy Table: ", taggedProps);

                const state = {
                    currentSection: 'Elements',
                    presetElement: {...taggedProps, type, name: node.name}
                };
                this.setState(state);
            }
        }
        // else
        //     this.setState({presetElement: null});
    }

    handleSectionChanged(currentSection) {
        this.setState({currentSection});
    }

    render() {
        const { 
            selectedItems,
            presetElement,
        } = this.state;

        return (
            <SelectionContext.Provider value={selectedItems}>    
                <panel>
                    <div className="flex flex flex-col" 
                        style={{margin: "-12px", height: "88vh"}}
                    >
                        <div className="flex-1"
                            style={{padding: "0 12px", paddingBottom: "20px", overflowY: "scroll"}}
                        >
                            <Elements value={presetElement} />
                        </div>
                    </div>
                </panel>
            </SelectionContext.Provider>
        );
    }
}

module.exports = App;
