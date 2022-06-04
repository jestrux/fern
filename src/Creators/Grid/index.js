const { selection } = require("scenegraph");
const viewport = require("viewport");

const { editDom, getAssetFileFromPath, placeInParent, tagNode } = require("../../utils");

const generateData = require("./generateData");
const defaultGridProps = require("./defaultProps");
const assembleGrid = require("./assemble");
const getGridImages = require("./getImages");

async function Grid(userProps){
    let props = {
        ...defaultGridProps,
        ...(userProps || {})
    };

    const dataType = props.dataType || "articles";
    const gridImages = await getAssetFileFromPath("images/" + dataType, "jpg", true);
    const imageNames = gridImages.map(e => e.name.replace(".jpg", ""));

    if(!props.data || !props.data.length || props.refreshData){
        props.data = generateData(props.numberOfRecords, dataType, imageNames);
        delete props.refreshData;
    }
    else{
        const currentImages = getGridImages(selection.items[0], props);
        gridImages.splice(0, currentImages.length, ...currentImages);
        
        if(props.data.length > props.numberOfRecords)
            props.data = props.data.slice(0, props.numberOfRecords);
        else if(props.data.length < props.numberOfRecords){
            props.data = [
                ...props.data,
                ...generateData(props.numberOfRecords - props.data.length, dataType, imageNames)
            ];
        }
    }

    props.data = props.data.map((d, i) => {
        return {
            ...d, image: gridImages[i]
        }
    });

    try {
        const oldGrid = userProps ? selection.items[0] : null;
        if(oldGrid){
            // const logoNode = getGridComponent(oldGrid, "logo");
            // const dpNode = getGridComponent(oldGrid, "dp");

            // logoImage = logoNode && logoNode.fill ? logoNode.fill : logoImage;
            // dpImage = dpNode && dpNode.fill ? dpNode.fill : dpImage;
        }
        
        editDom(() => {
            try {
                const grid = assembleGrid(props, gridImages);
                grid.name = "FernGrid";

                tagNode(grid, {  type: "Grid", ...props });

                if(oldGrid){
                    placeInParent(grid, oldGrid.topLeftInParent);
                    oldGrid.removeFromParent();
                }
                else {
                    placeInParent(grid, {x: 0, y: viewport.bounds.y});
                }
            } catch (error) {
                console.log("Error creating grid: ", error);
            }
        });
    } catch (error) {
        console.log("Error creating card: ", error);
    }
}

module.exports = Grid;