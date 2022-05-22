const React = require("react");
const { useEffect, useState } = require("react");

function BcImageSearch({
    placeholder = "Search for photos",
    query,
    searchOnChange,
    fetchLatestPhotos = _ => {},
    searchPhotos = _ => {},
    onChange = _ => {}
}){
    const [searchQuery, setSearchQuery] = useState(query && query.length ? query : "");
    const [searchState, setSearchState] = useState(null);
    const [error, setError] = useState(null);
    const [results, setResults] = useState(null);

    useEffect(() => {
        if(!results || !results.length)
            getLatestPhotos()
    }, []);

    async function getLatestPhotos(){
        setResults([]);
        setSearchState("fetching");
        const response = await fetchLatestPhotos();
        setResults(response);
        setSearchState("");
    }

    function handleSearchPhotos(e){
        e.preventDefault();
        e.stopPropagation();
        setResults([]);
        doSearch();
    }

    async function doSearch(){
        setSearchState("fetching");
        const response = await searchPhotos(searchQuery);
        setResults(response);
        setSearchState("");
    }

    function handleSearchQueryChanged(value){
        setSearchQuery(value);
        if(searchOnChange){
            console.log("New value", value);
            doSearch();
        }
    }

    let evenResults = [];
    let oddResults = [];

    if(results && results.length){
        evenResults = results.filter((_, index) => index % 2 == 0);
        oddResults = results.filter((_, index) => index % 2 != 0);
    }

    function ResultImage({image}){
        return (
            <div className="p-1" style={
                    image.aspectRatio ? {} : {padding: 0}
                }>
                <div className="bg-gray-100 rounded-xs overflow-hidden relative flex center-center"
                    style={
                        image.aspectRatio ? {background: `${image.color}`, paddingBottom: `${image.aspectRatio * 100}%`}
                        : {borderRadius: 0, height: "65px", border: "solid #e5e5e5", borderWidth: "0 1px 1px 0"}
                    }
                    title={image.name}
                    onClick={() => onChange(image.full, searchQuery)}
                >
                    <img loading="lazy" className="absolute inset-0 h-full w-full object-cover" src={image.preview} alt="" 
                        style={
                            image.aspectRatio ? {}
                            : {position: "relative", width: "auto", maxWidth: "60%", height: "auto", maxHeight: "60%", objectFit: "contain"}
                        }
                    />
                </div>
            </div>
        );
    }
    
    return (
        <div className="relative h-full flex flex-col bg-gray-100 overflow-hidden">
            <div className="py-2 px-1 border-b bg-white">
                <form className="relative overflow-hidden flex items-center"
                    onSubmit={handleSearchPhotos}
                    autoComplete="off"
                >
                    <input className="w-full"
                        type="text" uxp-quiet="true"
                        placeholder={placeholder}
                        name="q"
                        value={searchQuery}
                        onChange={e => handleSearchQueryChanged(e.target.value)}
                        autoComplete="off"
                    />
        
                    { searchQuery && searchQuery.length > 0 &&
                        <span className="absolute right-0 inset-y-0 right-0 flex items-center justify-center"
                            onClick={() => handleSearchQueryChanged("")}
                        >
                            <svg height="12px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </span>
                    }
                </form>
            </div>

            { searchState == "fetching" && 
                <div className="flex justify-center">
                    <img width="80px" src="images/spinner.gif" />
                </div>
            }

            <div className="flex overflow-y-auto"
                style={{maxHeight: "70vh"}}
            >
                <div className="flex-1 flex-shrink-0">
                    { evenResults && evenResults.map((image, index) => (
                        <ResultImage key={index} image={image} />
                    )) }
                </div>
                <div className="flex-1 flex-shrink-0">
                    { oddResults && oddResults.map((image, index) => (
                        <ResultImage key={index} image={image} />
                    ))}
                </div>
            </div>
        </div>
    )
}

module.exports = BcImageSearch;