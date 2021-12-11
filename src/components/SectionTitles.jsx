const React = require("react");

const sections = [
    {
        label: "Maps",
        icon: "M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM10 5.47l4 1.4v11.66l-4-1.4V5.47zm-5 .99l3-1.01v11.7l-3 1.16V6.46zm14 11.08l-3 1.01V6.86l3-1.16v11.84z",
    },
    {
        label: "Elements",
        icon: "M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z",
    },
    {
        label: "Config",
        icon: "M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z",
    }
];

const SectionTitles = function({currentSection, onChange}){
    const titleItems = () => sections.map((section, index) => {
        const selected = currentSection == section.label;
        const iconSize = index == 1 ? '17px' : '16px';
        const styles = {
            fontSize: "0.75rem",
            color: selected ? "#444" : '#888',
            borderColor: selected ? "#888" : 'transparent',
            paddingLeft: "3px",
            paddingRight: "8px"
        };

        return (
            <div key={index} className="cursor-pointer flex flex-wrap justify-center items-center border-b-2 border-dark-gray mr-3 pb-1"
                style={styles}
                onClick={() => onChange(section.label)}
            >
                <svg className="mr-1" width={iconSize} viewBox="0 0 24 24">
                    <path fill={selected ? '#555' : '#888'} d={section.icon} />
                </svg>
                {section.label}
            </div>
        );
    });

    return (
        <div className="flex items-center" style={{padding: "0 12px"}}>
            { titleItems() }
        </div>
    );
}

module.exports = SectionTitles;