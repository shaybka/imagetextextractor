import cloudinary from "../config/cloudinary.js";
import Replicate from "replicate";
import { REPLICATE_API_TOKEN } from "../config/config.js";

export const processImage = async (req, res) => {
  const imageFile = req.file;

  // Check if an image file is provided
  if (!imageFile) {
    return res.status(400).json({ message: "No image file provided" });
  }

 const replicate = new Replicate({
  auth: REPLICATE_API_TOKEN,
});

  try {
    // Encode image buffer to base64
    const encodedImage = `data:${
      imageFile.mimetype
    };base64,${imageFile.buffer.toString("base64")}`;

    // Upload the encoded image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(encodedImage, {
      folder: "imageText",
      width: 800,
        height: 800,
      crop: "scale",
    });

    const avatarUrl = uploadResponse.secure_url;
   

    // Run the Replicate model
   const output = await replicate.run(
  "abiruyt/text-extract-ocr:a524caeaa23495bc9edc805ab08ab5fe943afd3febed884a4f3747aa32e9cd61",
  {
    input: {
      image: avatarUrl,
    },
  }
).catch((err) => {
        console.error("Replicate API Error:", err);
        throw new Error("Failed to process image with Replicate.");
      });
    console.log("Replicate Output:", output);

    // Respond with success
    res.status(201).json({
      message: "Image processed successfully",
      data: output, 
    });
  } catch (error) {
    console.error("Error during image processing:", error.message, error.stack);
    res.status(500).json({ message: error.message });
  }
};
