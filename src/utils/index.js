const simpleDateFormat = require("./simple-date-format");
const fakeValue = require("./fake-value");
const { PLUGIN_ID } = require("../constants");

let data;

function shuffle(array) {
    return [...array].sort(_ => Math.random() - 0.5);
}

function createArboard({name, width = 1080, height = 1920, color = "white"}, rootNode, relativeTo){
    const { Color, Artboard } = require("scenegraph");

    try {
        const arty = new Artboard();
        arty.width = width;
        arty.height = height;
        arty.fill = new Color(color);
        arty.name = name;
    
        rootNode.addChild(arty, 0);
    
        if(relativeTo){
            const { x, y } = relativeTo.boundsInParent;
            placeInParent(arty, { x: x + arty.width + 350, y});
        }
        else{
            const { x, y } = getTopMostArtboardCoordinates(rootNode, Artboard);
            placeInParent(arty, { x, y: y - height - 120 });
        }
    
        return arty;
    } catch (error) {
        console.log("Error creating artboard: ", error);
    }
}

/**
 * Downloads an image from the photoUrl and
 * stores it in a temp file and returns the file
 *
 * @param {url} photoUrl
 */
 async function downloadImage(photoUrl, returnBase64 = false) {
     try {
        const photoObj = await xhrBinary(photoUrl);
        if(returnBase64){
            const previewBase64 = await base64ArrayBuffer(photoObj);
            return `data:image/png;base64,${previewBase64}`;
        }
        
        const storage = require("uxp").storage;
        const fs = storage.localFileSystem;
        const tempFolder = await fs.getTemporaryFolder();
        const tempFileName = [...Array(30)].map(() => Math.random().toString(36)[2]).join('');
        const tempFile = await tempFolder.createFile(tempFileName, { overwrite: true });
        await tempFile.write(photoObj, { format: storage.formats.binary });
        return tempFile;
    } catch (error) {
        console.log("Error downloading images: ", error);
        throw error;
    }
}

/**
 * Fetches a url with binary data and returns a promise
 * which resolves with this data
 *
 * @param {url} url
 */
async function xhrBinary(url) {
    const res = await fetch(url);
    if(!res.ok){
        const error = await res.json();
        if(error.message)
            throw Error(error.message);
        else
            throw Error(res.statusText);
    }
    const buffer = await res.arrayBuffer();
    const arr = new Uint8Array(buffer);
    return arr;
}

function getTopMostArtboardCoordinates(rootNode, Artboard){
    // TODO: Add logic for when there are no artboards
    // TODO: Add logic for when you can't add in anymore artboards

    const artboards = rootNode.children.filter(node => node instanceof Artboard);
    const artboardBounds = artboards.map(({globalBounds}) => globalBounds);

    let mostLeft, topMost;

    const xPositions = artboardBounds.map(({x}) => x);
    mostLeft = Math.min(...xPositions);

    const yPositions = artboardBounds.map(({y}) => y);
    topMost = Math.min(...yPositions);

    return {x: mostLeft, y: topMost};
}

function placeInParent(node, coords){
    coords = coords || node.parent.topLeftInParent;
    let nodeBounds = node.localBounds;
    let nodeTopLeft = {x: nodeBounds.x, y: nodeBounds.y};
    node.placeInParentCoordinates(nodeTopLeft, coords);
}

/**
 * Gets the dimensions of a node based on its type
 * 
 * @returns {Object} Object containing width and height
 */
 function getDimensions(node) {
    let width, height;
    switch(node.constructor.name) {
        case "Rectangle":
        case "Polygon":
            width = node.width;
            height = node.height;
            break;
        case "Ellipse": 
            width = node.radiusX * 2;
            height = node.radiusY * 2;
            break;
        case "BooleanGroup": // Selecting arbitrary values for path and boolean group
        case "Path": 
            width = 500;
            height = 500;
            break;
        default:
            throw "Not supported"
    }

    return {
        width, height
    }
}


/**
 * A little helper class to make storing key-value-pairs (e.g. settings) for plugins for Adobe XD CC easier.
 */
class storageHelper {
    /**
     * Creates a data file if none was previously existent.
     * @return {Promise<storage.File>} The data file
     * @private
     */
    static async init() {
        const storage = require("uxp").storage;
        const fs = storage.localFileSystem;
        let dataFolder = await fs.getDataFolder();
        try {
            let returnFile = await dataFolder.getEntry('storage.json');
            data = JSON.parse((await returnFile.read({format: storage.formats.utf8})).toString());
            return returnFile;
        } catch (e) {
            const file = await dataFolder.createEntry('storage.json', {type: storage.types.file, overwrite: true});
            if (file.isFile) {
                await file.write('{}', {append: false});
                data = {};
                return file;
            } else {
                throw new Error('Storage file storage.json was not a file.');
            }
        }
    }

    /**
     * Retrieves a value from storage. Saves default value if none is set.
     * @param {string} key The identifier
     * @param {*} defaultValue The default value. Gets saved and returned if no value was previously set for the speciefied key.
     * @return {Promise<*>} The value retrieved from storage. If none is saved, the `defaultValue` is returned.
     */
    static async get(key, defaultValue) {
        if (!data) {
            const dataFile = await this.init();
            data = JSON.parse((await dataFile.read({format: storage.formats.utf8})).toString());
        }
        if (data[key] === undefined) {
            await this.set(key, defaultValue);
            return defaultValue;
        } else {
            return data[key];
        }
    }

    /**
     * Saves a certain key-value-pair to the storage.
     * @param {string} key The identifier
     * @param {*} value The value that get's saved
     * @return {Promise<void>}
     */
    static async set(key, value) {
        const dataFile = await this.init();
        data[key] = value;
        return await dataFile.write(JSON.stringify(data), {append: false, format: storage.formats.utf8});
    }

    /**
     * Deletes a certain key-value-pair from the storage
     * @param {string} key The key of the deleted pair
     * @return {Promise<void>}
     */
    static async delete(key) {
        return await this.set(key, undefined);
    }

    /**
     * Resets (i.e. purges) all stored settings.
     * @returns {Promise<void>}
     */
    static async reset() {
        const dataFile = await this.init();
        return await dataFile.write('{}', {append: false, format: storage.formats.utf8});
    }
}

function base64ArrayBuffer(arrayBuffer) {
    let base64 = ''
    const encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    const bytes = new Uint8Array(arrayBuffer)
    const byteLength = bytes.byteLength
    const byteRemainder = byteLength % 3
    const mainLength = byteLength - byteRemainder

    let a, b, c, d
    let chunk

    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048) >> 12 // 258048   = (2^6 - 1) << 12
        c = (chunk & 4032) >> 6 // 4032     = (2^6 - 1) << 6
        d = chunk & 63               // 63       = 2^6 - 1

        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
    }

    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
        chunk = bytes[mainLength]

        a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

        // Set the 4 least significant bits to zero
        b = (chunk & 3) << 4 // 3   = 2^2 - 1

        base64 += encodings[a] + encodings[b] + '=='
    } else if (byteRemainder == 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

        a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008) >> 4 // 1008  = (2^6 - 1) << 4

        // Set the 2 least significant bits to zero
        c = (chunk & 15) << 2 // 15    = 2^4 - 1

        base64 += encodings[a] + encodings[b] + encodings[c] + '='
    }

    return base64
}

function editDom(cb, wrapWithEditor = true){
    const invisibleButton = document.createElement("button");
    invisibleButton.innerText = "Invisible button";
    invisibleButton.style.display = "none";
    document.body.appendChild(invisibleButton);

    invisibleButton.addEventListener("click", () => {
        const { editDocument } = require("application");

        if(wrapWithEditor){
            editDocument(async (...args) => {
                cb(...args);
            });
        }
        else
            cb();
    });

    invisibleButton.click();

    setTimeout(() => {
        invisibleButton.remove();
    }, 200);
}

function someTime(duration = 10){
    return new Promise(res => {
        setTimeout(res, duration);
    });
}

function getGroupChildByName(group, name = "BG", cb = () => {}){
    return new Promise((res, rej) => {
        group.children.forEach(node => {
            if(node.name == name){
                res(node);
                cb(node);
            }
        });

        rej();
        cb(null);
    });
}

function getCurrentSelection(){
    return new Promise(res => {
        editDom((selection) => {
            let item = null;
            if(selection.items.length)
                item = selection.items[0];
                
            console.log("Selection bob: ", item);
                
            res(item);
        });
    });
}

function createIcon(pathData, defaultOptions = {}){
    const { Path, Color } = require("scenegraph");

    const options = {
        fill: "#555",
        stroke: "none",
        strokeWidth: 2,
        ...defaultOptions,
    };

    try {
        const icon = new Path();
        icon.pathData = pathData;
        
        if(options.stroke && options.stroke.length && options.stroke != "none"){
            icon.stroke = new Color(options.stroke);
            icon.strokeWidth = options.strokeWidth;
            icon.strokeEnabled = true;
        }
        else
            icon.strokeEnabled = false;

        if(options.fill && options.fill.length && options.fill != "none")
            icon.fill = new Color(options.fill);

        if(options.size){
            const {width, height} = icon.localBounds;
            const aspectRatio = width / height;
            if(width > height)
                icon.resize(options.size, options.size / aspectRatio);
            else
            icon.resize(options.size * aspectRatio, options.size);
        }
        
        return icon;
    } catch (error) {
        console.log("Error with path: ", error);
        return "";
    }
}

async function getAssetFileFromPath(path){
    try {
        const storage = require("uxp").storage;
        const fs = storage.localFileSystem;
        const pluginFolder = await fs.getPluginFolder();
        return await pluginFolder.getEntry(path);
    } catch (error) {
        console.log("Error fetching asset: ", error);
    }
}

function getPadding(px = 4, py = 4){
    return {
        bottom: py, top: py,
        left: px, right: px,
    }
}

function createBorder(props = {}){
    const { Color, Line } = require("scenegraph");

    const {
        top = 0, 
        width = 1920,
        color = "black",
        thickness = 1.5
    } = props;

    const border = new Line();
    border.strokeEnabled = true;
    border.stroke = new Color(color);
    border.strokeWidth = thickness;
    border.setStartEnd(0, top, width, top);
    
    return border;
}

module.exports = {
    shuffle,
    downloadImage,
    getDimensions,
    storageHelper,
    createArboard,
    getTopMostArtboardCoordinates,
    placeInParent,
    simpleDateFormat,
    editDom,
    base64ArrayBuffer,
    someTime,
    getGroupChildByName,
    getCurrentSelection,
    fakeValue,
    createIcon,
    getAssetFileFromPath,
    getPadding,
    createBorder,
}