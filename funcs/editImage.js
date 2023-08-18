const Jimp = require("jimp");

const editedImage = async (pathImage, targetWidth, targetHeight) => {
    const currentImage = await Jimp.read(pathImage);
    const imageWidth = currentImage.getWidth();
    const imageHeight = currentImage.getHeight();

    const aspectRatio = targetWidth / targetHeight;
    const imageAspectRatio = imageWidth / imageHeight;

    if (imageWidth < targetWidth || imageHeight < targetHeight) {
        if (imageAspectRatio > aspectRatio) {
            currentImage.resize(targetWidth, Jimp.AUTO);
        } else {
            image.resize(Jimp.AUTO, targetHeight);
        }
    }

    currentImage.cover(targetWidth, targetHeight);

    await currentImage.writeAsync(pathImage);
    return pathImage;
};
module.exports = editedImage;
