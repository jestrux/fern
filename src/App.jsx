const React = require('react');
const SelectionContext = require("./SelectionContext");

require('./App.css');

const Elements = require('./screens/Elements');
const PresetList = require('./screens/Presets');

const { getNodeTag } = require('./utils');
const SectionTitles = require('./components/SectionTitles');

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
            const nodeProps = getNodeTag(node);

            if (nodeProps) {
                const { type, ...taggedProps } = nodeProps;
                console.log("Fern element: ", taggedProps);

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
            currentSection, 
            selectedItems,
            presetElement,
        } = this.state;

        return (
            <SelectionContext.Provider value={selectedItems}>    
                <panel>
                    <div className="flex flex flex-col" 
                        style={{margin: "-12px", height: "88vh"}}
                    >
                        <div className="flex items-center px-12px mb-1">
                            {["Elements", "Presets"].map((section, index) => (
                                <React.Fragment>
                                    <h1 key={index} className={`text-md cursor-pointer px-0 text-md text-gray mx-0 mr-3
                                            ${currentSection != section && "opacity-50"}
                                        `}
                                        onClick={() => this.handleSectionChanged(section)}
                                    >
                                        {section}
                                        {/* {section.toUpperCase()} */}
                                    </h1>

                                    { index == 0 && <div className="rounded-full bg-dark-gray mr-3" style={{ width: "5px", height: "5px" }}></div> }
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="flex-1"
                            style={{padding: "0 12px", paddingBottom: "20px", overflowY: "scroll"}}
                        >
                            { currentSection == "Elements" && <Elements value={presetElement} /> }
                            { currentSection == "Presets" && <PresetList /> }
                        </div>
                    </div>
                </panel>
            </SelectionContext.Provider>
        );
    }
}

module.exports = App;
