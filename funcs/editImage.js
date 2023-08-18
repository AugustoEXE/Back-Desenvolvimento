const Jimp = require("jimp");
const sharp = require("sharp");

const editedImage = async (pathImage, targetWidth, targetHeight) => {
    try {
        const currentImage = sharp(pathImage);

        const { width: imageWidth, height: imageHeight } =
            await currentImage.metadata();

        const aspectRatio = targetWidth / targetHeight;
        const imageAspectRatio = imageWidth / imageHeight;

        if (imageWidth < targetWidth || imageHeight < targetHeight) {
            if (imageAspectRatio > aspectRatio) {
                currentImage.resize(targetWidth, null);
            } else {
                currentImage.resize(null, targetHeight);
            }
        }

        currentImage.resize(targetWidth, targetHeight, { fit: "inside" });

        return pathImage;
    } catch (error) {
        console.error("Erro ao editar a imagem:", error);
        throw error;
    }
};
module.exports = editedImage;
