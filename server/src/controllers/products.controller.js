import { uploadCloudFile } from "../config/cloudinary.js";
import { v4 as uuidv4 } from "uuid";

const products = [];

export const UploadSingleProduct = async (req, res) => {
  try {
    console.log("starting upload process 🖥️");

    uploadCloudFile.single("image")(req, res, (error) => {
      if (error) {
        console.error("error uploading file 🚫", error);
        return res.status(400).json({
          status: "error",
          message: "Error uploading file ❌:",
        });
      }
      if (!req.file) {
        console.error("No file uploaded... 🚫");
        return res.status(400).json({
          status: "error",
          message: "No file uploaded... ❌",
        });
      }
      const { name, description, price } = req.body;

      if (!name || !description || !price) {
        console.error("Missing fields 🚫");
        return res.status(400).json({
          status: "error",
          message: "Missing fields... ❌",
        });
      }

      const newProduct = {
        id: uuidv4(),
        name,
        description,
        price,
        image: req.file.path,
      };

      console.log("file loaded, and ready to go... 👌", newProduct);

      products.push(newProduct);
    });
  } catch (error) {
    console.error("Unexpected error while loading current file... 🤔", error);
    return res.status(500).json({
      status: "error",
      message: "unknown error while uploading file 🤔",
    });
  }
};
export const GetProducts = async (req, res) => {
  try {
    console.log("getting products... 🛍️");

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    console.error("Unexpected error while getting products... 🤔", error);
    return res.status(500).json({
      status: "error",
      message: "unknown error while getting products 🤔",
    });
  }
};
