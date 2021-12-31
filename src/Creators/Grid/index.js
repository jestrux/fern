const { selection } = require("scenegraph");

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

    const gridImages = await getAssetFileFromPath("images/grid", "jpg", true);

    if(!props.data || !props.data.length) 
        props.data = generateData(props.numberOfRecords);
    else{
        const currentImages = getGridImages(selection.items[0], props);
        gridImages.splice(0, currentImages.length, ...currentImages);
        // return console.log("Grid images:", currentImages);
        
        if(props.data.length > props.numberOfRecords)
            props.data = props.data.slice(0, props.numberOfRecords);
        else if(props.data.length < props.numberOfRecords){
            props.data = [
                ...props.data,
                ...generateData(props.numberOfRecords - props.data.length)
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
                else
                    placeInParent(grid, {x: 0, y: 0});
            } catch (error) {
                console.log("Error creating grid: ", error);
            }
        });
    } catch (error) {
        console.log("Error creating card: ", error);
    }
}

module.exports = Grid;