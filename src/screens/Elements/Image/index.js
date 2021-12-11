const React = require("react");
const { useState } = require("react");
const { downloadImage, editDom, getDimensions } = require("../../../utils");
const errorDialog = require("../../../utils/CustomDialogs/Error");
const Loader = require("../../../components/Loader");
const BcImageSearch = require("./BcImageSearch");

function Image({value, onClose}){
    const clientId = "17ef130962858e4304efe9512cf023387ee5d36f0585e4346f0f70b2f9729964";
    const defaultSearchQuery = value && value.darkMode ? "hotel pool summer" : "pool sunset hotel";
    const [searchQuery, setSearchQuery] = useState(value && value.searchQuery ? value.searchQuery : defaultSearchQuery);
    const [loading, setLoading] = useState(false);

    async function fetchPhotos(url){
        const res = await fetch(url);
        let response = await res.json();
        const data = response.results ? response.results : response;

        const results = data.map( ({ width, height, color, description, urls, user }) => {
            const preview = urls.thumb;
            const full = urls.regular;
            return { aspectRatio: width/height, color, description, preview, full, user };
        });

        return results;
    }

    function getLatestPhotos(){
        // const url = `https://api.unsplash.com/photos?per_page=30&client_id=${clientId}`;
        // return fetchPhotos(url);
        return searchUnsplash(searchQuery);
    }

    function searchUnsplash(q){
        const query = q.split(" ").join(",");
        const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=${clientId}`;
        return fetchPhotos(url);
    }

    async function setImage(url){
        try {
            setLoading(true);
            const imageSize = await new Promise(res => {
                editDom(async (selection) => {
                    const node = selection.items[0];
                    const {width, height} = getDimensions(node);
                    const size = Math.max(width, height);
                    res(Math.min(1080, size * 2.5))
                });
            });
            url = url.replace("&w=1080", `&w=${imageSize}`);
            
            const { ImageFill } = require("scenegraph");
            const tempFile = await downloadImage(url, true);
            const imageFill = new ImageFill(tempFile);
            
            editDom(async (selection) => {
                const node = selection.items[0];
                node.fill = imageFill;
                setLoading(false);
            });
        } catch (error) {
            setLoading(false);
            if(error.toString().indexOf("Network request failed") != -1)
                errorDialog("Network error", "Please check your internet connection and try again");
            else
                errorDialog("Unknown error", "Please try again and if it persists, reach out to me on twitter @jestrux");

            console.log("Error applying map: ", error);
        }
    }
    
    return (
        <div className="-mx-12px">
            <div className="flex items-center px-1 py-2">
                <span className="cursor-pointer opacity-65" onClick={onClose}>
                    <svg height="16" viewBox="0 0 24 24" width="24">
                        <path fill="#333" d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/>
                    </svg>
                </span>

                <h2 className="px-0 text-md ml-1">
                    Image
                </h2>
            </div>

            <BcImageSearch 
                query={searchQuery}
                placeholder="Search for image"
                fetchLatestPhotos={getLatestPhotos}
                searchPhotos={searchUnsplash}
                onChange={setImage}
            />

            { loading && <Loader /> }
        </div>
    )
}

module.exports = Image;