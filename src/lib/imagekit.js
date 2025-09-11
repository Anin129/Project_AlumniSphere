import ImageKit from 'imagekit';
import dotenv from 'dotenv';
dotenv.config();


const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const uploadImageToImageKit = async (
  file,
  fileName,
  folder = 'products'
) => {
  try {
    const result = await imagekit.upload({
      file: file,
      fileName: fileName,
      folder: folder,
      useUniqueFileName: true,
    });

    return {
      url: result.url,
      fileId: result.fileId,
      name: result.name,
    };
  } catch (error) {
    console.error('Error uploading image to ImageKit:', error);
    throw new Error('Failed to upload image to ImageKit');
  }
};

export const deleteImageFromImageKit = async (fileId) => {
  try {
    await imagekit.deleteFile(fileId);
  } catch (error) {
    console.error('Error deleting image from ImageKit:', error);
    throw new Error('Failed to delete image from ImageKit');
  }
};

export default imagekit; 