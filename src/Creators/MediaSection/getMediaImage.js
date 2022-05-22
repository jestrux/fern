const { getGroupChildByName, getNodeTag } = require("../../utils");

function getMediaImage(media) {
    const props = getNodeTag(media);

    if (!props) return null;

    const { playButton, theme } = props;
    let imagePath = props.theme.border ? "contentWithBorder/content" : "content";
    imagePath += theme.layout == "overlay" || playButton
        ? "/imageWithScrim/image"
        : "/image";

    console.log("Image path: ", imagePath);
    let image;
    getGroupChildByName(media, imagePath, node => {
        image = node;
    });

    return image;
}

module.exports = getMediaImage;