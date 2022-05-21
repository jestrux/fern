const simpleDateFormat = require("./simple-date-format");
const fakeValue = require("./fake-value");
const { PLUGIN_ID } = require("../constants");

let data;

function shuffle(array) {
  return [...array].sort(_ => Math.random() - 0.5);
}

function createArboard(
  { name, width = 1080, height = 1920, color = "white" },
  rootNode,
  relativeTo
) {
  const { Color, Artboard } = require("scenegraph");

  try {
    const arty = new Artboard();
    arty.width = width;
    arty.height = height;
    arty.fill = new Color(color);
    arty.name = name;

    rootNode.addChild(arty, 0);

    if (relativeTo) {
      const { x, y } = relativeTo.boundsInParent;
      placeInParent(arty, { x: x + arty.width + 350, y });
    } else {
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
    if (returnBase64) {
      const previewBase64 = await base64ArrayBuffer(photoObj);
      return `data:image/png;base64,${previewBase64}`;
    }

    const storage = require("uxp").storage;
    const fs = storage.localFileSystem;
    const tempFolder = await fs.getTemporaryFolder();
    const tempFileName = [...Array(30)]
      .map(() => Math.random().toString(36)[2])
      .join("");
    const tempFile = await tempFolder.createFile(tempFileName, {
      overwrite: true,
    });
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
  if (!res.ok) {
    const error = await res.json();
    if (error.message) throw Error(error.message);
    else throw Error(res.statusText);
  }
  const buffer = await res.arrayBuffer();
  const arr = new Uint8Array(buffer);
  return arr;
}

function getTopMostArtboardCoordinates(rootNode, Artboard) {
  // TODO: Add logic for when there are no artboards
  // TODO: Add logic for when you can't add in anymore artboards

  const artboards = rootNode.children.filter(node => node instanceof Artboard);
  const artboardBounds = artboards.map(({ globalBounds }) => globalBounds);

  let mostLeft, topMost;

  const xPositions = artboardBounds.map(({ x }) => x);
  mostLeft = Math.min(...xPositions);

  const yPositions = artboardBounds.map(({ y }) => y);
  topMost = Math.min(...yPositions);

  return { x: mostLeft, y: topMost };
}

function placeInParent(node, coords) {
  coords = coords || node.parent.topLeftInParent;
  let nodeBounds = node.localBounds;
  let nodeTopLeft = { x: nodeBounds.x, y: nodeBounds.y };
  node.placeInParentCoordinates(nodeTopLeft, coords);
}

/**
 * Gets the dimensions of a node based on its type
 *
 * @returns {Object} Object containing width and height
 */
function getDimensions(node) {
  let width, height;
  switch (node.constructor.name) {
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
      throw "Not supported";
  }

  return {
    width,
    height,
  };
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
      let returnFile = await dataFolder.getEntry("storage.json");
      data = JSON.parse(
        (await returnFile.read({ format: storage.formats.utf8 })).toString()
      );
      return returnFile;
    } catch (e) {
      const file = await dataFolder.createEntry("storage.json", {
        type: storage.types.file,
        overwrite: true,
      });
      if (file.isFile) {
        await file.write("{}", { append: false });
        data = {};
        return file;
      } else {
        throw new Error("Storage file storage.json was not a file.");
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
      data = JSON.parse(
        (await dataFile.read({ format: storage.formats.utf8 })).toString()
      );
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
    return await dataFile.write(JSON.stringify(data), {
      append: false,
      format: storage.formats.utf8,
    });
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
    return await dataFile.write("{}", {
      append: false,
      format: storage.formats.utf8,
    });
  }
}

function base64ArrayBuffer(arrayBuffer) {
  let base64 = "";
  const encodings =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  const bytes = new Uint8Array(arrayBuffer);
  const byteLength = bytes.byteLength;
  const byteRemainder = byteLength % 3;
  const mainLength = byteLength - byteRemainder;

  let a, b, c, d;
  let chunk;

  // Main loop deals with bytes in chunks of 3
  for (var i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
    c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
    d = chunk & 63; // 63       = 2^6 - 1

    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
  }

  // Deal with the remaining bytes and padding
  if (byteRemainder == 1) {
    chunk = bytes[mainLength];

    a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

    // Set the 4 least significant bits to zero
    b = (chunk & 3) << 4; // 3   = 2^2 - 1

    base64 += encodings[a] + encodings[b] + "==";
  } else if (byteRemainder == 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

    a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
    b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

    // Set the 2 least significant bits to zero
    c = (chunk & 15) << 2; // 15    = 2^4 - 1

    base64 += encodings[a] + encodings[b] + encodings[c] + "=";
  }

  return base64;
}

function editDom(cb, wrapWithEditor = true) {
  const invisibleButton = document.createElement("button");
  invisibleButton.innerText = "Invisible button";
  invisibleButton.style.display = "none";
  document.body.appendChild(invisibleButton);

  invisibleButton.addEventListener("click", () => {
    const { editDocument } = require("application");

    if (wrapWithEditor) {
      editDocument(async (...args) => {
        cb(...args);
      });
    } else cb();
  });

  invisibleButton.click();

  setTimeout(() => {
    invisibleButton.remove();
  }, 200);
}

function someTime(duration = 10) {
  return new Promise(res => {
    setTimeout(res, duration);
  });
}

function getGroupChildByName(
  group,
  name = "BG",
  cb = () => {},
  multiple = false
) {
  return new Promise((res, rej) => {
    try {
      let found = false,
        recurse = false;
      const namePath = name.split("/");
      name = namePath.shift();

      let results = group.children.filter(child => child.name == name);
      if (results.length && namePath.length > 1) {
        while (results.length && namePath.length > 1) {
          name = namePath.shift();
          results = results[0].children.filter(child => child.name == name);
        }
      }

      if (results.length) {
        if (namePath.length == 1)
          results = results[0].children.filter(
            child => child.name == namePath[0]
          );

        if (!multiple) results = results[0];

        cb(results);
        res(results);

        return;
      }

      // group.children.forEach(node => {
      //     if (node.name == name) {
      //         if (namePath.length <= 1) {
      //             found = node;
      //             recurse = false;
      //             return;
      //         }
      //         else{
      //             group = node;
      //             recurse = true;
      //             return;
      //         }
      //     }
      // });

      // if(recurse){
      //     console.log("Recursing...", namePath, group);
      //     return getGroupChildByName(group, namePath.join("/"), cb);
      // }
      // else if (found) {
      //     const actualName = name.split("/").pop();
      //     const results = group.children.filter(child => child.name == actualName);
      //     if(results.length > 1) found = results;

      //     cb(found);
      //     res(found);

      //     return;
      // }

      cb(null);
      rej();
    } catch (error) {
      console.log("Error fetching group child: ", error);
    }
  });
}

function resizeIcon(icon, size) {
  const { width, height } = icon.localBounds;
  const aspectRatio = width / height;
  if (width > height) icon.resize(size, size / aspectRatio);
  else icon.resize(size * aspectRatio, size);
}

function createIcon(pathData, defaultOptions = {}) {
  const { Path, Color } = require("scenegraph");

  const options = {
    fill: "#555",
    stroke: "none",
    strokeWidth: 2,
    opacity: 1,
    ...defaultOptions,
  };

  try {
    const icon = new Path();
    icon.pathData = pathData;
    if (options.strokeJoins) icon.strokeJoins = options.strokeJoins;

    if (options.stroke && options.stroke.length && options.stroke != "none") {
      icon.stroke = new Color(options.stroke, options.opacity);
      icon.strokeWidth = options.strokeWidth;
      icon.strokeEnabled = true;
    } else icon.strokeEnabled = false;

    if (options.fill && options.fill.length && options.fill != "none")
      icon.fill = new Color(options.fill, options.opacity);

    if (options.size)
      resizeIcon(icon, options.size);

    return icon;
  } catch (error) {
    console.log("Error with path: ", error);
    return "";
  }
}

async function getAssetFileFromPath(path, extensions = "", shuffleResults) {
  try {
    const storage = require("uxp").storage;
    const fs = storage.localFileSystem;
    const pluginFolder = await fs.getPluginFolder();

    if (path.indexOf(".") == -1) {
      const pathArray = path.split("/");
      let folders = await pluginFolder.getEntries();
      let folderName = pathArray.shift();
      let folder = folders.find(e => e.isFolder && e.name == folderName);

      while (folder && pathArray.length) {
        folders = await folder.getEntries();
        folderName = pathArray.shift();
        folder = folders.find(e => e.isFolder && e.name == folderName);
      }

      if (!folder) return console.log(`Folder ${pathArray} not found!`);

      const files = await folder.getEntries();
      if (!extensions.length) return shuffleResults ? shuffle(files) : files;

      extensions = extensions.split("|");
      const results = files.filter(e =>
        extensions.includes(e.name.split(".").pop())
      );

      return shuffleResults ? shuffle(results) : results;
    }

    return await pluginFolder.getEntry(path);
  } catch (error) {
    console.log("Error fetching asset: ", error);
  }
}

async function getAssetsByType(type = "logo") {
  if (type == "logo") {
    const [logo1, logo2, logo3, logo4, logo5] = await Promise.all(
      Array(5).fill('fa').map((_, i) => getAssetFileFromPath(`images/logos/${i+1}.png`))
    );
    return { logo1, logo2, logo3, logo4, logo5 };
  }
  else if (type == "dp") {
    const [dp1, dp2, dp3, dp4, dp5, dp6] = await Promise.all(
      Array(6).fill('fa').map((_, i) => getAssetFileFromPath(`images/dps/${i+1}.jpg`))
    );
    return { dp1, dp2, dp3, dp4, dp5, dp6 };
  }
  else if (type == "banner") {
    const [banner1, banner2, banner3, banner4, banner5, banner6, banner7, banner8] = await Promise.all(
      Array(8).fill('fa').map((_, i) => getAssetFileFromPath(`images/banner/${i+1}.jpg`))
    );
    return { banner1, banner2, banner3, banner4, banner5, banner6, banner7, banner8 };
  }
}

function getPadding(top, right, bottom, left) {
  if(top == undefined) top = 4;
  if(right == undefined) right = top;
  if(bottom == undefined) bottom = top;
  if(left == undefined) left = right;

  return {
    bottom,
    top,
    left,
    right,
  };
}

function createBorder({
  top = 0,
  width = 1920,
  color = "black",
  thickness = 1.5,
}) {
  const { Color, Line } = require("scenegraph");

  const border = new Line();
  border.strokeEnabled = true;
  border.stroke = new Color(color);
  border.strokeWidth = thickness;
  border.setStartEnd(0, top, width, top);

  return border;
}

function insertNode(node) {
  const { selection } = require("scenegraph");
  let insertionParent = selection.insertionParent;
  if (selection.focusedArtboard) insertionParent = selection.focusedArtboard;

  insertionParent.addChild(node);
}

function tagNode(node, data) {
  node.sharedPluginData.setItem(PLUGIN_ID, "richData", JSON.stringify(data));
}

function getNodeTag(node) {
  const jsonString = node.sharedPluginData.getItem(PLUGIN_ID, "richData");

  if (jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.log("Error getting node tag: ", error);
    }
  }

  return;
}

function getFernComponentChildByName(
  component,
  childName,
  componentChildrenPathMap
) {
  let child;

  const childPath = componentChildrenPathMap[childName];

  if (!childPath) return console.log(`${childName} component not found.`);

  getGroupChildByName(component, childPath, childFromPath => {
    child = childFromPath;
  });

  return child;
}

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return { width: srcWidth * ratio, height: srcHeight * ratio };
}

function createRectangle(width = 200, height, userProps = {}) {
  if(height == undefined) height = width;
  const { Color, Rectangle, Shadow } = require("scenegraph");

  const defaultProps = {
    name: "BG",
    fill: "transparent",
    opacity: 1,
    width, height,
    border: false,
    shadow: "none",
    cornerRadius: "none",
  };

  let props = {
    ...defaultProps,
    ...(userProps || {}),
  };

  if(typeof props.fill == "string"){
    const transparent = props.fill == "transparent";
    props.fill = new Color(transparent ? "#FFFFFF" : props.fill, transparent ? 0 : props.opacity);
  }
  
  const radiusMap = { 'none': 0, 'sm': 6, 'md': 8, 'lg': 16, full: 999 };
  const radius = radiusMap[props.cornerRadius || 'none'] || radiusMap["none"];

  if(props.shadow && props.shadow != "none"){
    const shadowMap = {
      "none": [0, 0, 0],
      "sm": [0, 1, 3],
      "md": [1, 2, 5],
      "lg": [1.5, 3.5, 7],
    };
    
    const shadowProps = shadowMap[props.shadow || "none"] || shadowMap["none"];
    const shadowOffsets = shadowProps.slice(0,2);
    const shadowBlur = shadowProps[2];
    props.shadow = new Shadow(...shadowOffsets, shadowBlur, new Color("#000", 0.26), true);
  }
  else {
    const { shadow, ...nonShadowProps } = props;
    props = {
      ...nonShadowProps
    };
  }
  
  if(props.border){
    const border = props.border;
    const strokeProps = {
      strokeEnabled: true,
      strokeWidth: border.thickness || 1.5,
      stroke: new Color(border.color || "#e0e0e0", border.opacity || 1),
    }

    props = {
      ...props,
      ...strokeProps
    }
  }

  const rectangleNode = new Rectangle();
  Object.assign(rectangleNode, props);
  rectangleNode.setAllCornerRadii(radius);

  return rectangleNode;
}

function createCircle(radius = 50, userProps = {}) {
  const { Color, Ellipse, Shadow } = require("scenegraph");

  const defaultProps = {
    name: "BG",
    fill: "#F2F2F2",
    radiusX: radius,
    radiusY: radius,
    border: false,
    opacity: 1,
    shadow: "none",
  };

  let props = {
    ...defaultProps,
    ...(userProps || {}),
  };

  if(typeof props.fill == "string"){
    const transparent = props.fill == "transparent";
    props.fill = new Color(transparent ? "#FFFFFF" : props.fill, transparent ? 0 : props.opacity);
  }

  if(props.shadow && props.shadow != "none"){
    const shadowMap = {
      "none": [0, 0, 0],
      "sm": [0, 1, 3],
      "md": [1, 2, 5],
      "lg": [1.5, 3.5, 7],
    };
    
    const shadowProps = shadowMap[props.shadow || "none"] || shadowMap["none"];
    const shadowOffsets = shadowProps.slice(0,2);
    const shadowBlur = shadowProps[2];
    props.shadow = new Shadow(...shadowOffsets, shadowBlur, new Color("#000", 0.26), true);
  }
  else {
    const { shadow, ...nonShadowProps } = props;
    props = {
      ...nonShadowProps
    };
  }

  const strokeProps = {
    strokeEnabled: true,
    strokeWidth: 1.5,
    stroke: new Color("#e0e0e0"),
  }

  if(props.border){
    props = {
      ...props,
      ...strokeProps
    }
  }

  const circleNode = new Ellipse();
  Object.assign(circleNode, props);
  return circleNode;
}

function createText(text = "Acacia Grove | The Right Inn..", userProps = {}) {
  const { Text, Color } = require("scenegraph");

  const defaultTextProps = {
    name: "Text",
    fill: "#000",
    fontSize: 20,
    fontFamily: "Helvetica Neue",
    fontStyle: "Regular",
    align: "left",
    layoutBox: {
      type: userProps && userProps.width ? Text.AUTO_HEIGHT : Text.POINT,
      ...(userProps || {}),
    },
  };
  
  let props = {
    ...defaultTextProps,
    ...(userProps || {}),
  };

  props.textAlign = {
    "left": Text.ALIGN_LEFT, 
    "center": Text.ALIGN_CENTER, 
    "right": Text.ALIGN_RIGHT
  }[props.align || "left"];

  if(typeof props.fill == "string"){
    const transparent = props.fill == "transparent";
    props.fill = new Color(transparent ? "#FFFFFF" : props.fill, transparent ? 0 : 1);
  }

  const textNode = new Text();
  const splitText = text.split("\\n");
  let actualText = "";
  splitText.forEach((paragraph, index) => {
    actualText += paragraph;
    if(index != splitText.length -1) actualText += "\n";
  });
  textNode.text = actualText;
  Object.assign(textNode, props);

  return textNode;
}

function chunkArray(array, size) {
  var results = [];
  while (array.length) {
    results.push(array.splice(0, size));
  }
  return results;
}

function randomBetween(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function getIconSizeFromTextSize(icon, textSize) {
  let iconScaleFactor = 0.9;
  const largeIcons = [
    "add",
    "check",
    "close",
    "play",
    "remove",
    "edit",
    "chevron-right",
  ];
  const mediumIcons = ["cocktail"];

  if (icon.indexOf("circle") != -1) iconScaleFactor = 1.05;
  if (mediumIcons.includes(icon)) iconScaleFactor = 0.76;
  if (largeIcons.includes(icon)) iconScaleFactor = 0.65;

  return textSize * iconScaleFactor;
}

function camelCaseToSentenceCase(text) {
  if (!text || !text.length) return "";
  const result = text.replace(/([A-Z]{1,})/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

function openUrl(url){
  const shell = require("uxp").shell;
  shell.openExternal(url);
}

function randomUuid(){
  const segment1 = Math.random().toString(36).substring(2);
  const segment2 = Math.random().toString(36).substring(2);
  const segment3 = Math.random().toString(36).substring(2);
  const segment4 = Math.random().toString(36).substring(2);
  return `${segment1}-${segment2}-${segment3}-${segment4}`;
}

function getContainerWidth(width = 1600){
  return width == 1920 ? 1600 : 1400;
}

function webflowBorder({width = 1.25, color = "black", bottomOnly = false}){
  const restWidth = bottomOnly ? 0 : width;

  return `
    border-top-style: solid; 
    border-top-width: ${restWidth}px; 
    border-top-color: ${color}; 
    border-right-style: solid; 
    border-right-width: ${restWidth}px; 
    border-right-color: ${color}; 
    border-bottom-style: solid; 
    border-bottom-width: ${width}px; 
    border-bottom-color: ${color}; 
    border-left-style: solid;
    border-left-width: ${restWidth}px; 
    border-left-color: ${color};
  `;
}

function webflowBorderRadii(radius){
  return `
    border-top-left-radius: ${radius}px; 
    border-top-right-radius: ${radius}px; 
    border-bottom-left-radius: ${radius}px; 
    border-bottom-right-radius: ${radius}px;
  `;
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
  fakeValue,
  createIcon,
  resizeIcon,
  getAssetFileFromPath,
  getPadding,
  createBorder,
  insertNode,
  tagNode,
  getNodeTag,
  getFernComponentChildByName,
  calculateAspectRatioFit,
  createText,
  createRectangle,
  createCircle,
  chunkArray,
  randomBetween,
  getIconSizeFromTextSize,
  camelCaseToSentenceCase,
  getAssetsByType,
  openUrl,
  randomUuid,
  getContainerWidth,
  webflowBorder,
  webflowBorderRadii
};
