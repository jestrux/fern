const React = require('react');
const { selection } = require("scenegraph");
const { useEffect, useState } = require("react");
import getMediaImage from '../Creators/MediaSection/getMediaImage';
import { editDom, getImageFillFromNode } from '../utils';

const ImageEditorField = () => {
    const [preview, setPreview] = useState(null);
    useEffect(() => {
        handleGetImage();
    }, []);

    const handleGetImage = async () => {
        console.log("Get image...");
        const image = getMediaImage(selection.items[0]);
        if(image){
            let imagePath = await getImageFillFromNode(image, { base64: true });
            setPreview(imagePath);
        }
        else
            console.log("No image");
    }

    const handleChangeImage = () => {
        editDom((selection) => {
          const image = getMediaImage(selection.items[0]);
          if(image)
            selection.items = [image]
          else
            console.log("Image not found!");
        });
    }

    return (
        <div className="-mx-12px">
            <div className="bg-white py-2 px-12px border-b border-light-gray rounded-xs flex items-center justify-between">
                <div className="bg-gray" style={{ width: "55px", height: "45px" }}>
                    <img className='object-cover rounded-xs' src={preview} alt="" style={{ width: "55px", height: "45px" }} />
                </div>
                <span className="mr-2 text-sm border-b border-current text-blue cursor-pointer"
                    onClick={handleChangeImage}
                >
                    CHANGE
                </span>
            </div>
        </div>
    );
}
 
export default ImageEditorField;