const React = require('react');
const Creators = require('../../../Creators');
const FooterLinks = require('./Links');

function Footer({value, onClose}){
    const [links, setLinks] = React.useState(value ? value.links : []);

    function handleSetLinks(links){
        setLinks(links);
        Creators.Footer({...value, links});
    }

    return (
        <div style={{margin: "0.5rem -12px"}}>
            <div className="flex items-center px-1">
                <span className="cursor-pointer opacity-65" onClick={onClose}>
                    <svg height="16" viewBox="0 0 24 24" width="24">
                        <path fill="black" d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/>
                    </svg>
                </span>

                <h2 className="px-0 text-md ml-1">
                    Footer
                </h2>
            </div>

            <FooterLinks 
                links={links}
                activeLink={value.activeLink}
                onChange={handleSetLinks}
            />
        </div>
    );
}

module.exports = Footer;